"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { experiences } from "../../data/experiences";

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
          className="text-[18.4px] leading-5.75 font-bold mt-2 mb-3 text-[#333333] dark:text-[#EBEBEB]"
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
                className="w-full py-4 sm:py-5 flex items-start gap-2 sm:gap-4 transition-colors group"
              >
                {/* Company Logo */}
                <div className="shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700/70 flex items-center justify-center overflow-hidden shadow-sm">
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      className="w-full h-full object-cover"
                      width={56}
                      height={56}
                      sizes="56px"
                    />
                  </div>
                </div>

                {/* Company Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3
                      className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white truncate"
                      style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                      title={exp.company}
                    >
                      {exp.company}
                    </h3>
                    {/* Type Badge - Always Visible */}
                    <span
                      className="shrink-0 px-1.5 py-0.5 sm:px-2 text-[10px] sm:text-xs font-medium bg-transparent text-[#70717B] dark:text-[#989898] rounded border border-slate-300 dark:border-[#3A3A3A]"
                    >
                      {exp.type}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-5 font-normal text-[#70717B] dark:text-[#989898]"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    {exp.role}
                  </p>
                </div>

                {/* Date & Location + Chevron */}
                <div className="shrink-0 flex items-center gap-1.5 sm:gap-3 pt-1">
                  <div className="text-right">
                    <p
                      className="text-xs sm:text-sm leading-5 font-medium text-[#333333] dark:text-[#EBEBEB]"
                      style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                    >
                      {exp.period}
                    </p>
                    <p
                      className="text-xs sm:text-sm text-[#70717B] dark:text-[#989898]"
                      style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                    >
                      {exp.location}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400 dark:text-slate-500 hover:dark:text-[#EBEBEB] -mt-[1.5px] hidden sm:block"
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

                      <div className="mt-3">
                        <a
                          href={`/experiences/${exp.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300 hover:underline"
                          style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                        >
                          View experience details
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>

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
          <Link href="/experiences">
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
