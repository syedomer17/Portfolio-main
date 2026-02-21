"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar } from "lucide-react";
import { useRouter } from 'next/navigation';
import ThemeToggle from "../themeToggle/ThemeToggle";
import { blogs as featuredBlogs } from "@/lib/blogs";
import { blogs as legacyBlogs } from "@/lib/cont";

export default function BlogsPage() {
    const router = useRouter();
    const formatDate = (value: string) => {
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            return value;
        }
        return parsed.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const mergedBlogs = [
        ...featuredBlogs.map((blog) => ({
            title: blog.title,
            description: blog.description,
            date: blog.publishedAt,
            href: `/blogs/${blog.slug}`,
            external: false,
        })),
        ...legacyBlogs.map((blog) => ({
            title: blog.title,
            description: `External article on ${blog.tags?.join(", ") || "Medium"}.`,
            date: blog.date,
            href: blog.url || "#",
            external: blog.url?.startsWith("http") ?? false,
        })),
    ];

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
                                className="text-xl font-bold text-slate-900 dark:text-white font-instagram"
                            >
                                Blogs
                            </h1>
                        </div>
                        <ThemeToggle />
                    </header>

                    <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-4" />

                    <p
                        className="text-sm text-slate-600 dark:text-slate-300 mb-5 font-instagram"
                    >
                        I publish implementation-focused posts on secure MERN architecture, TypeScript, and DevSecOps. For applied examples, browse the <a href="/case-studies" className="underline hover:no-underline">case studies</a>. You can also grab checklists and templates in the <a href="/resources" className="underline hover:no-underline">resources</a> hub.
                    </p>

                    {/* List */}
                    <div className="space-y-0">
                        {mergedBlogs.map((blog, index) => (
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
                                    href={blog.href}
                                    target={blog.external ? "_blank" : undefined}
                                    rel={blog.external ? "noopener noreferrer" : undefined}
                                    className="group block py-4 hover:bg-transparent transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3
                                                className="text-[#333333] font-bold dark:text-white mb-2 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 font-instagram"
                                                style={{
                                                    fontSize: '16px',
                                                    lineHeight: '1.4',
                                                    fontWeight: 700,
                                                    letterSpacing: 'normal'
                                                }}
                                            >
                                                {blog.title}
                                            </h3>

                                            <div
                                                className="flex items-center gap-3 text-[#70717B] dark:text-[#D4D4D4] mb-2 font-instagram"
                                                style={{
                                                    fontSize: '12px',
                                                    lineHeight: '16px',
                                                    fontWeight: 500,
                                                    letterSpacing: 'normal'
                                                }}
                                            >
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{formatDate(blog.date)}</span>
                                                </div>
                                            </div>

                                            <p
                                                className="text-sm text-[#70717B] dark:text-[#D4D4D4] font-instagram"
                                            >
                                                {blog.description}
                                            </p>

                                            <div className="mt-2 inline-flex items-center gap-1 text-sm text-slate-700 dark:text-slate-300">
                                                Read more
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                {/* Dashed Separator */}
                                {index < mergedBlogs.length - 1 && (
                                    <div className="w-full h-px border-t border-dashed border-gray-200 dark:border-[#262626] mt-0"></div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Medium Link Footer */}
                    <div className="mt-2 pt-2 border-t border-dashed border-slate-200 dark:border-[#262626] text-center">
                        <p className="text-base font-medium text-slate-600 dark:text-slate-400 font-instagram">
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
