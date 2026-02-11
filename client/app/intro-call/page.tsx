import { IntroCallPage } from "@/components/page/IntroCall";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intro Call",
  description:
    "Schedule an intro call with Syed Omer Ali to discuss projects, roles, or collaboration.",
  alternates: {
    canonical: "/intro-call",
  },
  openGraph: {
    title: "Intro Call | Syed Omer Ali",
    description:
      "Schedule an intro call with Syed Omer Ali to discuss projects, roles, or collaboration.",
    url: "/intro-call",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Intro Call - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intro Call | Syed Omer Ali",
    description:
      "Schedule an intro call with Syed Omer Ali to discuss projects, roles, or collaboration.",
    images: ["/banner.png"],
  },
};

const IntroCall = () => {
  return (
    <main>
      <IntroCallPage />
    </main>
  )
}

export default IntroCall
