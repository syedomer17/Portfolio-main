import Link from "next/link";
import type { Metadata } from "next";
import PageTopBar from "@/components/ui/PageTopBar";

export const metadata: Metadata = {
  title: "DevSecOps & CI/CD",
  description:
    "DevSecOps pipelines for MERN and TypeScript apps with automated testing, security scanning, and production monitoring.",
  alternates: {
    canonical: "/services/devsecops-ci-cd",
  },
  openGraph: {
    title: "DevSecOps & CI/CD | Syed Omer Ali",
    description:
      "DevSecOps pipelines for MERN and TypeScript apps with automated testing, security scanning, and production monitoring.",
    url: "/services/devsecops-ci-cd",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "DevSecOps & CI/CD - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevSecOps & CI/CD | Syed Omer Ali",
    description:
      "DevSecOps pipelines for MERN and TypeScript apps with automated testing, security scanning, and production monitoring.",
    images: ["/banner.png"],
  },
};

export default function DevSecOpsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <PageTopBar title="Services" titleAs="h2" />
          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-6" />
        </div>

        <section className="max-w-2xl mx-auto">
          <h1
            className="text-xl font-bold text-slate-900 dark:text-white"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            DevSecOps & CI/CD for Secure Delivery
          </h1>
          <p
            className="mt-4 text-sm text-slate-600 dark:text-slate-300"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Build automated pipelines that ship fast without sacrificing security.
            I implement testing, scanning, and release workflows for MERN and
            TypeScript applications.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/intro-call"
              className="px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Book an intro call
            </Link>
            <Link
              href="/send-email"
              className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Send a project brief
            </Link>
          </div>
        </section>

        <section className="mt-12 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-semibold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              What you get
            </h2>
            <ul
              className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              <li>Automated build, test, and release pipelines.</li>
              <li>Security scanning for dependencies and containers.</li>
              <li>Release gates, rollbacks, and environment promotion.</li>
              <li>Monitoring, logging, and alerting basics.</li>
            </ul>
          </div>
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-semibold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Ideal for
            </h2>
            <ul
              className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              <li>Startups moving from manual deploys to automation.</li>
              <li>Teams needing secure releases and auditability.</li>
              <li>Products with reliability and uptime requirements.</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 max-w-2xl mx-auto">
          <h2
            className="text-base font-semibold text-slate-900 dark:text-white"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Related work
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="text-sm underline text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Projects
            </Link>
            <Link
              href="/blogs"
              className="text-sm underline text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Technical blog
            </Link>
            <Link
              href="/services/secure-mern-development"
              className="text-sm underline text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Secure MERN development
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
