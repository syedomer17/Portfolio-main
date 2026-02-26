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
 *  3. Build the CSP string using that nonce.
 *  4. Attach Content-Security-Policy to the response.
 *
 * Note on require-trusted-types-for 'script':
 *  This directive is intentionally omitted. React/Next.js uses innerHTML
 *  internally during hydration and does not implement a TrustedHTML policy.
 *  Adding this directive causes an immediate runtime TypeError regardless
 *  of nonce presence. The nonce approach already eliminates 'unsafe-inline'
 *  which is the real Lighthouse CSP penalty.
 */
export function middleware(request: NextRequest) {
    // Generate a fresh nonce for every request.
    // randomUUID() returns a string like "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".
    // We strip dashes for a slightly shorter nonce attribute value.
    const nonce = crypto.randomUUID().replace(/-/g, "");

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
        "https://vitals.vercel-insights.com",
    ].join(" ");

    // ---------------------------------------------------------------------------
    // Build the CSP.
    // ---------------------------------------------------------------------------
    const csp = [
        "default-src 'self'",

        // Inline scripts and first-party JS allowed via nonce ONLY.
        // next/script tags with strategy="afterInteractive" also receive the nonce
        // automatically from Next.js when it is present in the response headers.
        `script-src 'self' 'nonce-${nonce}' ${scriptAllowList}`,
        `script-src-elem 'self' 'nonce-${nonce}' ${scriptAllowList}`,

        // Event-handler attributes (onclick etc.) — disallow entirely.
        "script-src-attr 'none'",

        // Tailwind/CSS-in-JS needs unsafe-inline for styles.
        // Hashing every generated utility class is not feasible.
        "style-src 'self' 'unsafe-inline'",
        "style-src-attr 'unsafe-inline'",

        // Images
        "img-src 'self' data: blob: https:",

        // Fonts
        "font-src 'self' data:",

        // Fetch / XHR / WebSocket
        `connect-src 'self' ${connectAllowList}`,

        // Media for audio files served from /audio/
        "media-src 'self'",

        // Allow Google Ads iframes
        "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",

        // Hard security restrictions
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
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
