import localFont from "next/font/local";

/**
 * Instagram Sans font configuration using next/font/local
 * Optimized with WOFF2 format for better performance
 * 
 * Included weights:
 * - 400: Regular (default)
 * - 500: Medium
 * - 700: Bold
 */
export const instagramSans = localFont({
  src: [
    {
      path: "../public/fonts/new/Instagram Sans.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/new/Instagram Sans Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/new/Instagram Sans Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-instagram",
  display: "swap",
  preload: true,
});
