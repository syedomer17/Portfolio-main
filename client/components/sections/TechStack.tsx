"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
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
  SiNodedotjs,
  SiKubernetes,
  SiAnsible,
  SiJenkins,
  SiGithubactions,
  SiTerraform,
  SiAmazonwebservices,
  SiDigitalocean,
  SiGooglecloud,
  SiNestjs,
  SiFastify
} from "react-icons/si";

const skills = [
  // Frameworks & libraries
  { name: "React", icon: SiReact },
  { name: "Next", icon: SiNextdotjs },
  { name: "Node", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  {name: "NestJS", icon: SiNestjs},
  {name: "Fastify", icon: SiFastify},
  { name: "Tailwind", icon: SiTailwindcss },
  
  // Languages
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Python", icon: SiPython },
  { name: "C/C++", icon: SiCplusplus },
  
  // Databases
  { name: "SQL", icon: SiPostgresql },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Redis", icon: SiRedis },
  { name: "Prisma", icon: SiPrisma },

  // Tools
  { name: "Git", icon: SiGit },
  { name: "Github", icon: SiGithub },
  { name: "Postman", icon: SiPostman },
  { name: "Figma", icon: SiFigma },

  // DevOps & cloud
  { name: "Linux", icon: SiLinux },
  { name: "Docker", icon: SiDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Ansible", icon: SiAnsible },
  { name: "Jenkins", icon: SiJenkins },
  { name: "GitHub Actions", icon: SiGithubactions },
  { name: "Terraform", icon: SiTerraform },
  { name: "AWS", icon: SiAmazonwebservices },
  { name: "DigitalOcean", icon: SiDigitalocean },
  { name: "GCP", icon: SiGooglecloud },
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
          className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start"
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
                <div className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 bg-transparent border border-[#333] rounded-[10px] hover:border-[#555] transition-colors">
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#70717B] dark:text-[#D4D4D4] group-hover:text-[#424242] dark:group-hover:text-[#D4D4D4] transition-colors" />
                  <span
                    className="text-[11px] sm:text-[13px] font-medium text-[#70717B] dark:text-[#D4D4D4] group-hover:text-[#424242] dark:group-hover:text-[#D4D4D4] transition-colors"
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
