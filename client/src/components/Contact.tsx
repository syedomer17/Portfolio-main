"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { X } from "lucide-react"; // X / Twitter icon

export default function Contact() {
  return (
    <section id="contact" className="container mx-auto px-4 section-spacing">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
          Connect With Me
        </h2>

        {/* Description */}
        <p className="text-gray-400 mb-10 text-[17px] leading-relaxed">
          Whether you want to collaborate, discuss an idea, or simply say hello — 
          feel free to reach out.
        </p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-4">

          <MinimalContactItem
            icon={<Github size={18} />}
            label="GitHub"
            href="https://github.com/syedomer17"
          />

          <MinimalContactItem
            icon={<Linkedin size={18} />}
            label="LinkedIn"
            href="https://www.linkedin.com/in/syed-omer-ali-b73501324/"
          />

          <MinimalContactItem
            icon={<X size={18} />}
            label="Twitter"
            href="https://x.com/SyedOmerAl20006"
          />

          <MinimalContactItem
            icon={<Mail size={18} />}
            label="syedomerali2006@gmail.com"
            href="mailto:syedomerali2006@gmail.com"
          />

        </div>

      </div>
    </section>
  );
}

function MinimalContactItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className="
        flex items-center gap-3 px-3 py-3
        rounded-lg border border-white/10
        hover:border-white/20
        transition-colors duration-200
        group
      "
    >
      {/* Icon */}
      <div className="
        text-gray-400 group-hover:text-white
        transition-colors duration-200
      ">
        {icon}
      </div>

      {/* Text */}
      <span className="
        text-gray-200 group-hover:text-white
        transition-colors duration-200 text-[15px]
      ">
        {label}
      </span>
    </a>
  );
}
