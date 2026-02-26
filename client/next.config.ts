import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  // Only enable StrictMode in development for catching bugs
  // Disable in production to prevent unnecessary double renders
  reactStrictMode: process.env.NODE_ENV === "development",
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "react-icons/fa",
      "react-icons/fa6",
      "react-icons/hi",
      "react-icons/si",
      "lucide-react",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75],
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    // ── Security headers applied to all routes ──
    const securityHeaders = [
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://va.vercel-scripts.com https://*.databuddy.io",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https://github.com https://images.unsplash.com https://*.google-analytics.com https://*.googletagmanager.com",
          "font-src 'self'",
          "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://pagead2.googlesyndication.com https://va.vercel-scripts.com https://*.databuddy.io https://vitals.vercel-insights.com",
          "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
          "upgrade-insecure-requests",
        ].join("; "),
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
      },
      {
        key: "Cross-Origin-Embedder-Policy",
        value: "unsafe-none",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-Frame-Options",
        value: "DENY",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];

    return [
      // Security headers on all routes
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // Cache-control for images
      {
        source: "/:path*\\.(png|jpg|jpeg|webp|avif|gif|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache-control for audio
      {
        source: "/:path*/audio/:path*\\.(mp3|wav|m4a|aac|ogg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
