import type { Metadata } from "next";
import Script from "next/script";
import SyedOmerAliContent from "@/components/page/SyedOmerAliContent";

const siteUrl = "https://www.syedomer.me";

export const metadata: Metadata = {
  title: "Syed Omer Ali - Full Stack Developer & DevSecOps Engineer",
  description:
    "Syed Omer Ali is a Full Stack Developer based in Hyderabad, India, specializing in MERN stack, TypeScript, Next.js, DevSecOps, and AI engineering. Connect with Syed Omer Ali on GitHub, LinkedIn, and other platforms.",
  keywords: [
    "Syed Omer Ali",
    "Syed Omer",
    "Omer Ali",
    "syedomer17",
    "Full Stack Developer",
    "MERN Stack Developer",
    "DevSecOps Engineer",
    "TypeScript Developer",
    "Next.js Developer",
    "Hyderabad Developer",
  ],
  authors: [{ name: "Syed Omer Ali", url: "https://www.syedomer.me" }],
  creator: "Syed Omer Ali",
  alternates: {
    canonical: "/syed-omer-ali",
  },
  openGraph: {
    type: "profile",
    title: "Syed Omer Ali - Full Stack Developer & DevSecOps Engineer",
    description:
      "Syed Omer Ali is a Full Stack Developer based in Hyderabad, India, specializing in MERN stack, TypeScript, Next.js, DevSecOps, and AI engineering.",
    url: `${siteUrl}/syed-omer-ali`,
    images: [
      {
        url: `${siteUrl}/myImage.png`,
        width: 1200,
        height: 630,
        alt: "Syed Omer Ali - Full Stack Developer",
      },
    ],
    firstName: "Syed Omer",
    lastName: "Ali",
    username: "syedomer17",
  },
  twitter: {
    card: "summary_large_image",
    site: "@SyedOmer17Ali",
    creator: "@SyedOmer17Ali",
    title: "Syed Omer Ali - Full Stack Developer & DevSecOps Engineer",
    description:
      "Syed Omer Ali is a Full Stack Developer based in Hyderabad, India, specializing in MERN stack, TypeScript, Next.js, DevSecOps, and AI engineering.",
    images: [`${siteUrl}/myImage.png`],
  },
};

export default function SyedOmerAliPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Syed Omer Ali",
        "item": `${siteUrl}/syed-omer-ali`
      }
    ]
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "dateCreated": "2024-01-01T00:00:00+00:00",
    "dateModified": "2026-02-20T00:00:00+00:00",
    "mainEntity": {
      "@type": "Person",
      "@id": `${siteUrl}#person`,
      "name": "Syed Omer Ali",
      "alternateName": ["Syed Omer", "Omer Ali", "syedomer17"],
      "url": siteUrl,
      "image": `${siteUrl}/myImage.png`,
      "description": "Full Stack Developer specializing in MERN stack, TypeScript, Next.js, DevSecOps, and AI engineering based in Hyderabad, India.",
      "jobTitle": "Full Stack Developer",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Full Stack Developer",
        "occupationLocation": {
          "@type": "City",
          "name": "Hyderabad"
        }
      },
      "knowsAbout": [
        "Full Stack Development",
        "MERN Stack",
        "TypeScript",
        "JavaScript",
        "Next.js",
        "React",
        "Node.js",
        "Express.js",
        "DevSecOps",
        "System Design",
        "AWS",
        "Docker",
        "PostgreSQL",
        "MongoDB",
        "AI Engineering",
        "CI/CD",
        "Security Best Practices"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://github.com/syedomer17",
        "https://www.linkedin.com/in/syedomer17/",
        "https://x.com/SyedOmer17Ali",
        "https://medium.com/@syedomerali2006"
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Syed Omer Ali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Syed Omer Ali is a Full Stack Developer based in Hyderabad, India, specializing in MERN stack development, TypeScript, Next.js, DevSecOps, and AI engineering. He builds scalable web applications and helps teams implement secure, production-ready systems."
        }
      },
      {
        "@type": "Question",
        "name": "What does Syed Omer Ali specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Syed Omer Ali specializes in Full Stack Development using the MERN stack (MongoDB, Express.js, React, Node.js), TypeScript, Next.js, DevSecOps practices, cloud infrastructure (AWS), system design, and AI engineering."
        }
      },
      {
        "@type": "Question",
        "name": "How can I contact Syed Omer Ali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can contact Syed Omer Ali through his website at https://www.syedomer.me, connect on LinkedIn at https://www.linkedin.com/in/syedomer17/, follow on X (Twitter) at https://x.com/SyedOmer17Ali, or check his GitHub profile at https://github.com/syedomer17."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Syed Omer Ali based?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Syed Omer Ali is based in Hyderabad, India, and works remotely with clients globally."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="profile-page-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(profilePageSchema)}
      </Script>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqSchema)}
      </Script>

      <SyedOmerAliContent />
    </>
  );
}
