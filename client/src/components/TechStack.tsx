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
    <section id="skills" className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-slate-900 dark:text-white"
        >
          Skills & Technologies
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3"
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
                whileHover={{ scale: 1.1, y: -5 }}
                className="group relative"
              >
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 transition-all hover:shadow-lg">
                  <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
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
