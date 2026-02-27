import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import PageTopBar from "@/components/ui/PageTopBar";
import ServiceCtas from "@/components/ui/ServiceCtas";

const faqItems = [
  {
    question: "How do you secure MERN applications?",
    answer:
      "I apply OWASP best practices, harden auth flows, validate inputs, implement rate limiting, and set up monitoring and security scans in CI/CD.",
  },
  {
    question: "Can you work with an existing codebase?",
    answer:
      "Yes. I audit the current stack, prioritize risks, and ship fixes with a clear remediation plan and measurable impact.",
  },
  {
    question: "What does a typical engagement look like?",
    answer:
      "Discovery and audit, architecture plan, implementation, then production handoff with documentation and DevSecOps automation.",
  },
  {
    question: "Do you help with performance and scaling too?",
    answer:
      "Yes. I optimize API response times, database queries, caching layers, and frontend performance to scale safely.",
  },
];

export const metadata: Metadata = {
  title: "Secure MERN Development",
  description:
    "Security-first MERN development for scalable SaaS apps. Hardened APIs, secure auth, and production-ready delivery.",
  alternates: {
    canonical: "/services/secure-mern-development",
  },
  openGraph: {
    title: "Secure MERN Development | Syed Omer Ali",
    description:
      "Security-first MERN development for scalable SaaS apps. Hardened APIs, secure auth, and production-ready delivery.",
    url: "/services/secure-mern-development",
    images: [
      {
        url: "https://www.syedomer.me/og.png",
        width: 1200,
        height: 630,
        alt: "Secure MERN Development - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure MERN Development | Syed Omer Ali",
    description:
      "Security-first MERN development for scalable SaaS apps. Hardened APIs, secure auth, and production-ready delivery.",
    images: ["https://www.syedomer.me/og.png"],
  },
};

export default function SecureMernDevelopmentPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <Script id="secure-mern-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <PageTopBar title="Services" titleAs="h2" />
          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-6" />
        </div>

        <section className="max-w-2xl mx-auto">
          <h1
            className="dark:text-white font-bold font-instagram text-slate-900 text-xl"
          >
            Secure MERN Development for Production-Ready SaaS
          </h1>
          <p
            className="dark:text-slate-300 font-instagram mt-4 text-slate-600 text-sm"
          >
            Build and harden MERN applications with TypeScript, security-first
            architecture, and DevSecOps automation. Ideal for startups that need
            speed without compromising safety.
          </p>
          <ServiceCtas />
        </section>

        <section className="mt-12 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="dark:text-white font-instagram font-semibold text-base text-slate-900"
            >
              Outcomes you can expect
            </h2>
            <ul
              className="dark:text-slate-300 font-instagram list-disc list-outside mt-4 pl-5 space-y-2 text-slate-600 text-sm"
            >
              <li>Reduced security risk through hardened auth and input validation.</li>
              <li>Stable performance with database tuning and caching strategy.</li>
              <li>Production readiness with CI/CD security scanning and monitoring.</li>
            </ul>
          </div>
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="dark:text-white font-instagram font-semibold text-base text-slate-900"
            >
              What is included
            </h2>
            <ul
              className="dark:text-slate-300 font-instagram list-disc list-outside mt-4 pl-5 space-y-2 text-slate-600 text-sm"
            >
              <li>Architecture review and threat modeling.</li>
              <li>Secure API and data layer implementation.</li>
              <li>Frontend validation, performance profiling, and fixes.</li>
              <li>DevSecOps pipeline and production monitoring setup.</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 max-w-2xl mx-auto">
          <h2
            className="dark:text-white font-instagram font-semibold text-base text-slate-900"
          >
            Proof and process
          </h2>
          <p
            className="dark:text-slate-300 font-instagram mt-3 text-slate-600 text-sm"
          >
            I document the architecture decisions, tradeoffs, and outcomes so your
            team can maintain and extend the system confidently.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="dark:text-white font-instagram text-slate-900 text-sm underline"
            >
              View projects
            </Link>
            <Link
              href="/blogs"
              className="dark:text-white font-instagram text-slate-900 text-sm underline"
            >
              Read technical deep dives
            </Link>
          </div>
        </section>

        <section className="mt-12 max-w-2xl mx-auto">
          <h2
            className="dark:text-white font-instagram font-semibold text-base text-slate-900"
          >
            FAQ
          </h2>
          <div className="mt-4 space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3
                  className="dark:text-white font-instagram font-semibold text-base text-slate-900"
                >
                  {item.question}
                </h3>
                <p
                  className="dark:text-slate-300 font-instagram mt-2 text-slate-600 text-sm"
                >
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
