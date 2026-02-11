import ExperiencesPage from "@/components/page/Experiences";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Syed Omer Ali across full stack, DevOps, and cloud roles.",
  alternates: {
    canonical: "/experiences",
  },
  openGraph: {
    title: "Experience | Syed Omer Ali",
    description:
      "Professional experience of Syed Omer Ali across full stack, DevOps, and cloud roles.",
    url: "/experiences",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Experience - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Syed Omer Ali",
    description:
      "Professional experience of Syed Omer Ali across full stack, DevOps, and cloud roles.",
    images: ["/banner.png"],
  },
};

const Experience = () => {
  return (
    <main>
      <ExperiencesPage />
    </main>
  )
}

export default Experience
