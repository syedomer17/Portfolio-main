import Link from "next/link";
import type { Metadata } from "next";
import PageTopBar from "@/components/ui/PageTopBar";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Security-first resources for MERN and TypeScript developers. Checklists, templates, and implementation guides.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Resources | Syed Omer Ali",
    description:
      "Security-first resources for MERN and TypeScript developers. Checklists, templates, and implementation guides.",
    url: "/resources",
    images: [
      {
        url: "https://www.syedomer.me/og.png",
        width: 1200,
        height: 630,
        alt: "Resources - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | Syed Omer Ali",
    description:
      "Security-first resources for MERN and TypeScript developers. Checklists, templates, and implementation guides.",
    images: ["https://www.syedomer.me/og.png"],
  },
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <PageTopBar title="Resources" />
          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-6" />
        </div>

        <section className="max-w-2xl mx-auto">
          <p
            className="dark:text-slate-300 font-instagram text-slate-600 text-sm"
          >
            Practical checklists and implementation guides to help teams build
            secure, scalable web apps.
          </p>
        </section>

        <section className="mt-10 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/resources/mern-security-checklist"
            className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-400 transition-colors"
          >
            <h2
              className="dark:text-white font-bold font-instagram text-base text-slate-900"
            >
              MERN Security Checklist
            </h2>
            <p
              className="dark:text-slate-300 font-instagram mt-3 text-slate-600 text-sm"
            >
              A practical checklist for hardening MERN apps before launch.
            </p>
          </Link>

          <Link
            href="/resources/devsecops-pipeline-template"
            className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-400 transition-colors"
          >
            <h2
              className="dark:text-white font-bold font-instagram text-base text-slate-900"
            >
              DevSecOps Pipeline Template
            </h2>
            <p
              className="dark:text-slate-300 font-instagram mt-3 text-slate-600 text-sm"
            >
              A starter workflow with security scanning and quality gates.
            </p>
          </Link>

          <Link
            href="/resources/secure-auth-implementation-guide"
            className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-400 transition-colors"
          >
            <h2
              className="dark:text-white font-bold font-instagram text-base text-slate-900"
            >
              Secure Auth Implementation Guide
            </h2>
            <p
              className="dark:text-slate-300 font-instagram mt-3 text-slate-600 text-sm"
            >
              Patterns for authentication, sessions, and authorization.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}
