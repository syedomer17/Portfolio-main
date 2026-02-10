import { NextRequest, NextResponse } from "next/server";
import { Subscriber } from "@/model/Subscriber";
import dbConnect from "@/lib/mongoodb";

export async function POST(req: NextRequest) {
  try {
     await dbConnect();
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Basic sanity check (don't trust frontend)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { message: "Email already subscribed" },
        { status: 400 }
      );
    }

    await Subscriber.create({ email });

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);

    // Mongo duplicate key fallback (still needed)
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