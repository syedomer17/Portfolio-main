"use client";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useRef } from "react";

export default function GlassCard({ children, className }: any) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleTilt = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / 25) * -1;
    const rotateY = (x - rect.width / 2) / 25;

    ref.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "glass-card p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
