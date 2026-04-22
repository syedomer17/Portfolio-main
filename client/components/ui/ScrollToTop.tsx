"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const startY = window.scrollY;
    if (startY <= 0) return;

    const duration = Math.min(2000, Math.max(1200, startY * 0.8));
    const startTime = performance.now();
    // ease-in-out cubic: slow start, fast middle, slow finish — buttery smooth
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const y = startY * (1 - ease(progress));
      window.scrollTo(0, y);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-8 z-[9999]
        w-12 h-12 rounded-lg
        flex items-center justify-center
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        shadow-lg hover:shadow-xl
        text-slate-900 dark:text-white
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
        ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-5 pointer-events-none"
        }
      `}
      style={{
        backdropFilter: "blur(8px)",
      }}
    >
      <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
    </button>,
    document.body
  );
}
