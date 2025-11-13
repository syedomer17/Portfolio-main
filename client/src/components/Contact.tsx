"use client";
import GlassCard from "./GlassCard";
import { Github, Linkedin, Globe } from "lucide-react";

export default function Contact() {
  return (
    <div className="container-xl mx-auto section-spacing">
      <div style={{ maxWidth: 1100 }} className="mx-auto">
        <GlassCard>
          <h2 className="text-2xl font-semibold text-green-300 mb-4">Connect With Me 🌐</h2>

          <div className="flex flex-col gap-4 text-gray-200">
            <a className="flex items-center gap-3 hover:text-white" href="https://github.com/syedomer17">
              <Github size={18}/> GitHub
            </a>

            <a className="flex items-center gap-3 hover:text-white" href="#">
              <Linkedin size={18}/> LinkedIn
            </a>

            <a className="flex items-center gap-3 hover:text-white" href="https://syedomer.me">
              <Globe size={18}/> syedomer.me
            </a>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
