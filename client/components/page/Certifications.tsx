"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Award, Calendar } from "lucide-react";
import { useRouter } from 'next/navigation';
import ThemeToggle from "../themeToggle/ThemeToggle";   
import { certifications } from "@/lib/certifications";
import Image from "next/image";
import Link from "next/link";

export default function CertificationsPage() {
    const router = useRouter();
    const formatDate = (value: string) =>
        new Date(value).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    const handleCardClick = (slug: string) => {
        router.push(`/certifications/${slug}`);
    };

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
                                Certifications
                            </h1>
                        </div>
                        <ThemeToggle />
                    </header>

                    <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-6" />

                    <p
                        className="text-sm text-slate-600 dark:text-slate-300 mb-5"
                        style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                    >
                        These certifications support hands-on work in software engineering, cloud, and DevOps. They complement the practical outcomes shown in <a href="/experiences" className="underline hover:no-underline">experience</a> and <a href="/projects" className="underline hover:no-underline">project case studies</a>.
                    </p>

                    {/* Certifications Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group flex flex-col h-full bg-white dark:bg-[#0E0D09] border border-dashed border-gray-200 dark:border-[#3A3A3A] hover:border-gray-300 dark:hover:border-[#555] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
                                role="link"
                                tabIndex={0}
                                onClick={() => handleCardClick(cert.slug)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        event.preventDefault();
                                        handleCardClick(cert.slug);
                                    }
                                }}
                            >
                                {/* Image Container */}
                                <div className="relative h-40 bg-gray-50 dark:bg-[#111] border-b border-gray-100 dark:border-[#222] overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                                        <Image
                                            src={cert.image}
                                            alt={cert.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 320px"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 flex flex-col flex-1">
                                    <div className="mb-3">
                                        <h3
                                            className="text-[#333333] dark:text-[#EBEBEB] text-[15px] font-bold leading-tight mb-1 group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-2"
                                            style={{
                                                fontFamily: '"Instagram Sans", sans-serif',
                                                fontSize: '17.6px',
                                                lineHeight: '19.36px',
                                                fontWeight: 700,
                                                letterSpacing: 'normal'
                                            }}
                                        >
                                            {cert.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-[#888] font-medium flex items-center gap-1.5">
                                            <Award className="w-3 h-3" />
                                            {cert.issuer}
                                        </p>
                                    </div>

                                    <p
                                        className="text-gray-600 dark:text-[#999] text-xs leading-relaxed mb-4 line-clamp-2"
                                        style={{
                                            fontFamily: '"Instagram Sans", sans-serif',
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            fontWeight: 400,
                                            letterSpacing: 'normal'
                                        }}
                                    >
                                        {cert.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#222]">
                                        <span className="text-[11px] text-gray-400 dark:text-[#666] flex items-center gap-1" style={{
                                            fontFamily: '"Instagram Sans", sans-serif',
                                            fontSize: '12px',
                                            lineHeight: '14px',
                                            fontWeight: 400,
                                            letterSpacing: 'normal'
                                        }}>
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(cert.issueDate)}
                                        </span>

                                        <Link
                                            href={cert.credentialLink || "#"}
                                            target={cert.credentialLink ? "_blank" : undefined}
                                            rel={cert.credentialLink ? "noopener noreferrer" : undefined}
                                            className="inline-flex items-center gap-1 text-[12px] font-medium text-[#333] dark:text-[#D4D4D4] hover:text-black dark:hover:text-white transition-colors"
                                            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                                            onClick={(event) => event.stopPropagation()}
                                        >
                                            Show Credential
                                            <ArrowUpRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* LinkedIn Link Footer */}
                    <div className="mt-2 pt-2 border-t border-dashed border-slate-200 dark:border-[#262626] text-center">
                        <p className="text-base font-medium text-slate-600 dark:text-slate-400"
                            style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
                            For more details, view my{" "}
                            <Link
                                href="https://linkedin.com/in/syedomer17"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-slate-900 dark:text-white hover:underline transition-all inline-flex items-center gap-1 hover-glitch"
                            >
                                LinkedIn
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
