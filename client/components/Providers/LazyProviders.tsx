"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import MountGuard from "../ui/MountGuard";

// Dynamically import heavy features to avoid bundle bloat
const SmoothScroll = dynamic(() => import("../ui/SmoothScroll"), { 
  ssr: false,
  loading: () => <>{/* Placeholder while SmoothScroll loads */}</> 
});

const DatabuddyComponent = dynamic(
  () => import("./DatabuddyLoader"),
  { ssr: false }
);

const AnalyticsComponent = dynamic(
  () => import("./AnalyticsLoader"),
  { ssr: false }
);

/**
 * Lazy provider loader for non-critical global features.
 * These features are deferred until after page is interactive.
 * 
 * Features loaded here:
 * - MountGuard: Prevents SSR/hydration mismatches
 * - SmoothScroll: Smooth scroll behavior (lazy-loaded to avoid blocking initial render)
 * - Toaster: Toast notifications container
 * - Analytics: Loaded separately via useEffect
 */
export function LazyProvidersLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load after first paint to avoid blocking initial render
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => setIsReady(true), { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      const timer = setTimeout(() => setIsReady(true), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <MountGuard>
      {isReady && <SmoothScroll>{children}</SmoothScroll>}
      {!isReady && children}
      {isReady && <Toaster position="top-right" />}
    </MountGuard>
  );
}

/**
 * Separate lazy provider for analytics libraries.
 * These are loaded after page idle to avoid blocking main thread.
 * 
 * Features:
 * - Databuddy: User analytics and event tracking
 * - Vercel Analytics: Web Vitals and performance monitoring
 */
export function LazyAnalyticsProviders() {
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    // Load analytics after page is idle and interactive
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => setShowAnalytics(true), { timeout: 3000 });
    } else {
      // Fallback: load after brief delay
      const timer = setTimeout(() => setShowAnalytics(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showAnalytics) return null;

  return (
    <>
      <DatabuddyComponent />
      <AnalyticsComponent />
    </>
  );
}
