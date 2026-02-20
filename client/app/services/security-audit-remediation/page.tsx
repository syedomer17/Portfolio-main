import Link from "next/link";
import type { Metadata } from "next";
import PageTopBar from "@/components/ui/PageTopBar";
import ServiceCtas from "@/components/ui/ServiceCtas";

export const metadata: Metadata = {
  title: "Security Audit & Remediation",
  description:
    "Security audits and remediation for MERN and TypeScript apps. Identify risks, fix vulnerabilities, and harden production systems.",
  alternates: {
    canonical: "/services/security-audit-remediation",
  },
  openGraph: {
    title: "Security Audit & Remediation | Syed Omer Ali",
    description:
      "Security audits and remediation for MERN and TypeScript apps. Identify risks, fix vulnerabilities, and harden production systems.",
    url: "/services/security-audit-remediation",
    images: [
      {
        url: "/myImage.png",
        width: 1200,
        height: 630,
        alt: "Security Audit & Remediation - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Audit & Remediation | Syed Omer Ali",
    description:
      "Security audits and remediation for MERN and TypeScript apps. Identify risks, fix vulnerabilities, and harden production systems.",
    images: ["/myImage.png"],
  },
};

export default function SecurityAuditRemediationPage() {
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
            Security Audit & Remediation
          </h1>
          <p
            className="mt-4 text-sm text-slate-600 dark:text-slate-300"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Identify vulnerabilities, close security gaps, and harden your MERN
            stack for production. I focus on practical fixes with measurable risk
            reduction.
          </p>
          <ServiceCtas />
        </section>

        <section className="mt-12 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-semibold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Audit focus areas
            </h2>
            <ul
              className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-outside pl-5"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              <li>Authentication and authorization flows.</li>
              <li>Input validation, rate limiting, and abuse protection.</li>
              <li>Dependency and supply-chain vulnerabilities.</li>
              <li>Infrastructure and deployment hardening.</li>
            </ul>
          </div>
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-semibold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Remediation deliverables
            </h2>
            <ul
              className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-outside pl-5"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              <li>Prioritized findings with severity ratings.</li>
              <li>Hands-on fixes and secure coding patterns.</li>
              <li>Post-remediation validation and reporting.</li>
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
