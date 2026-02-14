import Link from "next/link";
import type { Metadata } from "next";
import PageTopBar from "@/components/ui/PageTopBar";
import ServiceCtas from "@/components/ui/ServiceCtas";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Security-first MERN and TypeScript development services focused on scalable, production-ready web apps.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Syed Omer Ali",
    description:
      "Security-first MERN and TypeScript development services focused on scalable, production-ready web apps.",
    url: "/services",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Services - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Syed Omer Ali",
    description:
      "Security-first MERN and TypeScript development services focused on scalable, production-ready web apps.",
    images: ["/banner.png"],
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <PageTopBar title="Services" />
          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-6" />
        </div>

        <section className="max-w-2xl mx-auto">
          <p
            className="text-sm text-slate-600 dark:text-slate-300"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            I help startups and SaaS teams ship secure, scalable MERN and TypeScript
            applications with production-ready DevSecOps pipelines.
          </p>
          <ServiceCtas />
        </section>

        <section className="mt-12 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Secure MERN Development
            </h2>
            <p
              className="mt-3 text-sm text-slate-600 dark:text-slate-300"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Build hardened APIs, secure authentication, and scalable architecture
              for production-ready web apps.
            </p>
            <Link
              href="/services/secure-mern-development"
              className="mt-4 inline-flex text-sm text-slate-900 dark:text-white underline"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              View service details
            </Link>
          </div>

          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              DevSecOps & CI/CD
            </h2>
            <p
              className="mt-3 text-sm text-slate-600 dark:text-slate-300"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Ship faster with secure pipelines, automated testing, and production
              monitoring.
            </p>
            <Link
              href="/services/devsecops-ci-cd"
              className="mt-4 inline-flex text-sm text-slate-900 dark:text-white underline"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              View service details
            </Link>
          </div>

          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Performance & Scalability
            </h2>
            <p
              className="mt-3 text-sm text-slate-600 dark:text-slate-300"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Diagnose bottlenecks, optimize APIs, and tune databases to scale.
            </p>
            <Link
              href="/services/performance-optimization"
              className="mt-4 inline-flex text-sm text-slate-900 dark:text-white underline"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              View service details
            </Link>
          </div>

          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Security Audit & Remediation
            </h2>
            <p
              className="mt-3 text-sm text-slate-600 dark:text-slate-300"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Security reviews, vulnerability fixes, and guardrails for long-term
              safety.
            </p>
            <Link
              href="/services/security-audit-remediation"
              className="mt-4 inline-flex text-sm text-slate-900 dark:text-white underline"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              View service details
            </Link>
          </div>
        </section>

        <section className="mt-12 max-w-2xl mx-auto">
          <h2
            className="text-base font-semibold text-slate-900 dark:text-white"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Proof of delivery
          </h2>
          <p
            className="mt-3 text-sm text-slate-600 dark:text-slate-300"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            See real builds, architecture decisions, and outcomes in the projects
            and experience sections.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="text-sm underline text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Projects
            </Link>
            <Link
              href="/experiences"
              className="text-sm underline text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Experience
            </Link>
            <Link
              href="/blogs"
              className="text-sm underline text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Technical blog
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
