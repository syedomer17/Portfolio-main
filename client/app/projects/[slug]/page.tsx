import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";

const siteName = "Syed Omer Ali";

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

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${project.title} | ${siteName}`,
      description: project.shortDescription,
      url: canonical,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} - ${siteName}`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteName}`,
      description: project.shortDescription,
      images: [project.image],
    },
  };
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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

  const primaryLink = project.liveLink || project.githubLink;

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 pt-12 pb-10">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <a
              href="/projects"
              className="text-sm text-slate-600 dark:text-slate-300 hover:underline"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Back to Projects
            </a>
          </div>

          <header className="mb-6">
            <h1
              className="text-xl font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              {project.title}
            </h1>
            <p
              className="text-sm text-slate-500 dark:text-slate-400 mt-2"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Created {formatDate(project.createdAt)}
              {project.updatedAt !== project.createdAt
                ? ` • Updated ${formatDate(project.updatedAt)}`
                : ""}
            </p>
          </header>

          <p
            className="text-sm text-slate-700 dark:text-slate-200 mb-4"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            {project.shortDescription}
          </p>

          <p
            className="text-sm text-slate-700 dark:text-slate-200 mb-6"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            {project.fullDescription}
          </p>

          <div className="mb-6">
            <h2
              className="text-base font-semibold text-slate-900 dark:text-white mb-2"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 text-xs leading-4 font-normal bg-transparent text-[#424242] dark:text-[#D4D4D4] rounded border border-slate-300 dark:border-[#3A3A3A]"
                  style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={primaryLink}
              target={primaryLink ? "_blank" : undefined}
              rel={primaryLink ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-slate-900 text-white hover:bg-slate-800"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              View Repository
            </a>
            {project.liveLink ? (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-white dark:bg-[#1C1C1C] text-slate-900 dark:text-white border border-slate-300 dark:border-[#333]"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
              >
                View Live
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
