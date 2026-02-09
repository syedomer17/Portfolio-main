"use client";
import { motion } from "framer-motion";

export default function Particles() {
  const particles = Array.from({ length: 36 });

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          initial={{
            opacity: 0,
            y: Math.random() * 200,
            x: Math.random() * window.innerWidth,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [-40, -200],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
