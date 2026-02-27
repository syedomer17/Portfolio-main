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
        url: "https://www.syedomer.me/og.png",
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
    images: ["https://www.syedomer.me/og.png"],
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
            className="dark:text-white font-bold font-instagram text-slate-900 text-xl"
          >
            Performance & Scalability Optimization
          </h1>
          <p
            className="dark:text-slate-300 font-instagram mt-4 text-slate-600 text-sm"
          >
            Diagnose slow pages, API bottlenecks, and database hotspots. I deliver
            measurable improvements to speed, reliability, and scale.
          </p>
          <ServiceCtas />
        </section>

        <section className="mt-12 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="dark:text-white font-instagram font-semibold text-base text-slate-900"
            >
              What gets optimized
            </h2>
            <ul
              className="dark:text-slate-300 font-instagram list-disc list-outside mt-4 pl-5 space-y-2 text-slate-600 text-sm"
            >
              <li>React rendering and hydration bottlenecks.</li>
              <li>API response times and server-side latency.</li>
              <li>Database queries, indexing, and caching.</li>
              <li>Asset loading, bundle size, and CDN strategy.</li>
            </ul>
          </div>
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="dark:text-white font-instagram font-semibold text-base text-slate-900"
            >
              Deliverables
            </h2>
            <ul
              className="dark:text-slate-300 font-instagram list-disc list-outside mt-4 pl-5 space-y-2 text-slate-600 text-sm"
            >
              <li>Performance audit report with prioritized fixes.</li>
              <li>Implementation of the highest-impact improvements.</li>
              <li>Before/after metrics and monitoring guidance.</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 max-w-2xl mx-auto">
          <h2
            className="dark:text-white font-instagram font-semibold text-base text-slate-900"
          >
            Related work
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="dark:text-white font-instagram text-slate-900 text-sm underline"
            >
              Projects
            </Link>
            <Link
              href="/blogs"
              className="dark:text-white font-instagram text-slate-900 text-sm underline"
            >
              Technical blog
            </Link>
            <Link
              href="/services/secure-mern-development"
              className="dark:text-white font-instagram text-slate-900 text-sm underline"
            >
              Secure MERN development
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
