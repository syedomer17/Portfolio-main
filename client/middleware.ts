import { type NextRequest, NextResponse } from "next/server";

/**
 * Middleware-based dynamic Content Security Policy.
 *
 * Why middleware and not next.config.ts headers?
 * Static headers cannot contain per-request nonces. A nonce must be
 * cryptographically fresh on every response so that 'unsafe-inline' is
 * never needed. Middleware runs on the Vercel Edge Runtime where
 * crypto.randomUUID() is available without any import.
 *
 * Flow:
 *  1. Generate nonce.
 *  2. Set x-nonce request header → layout.tsx reads it via next/headers.
 *  3. Build the CSP string using that nonce + strict-dynamic.
 *  4. Attach Content-Security-Policy to the response.
 *
 * strict-dynamic:
 *  Allows nonced scripts to propagate trust to dynamically loaded child
 *  scripts (e.g. GTM, Vercel Analytics). Modern browsers ignore 'self' and
 *  host allowlists when strict-dynamic is present; the allowlists remain
 *  as fallback for Safari < 15.4 and other legacy browsers.
 *
 * Trusted Types:
 *  require-trusted-types-for 'script' enforces that all DOM sink operations
 *  (innerHTML, script.src, eval, etc.) use TrustedHTML/TrustedScript/
 *  TrustedScriptURL objects instead of raw strings. React uses innerHTML
 *  during hydration, so layout.tsx creates a default passthrough policy
 *  that runs before React boots. This policy:
 *   - Satisfies the browser's Trusted Types enforcement
 *   - Establishes a single audit point for all DOM sink operations
 *   - Blocks third-party scripts from creating arbitrary policies
 *  The 'trusted-types default' directive restricts which policies can
 *  be created — only 'default' is allowed.
 *
 * Dev vs Prod:
 *  'unsafe-eval' is included ONLY in development for Webpack source-maps.
 *  It is never present in production builds.
 */
export function middleware(request: NextRequest) {
    // Generate a fresh nonce for every request.
    // randomUUID() returns a string like "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".
    // We strip dashes for a slightly shorter nonce attribute value.
    const nonce = crypto.randomUUID().replace(/-/g, "");

    // Allow eval() only in development mode for Webpack devtool source-maps.
    // Turbopack does not need this, but it is a safe fallback.
    const isDev = process.env.NODE_ENV === "development";
    const evalPolicy = isDev ? " 'unsafe-eval'" : "";

    // ---------------------------------------------------------------------------
    // Allowed external script origins (no broad https: fallback).
    // ---------------------------------------------------------------------------
    const scriptAllowList = [
        "https://www.googletagmanager.com",  // Google Analytics loader
        "https://pagead2.googlesyndication.com", // Google Adsense
        "https://va.vercel-scripts.com",     // Vercel Analytics
        "https://cdn.databuddy.cc",          // Databuddy
    ].join(" ");

    // ---------------------------------------------------------------------------
    // Allowed external connect origins for fetch/XHR calls.
    // ---------------------------------------------------------------------------
    const connectAllowList = [
        "https://www.google-analytics.com",
        "https://analytics.google.com",
        "https://stats.g.doubleclick.net",
        "https://googleads.g.doubleclick.net",
        "https://api.databuddy.cc",
        "https://basket.databuddy.cc",   // Databuddy vitals + batch endpoint
        "https://vitals.vercel-insights.com",
    ].join(" ");

    // ---------------------------------------------------------------------------
    // Build the CSP.
    // ---------------------------------------------------------------------------
    const csp = [
        "default-src 'self'",

        // Scripts allowed via nonce + strict-dynamic trust propagation.
        // 'self' and host allowlists are kept as fallback for browsers that
        // do not support strict-dynamic (they are ignored by modern browsers).
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${evalPolicy} ${scriptAllowList}`,
        `script-src-elem 'self' 'nonce-${nonce}' 'strict-dynamic'${evalPolicy} ${scriptAllowList}`,

        // Event-handler attributes (onclick etc.) — disallow entirely.
        "script-src-attr 'none'",

        // Tailwind/CSS-in-JS needs unsafe-inline for styles.
        // Hashing every generated utility class is not feasible.
        // fonts.googleapis.com serves Google Fonts CSS at runtime.
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "style-src-attr 'unsafe-inline'",

        // Images
        "img-src 'self' data: blob: https:",

        // Fonts — fonts.gstatic.com serves the actual font files loaded by
        // Google Fonts CSS from fonts.googleapis.com.
        "font-src 'self' data: https://fonts.gstatic.com",

        // Fetch / XHR / WebSocket
        `connect-src 'self' ${connectAllowList}`,

        // Media for audio files served from /audio/
        "media-src 'self'",

        // Allow Google Ads iframes + Vercel toolbar (preview deployments)
        "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://vercel.live",

        // Hard security restrictions
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",

        // Trusted Types — only allow the 'default' policy (created in
        // layout.tsx before React hydrates). All other policy names are
        // blocked, preventing third-party scripts from creating their own.
        "trusted-types default",
        "require-trusted-types-for 'script'",
    ].join("; ");

    // ---------------------------------------------------------------------------
    // Clone the request with the nonce as a header so layout.tsx can read it.
    // ---------------------------------------------------------------------------
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });

    // Attach CSP to the response.
    response.headers.set("Content-Security-Policy", csp);

    return response;
}

/**
 * Apply this middleware to all pages and API routes.
 * Exclude static assets that do not need CSP (/_next/static, /favicon, etc.)
 * to avoid pointless Edge invocations on every image/font request.
 */
export const config = {
    matcher: [
        /*
         * Match all request paths EXCEPT:
         * - _next/static  (static files)
         * - _next/image   (image optimisation)
         * - favicon.ico   (browser tab icon)
         * - Public assets: .png .jpg .jpeg .webp .avif .svg .woff2 .woff .mp3
         */
        "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|woff2?|mp3|wav|aac|m4a)).*)",
    ],
};
