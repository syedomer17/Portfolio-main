import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,

  // Enable StrictMode only in development
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
    const securityHeaders = [
      // NOTE: Content-Security-Policy is NOT set here.
      // It is applied per-request by middleware.ts using a fresh nonce so
      // that 'unsafe-inline' is never needed in script-src.

      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },

      {
        key: "Cross-Origin-Opener-Policy",
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

      {
        key: "Permissions-Policy",
        value:
          "camera=(), microphone=(), geolocation=(), interest-cohort=()",
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