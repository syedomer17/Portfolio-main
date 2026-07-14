"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import SmoothScroll from "../ui/SmoothScroll";

const DatabuddyComponent = dynamic(() => import("./DatabuddyLoader"), {
  ssr: false,
});

const AnalyticsComponent = dynamic(() => import("./AnalyticsLoader"), {
  ssr: false,
});

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
      {isReady ? (
        <SmoothScroll isEnabled={isReady}>{children}</SmoothScroll>
      ) : (
        children
      )}
      {isReady && (
        <Toaster
          position="top-right"
          gutter={10}
          containerStyle={{ top: 20, right: 20 }}
          toastOptions={{
            duration: 4000,
            className: "modern-toast",
            success: {
              className: "modern-toast toast-success",
              iconTheme: { primary: "#34d399", secondary: "#ffffff" },
              ariaProps: { role: "status", "aria-live": "polite" },
            },
            error: {
              className: "modern-toast toast-error",
              iconTheme: { primary: "#ef4444", secondary: "#ffffff" },
              ariaProps: { role: "alert", "aria-live": "assertive" },
            },
            loading: {
              className: "modern-toast toast-loading",
              iconTheme: { primary: "#f6c400", secondary: "#ffffff" },
            },
          }}
        />
      )}
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
 * - Google Analytics: Loaded lazily to improve performance
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

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {gaId && (
        <>
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="google-analytics-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      <DatabuddyComponent />
      <AnalyticsComponent />
    </>
  );
}
