import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { instagramSans } from "@/lib/fonts";
import ThemeProviderClient from "@/components/Providers/ThemeProviderClient";
import { LazyProvidersLoader, LazyAnalyticsProviders } from "@/components/Providers/LazyProviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
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
        url: `${siteUrl}/myImage.avif`,
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
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/myImage.avif`,
        width: 1200,
        height: 675,
        alt: "Syed Omer Ali - Full Stack Developer",
      },
    ],
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read the nonce injected by middleware.ts via the x-nonce request header.
  // This nonce is included in the Content-Security-Policy so these inline
  // scripts are executed without needing 'unsafe-inline'.
  const nonce = (await headers()).get("x-nonce") ?? "";
  return (
    <html lang="en">
      <head>
        {/* Expose nonce to client components that dynamically create scripts.
            Reading from <meta> is safer than a global variable because it cannot
            be enumerated by third-party scripts scanning window properties. */}
        <meta name="csp-nonce" content={nonce} />

        {/* CRITICAL: Detect and apply theme BEFORE React hydrates to prevent flash/re-render */}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch {}
            `,
          }}
        />

        {/* Font preload hints - critical for LCP */}
        <link
          rel="preload"
          as="font"
          href="/fonts/new/Instagram Sans.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/fonts/new/Instagram Sans Medium.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/fonts/new/Instagram Sans Bold.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instagramSans.variable} antialiased`}
      >
        {/* Structured Data for SEO - native script, no client JS overhead */}
        <script
          nonce={nonce}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />

        {/* Minimal theme provider - only global client boundary */}
        <ThemeProviderClient>
          {/* Lazy-loaded features that don't block initial render */}
          <LazyProvidersLoader>
            <main>{children}</main>
          </LazyProvidersLoader>
        </ThemeProviderClient>

        {/* Analytics lazy-loaded after page is idle */}
        <LazyAnalyticsProviders />
      </body>
    </html>
  );
}
