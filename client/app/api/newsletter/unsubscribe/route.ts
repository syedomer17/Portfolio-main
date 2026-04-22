import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoodb";
import { Subscriber } from "@/model/Subscriber";
import { escapeHtml } from "@/lib/newsletter/templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.syedomer.me"
).replace(/\/$/, "");

function page(title: string, message: string, accent: string) {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>${escapeHtml(title)}</title>
    <style>
      body{margin:0;background:#0E0D09;color:#EBEBEB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;}
      .card{background:#161510;border:1px solid #2A2A28;border-radius:14px;max-width:480px;width:100%;padding:32px;text-align:center;}
      h1{margin:8px 0 12px;font-size:22px;}
      p{margin:0 0 20px;color:#9A9A9A;line-height:1.6;font-size:15px;}
      a{color:${accent};text-decoration:none;font-weight:600;}
      .dot{display:inline-block;width:10px;height:10px;border-radius:3px;background:${accent};margin-bottom:14px;}
    </style>
  </head>
  <body>
    <div class="card">
      <span class="dot"></span>
      <h1>${escapeHtml(title)}</h1>
      <p>${message}</p>
      <a href="${SITE_URL}">Back to syedomer.me &rarr;</a>
    </div>
  </body>
</html>`;
  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

async function handleUnsubscribe(token: string | null) {
  if (!token || token.length < 8) {
    return page(
      "Invalid link",
      "This unsubscribe link is malformed. If you keep getting emails, reply to one of them and I'll remove you manually.",
      "#ef4444"
    );
  }

  await dbConnect();
  const sub = await Subscriber.findOne({ unsubscribeToken: token });
  if (!sub) {
    return page(
      "Link not recognized",
      "We couldn't match this unsubscribe link to an active subscription. You may already be unsubscribed.",
      "#ef4444"
    );
  }

  if (sub.isActive) {
    sub.isActive = false;
    sub.unsubscribedAt = new Date();
    await sub.save();
  }

  return page(
    "You're unsubscribed",
    "You won't receive any further emails from this newsletter. Thanks for reading — no hard feelings.",
    "#f6c400"
  );
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  return handleUnsubscribe(token);
}

// Gmail / Outlook one-click unsubscribe (RFC 8058)
export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 400 });
  }
  await dbConnect();
  const sub = await Subscriber.findOne({ unsubscribeToken: token });
  if (!sub) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  if (sub.isActive) {
    sub.isActive = false;
    sub.unsubscribedAt = new Date();
    await sub.save();
  }
  return NextResponse.json({ message: "Unsubscribed" }, { status: 200 });
}
