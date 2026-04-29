import { NextRequest, NextResponse } from "next/server";
import IntroCall from "@/model/IntroCall";
import dbConnect from "@/lib/mongoodb";
import {
  buildGoogleCalendarUrl,
  buildIcs,
  formatDateLong,
  formatTimeRange,
  parseWallClockIso,
  zonedWallClockToUtc,
} from "@/lib/intro-call/datetime";
import {
  renderAttendeeEmail,
  renderAttendeeText,
  renderGuestEmail,
  renderGuestText,
  type IntroCallEmailData,
} from "@/lib/intro-call/templates";
import {
  createPooledTransporter,
  getSmtpConfig,
} from "@/lib/newsletter/sender";

export const runtime = "nodejs";

const HOST_NAME = "Syed Omer Ali";
const DEFAULT_TIMEZONE = "Asia/Kolkata";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      name,
      email,
      location,
      phoneCountryCode,
      phoneNumber,
      notes,
      guests,
      date,
      duration,
      timeSlot,
      timezone,
    } = body;

    if (!name || !email || !location || !date) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (
      location === "Phone" &&
      (!phoneCountryCode || !phoneNumber)
    ) {
      return NextResponse.json(
        {
          message:
            "Phone number with country code is required when location is Phone",
        },
        { status: 400 },
      );
    }

    if (location === "Phone" && !/^\+\d{1,4}$/.test(phoneCountryCode)) {
      return NextResponse.json(
        { message: "Invalid country code" },
        { status: 400 },
      );
    }

    if (location === "Phone" && !/^\d{4,20}$/.test(phoneNumber)) {
      return NextResponse.json(
        { message: "Invalid phone number" },
        { status: 400 },
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 },
      );
    }

    const guestList: string[] = Array.isArray(guests)
      ? guests
          .map((g) => String(g || "").trim())
          .filter((g) => g.length > 0)
      : [];

    if (guestList.some((g) => !emailRegex.test(g))) {
      return NextResponse.json(
        { message: "One or more guest emails are invalid" },
        { status: 400 },
      );
    }

    const tz =
      typeof timezone === "string" && timezone ? timezone : DEFAULT_TIMEZONE;

    const wallClock = parseWallClockIso(String(date));
    let callDate: Date;
    if (wallClock) {
      callDate = zonedWallClockToUtc(
        wallClock.year,
        wallClock.monthIndex,
        wallClock.day,
        wallClock.hour,
        wallClock.minute,
        tz,
      );
    } else {
      callDate = new Date(date);
    }

    if (isNaN(callDate.getTime())) {
      return NextResponse.json({ message: "Invalid date" }, { status: 400 });
    }

    const durationMinutes = Number(duration) || 15;

    const meetLink =
      location === "Google Meet"
        ? process.env.INTRO_CALL_MEET_LINK || "https://meet.google.com/new"
        : undefined;

    const introCall = await IntroCall.create({
      name,
      email,
      location,
      phone:
        location === "Phone"
          ? `${phoneCountryCode}${phoneNumber}`
          : undefined,
      phoneCountryCode,
      phoneNumber,
      notes,
      guests: guestList,
      date: callDate,
      duration: durationMinutes,
      timeSlot: typeof timeSlot === "string" ? timeSlot : undefined,
      timezone: tz,
      meetLink,
    });

    sendConfirmationEmails({
      name,
      email,
      location,
      phoneNumber:
        location === "Phone"
          ? `${phoneCountryCode}${phoneNumber}`
          : undefined,
      notes,
      guests: guestList,
      callDate,
      durationMinutes,
      timezone: tz,
      meetLink,
      bookingId: String(introCall._id),
    }).catch((err) => {
      console.error("Intro call email dispatch failed:", err);
    });

    return NextResponse.json(
      {
        message: "Intro call scheduled successfully",
        data: introCall,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating intro call:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

async function sendConfirmationEmails(input: {
  name: string;
  email: string;
  location: "Google Meet" | "Phone";
  phoneNumber?: string;
  notes?: string;
  guests: string[];
  callDate: Date;
  durationMinutes: number;
  timezone: string;
  meetLink?: string;
  bookingId: string;
}) {
  const smtp = getSmtpConfig();
  if ("error" in smtp) {
    console.warn(`Skipping intro call emails: ${smtp.error}`);
    return;
  }

  const transporter = createPooledTransporter(smtp);

  const dateLabel = formatDateLong(input.callDate, input.timezone);
  const timeLabel = formatTimeRange(
    input.callDate,
    input.durationMinutes,
    input.timezone,
  );

  const calendarTitle = `Intro call with ${HOST_NAME}`;
  const calendarDescription = [
    `Intro call with ${HOST_NAME} and ${input.name}.`,
    input.location === "Google Meet" && input.meetLink
      ? `Join on Google Meet: ${input.meetLink}`
      : "",
    input.location === "Phone" && input.phoneNumber
      ? `Phone: ${input.phoneNumber}`
      : "",
    input.notes ? `Notes: ${input.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const calendarLocation =
    input.location === "Google Meet" && input.meetLink
      ? input.meetLink
      : input.location === "Phone" && input.phoneNumber
        ? input.phoneNumber
        : input.location;

  const calendarUrl = buildGoogleCalendarUrl({
    title: calendarTitle,
    start: input.callDate,
    durationMinutes: input.durationMinutes,
    description: calendarDescription,
    location: calendarLocation,
    guests: input.guests,
    attachMeet: input.location === "Google Meet" && !input.meetLink,
  });

  const baseEmailData: IntroCallEmailData = {
    hostName: HOST_NAME,
    attendeeName: input.name,
    attendeeEmail: input.email,
    dateLabel,
    timeLabel,
    timezone: input.timezone,
    durationMinutes: input.durationMinutes,
    location: input.location,
    meetLink: input.meetLink,
    phoneNumber: input.phoneNumber,
    notes: input.notes,
    calendarUrl,
    guests: input.guests,
  };

  const ics = buildIcs({
    uid: `${input.bookingId}@syedomer.me`,
    title: calendarTitle,
    description: calendarDescription,
    location: calendarLocation,
    start: input.callDate,
    durationMinutes: input.durationMinutes,
    organizer: { name: HOST_NAME, email: smtp.from },
    attendees: [
      { name: input.name, email: input.email },
      ...input.guests.map((g) => ({ email: g })),
    ],
  });
  const icsAttachment = {
    filename: "intro-call.ics",
    content: ics,
    contentType: "text/calendar; method=REQUEST; charset=UTF-8",
  };

  const fromHeader = `"${HOST_NAME}" <${smtp.from}>`;

  try {
    await transporter.sendMail({
      from: fromHeader,
      to: input.email,
      subject: `Your intro call with ${HOST_NAME} is booked`,
      html: renderAttendeeEmail(baseEmailData),
      text: renderAttendeeText(baseEmailData),
      attachments: [icsAttachment],
    });
  } catch (err) {
    console.error("Failed to send attendee email:", err);
  }

  for (const guest of input.guests) {
    try {
      await transporter.sendMail({
        from: fromHeader,
        to: guest,
        subject: `${input.name} added you to an intro call with ${HOST_NAME}`,
        html: renderGuestEmail(baseEmailData),
        text: renderGuestText(baseEmailData),
        attachments: [icsAttachment],
      });
    } catch (err) {
      console.error(`Failed to send guest email to ${guest}:`, err);
    }
  }

  transporter.close();
}
