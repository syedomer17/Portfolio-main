import { type NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Environment detection — Vercel sets VERCEL_ENV to 'production', 'preview',
// or 'development'. NODE_ENV is 'development' locally and 'production' on
// all Vercel deployments (including preview). We need both.
// ---------------------------------------------------------------------------
type Environment = "development" | "preview" | "production";

function getEnvironment(): Environment {
    if (process.env.NODE_ENV === "development") return "development";
    if (process.env.VERCEL_ENV === "preview") return "preview";
    return "production";
}

/**
 * Middleware-based dynamic Content Security Policy.
 *
 * Architecture:
 *  Three-tier CSP that adapts to the deployment environment:
 *
 *  PRODUCTION — Maximum strictness.
 *   • nonce + strict-dynamic (host allowlists ignored by modern browsers,
 *     kept as fallback for Safari < 15.4)
 *   • No unsafe-eval, no unsafe-inline for scripts
 *   • Trusted Types enforced
 *
 *  PREVIEW — Production-equivalent + Vercel Live toolbar.
 *   • Vercel injects scripts into preview deployments at the edge level
 *     without a nonce. These scripts load from vercel.live and connect to
 *     Vercel's feedback API. We add these origins to the allowlist. Note:
 *     the _inline_ script Vercel injects may still cause a CSP violation in
 *     Chrome because nonce presence causes 'unsafe-inline' to be ignored
 *     (CSP3 spec). This is expected and does not affect production.
 *
 *  DEVELOPMENT — Production-equivalent + unsafe-eval for source maps.
 *   • Webpack's eval-source-map devtool requires 'unsafe-eval'.
 *   • Turbopack does not need it, but it is a safe fallback.
 *
 * How strict-dynamic + nonce works:
 *  1. Only <script nonce="..."> tags execute.
 *  2. Those scripts can dynamically create child scripts (createElement),
 *     and the children inherit trust — this is the "dynamic" propagation.
 *  3. Modern browsers IGNORE 'self' and host allowlists when strict-dynamic
 *     is present. The allowlists remain only as fallback for legacy browsers
 *     that don't support strict-dynamic.
 *  4. Console violations for host sources in Chrome/Firefox are EXPECTED —
 *     they are informational. The scripts still load because they were
 *     created by a trusted (nonced) parent script via strict-dynamic.
 *
 * Trusted Types:
 *  require-trusted-types-for 'script' enforces that all DOM sink operations
 *  (innerHTML, script.src, eval) use Trusted* objects. React uses innerHTML
 *  during hydration, so layout.tsx creates a default passthrough policy
 *  before React boots. The 'trusted-types default' directive restricts
 *  policy creation to only the 'default' policy name.
 *
 * Note on ERR_BLOCKED_BY_CLIENT:
 *  This Chrome error indicates a browser extension (ad blocker) is blocking
 *  a request. It is NOT a CSP violation. Nothing in the CSP can fix it.
 */
// ---------------------------------------------------------------------------
// Social crawler detection — returns true when the User-Agent belongs to a
// known social platform bot. These crawlers only read HTML/meta tags and
// cannot benefit from CSP; skipping it for them lets OG images resolve.
// ---------------------------------------------------------------------------
function isSocialBot(userAgent: string): boolean {
    return /facebookexternalhit|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot/i.test(
        userAgent
    );
}

export function middleware(request: NextRequest) {
    const nonce = crypto.randomUUID().replace(/-/g, "");
    const env = getEnvironment();

    const ua = request.headers.get("user-agent") ?? "";

    // ---------------------------------------------------------------------------
    // Script host allowlists — kept as fallback for browsers that do not
    // support strict-dynamic. Modern browsers IGNORE these when
    // strict-dynamic is present; scripts work via trust propagation instead.
    // ---------------------------------------------------------------------------
    const scriptHosts = [
        "https://www.googletagmanager.com",     // GTM / GA loader
        "https://pagead2.googlesyndication.com", // Google Adsense
        "https://va.vercel-scripts.com",         // Vercel Analytics
        "https://cdn.databuddy.cc",              // Databuddy
    ];

    // Preview/dev: Vercel Live toolbar injects scripts from vercel.live.
    if (env !== "production") {
        scriptHosts.push("https://vercel.live");
    }

    // ---------------------------------------------------------------------------
    // Connect origins for fetch / XHR / WebSocket.
    // ---------------------------------------------------------------------------
    const connectHosts = [
        "https://www.google-analytics.com",
        "https://analytics.google.com",
        "https://stats.g.doubleclick.net",
        "https://googleads.g.doubleclick.net",
        "https://api.databuddy.cc",
        "https://basket.databuddy.cc",
        "https://vitals.vercel-insights.com",
    ];

    if (env !== "production") {
        connectHosts.push("https://vercel.live");
    }

    // ---------------------------------------------------------------------------
    // Frame sources for iframes.
    // ---------------------------------------------------------------------------
    const frameHosts = [
        "https://googleads.g.doubleclick.net",
        "https://tpc.googlesyndication.com",
    ];

    if (env !== "production") {
        frameHosts.push("https://vercel.live");
    }

    // ---------------------------------------------------------------------------
    // Dev-only: allow eval() for Webpack's eval-source-map devtool.
    // ---------------------------------------------------------------------------
    const evalPolicy = env === "development" ? " 'unsafe-eval'" : "";

    // ---------------------------------------------------------------------------
    // Build the CSP.
    //
    // IMPORTANT: script-src-elem is intentionally NOT set separately.
    // When script-src-elem is present, some browsers handle strict-dynamic
    // trust propagation inconsistently between script-src and script-src-elem.
    // Omitting script-src-elem means script-src governs all <script> elements,
    // which is the most reliable configuration for strict-dynamic.
    // ---------------------------------------------------------------------------
    const csp = [
        "default-src 'self'",

        // Scripts: nonce + strict-dynamic. Host allowlists are fallback only.
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${evalPolicy} ${scriptHosts.join(" ")}`,

        // Event-handler attributes (onclick etc.) — disallow entirely.
        "script-src-attr 'none'",

        // Styles: unsafe-inline required for Tailwind/CSS-in-JS.
        // fonts.googleapis.com serves Google Fonts CSS at runtime.
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "style-src-attr 'unsafe-inline'",

        // Images — https: is broad but necessary for external images
        // (GitHub avatars, Unsplash, etc.). Not a script execution vector.
        "img-src 'self' data: blob: https:",

        // Fonts — fonts.gstatic.com serves font files loaded by Google Fonts.
        "font-src 'self' data: https://fonts.gstatic.com",

        // Fetch / XHR / WebSocket
        `connect-src 'self' ${connectHosts.join(" ")}`,

        // Media
        "media-src 'self'",

        // Iframes
        `frame-src 'self' ${frameHosts.join(" ")}`,

        // Hard restrictions
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",

        // Trusted Types:
        //  'default'       — our passthrough policy (layout.tsx) for React's innerHTML
        //  'goog#html'     — Google GTM/GA/Ads internal DOM manipulation policy
        //  'goog#html#bo'  — GTM sandboxed script execution variant
        //  'goog#script_url' — Google script URL creation (used by Ads/GTM)
        //
        // SECURITY NOTE: These goog#* policies are Google-internal. By allowing
        // them you are trusting Google's policy implementations, which are
        // proprietary code running in your page. This is an inherent supply-chain
        // tradeoff — the same trust exists the moment you load GTM at all.
        // Blocking them causes: "goog#html blocked by your Trusted Types policy".
        "trusted-types default goog#html goog#html#bo goog#script_url",
        "require-trusted-types-for 'script'",
    ].join("; ");

    // ---------------------------------------------------------------------------
    // Pass nonce to layout.tsx via request header.
    // ---------------------------------------------------------------------------
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });

    // Only attach CSP for real users — social crawlers skip it so OG images load.
    if (!isSocialBot) {
        response.headers.set("Content-Security-Policy", csp);
    }

    return response;
}

/**
 * Apply middleware to all pages and API routes.
 * Exclude static assets to avoid pointless Edge invocations.
 */
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|woff2?|mp3|wav|aac|m4a)).*)",
    ],
};
