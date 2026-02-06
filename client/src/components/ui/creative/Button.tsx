import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ButtonCreativeTopProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}

function ButtonCreativeTop({ children, href, onClick, icon }: ButtonCreativeTopProps) {
    const [isHovered, setIsHovered] = useState(false);

    const content = (
        <div
            className='cursor-pointer px-5 py-2.5 rounded-[9px] text-center font-medium text-sm inline-flex items-center gap-2 bg-slate-700 dark:bg-[#C7C7C7] text-white dark:text-[#0E0D09]'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-4 h-4 overflow-hidden">
                <AnimatePresence mode="wait">
                    {isHovered ? (
                        <motion.div
                            key="icon-hover"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            {icon}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="icon-normal"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            {icon}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {children}
        </div>
    );

    if (href) {
        return <a href={href}>{content}</a>;
    }

    return <div onClick={onClick}>{content}</div>;
}

export default ButtonCreativeTop;

