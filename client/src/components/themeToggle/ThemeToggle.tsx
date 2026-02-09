import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = () => {
    // Play audio
    const audio = new Audio('/audio/woosh.mp3');
    audio.play().catch(err => console.log('Audio play failed:', err));

    // Toggle theme
    toggleTheme();
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="flex items-center justify-center w-10 h-10 rounded-full hover:opacity-70 transition-opacity"
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
        transition={{ duration: 0.7, ease: "easeInOut" }}
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
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-black" />
      </motion.div>
    </motion.button>
  );
}
