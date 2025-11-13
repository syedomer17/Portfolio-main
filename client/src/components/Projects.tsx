"use client";

import { motion } from "framer-motion";
import Stagger from "./Stagger";

export default function Projects() {
  const items = [
    {
      title: "GitHub Gist Manager",
      stack: "Next.js • MongoDB • OAuth",
      description:
        "A full GitHub Gist dashboard allowing users to view, edit, delete, fork and create gists using secure GitHub OAuth.",
      github: "#",
      demo: "#",
    },
    {
      title: "AI Resume Builder",
      stack: "Next.js • Gemini AI",
      description:
        "AI-powered resume builder that generates ATS-optimized resumes based on job descriptions and your profile.",
      github: "#",
      demo: "#",
    },
    {
      title: "OAuth Auth System",
      stack: "NestJS • Fastify",
      description:
        "Production-grade authentication system with email verification, refresh tokens, Twilio OTP, and secure token rotation.",
      github: "#",
      demo: "#",
    },
    {
      title: "DevOps Pipelines",
      stack: "Jenkins • Docker • CI/CD",
      description:
        "End-to-end CI/CD pipelines using Jenkins, Docker, build triggers, automated deployments, and multi-env workflows.",
      github: "#",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-purple-300 mb-8">
          Projects 🚀
        </h2>

        {/* List */}
        <Stagger>
          <div className="flex flex-col gap-6">
            {items.map((p, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="
                  w-full p-6 rounded-2xl 
                  bg-white/5 border border-white/10 
                  backdrop-blur-xl shadow-lg relative
                  hover:bg-white/10 hover:border-white/20
                  transition-all duration-300
                "
              >
                {/* Content */}
                <h3 className="text-xl font-semibold text-white">
                  {p.title}
                </h3>

                <p className="text-sm text-blue-300 mt-1">{p.stack}</p>

                <p className="text-gray-300 mt-3 leading-relaxed">
                  {p.description}
                </p>

                {/* Buttons */}
                <div className="flex gap-4 mt-5">
                  <a
                    href={p.github}
                    target="_blank"
                    className="
                      px-4 py-2 rounded-lg
                      bg-white/10 border border-white/20
                      text-white text-sm
                      flex items-center gap-2
                      hover:bg-white hover:text-black
                      transition-all duration-200
                    "
                  >
                    <span>GitHub</span>
                  </a>

                  <a
                    href={p.demo}
                    target="_blank"
                    className="
                      px-4 py-2 rounded-lg
                      bg-white/10 border border-white/20
                      text-white text-sm
                      flex items-center gap-2
                      hover:bg-white hover:text-black
                      transition-all duration-200
                    "
                  >
                    <span>Live Demo</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
}
