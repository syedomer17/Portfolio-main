import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { BsCalendar3 } from 'react-icons/bs';
import Image from "next/image";


export default function TwitterHoverCard() {
    const [showCard, setShowCard] = useState(false);

    return (
        <div className="relative inline-block">
            {/* Twitter Button */}
            <motion.a
                href="https://twitter.com/SyedOmer17Ali"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => window.innerWidth >= 640 && setShowCard(true)}
                onMouseLeave={() => setShowCard(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-white dark:bg-[#2E2E2E] sm:dark:bg-transparent border border-slate-300 dark:border-transparent rounded-md text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3E3E3E] transition-colors"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
                <FaXTwitter className="w-4 h-4" />
                <span>Twitter</span>
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
                        {/* Banner Image */}
                        <div className="h-16 bg-slate-200 dark:bg-slate-700 relative">
                            <Image
                                src="/banner.png"
                                alt="Banner"
                                fill
                                sizes="(max-width: 640px) 100vw, 384px"
                                className="object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4 pt-0">
                            {/* Profile Image with Gradient Border - Overlapping Banner */}
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

                            {/* Name and Username */}
                            <div className="mb-3">
                                <div className="flex items-center gap-1.5">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                        Syed Omer Ali
                                    </h3>
                                    <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    @SyedOmer17Ali
                                </p>
                            </div>

                            {/* Bio */}
                            <p className="text-sm text-slate-700 dark:text-slate-200 mb-3 leading-relaxed">
                                Software Engineer. Building cool stuff on the web
                            </p>

                            {/* Joined Date */}
                            <div className="flex items-center gap-1.5 mb-3">
                                <BsCalendar3 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                                <span className="text-sm text-slate-600 dark:text-slate-300">
                                    Joined October 2024
                                </span>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4 pt-3 border-t border-slate-200 dark:border-[#2D2D2D]">
                                <motion.div
                                    className="flex items-center gap-1.5 cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                        10
                                    </span>
                                    <span className="text-sm text-slate-600 dark:text-slate-300">
                                        Following
                                    </span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center gap-1.5 cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                        3
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
