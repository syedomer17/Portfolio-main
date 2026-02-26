import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,

  // StrictMode catches unsafe lifecycles, legacy API usage, and side-effect
  // bugs during rendering. Safe and recommended for production builds.
  reactStrictMode: true,

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
    const securityHeaders = [
      // NOTE: Content-Security-Policy is NOT set here.
      // It is applied per-request by middleware.ts using a fresh nonce +
      // strict-dynamic so that 'unsafe-inline' is never needed in script-src.

      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },

      {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
      },

      // Prevent this site's resources from being embedded by other origins.
      {
        key: "Cross-Origin-Resource-Policy",
        value: "same-origin",
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

      // Prevent the browser from preemptively resolving DNS for external links
      // on the page, which can leak visited-link information to DNS providers.
      {
        key: "X-DNS-Prefetch-Control",
        value: "off",
      },

      // Deny access to sensitive device APIs that this app does not need.
      // Each feature is explicitly set to () meaning "deny to all origins".
      // NOTE: interest-cohort is NOT included — FLoC was discontinued and
      // replaced by Topics API. Chrome no longer recognizes it.
      {
        key: "Permissions-Policy",
        value: [
          "camera=()",
          "microphone=()",
          "geolocation=()",
          "accelerometer=()",
          "gyroscope=()",
          "magnetometer=()",
          "payment=()",
          "usb=()",
          "display-capture=()",
          "fullscreen=(self)",
        ].join(", "),
      },
    ];

    return [
      // Apply security headers globally
      {
        source: "/:path*",
        headers: securityHeaders,
      },

      // Cache images
      {
        source: "/:path*\\.(png|jpg|jpeg|webp|avif|gif|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // Cache audio
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