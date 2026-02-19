import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { url } = body;

  const key = "16d89017-b30f-4066-8c65-99ece2a9316c";

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      host: "syedomer.me",
      key,
      urlList: [url],
    }),
  });

  return NextResponse.json({
    success: response.ok,
  });
}
