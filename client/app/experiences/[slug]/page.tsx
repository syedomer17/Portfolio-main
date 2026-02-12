import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { experiences, getExperienceBySlug } from "@/data/experiences";

const siteName = "Syed Omer Ali";

export const generateStaticParams = () =>
  experiences.map((experience) => ({ slug: experience.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    return {
      title: "Experience Not Found",
      description: "The requested experience could not be found.",
    };
  }

  const canonical = `/experiences/${experience.slug}`;

  return {
    title: `${experience.role} at ${experience.company}`,
    description: experience.summary,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${experience.role} at ${experience.company} | ${siteName}`,
      description: experience.summary,
      url: canonical,
      images: [
        {
          url: experience.logo,
          width: 1200,
          height: 630,
          alt: `${experience.company} - ${siteName}`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${experience.role} at ${experience.company} | ${siteName}`,
      description: experience.summary,
      images: [experience.logo],
    },
  };
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default async function ExperienceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 pt-12 pb-10">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <a
              href="/experiences"
              className="text-sm text-slate-600 dark:text-slate-300 hover:underline"
            >
              Back to Experiences
            </a>
          </div>

          <header className="mb-6">
            <h1
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              {experience.role} at {experience.company}
            </h1>
            <p
              className="text-sm text-slate-500 dark:text-slate-400 mt-2"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              {experience.location} • {experience.period}
            </p>
            <p
              className="text-sm text-slate-500 dark:text-slate-400 mt-2"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              {formatDate(experience.startDate)}
              {experience.endDate ? ` - ${formatDate(experience.endDate)}` : " - Present"}
            </p>
          </header>

          <p
            className="text-base text-slate-700 dark:text-slate-200 mb-6"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            {experience.summary}
          </p>

          {experience.achievements.length > 0 ? (
            <div className="mb-6">
              <h2
                className="text-lg font-semibold text-slate-900 dark:text-white mb-2"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
              >
                Key Contributions
              </h2>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="text-sm text-slate-700 dark:text-slate-200 flex gap-2"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    <span className="text-[#424242] dark:text-[#D4D4D4] mt-0.5">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {experience.tags.length > 0 ? (
            <div>
              <h2
                className="text-lg font-semibold text-slate-900 dark:text-white mb-2"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
              >
                Skills & Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-xs leading-4 font-normal bg-transparent text-[#424242] dark:text-[#D4D4D4] rounded border border-slate-300 dark:border-[#3A3A3A]"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
