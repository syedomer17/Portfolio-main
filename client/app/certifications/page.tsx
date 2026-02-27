import CertificationsPage from "@/components/page/Certifications";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Certifications earned by Syed Omer Ali in software engineering, cloud, and DevOps.",
  alternates: {
    canonical: "/certifications",
  },
  openGraph: {
    title: "Certifications | Syed Omer Ali",
    description:
      "Certifications earned by Syed Omer Ali in software engineering, cloud, and DevOps.",
    url: "/certifications",
    images: [
      {
        url: "https://www.syedomer.me/og.png",
        width: 1200,
        height: 630,
        alt: "Certifications - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certifications | Syed Omer Ali",
    description:
      "Certifications earned by Syed Omer Ali in software engineering, cloud, and DevOps.",
    images: ["https://www.syedomer.me/og.png"],
  },
};

const Certifications = () => {
  return (
    <main>
      <CertificationsPage />
    </main>
  )
}

export default Certifications
