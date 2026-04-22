import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoodb";
import { Subscriber } from "@/model/Subscriber";
import { Announcement } from "@/model/Announcement";
import { isValidContentType, resolveContent, absoluteUrl } from "@/lib/newsletter/content";
import {
  renderAnnouncementEmail,
  renderAnnouncementText,
} from "@/lib/newsletter/templates";
import {
  createPooledTransporter,
  getSmtpConfig,
  sendBulkPerRecipient,
} from "@/lib/newsletter/sender";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

function buildUnsubscribeUrl(token: string) {
  return absoluteUrl(`/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`);
}

export async function POST(req: NextRequest) {
  const adminToken = process.env.NEWSLETTER_ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json(
      { message: "NEWSLETTER_ADMIN_TOKEN is not configured" },
      { status: 500 }
    );
  }
  const provided =
    req.headers.get("x-admin-token") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!provided || provided !== adminToken) return unauthorized();

  let body: {
    type?: string;
    slug?: string;
    customNote?: string;
    force?: boolean;
    dryRun?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { type, slug, customNote, force, dryRun } = body;
  if (!isValidContentType(type) || !slug || typeof slug !== "string") {
    return NextResponse.json(
      { message: "type and slug are required; type must be blog|project|case-study|certification|experience" },
      { status: 400 }
    );
  }
  if (customNote && customNote.length > 1000) {
    return NextResponse.json(
      { message: "customNote exceeds 1000 characters" },
      { status: 400 }
    );
  }

  const content = resolveContent(type, slug);
  if (!content) {
    return NextResponse.json(
      { message: `No ${type} found with slug "${slug}"` },
      { status: 404 }
    );
  }

  await dbConnect();

  if (!force) {
    const existing = await Announcement.findOne({ contentType: type, slug });
    if (existing) {
      return NextResponse.json(
        {
          message: "Already announced. Pass force:true to resend.",
          announcedAt: existing.sentAt,
          recipientCount: existing.recipientCount,
        },
        { status: 409 }
      );
    }
  }

  const subscribers = await Subscriber.find(
    { isActive: true },
    { email: 1, unsubscribeToken: 1 }
  ).lean();

  if (subscribers.length === 0) {
    return NextResponse.json(
      { message: "No active subscribers to notify", recipientCount: 0 },
      { status: 200 }
    );
  }

  if (dryRun) {
    return NextResponse.json({
      message: "Dry run — no emails sent",
      type,
      slug,
      title: content.title,
      url: content.url,
      recipientCount: subscribers.length,
    });
  }

  const smtp = getSmtpConfig();
  if ("error" in smtp) {
    return NextResponse.json({ message: smtp.error }, { status: 500 });
  }

  const transporter = createPooledTransporter(smtp);

  const subjectKind =
    type === "blog"
      ? "New blog"
      : type === "project"
        ? "New project"
        : type === "case-study"
          ? "New case study"
          : type === "certification"
            ? "New certification"
            : "New experience";
  const subject = `${subjectKind}: ${content.title}`;

  const recipients = subscribers.map((s) => ({
    email: s.email,
    unsubscribeUrl: buildUnsubscribeUrl(s.unsubscribeToken),
  }));

  const result = await sendBulkPerRecipient({
    transporter,
    from: smtp.from,
    recipients,
    subject,
    render: ({ unsubscribeUrl }) => ({
      html: renderAnnouncementEmail({ content, unsubscribeUrl, customNote }),
      text: renderAnnouncementText({ content, unsubscribeUrl, customNote }),
    }),
    concurrency: 3,
    batchDelayMs: 150,
  });

  transporter.close();

  if (result.sent > 0) {
    await Announcement.findOneAndUpdate(
      { contentType: type, slug },
      {
        contentType: type,
        slug,
        title: content.title,
        url: content.url,
        recipientCount: result.sent,
        sentAt: new Date(),
      },
      { upsert: true, new: true }
    );
  }

  return NextResponse.json({
    message:
      result.failed === 0
        ? `Sent to ${result.sent} subscriber(s).`
        : `Sent to ${result.sent}, failed ${result.failed}.`,
    type,
    slug,
    title: content.title,
    url: content.url,
    sent: result.sent,
    failed: result.failed,
    failures: result.failures.slice(0, 20),
  });
}
