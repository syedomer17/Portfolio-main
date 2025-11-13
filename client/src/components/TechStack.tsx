"use client";

import InfiniteTechMarquee from "./InfiniteTechMarquee";

const techList = [
  "JavaScript",
  "TypeScript",
  "MongoDB",
  "Express",
  "React",
  "Node.js",
  "Next.js",
  "Docker",
  "Linux",
  "CI/CD",
];

export default function TechStack() {
  return (
    <section className="container mx-auto section-spacing px-4">
      <div className="max-w-6xl mx-auto">

        {/* Outer Clean Card */}
        <div
          className="
            relative rounded-2xl p-10
            bg-gradient-to-br from-white/5 to-white/2
            border border-white/10 
            backdrop-blur-xl 
            shadow-[0_8px_40px_rgba(0,0,0,0.45)]
            overflow-hidden
          "
        >

          {/* Faded edges (very subtle designer touch) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/40 to-transparent" />

          {/* Title */}
          <h2 className="text-3xl font-semibold text-blue-300 mb-8 tracking-tight">
            Tech Stack ⚡
          </h2>

          {/* Marquee */}
          <div className="py-3">
            <InfiniteTechMarquee>
              {techList.map((tech, index) => (
                <span
                  key={index}
                  className="
                    mx-8 px-5 py-2
                    rounded-xl
                    text-gray-200 font-medium text-sm
                    bg-white/5 
                    border border-white/10
                    backdrop-blur-md
                    shadow-[inset_0_0_6px_rgba(255,255,255,0.04)]
                    hover:bg-white/10 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]
                    transition-all duration-300 select-none
                  "
                >
                  {tech}
                </span>
              ))}
            </InfiniteTechMarquee>
          </div>
        </div>
      </div>
    </section>
  );
}
