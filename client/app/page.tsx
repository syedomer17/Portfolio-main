import Hero from "@/components/sections/Hero";
import HomeSections from "@/components/page/HomeSections";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syed Omer Ali",
  description:
    "Portfolio of Syed Omer Ali, a full stack MERN developer focused on TypeScript, DevSecOps, and secure scalable systems.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Syed Omer Ali",
    description:
      "Portfolio of Syed Omer Ali, a full stack MERN developer focused on TypeScript, DevSecOps, and secure scalable systems.",
    url: "/",
    images: [
      {
        url: "/myImage.png",
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
      "Portfolio of Syed Omer Ali, a full stack MERN developer focused on TypeScript, DevSecOps, and secure scalable systems.",
    images: ["/myImage.png"],
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
