"use client";

import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export default function GlassCard({ children, className }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        `
        relative rounded-3xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        p-8 sm:p-10

        before:absolute before:inset-0
        before:rounded-3xl
        before:bg-gradient-to-br before:from-white/10 before:to-white/5
        before:opacity-0 before:transition-opacity before:duration-300

        hover:before:opacity-100
        hover:border-white/20
      `,
        className
      )}
      style={{
        transform: "translateZ(0)", // prevents GPU flicker
      }}
    >
      {children}
    </motion.div>
  );
}
