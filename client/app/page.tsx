import Blogs from "@/components/sections/Blogs";
import Certifications from "@/components/sections/Certifications";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Newsletter from "@/components/sections/Newsletter";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <Projects />
      <Blogs />
      <TechStack />
      <Certifications />
      <Newsletter />
    </main>
  );
}
