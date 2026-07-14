import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { playSound } from "../../lib/audioUtils";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = () => {
    // Play audio - deferred to idle callback, won't block interaction
    playSound("/audio/woosh.mp3", { volume: 0.8 });

    // Toggle theme
    toggleTheme();
  };

  return (
    <>
      <motion.button
        onClick={handleToggle}
        className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:opacity-70 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : 180,
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="absolute"
        >
          <Moon className="text-[#D4D4D4]" style={{ width: '15.9862px', height: '15.9862px' }} />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
            rotate: isDark ? -180 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="absolute"
        >
          <Sun className="w-5 h-5 text-black" />
        </motion.div>
      </motion.button>

      <button
        onClick={handleToggle}
        className="flex md:hidden items-center justify-center w-10 h-10 rounded-full active:scale-95 transition-transform"
        aria-label="Toggle theme"
      >
        <div className={`absolute transition-all duration-300 ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'}`}>
          <Moon className="text-[#D4D4D4]" style={{ width: '15.9862px', height: '15.9862px' }} />
        </div>
        <div className={`absolute transition-all duration-300 ${isDark ? 'opacity-0 scale-50 -rotate-90' : 'opacity-100 scale-100 rotate-0'}`}>
          <Sun className="w-5 h-5 text-black" />
        </div>
      </button>
    </>
  );
}
