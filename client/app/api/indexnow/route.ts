import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    // Validate URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return NextResponse.json(
        { success: false, error: 'URL must be absolute (start with http:// or https://)' },
        { status: 400 }
      );
    }

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

    // Log in development only
    if (process.env.NODE_ENV === 'development') {
      console.log(`[IndexNow] ${response.status} - ${url}`);
    }

    if (response.ok) {
      return NextResponse.json({
        success: true,
        status: response.status,
        message: 'Search engines notified successfully',
      });
    }

    // Handle specific error cases
    if (response.status === 429) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limited. Please wait before submitting more URLs.',
          status: response.status 
        },
        { status: 429 }
      );
    }

    if (response.status === 403) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid key or domain verification failed.',
          status: response.status 
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: false,
      status: response.status,
      error: 'Failed to notify search engines',
    }, { status: response.status });

  } catch (error) {
    console.error('[IndexNow] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
