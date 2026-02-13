import type { Metadata } from "next";
import AboutPage from "@/components/page/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Syed Omer Ali, a full stack developer focused on modern web apps, cloud infrastructure, and scalable product engineering.",
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
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "About - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Syed Omer Ali",
    description:
      "Learn more about Syed Omer Ali, a full stack developer focused on modern web apps, cloud infrastructure, and scalable product engineering.",
    images: ["/banner.png"],
  },
};

export default function About() {
  return (
    <main>
      <AboutPage />
    </main>
  );
}
