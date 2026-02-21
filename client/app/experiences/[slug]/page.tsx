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
              className="dark:text-white font-bold font-instagram sm:text-3xl text-2xl text-slate-900"
            >
              {experience.role} at {experience.company}
            </h1>
            <p
              className="dark:text-slate-400 font-instagram mt-2 text-slate-500 text-sm"
            >
              {experience.location} • {experience.period}
            </p>
            <p
              className="dark:text-slate-400 font-instagram mt-2 text-slate-500 text-sm"
            >
              {formatDate(experience.startDate)}
              {experience.endDate ? ` - ${formatDate(experience.endDate)}` : " - Present"}
            </p>
          </header>

          <p
            className="dark:text-slate-200 font-instagram mb-6 text-base text-slate-700"
          >
            {experience.summary}
          </p>

          {experience.achievements.length > 0 ? (
            <div className="mb-6">
              <h2
                className="dark:text-white font-instagram font-semibold mb-2 text-lg text-slate-900"
              >
                Key Contributions
              </h2>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="dark:text-slate-200 flex font-instagram gap-2 text-slate-700 text-sm"
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
                className="dark:text-white font-instagram font-semibold mb-2 text-lg text-slate-900"
              >
                Skills & Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-transparent border border-slate-300 dark:border-[#3A3A3A] dark:text-[#D4D4D4] font-instagram font-normal leading-4 px-2.5 py-0.5 rounded text-[#424242] text-xs"
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
