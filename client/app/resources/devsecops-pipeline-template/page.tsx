import Link from "next/link";
import type { Metadata } from "next";
import PageTopBar from "@/components/ui/PageTopBar";

export const metadata: Metadata = {
  title: "DevSecOps Pipeline Template",
  description:
    "A DevSecOps pipeline template for MERN and TypeScript teams with security scanning and deployment gates.",
  alternates: {
    canonical: "/resources/devsecops-pipeline-template",
  },
  openGraph: {
    title: "DevSecOps Pipeline Template | Syed Omer Ali",
    description:
      "A DevSecOps pipeline template for MERN and TypeScript teams with security scanning and deployment gates.",
    url: "/resources/devsecops-pipeline-template",
    images: [
      {
        url: "/myImage.png",
        width: 1200,
        height: 630,
        alt: "DevSecOps Pipeline Template - Syed Omer Ali",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevSecOps Pipeline Template | Syed Omer Ali",
    description:
      "A DevSecOps pipeline template for MERN and TypeScript teams with security scanning and deployment gates.",
    images: ["/myImage.png"],
  },
};

export default function DevSecOpsPipelineTemplatePage() {
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
            DevSecOps Pipeline Template
          </h1>
          <p
            className="mt-4 text-sm text-slate-600 dark:text-slate-300"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            A practical pipeline blueprint for secure builds, tests, and releases.
            Adapt this to GitHub Actions, GitLab CI, or similar.
          </p>
        </section>

        <section
          className="mt-10 max-w-2xl mx-auto space-y-6 text-sm text-slate-600 dark:text-slate-300"
          style={{ fontFamily: '"Instagram Sans", sans-serif' }}
        >
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Pipeline Stages
            </h2>
            <ol className="mt-3 space-y-2 list-decimal list-outside pl-5">
              <li>Install and cache dependencies.</li>
              <li>Run tests and linting checks.</li>
              <li>Run SAST and dependency vulnerability scans.</li>
              <li>Build and bundle artifacts.</li>
              <li>Deploy to staging with automated smoke tests.</li>
              <li>Release to production with manual approval gate.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Security Gates
            </h2>
            <ul className="mt-3 space-y-2 list-disc list-outside pl-5">
              <li>Fail builds on critical vulnerabilities.</li>
              <li>Block deployments without passing tests.</li>
              <li>Tag releases and keep audit logs.</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 max-w-2xl mx-auto">
          <Link
            href="/services/devsecops-ci-cd"
            className="text-sm underline text-slate-900 dark:text-white"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Need a production pipeline?
          </Link>
        </section>
      </div>
    </main>
  );
}
