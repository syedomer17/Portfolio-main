import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "./App.css";
import Particles from "./components/Particles";
import { motion } from "framer-motion";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Blogs from "./components/Blogs";


export default function Home() {
  return (
    <main className="min-h-screen relative bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      
      {/* BACKGROUND - parallax + overlays for dark mode */}
      <div className="bg-wrapper opacity-0 dark:opacity-100 transition-opacity duration-300">
        <div
          className="parallax-bg"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        />
        <Particles />
        <div className="bg-overlay-dark" />
        <div className="bg-overlay-gradient" />
        <div className="bg-vignette" />
        <div className="lens-flare" />
      </div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Hero />
        <Experience />
        <Projects />
        <Blogs />
        <TechStack />
        <Education />
        <Contact />
      </motion.div>
    </main>
  );
}
