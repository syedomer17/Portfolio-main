"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import SmoothScroll from "../ui/SmoothScroll";

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
 * Features are configured to avoid blocking initial render or causing remounts.
 * 
 * Features loaded here:
 * - SmoothScroll: Component-based smooth scrolling (stable hierarchy)
 * - Toaster: Toast notifications container (lazy-loaded state)
 */
export function LazyProvidersLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Interactive additions can load after page structure is stable
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => setIsReady(true), { timeout: 1000 });
    } else {
      setIsReady(true);
    }
  }, []);

  return (
    <>
      <SmoothScroll isEnabled={isReady}>
        {children}
      </SmoothScroll>
      {isReady && <Toaster position="top-right" />}
    </>
  );
}


/**
 * Separate lazy provider for analytics libraries.
 * These are loaded after page idle to avoid blocking main thread.
 * 
 * Features:
 * - Databuddy: User analytics and event tracking
 * - Vercel Analytics: Web Vitals and performance monitoring
 * - Google Analytics & Adsense: Loaded lazily to improve performance
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
      {/* Google Analytics - Placeholder ID */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>

      {/* Google Adsense - Placeholder ID */}
      <Script
        id="google-adsense"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
      />

      <DatabuddyComponent />
      <AnalyticsComponent />
    </>
  );
}
