"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";

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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="container mx-auto px-4 sm:px-6 pt-6">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[18.4px] leading-[23px] font-bold mt-2 mb-3 text-[#333333] dark:text-[#EBEBEB]"
          style={{ fontFamily: '"Instagram Sans", sans-serif' }}
        >
          Experiences
        </motion.h2>
        <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-4" />

        {/* Experience Cards */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="border-t border-slate-200/50 dark:border-[#2A2A2A] first:border-t-0"
            >
              {/* Card Header - Always Visible */}
              <button
                onClick={() => toggleExpand(index)}
                className="w-full py-4 sm:py-5 flex items-center gap-4 transition-colors group"
              >
                {/* Company Logo */}
                <div className="shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center overflow-hidden">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                    />
                  </div>
                </div>

                {/* Company Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <h3
                      className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white"
                      style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                    >
                      {exp.company}
                    </h3>
                    {/* Show Full Time badge only when expanded */}
                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="px-2 py-0.5 text-xs font-medium bg-transparent text-[#70717B] dark:text-[#989898] rounded border border-slate-300 dark:border-[#3A3A3A]"
                        >
                          {exp.type}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <p
                    className="text-sm leading-5 font-normal text-[#70717B] dark:text-[#989898]"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    {exp.role}
                  </p>
                </div>

                {/* Date & Location + Chevron */}
                <div className="shrink-0 flex items-center gap-3">
                  <div className="text-right">
                    <p
                      className="text-sm leading-5 font-medium text-[#333333] dark:text-[#EBEBEB]"
                      style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                    >
                      {exp.period}
                    </p>
                    <p
                      className="text-md text-[#70717B] dark:text-[#989898]"
                      style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                    >
                      {exp.location}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400 dark:text-slate-500 hover:dark:text-[#EBEBEB] -mt-[1.5px]"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </button>

              {/* Expandable Content */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pl-0 sm:pl-0">
                      {/* Achievements */}
                      {exp.achievements.length > 0 && (
                        <ul className="space-y-2 mb-4">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="text-sm text-slate-600 dark:text-slate-300 flex gap-2"
                              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                            >
                              <span className="text-[#424242] dark:text-[#D4D4D4] mt-0.5">•</span>
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
                              className="px-2.5 py-0.5 text-xs leading-4 font-normal bg-transparent text-[#424242] dark:text-[#D4D4D4] rounded border border-slate-300 dark:border-[#3A3A3A]"
                              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Empty state for cards without content */}
                      {exp.achievements.length === 0 && exp.tags.length === 0 && (
                        <p
                          className="text-sm text-slate-400 dark:text-slate-500 italic"
                          style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                        >
                          More details coming soon...
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-md text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            View All
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
