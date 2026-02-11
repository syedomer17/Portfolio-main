import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SiLeetcode } from 'react-icons/si';

export default function LeetcodeHoverCard() {
    const [showCard, setShowCard] = useState(false);

    return (
        <div className="relative inline-block">
            {/* LeetCode Button */}
            <motion.a
                href="https://leetcode.com/syedomerali_200"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => window.innerWidth >= 640 && setShowCard(true)}
                onMouseLeave={() => setShowCard(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-transparent border border-slate-300 dark:border-transparent rounded-md text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3E3E3E] transition-colors"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
                <SiLeetcode className="w-4 h-4" />
                <span>LeetCode</span>
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
                        {/* Content */}
                        <div className="p-4">
                            {/* Profile Section */}
                            <div className="flex items-center gap-3 mb-4">
                                {/* Profile Image */}
                                <div className="relative">
                                    <img
                                        src="/myImage.png"
                                        alt="Profile"
                                        className="relative w-16 h-16 rounded-lg border-2 border-white dark:border-[#1C1C1C] object-cover shadow-lg"
                                    />
                                </div>

                                {/* Name and Username */}
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                     Syed Omer Ali
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        syedomerali_200
                                    </p>
                                </div>
                            </div>

                            {/* Problem Stats */}
                            <div className="bg-slate-100 dark:bg-[#2A2A2A] rounded-lg p-3 mb-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <motion.div
                                        className="text-center cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <div className="text-2xl font-bold text-green-500">93</div>
                                        <div className="text-xs text-slate-600 dark:text-slate-300">Easy</div>
                                    </motion.div>
                                    <motion.div
                                        className="text-center cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <div className="text-2xl font-bold text-yellow-500">64</div>
                                        <div className="text-xs text-slate-600 dark:text-slate-300">Medium</div>
                                    </motion.div>
                                    <motion.div
                                        className="text-center cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <div className="text-2xl font-bold text-red-500">9</div>
                                        <div className="text-xs text-slate-600 dark:text-slate-300">Hard</div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Additional Stats */}
                            <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-[#2D2D2D]">
                                <motion.div
                                    className="flex items-center justify-between cursor-pointer"
                                    whileHover={{ x: 2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Rank</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">863,655</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center justify-between cursor-pointer"
                                    whileHover={{ x: 2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Contest Rating</span>
                                    <span className="text-sm font-bold text-yellow-600 dark:text-yellow-500">1,424</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center justify-between cursor-pointer"
                                    whileHover={{ x: 2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Total Solved</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">166</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
