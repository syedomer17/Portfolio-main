import Hero from "@/components/sections/Hero";
import HomeSections from "@/components/page/HomeSections";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syed Omer Ali | Full Stack MERN Developer & DevSecOps Engineer",
  description:
    "I build secure, scalable MERN stack applications for SaaS startups. TypeScript, Next.js, DevSecOps, AI engineering. Available for projects.",
  authors: [{ name: "Syed Omer Ali", url: "https://www.syedomer.me" }],
  creator: "Syed Omer Ali",
  keywords: [
    "Syed Omer Ali",
    "Full Stack Developer",
    "MERN Stack",
    "TypeScript",
    "Next.js",
    "DevSecOps",
    "syedomer17",
    "Hyderabad Developer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Syed Omer Ali | Full Stack MERN Developer & DevSecOps Engineer",
    description:
      "I build secure, scalable MERN stack applications for SaaS startups. TypeScript, Next.js, DevSecOps, AI engineering. Available for projects.",
    siteName: "Syed Omer Ali",
    images: [
      {
        url: "/myImage.avif",
        width: 1200,
        height: 630,
        alt: "Syed Omer Ali - Full Stack Developer",
        type: "image/avif",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@SyedOmer17Ali",
    creator: "@SyedOmer17Ali",
    title: "Syed Omer Ali | Full Stack MERN Developer & DevSecOps Engineer",
    description:
      "I build secure, scalable MERN stack applications for SaaS startups. TypeScript, Next.js, DevSecOps, AI engineering. Available for projects.",
    images: [
      {
        url: "/myImage.avif",
        width: 1200,
        height: 675,
        alt: "Syed Omer Ali - Full Stack Developer",
      },
    ],
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeSections />
    </main>
  );
}
