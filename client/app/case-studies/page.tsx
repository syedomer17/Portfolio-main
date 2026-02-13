import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies } from "@/lib/caseStudies";
import PageTopBar from "@/components/ui/PageTopBar";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Case studies showcasing secure, scalable MERN and TypeScript engineering work with measurable outcomes.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Case Studies | Syed Omer Ali",
    description:
      "Case studies showcasing secure, scalable MERN and TypeScript engineering work with measurable outcomes.",
    url: "/case-studies",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Case Studies - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Syed Omer Ali",
    description:
      "Case studies showcasing secure, scalable MERN and TypeScript engineering work with measurable outcomes.",
    images: ["/banner.png"],
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <PageTopBar title="Case Studies" />
          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-6" />
        </div>

        <section className="max-w-2xl mx-auto">
          <p
            className="text-sm text-slate-600 dark:text-slate-300"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Compact case studies that highlight the problem, constraints, technical
            approach, and measurable results.
          </p>
        </section>

        <section className="mt-10 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-400 transition-colors"
            >
              <h2
                className="text-base font-bold text-slate-900 dark:text-white"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
              >
                {study.title}
              </h2>
              <p
                className="mt-3 text-sm text-slate-600 dark:text-slate-300"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
              >
                {study.summary}
              </p>
              <span
                className="mt-4 inline-flex text-sm text-slate-500"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
              >
                View case study
              </span>
            </Link>
          ))}
        </section>

        <section className="mt-12 max-w-2xl mx-auto">
          <h2
            className="text-base font-semibold text-slate-900 dark:text-white"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Want the full story?
          </h2>
          <p
            className="mt-3 text-sm text-slate-600 dark:text-slate-300"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Reach out for a deeper walkthrough and project context.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/intro-call"
              className="text-sm underline text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Book an intro call
            </Link>
            <Link
              href="/send-email"
              className="text-sm underline text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Send a project brief
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
