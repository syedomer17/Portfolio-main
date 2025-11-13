"use client";

import { useEffect, useRef } from "react";
import InfiniteMarquee from "vanilla-infinite-marquee";

export default function InfiniteTechMarquee({ children }: { children: React.ReactNode }) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = new InfiniteMarquee(marqueeRef.current, {
      speed: 0.17,        // adjust speed
      direction: "left",  // left → right OR right → left
      gap: 50,            // space between items
      pauseOnHover: false,
    });

    return () => marquee.destroy();
  }, []);

  return (
    <div
      ref={marqueeRef}
      className="overflow-hidden w-full"
      style={{
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}
