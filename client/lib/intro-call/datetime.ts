/**
 * Convert a wall-clock datetime in a given IANA timezone to its UTC instant.
 * No external date library; uses Intl.DateTimeFormat to compute the offset.
 */
export function zonedWallClockToUtc(
  year: number,
  monthIndex: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const target = Date.UTC(year, monthIndex, day, hour, minute, 0);
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let guess = target;
  for (let i = 0; i < 3; i++) {
    const parts = Object.fromEntries(
      dtf
        .formatToParts(new Date(guess))
        .filter((p) => p.type !== "literal")
        .map((p) => [p.type, p.value]),
    );
    const formatted = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );
    const diff = target - formatted;
    if (diff === 0) break;
    guess += diff;
  }
  return new Date(guess);
}

export function parseWallClockIso(iso: string) {
  const match = iso.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/,
  );
  if (!match) return null;
  return {
    year: Number(match[1]),
    monthIndex: Number(match[2]) - 1,
    day: Number(match[3]),
    hour: Number(match[4]),
    minute: Number(match[5]),
  };
}

export function formatDateLong(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatTimeRange(
  start: Date,
  durationMinutes: number,
  timeZone: string,
): string {
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
  const startStr = fmt.format(start);
  const endStr = fmt.format(end);
  return `${startStr} to ${endStr}`;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function toCalendarStamp(date: Date) {
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    "Z"
  );
}

export function buildGoogleCalendarUrl(params: {
  title: string;
  start: Date;
  durationMinutes: number;
  description?: string;
  location?: string;
  guests?: string[];
  attachMeet?: boolean;
}): string {
  const end = new Date(
    params.start.getTime() + params.durationMinutes * 60 * 1000,
  );
  const dates = `${toCalendarStamp(params.start)}/${toCalendarStamp(end)}`;
  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", params.title);
  url.searchParams.set("dates", dates);
  if (params.description) url.searchParams.set("details", params.description);
  if (params.location) url.searchParams.set("location", params.location);
  if (params.guests && params.guests.length) {
    url.searchParams.set("add", params.guests.join(","));
  }
  if (params.attachMeet) url.searchParams.set("conf", "add");
  return url.toString();
}

export function buildIcs(params: {
  uid: string;
  title: string;
  description?: string;
  location?: string;
  start: Date;
  durationMinutes: number;
  organizer: { name: string; email: string };
  attendees: { name?: string; email: string }[];
}): string {
  const end = new Date(
    params.start.getTime() + params.durationMinutes * 60 * 1000,
  );
  const now = new Date();
  const escape = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//syedomer.me//Intro Call//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${params.uid}`,
    `DTSTAMP:${toCalendarStamp(now)}`,
    `DTSTART:${toCalendarStamp(params.start)}`,
    `DTEND:${toCalendarStamp(end)}`,
    `SUMMARY:${escape(params.title)}`,
    params.description ? `DESCRIPTION:${escape(params.description)}` : "",
    params.location ? `LOCATION:${escape(params.location)}` : "",
    `ORGANIZER;CN=${escape(params.organizer.name)}:mailto:${params.organizer.email}`,
    ...params.attendees.map(
      (a) =>
        `ATTENDEE;CN=${escape(a.name || a.email)};RSVP=TRUE:mailto:${a.email}`,
    ),
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  return lines.join("\r\n");
}
