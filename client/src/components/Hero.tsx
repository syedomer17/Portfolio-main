"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GlassCard from "./GlassCard";
import TextType from "./reactbits/TextType";

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div ref={ref} className="container-xl mx-auto">
      <motion.div style={{ y }}>
        <GlassCard className="mt-16 text-center">
          <h1 className="hero-yellow text-6xl sm:text-7xl font-extrabold leading-tight">
            Hello! I’m <span className="text-white">Syed Omer Ali</span> 🚀
          </h1>

          {/* TYPING SUBTITLE */}
          <TextType
            as="p"
            className="mt-4 text-gray-300 text-xl font-medium tracking-wide"
            text={[
              "Full Stack Developer",
              "DevOps Engineer",
              "Cloud Enthusiast",
              "API & System Design Engineer",
              "Cloud Infrastructure Builder",
            ]}
            typingSpeed={50}
            deletingSpeed={30}
            pauseDuration={1200}
            cursorCharacter="|"
            textColors={["#ffffff", "#f6c400", "#34d399", "#93c5fd"]}
            variableSpeed={{ min: 30, max: 90 }}
            startOnVisible={true}
            loop={true}
          />

          {/* PARAGRAPH ABOUT YOU */}
          <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            I’m a Full Stack Developer and DevOps Engineer who builds scalable,
            real-world applications with modern technologies like React,
            Next.js, Node.js, and cloud-native DevOps tools. I specialize in
            creating secure, high-performance systems — including OAuth flows,
            CI/CD pipelines, cloud deployments, and end-to-end infrastructure
            setups. My work blends strong development skills with operational
            thinking to deliver solutions that are reliable, scalable, and
            production-ready.
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
