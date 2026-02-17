"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { projects } from "@/lib/projects";
import Image from "next/image";

export default function ProjectsPage() {
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
                                Projects
                            </h1>
                        </div>
                        <ThemeToggle />
                    </header>

                    <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-6" />

                    <p
                        className="text-sm text-slate-600 dark:text-slate-300 mb-5"
                        style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                    >
                        These projects are presented as compact case studies with clear problem framing, implementation approach, and outcomes. For full breakdowns, visit the <a href="/case-studies" className="underline hover:no-underline">case studies</a> page. For context on my role and process, see <a href="/experiences" className="underline hover:no-underline">experience</a> and browse the <a href="/blogs" className="underline hover:no-underline">developer blog</a> for technical deep dives.
                    </p>

                    {/* Project Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {projects.map((project, index) => (
                            <motion.a
                                key={index}
                                href={`/projects/${project.slug}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                className="group relative bg-white dark:bg-[#0E0D09] rounded-xl overflow-hidden border border-dashed border-gray-200 dark:border-[#3A3A3A] hover:border-gray-400 dark:hover:border-[#888] transition-all duration-400 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-white/5"
                                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                            >
                                {/* Screen Label */}
                                {project.screenLabel && (
                                    <div className="absolute top-3 left-3 z-20 px-2 py-1 bg-gray-100/90 dark:bg-[#2A2A2A]/90 text-gray-500 dark:text-[#989898] text-xs font-medium rounded">
                                        {project.screenLabel}
                                    </div>
                                )}

                                {/* Coming Soon Badge */}
                                {project.isComingSoon && (
                                    <div className="absolute top-3 left-3 z-20 px-2 py-1 text-gray-500 dark:text-[#989898] text-xs font-medium rounded">
                                        Coming Soon
                                    </div>
                                )}

                                {/* Pin Icon */}
                                {project.isPinned && (
                                    <button className="absolute top-3 right-3 z-20 p-1.5 text-gray-400 dark:text-[#989898] hover:text-gray-900 dark:hover:text-white transition-colors">
                                        <Sparkles className="w-4 h-4" />
                                    </button>
                                )}

                                {/* Project Image Area */}
                                <div className="pt-12 px-4 pb-0 bg-white dark:bg-[#1a1a1a] overflow-hidden">
                                    <div className="relative h-44 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] p-3 flex items-center justify-center overflow-hidden">
                                        {project.isComingSoon ? (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-900 dark:bg-black rounded-md group-hover:scale-110 will-change-transform" style={{ transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
                                                <div className="text-center px-4">
                                                    <p className="text-white text-xs font-medium mb-2 tracking-widest">STAY TUNED</p>
                                                    <div className="text-white text-2xl sm:text-3xl font-bold tracking-wider leading-tight">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <span>C</span>
                                                            <span className="w-6 sm:w-8 h-0.5 bg-white" />
                                                            <span>MING</span>
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 mt-1">
                                                            <span>S</span>
                                                            <span className="w-6 sm:w-8 h-0.5 bg-white" />
                                                            <span className="w-6 sm:w-8 h-0.5 bg-white" />
                                                            <span>N</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, 320px"
                                                className="object-contain rounded-md group-hover:scale-110 will-change-transform"
                                                style={{ transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-1">
                                        <h3
                                            className="text-[#333333] dark:text-[#EBEBEB] group-hover:text-black dark:group-hover:text-white transition-colors duration-500 ease-out"
                                            style={{
                                                fontFamily: '"Instagram Sans", sans-serif',
                                                fontSize: '17.6px',
                                                lineHeight: '19.36px',
                                                fontWeight: 700,
                                                letterSpacing: 'normal'
                                            }}
                                        >
                                            {project.title}
                                        </h3>
                                        <span
                                            className={`flex items-center gap-1.5 text-xs font-medium mt-0.5 ${project.status === "Live"
                                                ? "text-green-500 dark:text-green-400"
                                                : project.status === "Completed"
                                                    ? "text-blue-500 dark:text-blue-400"
                                                    : "text-red-500 dark:text-red-400"
                                                }`}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full animate-pulse ${project.status === "Live"
                                                    ? "bg-green-500 dark:bg-green-400"
                                                    : project.status === "Completed"
                                                        ? "bg-blue-500 dark:bg-blue-400"
                                                        : "bg-red-500 dark:bg-red-400"
                                                    }`}
                                            />
                                            {project.status}
                                        </span>
                                    </div>

                                    <p
                                        className="text-[#70717B] dark:text-[#989898] mb-1"
                                        style={{
                                            fontFamily: '"Instagram Sans", sans-serif',
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            fontWeight: 400,
                                            letterSpacing: 'normal'
                                        }}
                                    >
                                        {project.shortDescription}
                                    </p>
                                    <p
                                        className="text-[12px] text-slate-500 dark:text-[#A0A0A0]"
                                        style={{
                                            fontFamily: '"Instagram Sans", sans-serif',
                                            lineHeight: '18px',
                                            fontWeight: 500
                                        }}
                                    >
                                        Tech: {project.techStack.join(", ")}
                                    </p>
                                    <p
                                        className="text-[12px] text-slate-500 dark:text-[#A0A0A0] mt-1"
                                        style={{
                                            fontFamily: '"Instagram Sans", sans-serif',
                                            lineHeight: '18px',
                                            fontWeight: 400
                                        }}
                                    >
                                        Case study focus: {project.caseStudyFocus}
                                    </p>

                                    {/* View Project Link */}
                                    <div className="mt-auto">
                                        <span
                                            className="inline-flex items-center gap-1.5 text-[#333333] dark:text-[#D4D4D4] group-hover:text-black dark:group-hover:text-white transition-all duration-400 ease-out border-b border-transparent group-hover:border-black dark:group-hover:border-white pb-0.5"
                                            style={{
                                                fontFamily: '"Instagram Sans", sans-serif',
                                                fontSize: '14px',
                                                lineHeight: '20px',
                                                fontWeight: 500
                                            }}
                                        >
                                            View Project
                                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-400 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-dashed border-slate-200 dark:border-[#262626]">
                        <h2
                            className="text-base font-semibold text-slate-900 dark:text-white mb-2"
                            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                        >
                            Project FAQ
                        </h2>
                        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                            <div>
                                <p className="font-medium">How are these projects built?</p>
                                <p>Most projects use Next.js or React with TypeScript, backed by APIs and cloud-friendly deployments.</p>
                            </div>
                            <div>
                                <p className="font-medium">Can I see implementation details?</p>
                                <p>Yes. Source links are available on GitHub, and relevant write-ups live in the <a href="/blogs" className="underline hover:no-underline">technical blog</a>.</p>
                            </div>
                            <div>
                                <p className="font-medium">Looking to collaborate?</p>
                                <p>Book a <a href="/intro-call" className="underline hover:no-underline">15-minute intro call</a> to discuss scope and timelines.</p>
                            </div>
                        </div>
                    </div>

                    {/* Github Link Footer */}
                    <div className="mt-2 pt-2 border-t border-dashed border-slate-200 dark:border-[#262626] text-center">
                        <p className="text-base font-medium text-slate-600 dark:text-slate-400"
                            style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
                            For more projects, visit my{" "}
                            <a
                                href="https://github.com/syedomer17"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-slate-900 dark:text-white hover:underline transition-all inline-flex items-center gap-1 hover-glitch"
                            >
                                Github
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
