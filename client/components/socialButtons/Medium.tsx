import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaMedium } from 'react-icons/fa';
import Image from "next/image";

export default function MediumHoverCard() {
    const [showCard, setShowCard] = useState(false);

    return (
        <div className="relative inline-block">
            {/* Medium Button */}
            <motion.a
                href="https://medium.com/@syedomerali2006"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => window.innerWidth >= 640 && setShowCard(true)}
                onMouseLeave={() => setShowCard(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-transparent border border-slate-300 dark:border-transparent rounded-md text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3E3E3E] transition-colors"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
                <FaMedium className="w-4 h-4" />
                <span>Medium</span>
            </motion.a>

            {/* Hover Card */}
            <AnimatePresence>
                {showCard && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute bottom-full left-0 mb-2 w-80 bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2D2D2D] rounded-xl shadow-2xl z-20 overflow-hidden"
                        style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                        onMouseEnter={() => setShowCard(true)}
                        onMouseLeave={() => setShowCard(false)}
                    >
                        {/* Content */}
                        <div className="p-4">
                            {/* Profile Section */}
                            <div className="flex items-start gap-3 mb-3">
                                {/* Profile Image */}
                                <div className="relative">
                                    <Image
                                        src="/myImage.avif"
                                        alt="Syed Omer Ali"
                                        className="relative w-16 h-16 rounded-full border-2 border-white dark:border-[#1C1C1C] object-cover shadow-lg"
                                        width={64}
                                        height={64}
                                        sizes="64px"
                                        priority={false}
                                    />
                                </div>

                                {/* Name and Username */}
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                        Syed Omer Ali
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        @syedomerali2006
                                    </p>
                                </div>
                            </div>

                            {/* Bio */}
                            <p className="text-sm text-slate-700 dark:text-slate-200 mb-3 leading-relaxed">
                                Writing about web development, programming, and tech.
                            </p>

                            {/* Stats */}
                            <div className="flex items-center gap-4 pt-3 border-t border-slate-200 dark:border-[#2D2D2D]">
                                <motion.div
                                    className="flex items-center gap-1.5 cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                        29
                                    </span>
                                    <span className="text-sm text-slate-600 dark:text-slate-300">
                                        Stories
                                    </span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center gap-1.5 cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                        6
                                    </span>
                                    <span className="text-sm text-slate-600 dark:text-slate-300">
                                        Followers
                                    </span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
