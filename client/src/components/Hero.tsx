"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import TextType from "./reactbits/TextType";
import { useRef } from "react";
import VariableProximity from "./reactbits/VariableProximity";

export default function Hero() {
  const nameRef = useRef(null);

  return (
    <section className="container mx-auto px-4 sm:px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <GlassCard className="relative px-6 py-12 sm:px-14 sm:py-20 rounded-3xl overflow-hidden">

          {/* Soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

          <div className="relative max-w-4xl mx-auto">

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">

              <span className="text-gray-400">Hello! I'm </span>

              {/* FIX — gradient + VariableProximity text */}
              <span className="inline-block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                <VariableProximity
                  label="Syed Omer Ali"
                  className={'variable-proximity-demo'}
                  fromFontVariationSettings="'wght' 400, 'opsz' 12"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={nameRef}
                  radius={120}
                  falloff="linear"
                />
              </span>

              <span className="inline-block"> 🚀</span>
            </h1>

            {/* Required invisible container for mouse-tracking */}
            <div ref={nameRef} className="h-0 w-0"></div>

            {/* Subtitle – Typing Animation */}
            <div className="mt-6 text-xl sm:text-2xl font-medium leading-relaxed">
              <TextType
                as="p"
                className="font-semibold"
                text={[
                  "Full Stack Developer",
                  "API & System Designer",
                  "DevOps Engineer",
                  "Cloud Infrastructure Builder",
                ]}
                typingSpeed={60}
                deletingSpeed={40}
                pauseDuration={1500}
                cursorCharacter="|"
                textColors={[
                  "#93c5fd",
                  "#fbbf24",
                  "#34d399",
                  "#c084fc",
                ]}
                startOnVisible={true}
                loop={true}
              />
            </div>

            {/* Description */}
            <p className="mt-8 text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              I design and build scalable, production-ready systems using{" "}
              <span className="text-blue-300 font-medium">modern web technologies</span>{" "}
              and{" "}
              <span className="text-purple-300 font-medium">cloud-native DevOps practices</span>.
              From OAuth authentication flows to CI/CD pipelines and cloud deployments,
              I deliver high-performance, reliable applications end to end.
            </p>

            {/* Buttons */}
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                href="#projects"
                className="px-7 py-3.5 bg-blue-500/90 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
              >
                View Projects
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="px-7 py-3.5 bg-white/5 hover:bg-white/10 text-gray-200 font-semibold rounded-xl border border-white/10 transition-all"
              >
                Get in Touch
              </motion.a>
            </div>
          </div>

        </GlassCard>
      </motion.div>
    </section>
  );
}
