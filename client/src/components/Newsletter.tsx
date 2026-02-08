"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Quote } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:9000"}/api/newsletter/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setEmail("");
                toast.success("Successfully subscribed!");
            } else {
                setStatus("error");
                toast.error(data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Subscription error:", error);
            setStatus("error");
            toast.error("Failed to connect to the server");
        } finally {
            setTimeout(() => {
                if (status === 'success' || status === 'error') {
                    setStatus("idle");
                }
            }, 3000);
        }
    };

    return (
        <section id="newsletter" className="container mx-auto px-4 sm:px-6 pb-20 pt-4">
            <div className="max-w-2xl mx-auto">
                <Toaster position="bottom-right" />

                {/* Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-lg font-bold mb-4 text-[#333333] dark:text-[#EBEBEB] pl-1"
                    style={{ fontFamily: '"Instagram Sans", sans-serif', fontSize: "18.4px", lineHeight: "23px", fontWeight: 700, letterSpacing: "normal" }}
                >
                    Newsletter
                </motion.h2>

                {/* Separator line */}
                <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-8"></div>

                {/* Dashed Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative border border-dashed border-gray-300 dark:border-[#333] rounded-xl p-5 sm:p-6 overflow-hidden"
                >
                    {/* Diagonal Stripes Background */}
                    <div
                        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.1] pointer-events-none"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                        -45deg,
                        transparent,
                        transparent 4px,
                        #9CA3AF 4px,
                        #9CA3AF 5px
                    )`
                        }}
                    />

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 relative z-10">
                        <div className="relative flex-1">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full px-4 py-2.5 bg-white dark:bg-[#0E0D09] border border-gray-200 dark:border-[#333] rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 transition-all text-sm shadow-sm"
                                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className={`px-6 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap shadow-sm min-w-[120px] ${status === "success"
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : status === "error"
                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                    : "bg-[#4B4C53] hover:bg-[#3A3B42] text-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                } disabled:opacity-70 disabled:cursor-not-allowed`}
                            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                        >
                            {status === "loading" ? (
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : status === "success" ? (
                                <>
                                    Subscribed <CheckCircle2 className="w-4 h-4" />
                                </>
                            ) : status === "error" ? (
                                <>
                                    Failed <AlertCircle className="w-4 h-4" />
                                </>
                            ) : (
                                "Subscribe"
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* Quote Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 text-center"
                >
                    <Quote className="w-8 h-8 text-gray-300 dark:text-[#333] mx-auto mb-4 fill-current" />
                    <p
                        className="text-xl sm:text-2xl font-bold text-[#333] dark:text-[#D4D4D4] mb-4 leading-tight italic"
                        style={{ fontFamily: '"Instagram Sans", sans-serif', fontWeight: 400, letterSpacing: "normal" }}
                    >
                        &quot;Do so much work that it would be unreasonable for you to not be successful.&quot;
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-12 bg-gray-200 dark:bg-[#333]"></div>
                        <span
                            className="text-xs font-bold text-gray-500 dark:text-[#888] tracking-wider uppercase"
                            style={{ fontFamily: '"Instagram Sans", sans-serif', fontSize: "14px", lineHeight: "20px", fontWeight: 600, letterSpacing: "normal" }}
                        >
                            Syed Omer Ali
                        </span>
                        <div className="h-px w-12 bg-gray-200 dark:bg-[#333]"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
