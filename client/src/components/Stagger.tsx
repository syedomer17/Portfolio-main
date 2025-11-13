"use client";

import { motion } from "framer-motion";

export default function Stagger({ children }: any) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
