import type { Metadata } from "next";
import AboutPage from "@/components/page/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Syed Omer Ali, a full stack developer focused on modern web apps, cloud infrastructure, and scalable product engineering.",
  authors: [{ name: "Syed Omer Ali", url: "https://www.syedomer.me" }],
  creator: "Syed Omer Ali",
  keywords: [
    "Syed Omer Ali",
    "About Syed Omer Ali",
    "Full Stack Developer",
    "MERN Stack Developer",
    "DevSecOps",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Syed Omer Ali",
    description:
      "Learn more about Syed Omer Ali, a full stack developer focused on modern web apps, cloud infrastructure, and scalable product engineering.",
    url: "/about",
    images: [
      {
        url: "https://www.syedomer.me/og.png",
        width: 1200,
        height: 630,
        alt: "About - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@SyedOmer17Ali",
    creator: "@SyedOmer17Ali",
    title: "About | Syed Omer Ali",
    description:
      "Learn more about Syed Omer Ali, a full stack developer focused on modern web apps, cloud infrastructure, and scalable product engineering.",
    images: ["https://www.syedomer.me/og.png"],
  },
};

export default function About() {
  return (
    <main>
      <AboutPage />
    </main>
  );
}
