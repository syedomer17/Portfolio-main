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
}: {
  children: React.ReactNode;
}) {
  // 1. Get native scroll position
  const { scrollY } = useScroll();

  // 2. Initial setup vars
  const [pageHeight, setPageHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // 3. Physics configuration for "slow" and smooth feel
  // stiffness: Lower = "looser/slower" feel
  // damping: Higher = less oscillation
  // mass: Higher = "heavier" feel (slower acceleration/deceleration)
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
  }, [children]);

  return (
    <>
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 left-0 right-0 w-full flex flex-col will-change-transform z-0"
      >
        {children}
      </motion.div>
      
      {/* Ghost container to preserve scroll height */}
      <div style={{ height: pageHeight }} />
    </>
  );
}
