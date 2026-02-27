import type { Metadata } from "next";

import Syedomer17 from "../../components/page/Syedomer17";

export const metadata: Metadata = {
  title: "GitHub Contributions",
  description:
    "GitHub contribution history for syedomer17, including yearly activity graphs and totals.",
  alternates: {
    canonical: "/syedomer17",
  },
  openGraph: {
    title: "GitHub Contributions | Syed Omer Ali",
    description:
      "GitHub contribution history for syedomer17, including yearly activity graphs and totals.",
    url: "/syedomer17",
    images: [
      {
        url: "https://www.syedomer.me/og.png",
        width: 1200,
        height: 630,
        alt: "GitHub Contributions - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Contributions | Syed Omer Ali",
    description:
      "GitHub contribution history for syedomer17, including yearly activity graphs and totals.",
    images: ["https://www.syedomer.me/og.png"],
  },
};

export default function SyedOmer17Page() {
  return <Syedomer17 />;
}
