import Link from "next/link";
import type { Metadata } from "next";
import PageTopBar from "@/components/ui/PageTopBar";

export const metadata: Metadata = {
  title: "Secure Auth Implementation Guide",
  description:
    "A practical guide to secure authentication and authorization for MERN and TypeScript applications.",
  alternates: {
    canonical: "/resources/secure-auth-implementation-guide",
  },
  openGraph: {
    title: "Secure Auth Implementation Guide | Syed Omer Ali",
    description:
      "A practical guide to secure authentication and authorization for MERN and TypeScript applications.",
    url: "/resources/secure-auth-implementation-guide",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Secure Auth Implementation Guide - Syed Omer Ali",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure Auth Implementation Guide | Syed Omer Ali",
    description:
      "A practical guide to secure authentication and authorization for MERN and TypeScript applications.",
    images: ["/banner.png"],
  },
};

export default function SecureAuthImplementationGuidePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <PageTopBar title="Resources" titleAs="h2" />
          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-6" />
        </div>

        <section className="max-w-2xl mx-auto">
          <h1
            className="text-xl font-bold text-slate-900 dark:text-white"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Secure Auth Implementation Guide
          </h1>
          <p
            className="mt-4 text-sm text-slate-600 dark:text-slate-300"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            A simple framework for secure authentication, session handling, and
            authorization in MERN and TypeScript applications.
          </p>
        </section>

        <section
          className="mt-10 max-w-2xl mx-auto space-y-6 text-sm text-slate-600 dark:text-slate-300"
          style={{ fontFamily: '"Instagram Sans", sans-serif' }}
        >
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Core Principles
            </h2>
            <ul className="mt-3 space-y-2 list-disc list-outside pl-5">
              <li>Prefer short-lived access tokens with refresh rotation.</li>
              <li>Store sensitive tokens in httpOnly cookies.</li>
              <li>Use RBAC or ABAC for authorization logic.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Hardening Tips
            </h2>
            <ul className="mt-3 space-y-2 list-disc list-outside pl-5">
              <li>Throttle login and reset attempts.</li>
              <li>Audit session creation and revocation.</li>
              <li>Log auth failures and monitor anomalies.</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 max-w-2xl mx-auto">
          <Link
            href="/services/secure-mern-development"
            className="text-sm underline text-slate-900 dark:text-white"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Need help implementing auth securely?
          </Link>
        </section>
      </div>
    </main>
  );
}
