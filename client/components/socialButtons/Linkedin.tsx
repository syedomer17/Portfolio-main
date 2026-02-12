import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import Image from "next/image";

export default function LinkedinHoverCard() {
    const [showCard, setShowCard] = useState(false);

    return (
        <div className="relative inline-block">
            {/* LinkedIn Button */}
            <motion.a
                href="https://linkedin.com/in/syedomer17"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => window.innerWidth >= 640 && setShowCard(true)}
                onMouseLeave={() => setShowCard(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-white dark:bg-[#2E2E2E] sm:dark:bg-transparent border border-slate-300 dark:border-transparent rounded-md text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3E3E3E] transition-colors"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
                <FaLinkedin className="w-4 h-4" />
                <span>LinkedIn</span>
            </motion.a>

            {/* Hover Card */}
            <AnimatePresence>
                {showCard && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute bottom-full left-0 mb-2 w-96 bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2D2D2D] rounded-xl shadow-2xl z-20 overflow-hidden"
                        style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                        onMouseEnter={() => setShowCard(true)}
                        onMouseLeave={() => setShowCard(false)}
                    >
                        {/* Banner Image */}
                        <div className="h-16 bg-slate-200 dark:bg-slate-700 relative">
                            <Image
                                src="/linkedin-banner.jpg"
                                alt="Banner"
                                fill
                                sizes="(max-width: 640px) 100vw, 384px"
                                className="object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4 pt-0">
                            {/* Profile Image - Overlapping Banner */}
                            <div className="relative -mt-6 mb-3">
                                <Image
                                    src="/myImage.png"
                                    alt="Profile"
                                    className="relative w-16 h-16 rounded-full border-4 border-white dark:border-[#1C1C1C] object-cover shadow-lg"
                                    width={64}
                                    height={64}
                                    sizes="64px"
                                />
                            </div>

                            {/* Name and Title */}
                            <div className="mb-3">
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                    Syed Omer Ali
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300 mb-1 leading-relaxed">
                                    Software Engineer. Building cool stuff on the web
                                </p>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-1.5 mb-3">
                                <span className="text-sm text-slate-600 dark:text-slate-300">
                                    Hyderabad, India
                                </span>
                            </div>

                            {/* Connections */}
                            <motion.div
                                className="flex items-center gap-1.5 pt-3 border-t border-slate-200 dark:border-[#2D2D2D] cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                    500+ connections
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
