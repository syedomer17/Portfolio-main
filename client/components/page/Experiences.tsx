"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRouter } from 'next/navigation';
import ThemeToggle from "../themeToggle/ThemeToggle";
import { experiences } from "../../data/experiences";

export default function ExperiencesPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 pt-12 pb-6">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <header className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push("/")}
                                className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                                aria-label="Go back"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1
                                className="text-xl font-bold text-slate-900 dark:text-white"
                                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                            >
                                Experiences
                            </h1>
                        </div>
                        <ThemeToggle />
                    </header>

                    <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-4" />

                    <div className="mb-5 text-sm text-slate-600 dark:text-slate-300" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
                        <p>
                            I build and ship full stack products with a focus on reliable delivery, clean architecture, and practical DevOps. This timeline reflects hands-on roles across frontend, backend, and cloud workflows. For deeper proof points, see <a href="/certifications" className="underline hover:no-underline">certifications</a> and real-world outcomes in <a href="/projects" className="underline hover:no-underline">project case studies</a>.
                        </p>
                        <ul className="mt-3 list-disc list-inside space-y-1">
                            <li>Product-focused development with measurable delivery scope</li>
                            <li>API design, integrations, and data modeling</li>
                            <li>CI/CD, cloud services, and deployment automation</li>
                        </ul>
                    </div>

                    {/* List */}
                    <div className="space-y-0">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                className="border-t border-slate-200/50 dark:border-[#2A2A2A] first:border-t-0"
                            >
                                {/* Header Row */}
                                <div className="w-full py-4 sm:py-5 flex items-center gap-2 sm:gap-4 transition-colors group">
                                    {/* Logo */}
                                    <div className="shrink-0">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700/70 flex items-center justify-center overflow-hidden p-1 shadow-sm">
                                            <img
                                                src={exp.logo}
                                                alt={exp.company}
                                                className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                    </div>

                                    {/* Company Info */}
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <h3
                                                className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white truncate"
                                                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                                                title={exp.company}
                                            >
                                                {exp.company}
                                            </h3>
                                            <span className="shrink-0 px-1.5 py-0.5 sm:px-2 text-[10px] sm:text-xs font-medium bg-transparent text-[#70717B] dark:text-[#989898] rounded border border-slate-300 dark:border-[#3A3A3A]">
                                                {exp.type}
                                            </span>
                                        </div>
                                        <p
                                            className="text-sm leading-5 font-normal text-[#70717B] dark:text-[#989898]"
                                            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                                        >
                                            {exp.role}
                                        </p>
                                    </div>

                                    {/* Date & Location + Placeholder for alignment */}
                                    <div className="shrink-0 flex items-center gap-1.5 sm:gap-3">
                                        <div className="text-right">
                                            <p
                                                className="text-xs sm:text-sm leading-5 font-medium text-[#333333] dark:text-[#EBEBEB]"
                                                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                                            >
                                                {exp.period}
                                            </p>
                                            <p
                                                className="text-xs sm:text-sm text-[#70717B] dark:text-[#989898]"
                                                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                                            >
                                                {exp.location}
                                            </p>
                                        </div>
                                        {/* Hidden chevron placeholder to maintain exact spacing match with Experience.tsx if needed, or just remove if we want it flush. 
                                            Experience.tsx has a visible chevron. Here we removed it. 
                                            We'll keep it simple. */}
                                    </div>
                                </div>

                                {/* Body Content - Outside Flex Row */}
                                <div className="pb-5 pl-0 sm:pl-0">
                                    {/* Achievements */}
                                    {exp.achievements.length > 0 && (
                                        <ul className="space-y-2 mb-4">
                                            {exp.achievements.map((achievement, i) => (
                                                <li
                                                    key={i}
                                                    className="text-sm text-slate-600 dark:text-slate-300 flex gap-2"
                                                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                                                >
                                                    <span className="text-[#424242] dark:text-[#D4D4D4] mt-0.5">•</span>
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Tech Tags */}
                                    {exp.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {exp.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2.5 py-0.5 text-xs leading-4 font-normal bg-transparent text-[#424242] dark:text-[#D4D4D4] rounded border border-slate-300 dark:border-[#3A3A3A]"
                                                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-3">
                                        <a
                                            href={`/experiences/${exp.slug}`}
                                            className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300 hover:underline"
                                            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                                        >
                                            View experience details
                                            <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    </div>

                                    {/* Empty State */}
                                    {exp.achievements.length === 0 && exp.tags.length === 0 && (
                                        <p
                                            className="text-sm text-slate-400 dark:text-slate-500 italic"
                                            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                                        >
                                            More details coming soon...
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Hire Me Footer */}
                    <div className="mt-2 pt-2 border-t border-dashed border-slate-200 dark:border-[#262626] text-center">
                        <p className="text-base font-medium text-slate-600 dark:text-slate-400"
                            style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
                            Love what I do?{" "}
                            <a
                                href="mailto:syedomerali.200@gmail.com"
                                className="font-bold text-slate-900 dark:text-white hover:underline transition-all hover-glitch inline-block"
                            >
                                Hire me!
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
