"use client";

import Marquee from "react-fast-marquee";

export default function InfiniteTechMarquee({ children }: { children: React.ReactNode }) {
  return (
    <Marquee
      gradient={false}
      speed={45}
      pauseOnHover={false}
      direction="left"
      className="w-full flex items-center"
    >
      {children}
    </Marquee>
  );
}
