"use client";
import GlassCard from "./GlassCard";
import Stagger from "./Stagger";
import { motion } from "framer-motion";

export default function Projects() {
  const items = [
    { title: "GitHub Gist Manager", stack: "Next.js + MongoDB + OAuth" },
    { title: "AI Resume Builder", stack: "Next.js + Gemini AI" },
    { title: "OAuth Auth System", stack: "NestJS + Fastify" },
    { title: "DevOps Pipelines", stack: "Jenkins CI/CD + Docker" },
  ];

  return (
    <div className="container-xl mx-auto section-spacing">
      <div style={{ maxWidth: 1100 }} className="mx-auto">
        <GlassCard>
          <h2 className="text-2xl font-semibold text-purple-300 mb-6">
            Projects 🚀
          </h2>

          <div className="flex flex-col gap-4">
            <Stagger>
              {items.map((p) => (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <div className="inner-panel">
                    <h3 className="text-white">{p.title}</h3>
                    <p className="text-gray-400">{p.stack}</p>
                  </div>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
