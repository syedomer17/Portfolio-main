"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";

/**
 * Minimal client boundary for theme provider only.
 * This is the ONLY global client wrapper to reduce hydration overhead.
 */
export default function ThemeProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
