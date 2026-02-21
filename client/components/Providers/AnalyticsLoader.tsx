"use client";

import { Analytics } from "@vercel/analytics/next";

/**
 * Vercel Analytics component
 * Loaded separately to avoid blocking main bundle
 */
export default function AnalyticsLoader() {
  try {
    return <Analytics />;
  } catch (error) {
    console.log("Vercel Analytics failed to load:", error);
    return null;
  }
}
