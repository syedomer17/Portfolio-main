import Blogs from "@/components/sections/Blogs";
import Certifications from "@/components/sections/Certifications";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Newsletter from "@/components/sections/Newsletter";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syed Omer Ali",
  description:
    "Portfolio of Syed Omer Ali, a full stack developer focused on modern web applications, cloud, and DevOps.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Syed Omer Ali",
    description:
      "Portfolio of Syed Omer Ali, a full stack developer focused on modern web applications, cloud, and DevOps.",
    url: "/",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Syed Omer Ali - Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Omer Ali",
    description:
      "Portfolio of Syed Omer Ali, a full stack developer focused on modern web applications, cloud, and DevOps.",
    images: ["/banner.png"],
  },
};

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
