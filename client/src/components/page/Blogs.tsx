"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, HandMetal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { blogs } from "../../data/blogs";

export default function BlogsPage() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 pt-12 pb-6">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <header className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/")}
                                className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                                aria-label="Go back"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1
                                className="text-xl font-bold text-slate-900 dark:text-white"
                                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                            >
                                Blogs
                            </h1>
                        </div>
                        <ThemeToggle />
                    </header>

                    <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-4" />

                    {/* List */}
                    <div className="space-y-0">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: [0.4, 0, 0.2, 1]
                                }}
                            >
                                <a
                                    href={blog.url}
                                    className="group block py-4 hover:bg-transparent transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3
                                                className="text-[#333333] font-bold dark:text-white mb-2 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                                                style={{
                                                    fontFamily: '"Instagram Sans", sans-serif',
                                                    fontSize: '16px',
                                                    lineHeight: '1.4',
                                                    fontWeight: 700,
                                                    letterSpacing: 'normal'
                                                }}
                                            >
                                                {blog.title}
                                            </h3>

                                            <div
                                                className="flex items-center gap-3 text-[#70717B] dark:text-[#D4D4D4] mb-3"
                                                style={{
                                                    fontFamily: '"Instagram Sans", sans-serif',
                                                    fontSize: '12px',
                                                    lineHeight: '16px',
                                                    fontWeight: 500,
                                                    letterSpacing: 'normal'
                                                }}
                                            >
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{blog.date}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2">
                                                <div className="flex items-center gap-1.5 text-gray-500 dark:text-[#D4D4D4] border-r border-[#333] pr-2 h-4" style={{ fontSize: '12px', fontWeight: 500 }}>
                                                    <HandMetal className="w-3.5 h-3.5 dark:text-[#D4D4D4]" />
                                                    <span>{blog.views}</span>
                                                </div>

                                                {blog.tags.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2.5 py-1 text-[11px] font-medium bg-gray-100 dark:bg-transparent text-[#424242] dark:text-[#D4D4D4] rounded-[4px] border border-transparent dark:border-[#333]"
                                                        style={{
                                                            fontFamily: '"Instagram Sans", sans-serif',
                                                            fontSize: '12px',
                                                            lineHeight: '16px',
                                                            fontWeight: 400,
                                                            letterSpacing: 'normal'
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <ArrowUpRight className="w-4 h-4 text-gray-400 dark:text-[#666] group-hover:text-black dark:group-hover:text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0 mt-1 hidden sm:block" />
                                    </div>
                                </a>
                                {/* Dashed Separator */}
                                {index < blogs.length - 1 && (
                                    <div className="w-full h-px border-t border-dashed border-gray-200 dark:border-[#262626] mt-0"></div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Medium Link Footer */}
                    <div className="mt-2 pt-2 border-t border-dashed border-slate-200 dark:border-[#262626] text-center">
                        <p className="text-base font-medium text-slate-600 dark:text-slate-400"
                            style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
                            For more blogs, visit my{" "}
                            <a
                                href="https://medium.com/@syedomerali_200"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-slate-900 dark:text-white hover:underline transition-all hover-glitch inline-block"
                            >
                                Medium
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
