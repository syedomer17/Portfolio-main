"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

// import { projects } from "@/lib/projects";
import { projects } from "@/data/projects";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Projects() {
  const router = useRouter();
  return (
    <section id="projects" className="container mx-auto px-4 sm:px-6 pb-0">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="dark:text-[#EBEBEB] font-bold font-instagram leading-5.75 mb-3 mt-2 text-[#333333] text-[18.4px]"
        >
          Projects
        </motion.h2>
        <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-6" />

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={`/projects/${project.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="group relative bg-white dark:bg-[#0E0D09] rounded-xl overflow-hidden border border-dashed border-gray-200 dark:border-[#3A3A3A] hover:border-gray-400 dark:hover:border-[#888] transition-all duration-400 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-white/5"
              style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              {/* Screen Label (for live projects) - Outside image */}
              {project.screenLabel && (
                <div className="absolute top-3 left-3 z-20 px-2 py-1 bg-gray-100/90 dark:bg-[#2A2A2A]/90 text-gray-500 dark:text-[#989898] text-xs font-medium rounded">
                  {project.screenLabel}
                </div>
              )}

              {/* Coming Soon Badge - Outside image */}
              {project.isComingSoon && (
                <div className="absolute top-3 left-3 z-20 px-2 py-1 text-gray-500 dark:text-[#989898] text-xs font-medium rounded">
                  Coming Soon
                </div>
              )}

              {/* Pin Icon - Outside image */}
              {project.isPinned && (
                <button className="absolute top-3 right-3 z-20 p-1.5 text-gray-400 dark:text-[#989898] hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Sparkles className="w-4 h-4" />
                </button>
              )}

              {/* Project Image Area */}
              <div className="pt-12 px-4 pb-0 bg-white dark:bg-[#1a1a1a] overflow-hidden">
                <div className="relative h-44 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] p-3 flex items-center justify-center overflow-hidden">
                  {/* Image or Coming Soon Placeholder */}
                  {project.isComingSoon ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 dark:bg-black rounded-md group-hover:scale-110 transition-transform duration-400 will-change-transform" style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
                      <div className="text-center px-4">
                        <p className="text-white text-xs font-medium mb-2 tracking-widest">STAY TUNED</p>
                        <div className="text-white text-2xl sm:text-3xl font-bold tracking-wider leading-tight">
                          <div className="flex items-center justify-center gap-1">
                            <span>C</span>
                            <span className="w-6 sm:w-8 h-0.5 bg-white" />
                            <span>MING</span>
                          </div>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <span>S</span>
                            <span className="w-6 sm:w-8 h-0.5 bg-white" />
                            <span className="w-6 sm:w-8 h-0.5 bg-white" />
                            <span>N</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-contain rounded-md group-hover:scale-110 transition-transform duration-400 will-change-transform"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                      quality={75}
                      loading="lazy"
                    />
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3
                    className="text-[#333333] dark:text-[#EBEBEB] group-hover:text-black dark:group-hover:text-white transition-colors duration-500 ease-out"
                    style={{
                      fontSize: '17.6px',
                      lineHeight: '19.36px',
                      fontWeight: 700,
                      letterSpacing: 'normal'
                    }}
                  >
                    {project.title}
                  </h3>
                  <span
                    className={`flex items-center gap-1.5 text-xs font-medium mt-0.5 ${project.status === "Live"
                      ? "text-green-500 dark:text-green-400"
                      : project.status === "Completed"
                        ? "text-blue-500 dark:text-blue-400"
                        : "text-red-500 dark:text-red-400"
                      }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full animate-pulse ${project.status === "Live"
                        ? "bg-green-500 dark:bg-green-400"
                        : project.status === "Completed"
                          ? "bg-blue-500 dark:bg-blue-400"
                          : "bg-red-500 dark:bg-red-400"
                        }`}
                    />
                    {project.status}
                  </span>
                </div>

                <p
                  className="text-[#70717B] dark:text-[#989898] mb-1"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 400,
                    letterSpacing: 'normal'
                  }}
                >
                  {project.description}
                </p>
                <p
                  className="text-[12px] text-slate-500 dark:text-[#A0A0A0]"
                  style={{
                    lineHeight: '18px',
                    fontWeight: 500
                  }}
                >
                  Tech: {project.techStack.join(", ")}
                </p>
                <p
                  className="text-[12px] text-slate-500 dark:text-[#A0A0A0] mt-1"
                  style={{
                    lineHeight: '18px',
                    fontWeight: 400
                  }}
                >
                  Notes: {project.notes}
                </p>

                {/* View Project Link */}
                <div className="mt-auto">
                  <span
                    className="inline-flex items-center gap-1.5 text-[#333333] dark:text-[#D4D4D4] group-hover:text-black dark:group-hover:text-white transition-all duration-400 ease-out border-b border-transparent group-hover:border-black dark:group-hover:border-white pb-0.5"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontWeight: 500
                    }}
                  >
                    View Project
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-400 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.a>
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
            onClick={() => router.push("/projects")}
            className="bg-slate-900 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 font-instagram font-medium gap-2 group hover:bg-slate-800 inline-flex items-center px-4 py-2 rounded-md text-sm text-white"
          >
            View All
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
