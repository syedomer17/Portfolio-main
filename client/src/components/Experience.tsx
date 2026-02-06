"use client";

import { motion } from "framer-motion";
import { Badge } from "./ui/badge";

const experiences = [
  {
    company: "Meta Inc.",
    role: "Software Engineer",
    type: "Full Time",
    location: "Palo Alto, USA - Remote",
    period: "Aug, 2025 - Present",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/120px-Meta_Platforms_Inc._logo.svg.png",
    achievements: [
      "Owned the core presentation editor, driving major performance and reliability improvements",
      "Designed and built core editor features like drag-and-drop, resize, and keyboard shortcuts end-to-end",
      "Owned a foundational refactor, strengthening a critical codebase to enable safer and faster production",
      "Drove major Drive page performance improvements, resolving bugs to deliver faster, reliable experiences",
    ],
    tags: ["Next", "Tailwind", "TypeScript", "JavaScript", "Express", "PostgreSQL", "Docker"],
  },
  {
    company: "GSoC",
    role: "Full Stack Developer",
    type: "Contract",
    location: "USA - Remote",
    period: "May, 2025 - Nov, 2025",
    logo: "https://developers.google.com/static/open-source/gsoc/resources/downloads/GSoC-Vertical.svg",
    achievements: [],
    tags: [],
  },
  {
    company: "OWASP",
    role: "Open Source Contributor",
    type: "Contract",
    location: "USA - Remote",
    period: "Feb, 2025 - May, 2025",
    logo: "https://owasp.org/assets/images/logo.png",
    achievements: [],
    tags: [],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-slate-900 dark:text-white"
        >
          Experiences
        </motion.h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all hover:shadow-lg"
            >
              <div className="flex gap-4">
                {/* Company Logo */}
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center overflow-hidden">
                    <img src={exp.logo} alt={exp.company} className="w-10 h-10 object-contain" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                        {exp.company}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">{exp.role}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <Badge variant="secondary" className="mb-2">
                        {exp.type}
                      </Badge>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{exp.period}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{exp.location}</p>

                  {/* Achievements */}
                  {exp.achievements.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Tags */}
                  {exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          <button className="px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors flex items-center gap-2">
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
