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
        url: "https://www.syedomer.me/og.png",
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
    images: ["https://www.syedomer.me/og.png"],
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
            className="dark:text-slate-300 font-instagram text-slate-600 text-sm"
          >
            I help startups and SaaS teams ship secure, scalable MERN and TypeScript
            applications with production-ready DevSecOps pipelines.
          </p>
          <ServiceCtas />
        </section>

        <section className="mt-12 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="dark:text-white font-bold font-instagram text-base text-slate-900"
            >
              Secure MERN Development
            </h2>
            <p
              className="dark:text-slate-300 font-instagram mt-3 text-slate-600 text-sm"
            >
              Build hardened APIs, secure authentication, and scalable architecture
              for production-ready web apps.
            </p>
            <Link
              href="/services/secure-mern-development"
              className="dark:text-white font-instagram inline-flex mt-4 text-slate-900 text-sm underline"
            >
              View service details
            </Link>
          </div>

          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="dark:text-white font-bold font-instagram text-base text-slate-900"
            >
              DevSecOps & CI/CD
            </h2>
            <p
              className="dark:text-slate-300 font-instagram mt-3 text-slate-600 text-sm"
            >
              Ship faster with secure pipelines, automated testing, and production
              monitoring.
            </p>
            <Link
              href="/services/devsecops-ci-cd"
              className="dark:text-white font-instagram inline-flex mt-4 text-slate-900 text-sm underline"
            >
              View service details
            </Link>
          </div>

          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="dark:text-white font-bold font-instagram text-base text-slate-900"
            >
              Performance & Scalability
            </h2>
            <p
              className="dark:text-slate-300 font-instagram mt-3 text-slate-600 text-sm"
            >
              Diagnose bottlenecks, optimize APIs, and tune databases to scale.
            </p>
            <Link
              href="/services/performance-optimization"
              className="dark:text-white font-instagram inline-flex mt-4 text-slate-900 text-sm underline"
            >
              View service details
            </Link>
          </div>

          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="dark:text-white font-bold font-instagram text-base text-slate-900"
            >
              Security Audit & Remediation
            </h2>
            <p
              className="dark:text-slate-300 font-instagram mt-3 text-slate-600 text-sm"
            >
              Security reviews, vulnerability fixes, and guardrails for long-term
              safety.
            </p>
            <Link
              href="/services/security-audit-remediation"
              className="dark:text-white font-instagram inline-flex mt-4 text-slate-900 text-sm underline"
            >
              View service details
            </Link>
          </div>
        </section>

        <section className="mt-12 max-w-2xl mx-auto">
          <h2
            className="dark:text-white font-instagram font-semibold text-base text-slate-900"
          >
            Proof of delivery
          </h2>
          <p
            className="dark:text-slate-300 font-instagram mt-3 text-slate-600 text-sm"
          >
            See real builds, architecture decisions, and outcomes in the projects
            and experience sections.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="dark:text-white font-instagram text-slate-900 text-sm underline"
            >
              Projects
            </Link>
            <Link
              href="/experiences"
              className="dark:text-white font-instagram text-slate-900 text-sm underline"
            >
              Experience
            </Link>
            <Link
              href="/blogs"
              className="dark:text-white font-instagram text-slate-900 text-sm underline"
            >
              Technical blog
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
