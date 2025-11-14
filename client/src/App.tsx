import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "./App.css";
import Particles from "./components/Particles";
import { motion } from "framer-motion";
import Experience from "./components/Experience";
import Education from "./components/Education";


export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* BACKGROUND - parallax + overlays */}
      <div className="bg-wrapper">
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
        <TechStack />
        <Projects />
        <Education />
        <Contact />
      </motion.div>
    </main>
  );
}
