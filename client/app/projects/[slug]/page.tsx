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
              className="dark:text-slate-300 font-instagram hover:underline text-slate-600 text-sm"
            >
              Back to Projects
            </a>
          </div>

          <header className="mb-6">
            <h1
              className="dark:text-white font-bold font-instagram text-slate-900 text-xl"
            >
              {project.title}
            </h1>
            <p
              className="dark:text-slate-400 font-instagram mt-2 text-slate-500 text-sm"
            >
              Created {formatDate(project.createdAt)}
              {project.updatedAt !== project.createdAt
                ? ` • Updated ${formatDate(project.updatedAt)}`
                : ""}
            </p>
          </header>

          <p
            className="dark:text-slate-200 font-instagram mb-4 text-slate-700 text-sm"
          >
            {project.shortDescription}
          </p>

          <p
            className="dark:text-slate-200 font-instagram mb-6 text-slate-700 text-sm"
          >
            {project.fullDescription}
          </p>

          <div className="mb-6">
            <h2
              className="dark:text-white font-instagram font-semibold mb-2 text-base text-slate-900"
            >
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-transparent border border-slate-300 dark:border-[#3A3A3A] dark:text-[#D4D4D4] font-instagram font-normal leading-4 px-2.5 py-0.5 rounded text-[#424242] text-xs"
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
              className="bg-slate-900 font-instagram font-medium gap-2 hover:bg-slate-800 inline-flex items-center px-4 py-2 rounded-md text-sm text-white"
            >
              View Repository
            </a>
            {project.liveLink ? (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-slate-300 dark:bg-[#1C1C1C] dark:border-[#333] dark:text-white font-instagram font-medium gap-2 inline-flex items-center px-4 py-2 rounded-md text-slate-900 text-sm"
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
