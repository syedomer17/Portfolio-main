"use client";

import { Github, Linkedin, Globe, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="container mx-auto px-4 section-spacing">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
          Connect With Me
        </h2>

        {/* Description */}
        <p className="text-gray-400 mb-10 text-lg">
          I'm always open to collaborations, opportunities, or just a friendly chat.
        </p>

        {/* Contact Grid */}
        <div className="grid sm:grid-cols-2 gap-5">

          <SimpleContactItem
            icon={<Github size={20} />}
            label="GitHub"
            href="https://github.com/syedomer17"
          />

          <SimpleContactItem
            icon={<Linkedin size={20} />}
            label="LinkedIn"
            href="https://www.linkedin.com/in/syed-omer-ali-b73501324/"
          />

          <SimpleContactItem
            icon={<Globe size={20} />}
            label="syedomer.me"
            href="https://syedomer.me"
          />

          <SimpleContactItem
            icon={<Mail size={20} />}
            label="syedomerali2006@gmail.com"
            href="mailto:syedomerali2006@gmail.com"
          />

        </div>
      </div>
    </section>
  );
}

function SimpleContactItem({
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
        flex items-center gap-4 p-4
        rounded-xl border border-white/10
        bg-white/5 backdrop-blur-md
        transition-all duration-200
        hover:bg-white/10 hover:border-white/20
      "
    >
      {/* Icon */}
      <div
        className="
          p-3 rounded-lg 
          bg-white/10 border border-white/15 
          text-gray-300
        "
      >
        {icon}
      </div>

      {/* Text */}
      <span className="text-gray-200 text-base font-medium">
        {label}
      </span>
    </a>
  );
}
