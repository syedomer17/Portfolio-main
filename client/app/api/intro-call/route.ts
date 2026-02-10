import { NextRequest, NextResponse } from "next/server";
import IntroCall from "@/model/IntroCall";
import dbConnect from "@/lib/mongoodb";

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
    } = body;

    // Basic validation
    if (!name || !email || !location || !date) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (location === "Phone" && (!phoneCountryCode || !phoneNumber)) {
      return NextResponse.json(
        { message: "Phone number with country code is required when location is Phone" },
        { status: 400 }
      );
    }

    if (location === "Phone" && !/^\+\d{1,4}$/.test(phoneCountryCode)) {
      return NextResponse.json(
        { message: "Invalid country code" },
        { status: 400 }
      );
    }

    if (location === "Phone" && !/^\d{4,20}$/.test(phoneNumber)) {
      return NextResponse.json(
        { message: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Email sanity check (minimum)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Date validation (VERY IMPORTANT)
    const callDate = new Date(date);
    if (isNaN(callDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid date" },
        { status: 400 }
      );
    }

    const introCall = await IntroCall.create({
      name,
      email,
      location,
      phone: location === "Phone" ? `${phoneCountryCode}${phoneNumber}` : undefined,
      phoneCountryCode,
      phoneNumber,
      notes,
      guests,
      date: callDate,
      duration: duration || 15,
    });

    return NextResponse.json(
      {
        message: "Intro call scheduled successfully",
        data: introCall,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating intro call:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}