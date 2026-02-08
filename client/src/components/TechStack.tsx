"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiExpo,
  SiDjango,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiTailwindcss,
  SiPostman,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiGit,
  SiGithub,
  SiFigma,
  SiDocker,
  SiLinux,
  SiBun,
  SiNodedotjs
} from "react-icons/si";

const skills = [
  { name: "React", icon: SiReact },
  { name: "Next", icon: SiNextdotjs },
  { name: "Expo", icon: SiExpo },
  { name: "Django", icon: SiDjango },
  { name: "Express", icon: SiExpress },
  { name: "Node", icon: SiNodedotjs },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Redis", icon: SiRedis },
  { name: "Prisma", icon: SiPrisma },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Postman", icon: SiPostman },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Python", icon: SiPython },
  { name: "C/C++", icon: SiCplusplus },
  { name: "SQL", icon: SiPostgresql },
  { name: "Git", icon: SiGit },
  { name: "Github", icon: SiGithub },
  { name: "Figma", icon: SiFigma },
  { name: "Docker", icon: SiDocker },
  { name: "Linux", icon: SiLinux },
  { name: "Bun", icon: SiBun },
];

export default function TechStack() {
  return (
    <section id="skills" className="container mx-auto px-4 sm:px-6 pb-0 pt-6">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[18.4px] leading-[23px] font-bold mb-3 text-[#333333] dark:text-[#EBEBEB]"
          style={{ fontFamily: '"Instagram Sans", sans-serif', fontSize: '18.4px', lineHeight: '23px', fontWeight: 700, letterSpacing: 'normal' }}
        >
          Skills & Technologies
        </motion.h2>

        {/* Separator line */}
        <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-6"></div>



        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.05 }}
                className="group relative"
              >
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent border border-[#333] rounded-[10px] hover:border-[#555] transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-[#70717B] dark:text-[#D4D4D4] group-hover:text-[#424242] dark:group-hover:text-[#D4D4D4] transition-colors" />
                  <span
                    className="text-[13px] font-medium text-[#70717B] dark:text-[#D4D4D4] group-hover:text-[#424242] dark:group-hover:text-[#D4D4D4] transition-colors"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
