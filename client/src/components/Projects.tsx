"use client";

import { motion } from "framer-motion";
import { ExternalLink, Pin } from "lucide-react";

const projects = [
  {
    title: "Lunel",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, itaque.",
    image: "/api/placeholder/400/250",
    status: "Building",
    isComingSoon: true,
  },
  {
    title: "Asap",
    description: "Record studio-quality remote audio and video, locally captured without quality loss.",
    image: "/api/placeholder/400/250",
    status: "Building",
    isComingSoon: true,
  },
  {
    title: "Cuez",
    description: "A special platform where people can organize their personal life better.",
    image: "/api/placeholder/400/250",
    status: "Live",
    url: "https://cuez.app",
  },
  {
    title: "The Daily Crimes",
    description: "A newspaper website covering the latest crimes and law enforcement news.",
    image: "/api/placeholder/400/250",
    status: "Live",
    url: "https://thedailycrimes.com",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-slate-900 dark:text-white"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all hover:shadow-xl"
            >
              {/* Coming Soon Badge */}
              {project.isComingSoon && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full">
                  Coming Soon
                </div>
              )}

              {/* Pin Icon */}
              <button className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-slate-800/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Pin className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </button>

              {/* Project Image */}
              <div className="relative h-48 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
                {project.isComingSoon ? (
                  <div className="w-full h-full flex items-center justify-center bg-black">
                    <div className="text-center">
                      <p className="text-white text-sm font-medium mb-2">STAY TUNED</p>
                      <p className="text-white text-4xl font-bold tracking-wider">
                        C<span className="inline-block mx-1 w-12 h-1 bg-white align-middle"></span>MING
                        <br />
                        S<span className="inline-block mx-1 w-12 h-1 bg-white align-middle"></span>
                        <span className="inline-block mx-1 w-12 h-1 bg-white align-middle"></span>N
                      </p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              {/* Project Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                  <span
                    className={`flex items-center gap-1 text-xs font-medium ${
                      project.status === "Live"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        project.status === "Live" ? "bg-green-600 dark:bg-green-400" : "bg-red-600 dark:bg-red-400"
                      }`}
                    />
                    {project.status}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {project.description}
                </p>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
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
