"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

import { certifications } from "@/data/certifications";
import Image from "next/image";

export default function Certifications() {
    const router = useRouter();
    return (
        <section id="certifications" className="container mx-auto px-4 sm:px-6 pb-0 pt-10">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[18.4px] leading-[23px] font-bold mb-3 text-[#333333] dark:text-[#EBEBEB] font-instagram"
                >
                    Certifications
                </motion.h2>

                {/* Separator line */}
                <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-8"></div>

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {certifications.map((cert, index) => (
                        <motion.a
                            key={index}
                            href={`/certifications/${cert.slug}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="group flex flex-col h-full bg-white dark:bg-[#0E0D09] border border-dashed border-gray-200 dark:border-[#3A3A3A] hover:border-gray-300 dark:hover:border-[#555] rounded-xl overflow-hidden transition-all duration-400"
                            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                        >
                            {/* Image Container */}
                            <div className="relative h-40 bg-gray-50 dark:bg-[#111] border-b border-gray-100 dark:border-[#222] overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                                    {/* Placeholder Logic if no image, or just use img tag */}
                                    <Image
                                        src={cert.image}
                                        alt={cert.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 320px"
                                        className="object-cover group-hover:scale-105"
                                        style={{ transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                                        quality={75}
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-1">
                                <div className="mb-3">
                                    <h3
                                        className="text-[#333333] dark:text-[#EBEBEB] text-[15px] font-bold leading-tight mb-1 group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-2 font-instagram"
                                        style={{
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
                                    className="text-gray-600 dark:text-[#999] text-xs leading-relaxed mb-4 line-clamp-2 font-instagram"
                                    style={{
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        fontWeight: 400,
                                        letterSpacing: 'normal'
                                    }}
                                >
                                    {cert.description}
                                </p>

                                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#222]">
                                    <span className="text-[11px] text-gray-400 dark:text-[#666] flex items-center gap-1 font-instagram" style={{
                                        fontSize: '12px',
                                        lineHeight: '14px',
                                        fontWeight: 400,
                                        letterSpacing: 'normal'
                                    }}>
                                        <Calendar className="w-3 h-3" />
                                        {cert.date}
                                    </span>

                                    <span
                                        className="inline-flex items-center gap-1 text-[12px] font-medium text-[#333] dark:text-[#D4D4D4] group-hover:text-black dark:group-hover:text-white transition-colors font-instagram"
                                    >
                                        View Details
                                        <ArrowUpRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    className="flex justify-center mt-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        onClick={() => router.push("/certifications")}
                        className="group inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-md text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 font-instagram"
                    >
                        View All
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
