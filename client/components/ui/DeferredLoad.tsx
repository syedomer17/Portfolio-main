"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface DeferredLoadProps {
  children: ReactNode;
  placeholder: ReactNode;
  delay?: number;
  triggerOnVisible?: boolean;
}

/**
 * DeferredLoad - Defers rendering of children until:
 * 1. Component is visible in viewport (if triggerOnVisible)
 * 2. Page is idle + additional delay
 * 
 * Use for below-the-fold components that shouldn't block LCP
 */
export default function DeferredLoad({
  children,
  placeholder,
  delay = 3500,
  triggerOnVisible = true,
}: DeferredLoadProps) {
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerOnVisible) {
      // Just use idle callback + delay
      const idleId =
        typeof window !== "undefined" && window.requestIdleCallback
          ? window.requestIdleCallback(() => {
              const timer = setTimeout(() => setIsReady(true), delay);
              return () => clearTimeout(timer);
            }, { timeout: delay + 1000 })
          : window.setTimeout(() => setIsReady(true), delay);

      return () => {
        if (typeof window !== "undefined" && window.cancelIdleCallback) {
          window.cancelIdleCallback(idleId as number);
        } else {
          clearTimeout(idleId as number);
        }
      };
    }

    // Use Intersection Observer for visibility + idle callback
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, triggerOnVisible]);

  // Once visible (or after initial delay), wait for idle
  useEffect(() => {
    if (!isVisible && triggerOnVisible) return;

    const idleId =
      typeof window !== "undefined" && window.requestIdleCallback
        ? window.requestIdleCallback(() => setIsReady(true), {
            timeout: 4000,
          })
        : window.setTimeout(() => setIsReady(true), 500);

    return () => {
      if (typeof window !== "undefined" && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId as number);
      } else {
        clearTimeout(idleId as number);
      }
    };
  }, [isVisible, triggerOnVisible]);

  return (
    <div ref={ref}>
      {isReady ? children : placeholder}
    </div>
  );
}
