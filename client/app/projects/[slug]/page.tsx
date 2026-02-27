import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Calendar, Github } from "lucide-react";
import { getProjectBySlug, projects } from "@/lib/projects";
import PageTopBar from "@/components/ui/PageTopBar";

const siteName = "Syed Omer Ali";
const siteUrl = "https://www.syedomer.me";

export const generateStaticParams = () =>
  projects.map((project) => ({ slug: project.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const canonical = `/projects/${project.slug}`;
  const ogImage = `${siteUrl}/og.png`;

  return {
    title: `${project.title} | ${siteName}`,
    description: project.shortDescription,
    keywords: project.techStack.join(", "),
    authors: [{ name: siteName, url: siteUrl }],
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${project.title} | ${siteName}`,
      description: project.shortDescription,
      url: `${siteUrl}${canonical}`,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} — ${siteName}`,
          type: "image/png",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteName}`,
      description: project.shortDescription,
      images: [ogImage],
      creator: "@SyedOmer17Ali",
    },
  };
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const statusColor: Record<string, string> = {
  Live: "text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  Completed:
    "text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
};

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const statusClass =
    statusColor[project.status] ??
    "text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-700";

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 pt-12 pb-16">
        <div className="max-w-2xl mx-auto">
          <PageTopBar title="Projects" titleAs="h2" backHref="/projects" />
          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-8" />

          {/* Hero Image */}
          <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#111] mb-8">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, 672px"
              className="object-contain p-6"
              priority
            />
          </div>

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border font-instagram ${statusClass}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {project.status}
              </span>

            </div>
            <h1 className="dark:text-white font-bold font-instagram text-slate-900 text-2xl sm:text-3xl leading-snug mb-3">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 font-instagram">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 shrink-0" />
                Built {formatDate(project.createdAt)}
              </span>
              {project.updatedAt !== project.createdAt && (
                <span className="flex items-center gap-1.5">
                  Updated {formatDate(project.updatedAt)}
                </span>
              )}
            </div>
          </header>

          {/* Overview */}
          <section className="mb-8">
            <p className="dark:text-slate-100 font-instagram text-slate-700 text-base leading-relaxed">
              {project.fullDescription}
            </p>
          </section>

          {/* Problem Solved */}
          <section className="mb-8 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-6">
            <h2 className="dark:text-white font-instagram font-semibold text-slate-900 text-base mb-4">
              The problem this solves
            </h2>
            <p className="dark:text-slate-100 font-instagram text-slate-600 text-sm leading-relaxed">
              {project.problemSolved}
            </p>
          </section>

          {/* Key Features */}
          <section className="mb-8">
            <h2 className="dark:text-white font-instagram font-semibold text-slate-900 text-base mb-4">
              What it does
            </h2>
            <ul className="space-y-2.5">
              {project.keyFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm dark:text-slate-100 text-slate-600 font-instagram"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-500 dark:text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Challenges */}
          <section className="mb-8 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-6">
            <h2 className="dark:text-white font-instagram font-semibold text-slate-900 text-base mb-4">
              Hard parts and how I solved them
            </h2>
            <p className="dark:text-slate-100 font-instagram text-slate-600 text-sm leading-relaxed">
              {project.challenges}
            </p>
          </section>

          {/* Tech Stack */}
          <section className="mb-8">
            <h2 className="dark:text-white font-instagram font-semibold text-slate-900 text-base mb-4">
              Tech stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-white rounded-full font-instagram font-medium border border-slate-200 dark:border-[#444]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Outcome */}
          <section className="mb-8 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-6">
            <h2 className="dark:text-white font-instagram font-semibold text-slate-900 text-base mb-4">
              Outcome
            </h2>
            <p className="dark:text-slate-100 font-instagram text-slate-600 text-sm leading-relaxed">
              {project.outcome}
            </p>
          </section>

          {/* My Role — pull quote style */}
          <section className="mb-10 rounded-xl border-l-4 border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/10 px-6 py-5">
            <p className="text-xs font-instagram font-semibold uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-2">
              My role
            </p>
            <p className="dark:text-slate-100 font-instagram text-slate-700 text-sm leading-relaxed">
              {project.role}
            </p>
          </section>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-instagram font-medium px-4 py-2 rounded-lg text-sm hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white dark:bg-[#1C1C1C] text-slate-900 dark:text-white font-instagram font-medium px-4 py-2 rounded-lg text-sm border border-slate-300 dark:border-[#333] hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors"
              >
                View Live
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-white dark:bg-[#1C1C1C] text-slate-600 dark:text-slate-300 font-instagram font-medium px-4 py-2 rounded-lg text-sm border border-slate-300 dark:border-[#333] hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors"
            >
              All Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
