import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.syedomer.me";
const siteName = "Syed Omer Ali";
const defaultTitle = "Syed Omer Ali | MERN Stack Developer & DevSecOps Engineer";
const defaultDescription =
  "Syed Omer Ali is a full stack MERN developer specializing in TypeScript, DevSecOps, and building secure, scalable systems for SaaS and startups.";


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },

  description: defaultDescription,

  authors: [{ name: "Syed Omer Ali", url: "https://www.syedomer.me" }],
  creator: "Syed Omer Ali",
  publisher: "Syed Omer Ali",

  verification: {
    google: "IeKi-eX5enCHjuok5UJG5pTXHPdm0nhIpPBqMUM7Uak",
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    siteName,
    images: [
      {
        url: `${siteUrl}/myImage.png`,
        width: 1200,
        height: 630,
        alt: "Syed Omer Ali - Full Stack Developer",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [`${siteUrl}/myImage.png`],
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Structured Data for SEO */}
        <Script
          id="site-json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${siteUrl}#person`,
                name: "Syed Omer Ali",
                alternateName: ["Syed Omer", "Omer Ali", "syedomer17"],
                url: siteUrl,
                image: `${siteUrl}/myImage.png`,
                description: defaultDescription,
                jobTitle: "Full Stack Developer",
                hasOccupation: {
                  "@type": "Occupation",
                  name: "Full Stack Developer",
                  occupationLocation: {
                    "@type": "City",
                    name: "Hyderabad"
                  }
                },
                knowsAbout: [
                  "Full Stack Development",
                  "MERN Stack",
                  "TypeScript",
                  "JavaScript",
                  "Next.js",
                  "React",
                  "Node.js",
                  "DevSecOps",
                  "System Design",
                  "AWS",
                  "Docker",
                  "PostgreSQL",
                  "MongoDB",
                  "AI Engineering"
                ],
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Hyderabad",
                  addressCountry: "IN"
                },
                sameAs: [
                  "https://github.com/syedomer17",
                  "https://www.linkedin.com/in/syedomer17/",
                  "https://x.com/SyedOmer17Ali",
                  "https://medium.com/@syedomerali2006"
                ]
              },
              {
                "@type": "WebSite",
                "@id": `${siteUrl}#website`,
                name: siteName,
                url: siteUrl,
                inLanguage: "en-US",
                author: {
                  "@id": `${siteUrl}#person`
                },
                publisher: {
                  "@id": `${siteUrl}#person`
                }
              }
            ]
          })}
        </Script>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
