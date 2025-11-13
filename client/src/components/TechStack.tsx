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
    <div className="container-xl mx-auto section-spacing">
      <div className="mx-auto max-w-5xl">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 
                        rounded-3xl shadow-2xl p-10 relative overflow-hidden">

          <h2 className="text-3xl font-semibold text-blue-300 mb-8 flex items-center gap-2">
            Tech Stack ⚡
          </h2>

          {/* Marquee Section */}
          <InfiniteTechMarquee>
            {techList.map((tech, index) => (
              <span
                key={index}
                tabIndex={0}
                aria-label={tech}
                className="tech-pill mx-6"
              >
                {tech}
              </span>
            ))}
          </InfiniteTechMarquee>
        </div>
      </div>
    </div>
  );
}
