import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Award, Calendar, CheckCircle2 } from "lucide-react";
import {
  certifications,
  getCertificationBySlug,
} from "@/lib/certifications";
import PageTopBar from "@/components/ui/PageTopBar";

const siteName = "Syed Omer Ali";
const siteUrl = "https://www.syedomer.me";

export const generateStaticParams = () =>
  certifications.map((certification) => ({ slug: certification.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const certification = getCertificationBySlug(slug);

  if (!certification) {
    return {
      title: "Certification Not Found",
      description: "The requested certification could not be found.",
    };
  }

  const canonical = `/certifications/${certification.slug}`;

  return {
    title: certification.title,
    description: certification.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${certification.title} | ${siteName}`,
      description: certification.description,
      url: canonical,
      images: [
        {
          url: `${siteUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: `${certification.title} - ${siteName}`,
          type: "image/png",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${certification.title} | ${siteName}`,
      description: certification.description,
      images: [`${siteUrl}/og.png`],
    },
  };
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default async function CertificationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const certification = getCertificationBySlug(slug);

  if (!certification) {
    notFound();
  }

  const hasCredential = certification.credentialLink?.startsWith("http");

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 pt-12 pb-16">
        <div className="max-w-2xl mx-auto">
          <PageTopBar title="Certifications" titleAs="h2" />
          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-8" />

          {/* Hero image */}
          <div className="relative w-full h-48 sm:h-60 rounded-xl overflow-hidden border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#111] mb-8">
            <Image
              src={certification.image}
              alt={certification.title}
              fill
              sizes="(max-width: 640px) 100vw, 672px"
              className="object-contain p-6"
              priority
            />
          </div>

          {/* Header */}
          <header className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 font-instagram mb-2">
              Certification
            </p>
            <h1 className="dark:text-white font-bold font-instagram text-slate-900 text-2xl sm:text-3xl leading-snug mb-4">
              {certification.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 font-instagram">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 shrink-0" />
                {certification.issuer}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 shrink-0" />
                {formatDate(certification.issueDate)}
              </span>
            </div>
          </header>

          {/* Overview */}
          <section className="mb-8">
            <p className="dark:text-slate-300 font-instagram text-slate-700 text-base leading-relaxed">
              {certification.description}
            </p>
          </section>

          {/* What I Learned */}
          <section className="mb-8 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-6">
            <h2 className="dark:text-white font-instagram font-semibold text-slate-900 text-base mb-4">
              What I actually learned
            </h2>
            <p className="dark:text-slate-100 font-instagram text-slate-600 text-sm leading-relaxed">
              {certification.whatILearned}
            </p>
          </section>

          {/* Key Topics */}
          <section className="mb-8">
            <h2 className="dark:text-white font-instagram font-semibold text-slate-900 text-base mb-4">
              Topics covered
            </h2>
            <ul className="space-y-2.5">
              {certification.keyTopics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-2.5 text-sm dark:text-slate-100 text-slate-600 font-instagram"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-500 dark:text-green-400" />
                  {topic}
                </li>
              ))}
            </ul>
          </section>

          {/* Why It Matters */}
          <section className="mb-8 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-6">
            <h2 className="dark:text-white font-instagram font-semibold text-slate-900 text-base mb-4">
              Why it matters to my work
            </h2>
            <p className="dark:text-slate-100 font-instagram text-slate-600 text-sm leading-relaxed">
              {certification.whyItMatters}
            </p>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="dark:text-white font-instagram font-semibold text-slate-900 text-base mb-4">
              Skills from this certification
            </h2>
            <div className="flex flex-wrap gap-2">
              {certification.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-white rounded-full font-instagram font-medium border border-slate-200 dark:border-[#444]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Takeaway */}
          <section className="mb-10 rounded-xl border-l-4 border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/10 px-6 py-5">
            <p className="dark:text-slate-100 font-instagram text-slate-700 text-sm leading-relaxed italic">
              &ldquo;{certification.takeaway}&rdquo;
            </p>
          </section>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            {hasCredential ? (
              <a
                href={certification.credentialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-instagram font-medium px-4 py-2 rounded-lg text-sm hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors"
              >
                View Credential
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 bg-slate-100 dark:bg-[#1E1E1E] text-slate-500 dark:text-slate-400 font-instagram font-medium px-4 py-2 rounded-lg text-sm cursor-default border border-slate-200 dark:border-[#333]">
                Credential not available online
              </span>
            )}
            <Link
              href="/certifications"
              className="inline-flex items-center gap-2 bg-white dark:bg-[#1C1C1C] text-slate-700 dark:text-slate-300 font-instagram font-medium px-4 py-2 rounded-lg text-sm border border-slate-300 dark:border-[#333] hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors"
            >
              All Certifications
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
