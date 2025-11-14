"use client";

import GlassCard from "./GlassCard";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experience = [
  {
    role: "AWS + DevOps Engineer",
    company: "Full Stack Academy",
    year: "2025 — Present",
    desc: "Designed and implemented CI/CD pipelines, containerized applications with Docker, and managed cloud infrastructure on AWS. Enhanced deployment speed and system monitoring.",
  },
  {
    role: "Frontend Developer",
    company: "The Hacking School",
    year: "2024 — 2025",
    desc: "Developed secure APIs, authentication flows, database services, and Docker-based deployments. Automated cloud workflows and improved reliability.",
  },
  {
    role: "Full Stack Developer",
    company: "Code for India",
    year: "2024 — 2025",
    desc: "Built production-ready web and backend systems with Next.js, Node.js, MongoDB, OAuth, and CI/CD tooling. Focused on authentication, performance, and scalable system architecture.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="container mx-auto section-spacing px-4">
      <div className="max-w-4xl mx-auto">

        <GlassCard className="p-10 sm:p-14 rounded-3xl">

          {/* Header */}
          <div className="mb-12 flex items-center gap-3">
            <Briefcase className="text-white/70" size={24} />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Experience
            </h2>
          </div>

          {/* Minimal timeline layout */}
          <div className="border-l border-white/10 pl-8 sm:pl-10 space-y-12">

            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.1 }}
                className="space-y-1.5"
              >
                {/* Role */}
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {exp.role}
                </h3>

                {/* Company + Year */}
                <p className="text-sm font-medium text-white/50">
                  {exp.company} • {exp.year}
                </p>

                {/* Description */}
                <p className="text-gray-300 text-[15px] sm:text-base leading-relaxed pt-2">
                  {exp.desc}
                </p>
              </motion.div>
            ))}

          </div>

        </GlassCard>
      </div>
    </section>
  );
}
