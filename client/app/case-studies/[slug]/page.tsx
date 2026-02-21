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
          url: "/myImage.png",
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
      images: ["/myImage.png"],
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
            className="font-instagram text-slate-500 text-sm"
          >
            Case Study
          </p>
          <h1
            className="dark:text-white font-bold font-instagram text-slate-900 text-xl"
          >
            {study.title}
          </h1>
          <p
            className="dark:text-slate-300 font-instagram mt-4 text-slate-600 text-sm"
          >
            {study.summary}
          </p>
        </section>

        <section className="mt-10 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="dark:text-white font-instagram font-semibold text-base text-slate-900"
            >
              Problem & Constraints
            </h2>
            <p
              className="dark:text-slate-300 font-instagram mt-3 text-slate-600 text-sm"
            >
              {study.problem}
            </p>
            <ul
              className="dark:text-slate-300 font-instagram list-disc list-outside mt-3 pl-5 space-y-2 text-slate-600 text-sm"
            >
              {study.constraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2
              className="dark:text-white font-instagram font-semibold text-base text-slate-900"
            >
              Solution & Results
            </h2>
            <ul
              className="dark:text-slate-300 font-instagram list-disc list-outside mt-3 pl-5 space-y-2 text-slate-600 text-sm"
            >
              {study.solution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul
              className="dark:text-slate-300 font-instagram list-disc list-outside mt-3 pl-5 space-y-2 text-slate-600 text-sm"
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
              className="dark:text-white font-instagram font-semibold text-base text-slate-900"
            >
              Metrics
            </h2>
            <ul
              className="dark:text-slate-300 font-instagram mt-3 space-y-2 text-slate-600 text-sm"
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
              className="dark:text-white font-instagram font-semibold text-base text-slate-900"
            >
              Stack & Links
            </h2>
            <p
              className="dark:text-slate-300 font-instagram mt-3 text-slate-600 text-sm"
            >
              {study.techStack.join(", ")}
            </p>
            <div
              className="flex flex-wrap font-instagram gap-3 mt-4 text-sm"
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
            className="dark:text-white font-instagram font-semibold text-base text-slate-900"
          >
            Want to build something similar?
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/services/secure-mern-development"
              className="dark:text-white font-instagram text-slate-900 text-sm underline"
            >
              Secure MERN development
            </Link>
            <Link
              href="/services/performance-optimization"
              className="dark:text-white font-instagram text-slate-900 text-sm underline"
            >
              Performance optimization
            </Link>
            <Link
              href="/intro-call"
              className="dark:text-white font-instagram text-slate-900 text-sm underline"
            >
              Book an intro call
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
