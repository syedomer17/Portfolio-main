import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  certifications,
  getCertificationBySlug,
} from "@/lib/certifications";

const siteName = "Syed Omer Ali";

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
          url: certification.image,
          width: 1200,
          height: 630,
          alt: `${certification.title} - ${siteName}`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${certification.title} | ${siteName}`,
      description: certification.description,
      images: [certification.image],
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

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 pt-12 pb-10">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <a
              href="/certifications"
              className="text-sm text-slate-600 dark:text-slate-300 hover:underline"
            >
              Back to Certifications
            </a>
          </div>

          <header className="mb-6">
            <h1
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              {certification.title}
            </h1>
            <p
              className="text-sm text-slate-500 dark:text-slate-400 mt-2"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Issued {formatDate(certification.issueDate)} by {certification.issuer}
            </p>
          </header>

          <p
            className="text-base text-slate-700 dark:text-slate-200 mb-6"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            {certification.description}
          </p>

          <a
            href={certification.credentialLink}
            target={certification.credentialLink ? "_blank" : undefined}
            rel={certification.credentialLink ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-slate-900 text-white hover:bg-slate-800"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            View Credential
          </a>
        </div>
      </div>
    </main>
  );
}
