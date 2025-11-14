"use client";

import GlassCard from "./GlassCard";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    school: "Methodist College of Engineering & Technology",
    year: "2024 — 2028",
    desc: "Focused on computer science fundamentals, machine learning, algorithms, and modern software engineering practices.",
  },
  {
    degree: "Intermediate (MPC)",
    school: "Shaheen Junior College",
    year: "2022 — 2024",
    desc: "Completed intermediate studies with a strong foundation in mathematics and problem-solving.",
  },
  {
    degree: "Schooling (Class 1–10)",
    school: "Kendriya Vidyalaya",
    year: "2012 — 2022",
    desc: "Built strong academic fundamentals, communication, discipline, and early exposure to computers and technology.",
  },
];

export default function Education() {
  return (
    <section id="education" className="container mx-auto section-spacing px-4">
      <div className="max-w-4xl mx-auto">

        <GlassCard className="p-10 sm:p-14 rounded-3xl">

          {/* Header */}
          <div className="mb-12 flex items-center gap-3">
            <GraduationCap className="text-white/70" size={24} />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Education
            </h2>
          </div>

          {/* Minimal Timeline */}
          <div className="border-l border-white/10 pl-8 sm:pl-10 space-y-12">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.1 }}
                className="space-y-1.5"
              >
                {/* Degree */}
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {edu.degree}
                </h3>

                {/* School + Year */}
                <p className="text-sm font-medium text-white/50">
                  {edu.school} • {edu.year}
                </p>

                {/* Description */}
                <p className="text-gray-300 text-[15px] sm:text-base leading-relaxed pt-2">
                  {edu.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </GlassCard>
      </div>
    </section>
  );
}
