"use client";

import GlassCard from "./GlassCard";
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
      <div style={{ maxWidth: 1100 }} className="mx-auto">
        <GlassCard>
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            Tech Stack ⚡
          </h2>

          <div className="mt-10 w-full overflow-hidden">
            <InfiniteTechMarquee>
              {techList.map((tech, index) => (
                <span key={index} className="tech-pill mx-6">
                  {tech}
                </span>
              ))}
            </InfiniteTechMarquee>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
