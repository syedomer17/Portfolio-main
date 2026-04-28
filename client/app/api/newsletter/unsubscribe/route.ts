import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoodb";
import { Subscriber } from "@/model/Subscriber";
import { escapeHtml } from "@/lib/newsletter/templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.syedomer.me"
).replace(/\/$/, "");

type Tone = "success" | "warn" | "error";

const TONE: Record<Tone, { accent: string; accentInk: string; label: string }> =
  {
    success: { accent: "#f6c400", accentInk: "#0E0D09", label: "Confirmed" },
    warn: { accent: "#f6c400", accentInk: "#0E0D09", label: "Heads up" },
    error: { accent: "#ef4444", accentInk: "#ffffff", label: "Issue" },
  };

function page(opts: {
  title: string;
  message: string;
  tone: Tone;
  ctaLabel?: string;
}) {
  const { title, message, tone, ctaLabel = "Back to the portfolio" } = opts;
  const t = TONE[tone];

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="robots" content="noindex" />
    <meta name="color-scheme" content="light dark" />
    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#0E0D09" media="(prefers-color-scheme: dark)" />
    <title>${escapeHtml(title)} · Syed Omer Ali</title>

    <!-- Font preload hints, mirrors app/layout.tsx for LCP parity -->
    <link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="/fonts/new/Instagram%20Sans.woff2" />
    <link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="/fonts/new/Instagram%20Sans%20Medium.woff2" />
    <link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="/fonts/new/Instagram%20Sans%20Bold.woff2" />

    <style>
      /* Instagram Sans, same three weights as the app (lib/fonts.ts) */
      @font-face {
        font-family: 'Instagram Sans';
        src: url('/fonts/new/Instagram%20Sans.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Instagram Sans';
        src: url('/fonts/new/Instagram%20Sans%20Medium.woff2') format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Instagram Sans';
        src: url('/fonts/new/Instagram%20Sans%20Bold.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }

      /* Color tokens mirror the app palette used across sections.
         Light side:  #ffffff bg, #333333 headings, slate-700 body,
                      gray-200 separator, gray-300 dashed, gray-500 muted.
         Dark side:   #0B0D10 bg, #0E0D09 surface, #EBEBEB headings,
                      slate-200 body, #333 separator+dashed, #989898 muted,
                      #D4D4D4 quote, #888 attribution. */
      :root {
        --bg: #ffffff;
        --surface: #ffffff;
        --heading: #333333;
        --text: #334155;          /* slate-700 */
        --text-muted: #64748b;    /* slate-500 / gray-500 */
        --text-subtle: #6b7280;   /* gray-500 */
        --border: #e2e8f0;        /* slate-200 */
        --border-dashed: #d1d5db; /* gray-300 — Newsletter card */
        --stripe: #9CA3AF;        /* gray-400, used at 0.4 opacity */
        --stripe-opacity: 0.4;
        --button-bg: #0f172a;     /* slate-900 */
        --button-fg: #ffffff;
        --button-bg-hover: #1e293b; /* slate-800 */
        --quote-text: #333333;
        --quote-rule: #e2e8f0;    /* gray-200 */
        --quote-attr: #6b7280;    /* gray-500 */
        --footer: #94a3b8;        /* slate-400 */
        --accent: ${t.accent};
        --accent-ink: ${t.accentInk};
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --bg: #0B0D10;
          --surface: #0E0D09;
          --heading: #EBEBEB;
          --text: #e2e8f0;          /* slate-200 */
          --text-muted: #989898;
          --text-subtle: #989898;
          --border: #333333;
          --border-dashed: #333333;
          --stripe: #9CA3AF;
          --stripe-opacity: 0.1;
          --button-bg: #ffffff;
          --button-fg: #0f172a;
          --button-bg-hover: #e2e8f0;
          --quote-text: #D4D4D4;
          --quote-rule: #333333;
          --quote-attr: #888888;
          --footer: #6b6b6b;
        }
      }

      * { box-sizing: border-box; }
      html, body { height: 100%; }
      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family: 'Instagram Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 16px;            /* matches app body */
        font-weight: 400;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      a { font-family: inherit; }
      button { font-family: inherit; }

      .shell {
        flex: 1 0 auto;
        width: 100%;
        max-width: 672px;           /* Tailwind max-w-2xl, matches Hero/Newsletter */
        margin: 0 auto;
        padding: 80px 16px 16px;    /* mirrors container px-4 + pt-20 from sections */
      }
      @media (min-width: 640px) {
        .shell { padding: 80px 24px 16px; }
      }

      /* Brand row, mirrors Hero name treatment with the accent square */
      .brand {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding-bottom: 16px;
      }
      .brand-mark {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: var(--heading);
        text-decoration: none;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: 0.2px;
      }
      .brand-square {
        width: 10px;
        height: 10px;
        background: #f6c400;
        border-radius: 2px;
        display: inline-block;
      }
      .brand-domain {
        color: var(--text-subtle);
        font-size: 11px;
        letter-spacing: 1.4px;
        text-transform: uppercase;
        text-decoration: none;
        font-weight: 500;
      }

      /* Section separator, identical token to Newsletter/Experience */
      .rule {
        height: 1px;
        background: var(--border);
        width: 100%;
      }

      /* Section eyebrow label — small caps, accent yellow */
      .label {
        margin: 28px 0 12px;
        font-size: 11px;
        line-height: 16px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--accent);
      }

      /* Page-level title. Matches Hero h1 size (text-2xl = 24px) plus
         a small step-up on wider viewports. Uses plain Instagram Sans
         to match the .font-instagram class applied across all section
         h1/h2 components (the headline cut is not loaded by the app). */
      h1 {
        margin: 0 0 12px;
        font-family: 'Instagram Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 24px;
        line-height: 30px;
        letter-spacing: -0.2px;
        font-weight: 700;
        color: var(--heading);
      }
      @media (min-width: 640px) {
        h1 { font-size: 28px; line-height: 34px; }
      }

      /* Lede paragraph, matches Hero bio (16px / leading-relaxed) */
      .lede {
        margin: 0 0 24px;
        color: var(--text);
        font-size: 16px;
        line-height: 26px;          /* ~leading-relaxed */
        font-weight: 400;
      }

      /* Dashed container, mirrors Newsletter subscribe card */
      .card {
        position: relative;
        border: 1px dashed var(--border-dashed);
        border-radius: 12px;
        padding: 20px;
        overflow: hidden;
      }
      @media (min-width: 640px) { .card { padding: 24px; } }
      .card::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: repeating-linear-gradient(
          -45deg,
          transparent 0,
          transparent 4px,
          var(--stripe) 4px,
          var(--stripe) 5px
        );
        opacity: var(--stripe-opacity);
        pointer-events: none;
      }
      .card-inner {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
      }
      /* Primary button mirrors bg-slate-900 / dark:bg-white, rounded-md, text-sm, font-medium */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px 20px;
        border-radius: 6px;         /* rounded-md */
        font-size: 14px;            /* text-sm */
        line-height: 20px;
        font-weight: 500;           /* font-medium */
        text-decoration: none;
        border: 1px solid transparent;
        transition: background 200ms ease, color 200ms ease, transform 200ms ease, border-color 200ms ease;
        white-space: nowrap;
      }
      .btn-primary {
        background: var(--button-bg);
        color: var(--button-fg);
      }
      .btn-primary:hover { background: var(--button-bg-hover); }
      .btn-ghost {
        background: transparent;
        color: var(--text-muted);
        border-color: var(--border);
      }
      .btn-ghost:hover { color: var(--heading); border-color: var(--text-muted); }
      .btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

      /* Card meta copy, sized to match secondary text in section cards */
      .meta {
        font-size: 14px;
        line-height: 22px;
        color: var(--text-subtle);
        font-weight: 400;
      }
      .meta strong {
        color: var(--heading);
        font-weight: 600;
      }

      /* Closing quote, mirrors the Newsletter quote block exactly */
      .quote { margin: 48px auto 0; text-align: center; }
      .quote-text {
        margin: 0 0 16px;
        font-size: 20px;            /* text-xl */
        line-height: 1.25;          /* leading-tight */
        font-weight: 400;
        font-style: italic;
        letter-spacing: normal;
        color: var(--quote-text);
      }
      @media (min-width: 640px) {
        .quote-text { font-size: 24px; }   /* sm:text-2xl */
      }
      .quote-attr {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;            /* matches Newsletter inline style */
        line-height: 20px;
        font-weight: 600;
        color: var(--quote-attr);
        letter-spacing: normal;
        text-transform: uppercase;
      }
      .quote-rule {
        width: 48px;                /* w-12 */
        height: 1px;
        background: var(--quote-rule);
      }

      footer.foot {
        padding: 24px 16px 32px;
        text-align: center;
        color: var(--footer);
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0.4px;
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <div class="brand">
        <a class="brand-mark" href="${SITE_URL}">
          <span class="brand-square" aria-hidden="true"></span>
          <span>Syed Omer Ali</span>
        </a>
        <a class="brand-domain" href="${SITE_URL}">syedomer.me</a>
      </div>
      <div class="rule" aria-hidden="true"></div>

      <p class="label">${escapeHtml(t.label)}</p>
      <h1>${escapeHtml(title)}</h1>
      <p class="lede">${message}</p>

      <div class="card">
        <div class="card-inner">
          <p class="meta">
            <strong>What happens next.</strong>
            Your address has been removed from the active list, so no further newsletter emails will be sent. If you ever change your mind, you can resubscribe from the homepage in seconds.
          </p>
          <div class="actions">
            <a class="btn btn-primary" href="${SITE_URL}">
              ${escapeHtml(ctaLabel)} <span aria-hidden="true">&rarr;</span>
            </a>
            <a class="btn btn-ghost" href="mailto:mohdsami038@gmail.com">Reply to me</a>
          </div>
        </div>
      </div>

      <section class="quote" aria-label="Closing note">
        <p class="quote-text">&ldquo;Do so much work that it would be unreasonable for you to not be successful.&rdquo;</p>
        <div class="quote-attr">
          <span class="quote-rule" aria-hidden="true"></span>
          <span>Syed Omer Ali</span>
          <span class="quote-rule" aria-hidden="true"></span>
        </div>
      </section>
    </main>

    <footer class="foot">&copy; ${new Date().getFullYear()} Syed Omer Ali · Hyderabad, India</footer>
  </body>
</html>`;
  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

async function handleUnsubscribe(token: string | null) {
  if (!token || token.length < 8) {
    return page({
      title: "This link looks broken",
      message:
        "The unsubscribe link is missing some pieces, so I cannot match it to a subscription. If the emails keep arriving, simply reply to one of them and I will remove you by hand.",
      tone: "error",
    });
  }

  await dbConnect();
  const sub = await Subscriber.findOne({ unsubscribeToken: token });
  if (!sub) {
    return page({
      title: "We could not match this link",
      message:
        "This link does not point to an active subscription. You may already be unsubscribed, or the link may have expired.",
      tone: "warn",
    });
  }

  if (sub.isActive) {
    sub.isActive = false;
    sub.unsubscribedAt = new Date();
    await sub.save();
    return page({
      title: "You are unsubscribed",
      message:
        "All set. You will not receive any further emails from this newsletter, and there are no hard feelings. Thanks for reading along.",
      tone: "success",
    });
  }

  return page({
    title: "Already unsubscribed",
    message:
      "You were already off the list, so nothing changed. You can always come back when there is something worth reading.",
    tone: "warn",
  });
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
