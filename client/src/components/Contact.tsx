"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="container mx-auto px-4 py-16 pb-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 sm:p-12 border border-blue-200 dark:border-blue-800"
        >
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white text-center">
            Let's Connect
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-center max-w-2xl mx-auto">
            Whether you want to collaborate, discuss an idea, or simply say hello — 
            feel free to reach out through any of these platforms.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <ContactCard
              icon={<Github className="w-5 h-5" />}
              label="GitHub"
              href="https://github.com/syedomer17"
            />
            <ContactCard
              icon={<Linkedin className="w-5 h-5" />}
              label="LinkedIn"
              href="https://www.linkedin.com/in/syed-omer-ali-b73501324/"
            />
            <ContactCard
              icon={<Twitter className="w-5 h-5" />}
              label="Twitter"
              href="https://x.com/SyedOmerAl20006"
            />
            <ContactCard
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              href="mailto:syedomerali2006@gmail.com"
            />
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-slate-600 dark:text-slate-400 text-sm"
        >
          <p>Built with React, TypeScript, Tailwind CSS & Framer Motion</p>
          <p className="mt-2">© 2025 All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all hover:shadow-lg"
    >
      <div className="text-slate-600 dark:text-slate-400">
        {icon}
      </div>
      <span className="font-medium text-slate-900 dark:text-white">
        {label}
      </span>
    </motion.a>
  );
}
