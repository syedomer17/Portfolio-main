import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/lib/caseStudies";
import PageTopBar from "@/components/ui/PageTopBar";

const siteName = "Syed Omer Ali";

export const generateStaticParams = () =>
  caseStudies.map((study) => ({ slug: study.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    };
  }

  const canonical = `/case-studies/${study.slug}`;

  return {
    title: study.title,
    description: study.summary,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${study.title} | ${siteName}`,
      description: study.summary,
      url: canonical,
      images: [
        {
          url: "/banner.png",
          width: 1200,
          height: 630,
          alt: `${study.title} - ${siteName}`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} | ${siteName}`,
      description: study.summary,
      images: ["/banner.png"],
    },
  };
};

export default async function CaseStudySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <PageTopBar title="Case Studies" titleAs="h2" />
          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-6" />
        </div>

        <section className="max-w-2xl mx-auto">
          <p
            className="text-sm text-slate-500"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Case Study
          </p>
          <h1
            className="text-xl font-bold text-slate-900 dark:text-white"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            {study.title}
          </h1>
          <p
            className="mt-4 text-sm text-slate-600 dark:text-slate-300"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            {study.summary}
          </p>
        </section>

        <section className="mt-10 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-semibold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Problem & Constraints
            </h2>
            <p
              className="mt-3 text-sm text-slate-600 dark:text-slate-300"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              {study.problem}
            </p>
            <ul
              className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              {study.constraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-semibold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Solution & Results
            </h2>
            <ul
              className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              {study.solution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul
              className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              {study.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-semibold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Metrics
            </h2>
            <ul
              className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              {study.metrics.map((metric) => (
                <li key={metric.label}>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {metric.label}:
                  </span>{" "}
                  {metric.value}
                  {metric.detail ? ` • ${metric.detail}` : ""}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="text-base font-semibold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Stack & Links
            </h2>
            <p
              className="mt-3 text-sm text-slate-600 dark:text-slate-300"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              {study.techStack.join(", ")}
            </p>
            <div
              className="mt-4 flex flex-wrap gap-3 text-sm"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              <Link
                href={`/projects/${study.projectSlug}`}
                className="underline text-slate-900 dark:text-white"
              >
                Project details
              </Link>
              {study.githubLink ? (
                <Link
                  href={study.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-slate-900 dark:text-white"
                >
                  GitHub repo
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-12 max-w-2xl mx-auto">
          <h2
            className="text-base font-semibold text-slate-900 dark:text-white"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Want to build something similar?
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/services/secure-mern-development"
              className="text-sm underline text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Secure MERN development
            </Link>
            <Link
              href="/services/performance-optimization"
              className="text-sm underline text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Performance optimization
            </Link>
            <Link
              href="/intro-call"
              className="text-sm underline text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Book an intro call
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
