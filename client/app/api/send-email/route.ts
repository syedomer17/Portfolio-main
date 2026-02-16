import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const headerInjectionRegex = /[\r\n]/;

const MAX_LENGTHS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 4000,
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidLength(value: string, min: number, max: number) {
  return value.length >= min && value.length <= max;
}

export async function POST(req: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    company?: string;
  } | null = null;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (!body) {
    return NextResponse.json(
      { message: "Request body is required" },
      { status: 400 }
    );
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const subject = String(body.subject || "").trim();
  const message = String(body.message || "").trim();
  const company = String(body.company || "").trim();

  if (company) {
    return NextResponse.json({ message: "Message sent" }, { status: 200 });
  }

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!emailRegex.test(email) || headerInjectionRegex.test(email)) {
    return NextResponse.json(
      { message: "Invalid email" },
      { status: 400 }
    );
  }

  if (headerInjectionRegex.test(subject)) {
    return NextResponse.json(
      { message: "Invalid subject" },
      { status: 400 }
    );
  }

  if (
    !isValidLength(name, 2, MAX_LENGTHS.name) ||
    !isValidLength(email, 5, MAX_LENGTHS.email) ||
    !isValidLength(subject, 3, MAX_LENGTHS.subject) ||
    !isValidLength(message, 10, MAX_LENGTHS.message)
  ) {
    return NextResponse.json(
      { message: "One or more fields are out of range" },
      { status: 400 }
    );
  }

  const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_FROM", "SMTP_TO"];
  const missingEnv = requiredEnv.filter((key) => !process.env[key]);

  if (missingEnv.length) {
    console.error("Missing email env vars:", missingEnv.join(", "));
    return NextResponse.json(
      { message: "Email service is not configured" },
      { status: 500 }
    );
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if ((smtpUser && !smtpPass) || (!smtpUser && smtpPass)) {
    return NextResponse.json(
      { message: "Email credentials are not configured" },
      { status: 500 }
    );
  }

  const smtpPort = Number(process.env.SMTP_PORT);
  const smtpSecure =
    process.env.SMTP_SECURE === "true" || Number.isNaN(smtpPort)
      ? process.env.SMTP_SECURE === "true"
      : smtpPort === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort || 465,
    secure: smtpSecure,
    auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
    family: 4, // Force IPv4
  } as any);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `New message: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin: 0 0 12px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0;">
            ${safeMessage}
          </div>
        </div>
      `.trim(),
    });

    return NextResponse.json({ message: "Message sent" }, { status: 200 });
  } catch (error) {
    console.error("Send email error:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
