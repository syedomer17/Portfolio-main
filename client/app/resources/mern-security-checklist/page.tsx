import Link from "next/link";
import type { Metadata } from "next";
import PageTopBar from "@/components/ui/PageTopBar";

export const metadata: Metadata = {
  title: "MERN Security Checklist",
  description:
    "A practical pre-launch security checklist for MERN apps covering auth, validation, rate limiting, and monitoring.",
  alternates: {
    canonical: "/resources/mern-security-checklist",
  },
  openGraph: {
    title: "MERN Security Checklist | Syed Omer Ali",
    description:
      "A practical pre-launch security checklist for MERN apps covering auth, validation, rate limiting, and monitoring.",
    url: "/resources/mern-security-checklist",
    images: [
      {
        url: "https://www.syedomer.me/og.png",
        width: 1200,
        height: 630,
        alt: "MERN Security Checklist - Syed Omer Ali",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "MERN Security Checklist | Syed Omer Ali",
    description:
      "A practical pre-launch security checklist for MERN apps covering auth, validation, rate limiting, and monitoring.",
    images: ["https://www.syedomer.me/og.png"],
  },
};

export default function MernSecurityChecklistPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <PageTopBar title="Resources" titleAs="h2" />
          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-6" />
        </div>

        <section className="max-w-2xl mx-auto">
          <h1
            className="dark:text-white font-bold font-instagram text-slate-900 text-xl"
          >
            MERN Security Checklist
          </h1>
          <p
            className="dark:text-slate-300 font-instagram mt-4 text-slate-600 text-sm"
          >
            Use this checklist to validate security and resilience before launching
            a MERN application.
          </p>
        </section>

        <section
          className="dark:text-slate-300 font-instagram max-w-2xl mt-10 mx-auto space-y-6 text-slate-600 text-sm"
        >
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Authentication
            </h2>
            <ul className="mt-3 space-y-2 list-disc list-outside pl-5">
              <li>Use secure session handling or short-lived JWTs with refresh rotation.</li>
              <li>Enforce password strength and rate limiting on auth routes.</li>
              <li>Implement MFA where possible for admin roles.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              API Protection
            </h2>
            <ul className="mt-3 space-y-2 list-disc list-outside pl-5">
              <li>Validate all inputs and sanitize payloads.</li>
              <li>Apply rate limiting, abuse detection, and request logging.</li>
              <li>Return consistent error responses without leaking internals.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Data Layer
            </h2>
            <ul className="mt-3 space-y-2 list-disc list-outside pl-5">
              <li>Use least-privilege database roles.</li>
              <li>Encrypt sensitive data at rest and in transit.</li>
              <li>Monitor slow queries and ensure index coverage.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              DevSecOps
            </h2>
            <ul className="mt-3 space-y-2 list-disc list-outside pl-5">
              <li>Enable dependency scanning and container image checks.</li>
              <li>Automate build and release gates.</li>
              <li>Monitor production errors and security alerts.</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 max-w-2xl mx-auto">
          <Link
            href="/services/security-audit-remediation"
            className="dark:text-white font-instagram text-slate-900 text-sm underline"
          >
            Need a security audit?
          </Link>
        </section>
      </div>
    </main>
  );
}
