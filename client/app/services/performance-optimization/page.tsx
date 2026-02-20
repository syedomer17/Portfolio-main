import Link from "next/link";
import type { Metadata } from "next";
import PageTopBar from "@/components/ui/PageTopBar";
import ServiceCtas from "@/components/ui/ServiceCtas";

export const metadata: Metadata = {
  title: "Performance Optimization",
  description:
    "Performance and scalability optimization for MERN and TypeScript apps with measurable speed improvements.",
  alternates: {
    canonical: "/services/performance-optimization",
  },
  openGraph: {
    title: "Performance Optimization | Syed Omer Ali",
    description:
      "Performance and scalability optimization for MERN and TypeScript apps with measurable speed improvements.",
    url: "/services/performance-optimization",
    images: [
      {
        url: "/myImage.png",
        width: 1200,
        height: 630,
        alt: "Performance Optimization - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Performance Optimization | Syed Omer Ali",
    description:
      "Performance and scalability optimization for MERN and TypeScript apps with measurable speed improvements.",
    images: ["/myImage.png"],
  },
};

export default function PerformanceOptimizationPage() {
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
            Performance & Scalability Optimization
          </h1>
          <p
            className="mt-4 text-sm text-slate-600 dark:text-slate-300"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Diagnose slow pages, API bottlenecks, and database hotspots. I deliver
            measurable improvements to speed, reliability, and scale.
          </p>
          <ServiceCtas />
        </section>

        <section className="mt-12 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-semibold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              What gets optimized
            </h2>
            <ul
              className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-outside pl-5"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              <li>React rendering and hydration bottlenecks.</li>
              <li>API response times and server-side latency.</li>
              <li>Database queries, indexing, and caching.</li>
              <li>Asset loading, bundle size, and CDN strategy.</li>
            </ul>
          </div>
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-semibold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Deliverables
            </h2>
            <ul
              className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-outside pl-5"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              <li>Performance audit report with prioritized fixes.</li>
              <li>Implementation of the highest-impact improvements.</li>
              <li>Before/after metrics and monitoring guidance.</li>
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
