"use client";

import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";

export default function SmoothScroll({
  children,
  isEnabled = true,
}: {
  children: React.ReactNode;
  isEnabled?: boolean;
}) {
  // 1. Get native scroll position
  const { scrollY } = useScroll();

  // 2. Initial setup vars
  const [pageHeight, setPageHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // 3. Physics configuration for "slow" and smooth feel
  const physics = {
    damping: 15,
    mass: 0.2,
    stiffness: 50
  };

  const smoothY = useSpring(scrollY, physics);

  // Create a negative transform to move content up as we scroll down
  const y = useTransform(smoothY, (value) => -value);

  // 4. Resize observer to sync dummy container with real content height
  useEffect(() => {
    if (!isEnabled) return;

    const handleResize = () => {
      if (contentRef.current) {
        setPageHeight(contentRef.current.scrollHeight);
      }
    };

    // Initial and window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Observer for content changes
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [children, isEnabled]);

  return (
    <>
      <motion.div
        ref={contentRef}
        style={{ y: isEnabled ? y : 0 }}
        className={isEnabled ? "fixed top-0 left-0 right-0 w-full flex flex-col will-change-transform z-0" : "w-full flex flex-col"}
      >
        {children}
      </motion.div>

      {/* Ghost container to preserve scroll height */}
      {isEnabled && <div style={{ height: pageHeight }} />}
    </>
  );
}
