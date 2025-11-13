"use client";

import GlassCard from "./GlassCard";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experience = [
  {
    role: "Full Stack Intern",
    company: "Code for India",
    year: "2025",
    desc: "Worked on production-ready systems using Next.js, Node.js, MongoDB, OAuth flows, CI/CD pipelines, and cloud deployments with a focus on authentication, scalability, and performance tuning.",
  },
  {
    role: "Backend Developer",
    company: "Freelance Work",
    year: "2024 — 2025",
    desc: "Built secure APIs, authentication systems, JWT flows, and database-driven services. Containerized applications with Docker and deployed to cloud environments with automated workflows.",
  },
  {
    role: "Student Developer",
    company: "Personal Projects",
    year: "2023 — Present",
    desc: "Explored full-stack engineering, DevOps, microservices, CI/CD, automation, and cloud-native architecture through hands-on projects and system design exploration.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="container mx-auto section-spacing px-4">
      <div className="max-w-4xl mx-auto">

        <GlassCard className="p-10 sm:p-14 rounded-3xl">

          {/* Header */}
          <div className="mb-10 flex items-center gap-3">
            <Briefcase className="text-purple-300" size={28} />
            <h2 className="text-3xl font-bold text-white tracking-tight">Experience</h2>
          </div>

          {/* Timeline Container */}
          <div className="relative pl-8 sm:pl-10">

            {/* Subtle line */}
            <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-[2px] bg-white/10"></div>

            <div className="space-y-12">
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="
                    absolute -left-7 sm:-left-8 top-1 w-3.5 h-3.5 
                    rounded-full bg-white/20 border border-white/40
                  " />

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">
                      {exp.role}
                    </h3>

                    <p className="text-sm font-medium text-purple-300">
                      {exp.company} • {exp.year}
                    </p>

                    <p className="text-gray-300 text-base leading-relaxed pt-1">
                      {exp.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </GlassCard>
      </div>
    </section>
  );
}
