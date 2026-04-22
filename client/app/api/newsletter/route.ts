import { NextRequest, NextResponse } from "next/server";
import { Subscriber } from "@/model/Subscriber";
import dbConnect from "@/lib/mongoodb";
import { absoluteUrl } from "@/lib/newsletter/content";
import {
  renderWelcomeEmail,
  renderWelcomeText,
} from "@/lib/newsletter/templates";
import {
  createPooledTransporter,
  getSmtpConfig,
} from "@/lib/newsletter/sender";

export const runtime = "nodejs";

async function sendWelcomeEmail(email: string, token: string) {
  const smtp = getSmtpConfig();
  if ("error" in smtp) {
    console.error("[newsletter] Skipping welcome email:", smtp.error);
    return;
  }
  const transporter = createPooledTransporter(smtp);
  const unsubscribeUrl = absoluteUrl(
    `/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`
  );
  try {
    await transporter.sendMail({
      from: smtp.from,
      to: email,
      subject: "Welcome to Syed Omer Ali's newsletter",
      html: renderWelcomeEmail(unsubscribeUrl),
      text: renderWelcomeText(unsubscribeUrl),
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
  } catch (err) {
    console.error("[newsletter] Welcome email failed:", err);
  } finally {
    transporter.close();
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        existing.unsubscribedAt = null;
        await existing.save();
        // Fire welcome again without blocking response
        void sendWelcomeEmail(existing.email, existing.unsubscribeToken);
        return NextResponse.json(
          { message: "Welcome back! Your subscription is active again." },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { message: "Email already subscribed" },
        { status: 400 }
      );
    }

    const created = await Subscriber.create({ email });

    // Fire-and-forget — don't block the HTTP response on SMTP.
    void sendWelcomeEmail(created.email, created.unsubscribeToken);

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);

    if (error?.code === 11000) {
      return NextResponse.json(
        { message: "Email already subscribed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
