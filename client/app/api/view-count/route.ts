import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoodb";
import ViewCount from "@/model/ViewCount";

export const runtime = "nodejs";

const DEFAULT_VIEW_COUNT = 3300;
const VIEW_KEY = "hero";
const VIEW_COOKIE = "hero_viewed";
const VIEW_COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours
const BOT_UA_REGEX = /bot|crawler|spider|crawling|preview|facebookexternalhit|twitterbot|slackbot|discordbot|whatsapp/i;

async function getOrCreateCount() {
  const existing = await ViewCount.findOne({ key: VIEW_KEY });
  if (existing) {
    return existing.count;
  }

  const created = await ViewCount.create({ key: VIEW_KEY, count: DEFAULT_VIEW_COUNT });
  return created.count;
}

async function incrementIfAllowed(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") || "";
  const url = new URL(req.url);
  const forceIncrement = url.searchParams.get("force") === "1";
  const isDev = process.env.NODE_ENV !== "production";

  if (forceIncrement) {
    const updated = await ViewCount.findOneAndUpdate(
      { key: VIEW_KEY },
      {
        $inc: { count: 1 },
        $setOnInsert: { key: VIEW_KEY },
      },
      { upsert: true, returnDocument: "after" }
    );

    if (updated && updated.count === 1) {
      updated.count = DEFAULT_VIEW_COUNT;
      await updated.save();
    }

    return NextResponse.json({ count: updated?.count ?? DEFAULT_VIEW_COUNT });
  }

  if (BOT_UA_REGEX.test(userAgent)) {
    const count = await getOrCreateCount();
    return NextResponse.json({ count });
  }

  const alreadyViewed = req.cookies.get(VIEW_COOKIE)?.value === "1";
  if (alreadyViewed) {
    const count = await getOrCreateCount();
    return NextResponse.json({ count });
  }

  const updated = await ViewCount.findOneAndUpdate(
    { key: VIEW_KEY },
    {
      $inc: { count: 1 },
      $setOnInsert: { key: VIEW_KEY },
    },
    { upsert: true, returnDocument: "after" }
  );

  if (updated && updated.count === 1) {
    updated.count = DEFAULT_VIEW_COUNT;
    await updated.save();
  }

  const response = NextResponse.json({ count: updated?.count ?? DEFAULT_VIEW_COUNT });
  if (!isDev) {
    response.cookies.set(VIEW_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: VIEW_COOKIE_MAX_AGE,
    });
  }

  return response;
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    return await incrementIfAllowed(req);
  } catch (error) {
    console.error("View count API error:", error);
    return NextResponse.json(
      { message: "Failed to update view count" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    return await incrementIfAllowed(req);
  } catch (error) {
    console.error("View count API error:", error);
    return NextResponse.json(
      { message: "Failed to update view count" },
      { status: 500 }
    );
  }
}
