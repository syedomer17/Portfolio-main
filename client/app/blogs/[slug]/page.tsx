import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { blogs, getBlogBySlug } from "@/lib/blogs";

const siteName = "Syed Omer Ali";
const siteUrl = "https://www.syedomer.me";

export const generateStaticParams = () =>
  blogs.map((blog) => ({ slug: blog.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const canonical = `/blogs/${blog.slug}`;

  return {
    title: blog.title,
    description: blog.description,
    authors: [{ name: "Syed Omer Ali", url: "https://www.syedomer.me" }],
    creator: "Syed Omer Ali",
    publisher: "Syed Omer Ali",
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${blog.title} | ${siteName}`,
      description: blog.description,
      url: canonical,
      images: [
        {
          url: "/myImage.png",
          width: 1200,
          height: 630,
          alt: `${blog.title} - ${siteName}`,
        },
      ],
      type: "article",
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      authors: ["Syed Omer Ali"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@SyedOmer17Ali",
      creator: "@SyedOmer17Ali",
      title: `${blog.title} | ${siteName}`,
      description: blog.description,
      images: ["/myImage.png"],
    },
  };
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: `${siteUrl}/myImage.png`,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: {
      "@type": "Person",
      name: "Syed Omer Ali",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Syed Omer Ali",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blogs/${blog.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${siteUrl}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
      },
    ],
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(articleSchema)}
      </Script>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 pt-12 pb-10">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <a
                href="/blogs"
                className="text-sm text-slate-600 dark:text-slate-300 hover:underline"
              >
                Back to Blogs
              </a>
            </div>

            <header className="mb-6">
              <h1
                className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-instagram"
              >
                {blog.title}
              </h1>
              <p
                className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-instagram"
              >
                By{" "}
                <a
                  href="/syed-omer-ali"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Syed Omer Ali
                </a>{" "}
                • Published {formatDate(blog.publishedAt)}
              {blog.updatedAt !== blog.publishedAt
                ? ` • Updated ${formatDate(blog.updatedAt)}`
                : ""}
            </p>
          </header>

          <p
            className="text-base text-slate-700 dark:text-slate-200 mb-6 font-instagram"
          >
            {blog.description}
          </p>

          <article className="space-y-4 text-slate-700 dark:text-slate-200">
            {blog.content.map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                const heading = paragraph.replace(/^##\s+/, "");
                return (
                  <h2
                    key={index}
                    className="text-xl font-semibold text-slate-900 dark:text-white font-instagram"
                  >
                    {heading}
                  </h2>
                );
              }

              return (
                <p key={index} className="font-instagram">
                  {paragraph}
                </p>
              );
            })}
          </article>

          {blog.slug === "secure-mern-architecture-for-production-saas" ? (
            <section className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Related resources
              </h2>
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                <a href="/resources/mern-security-checklist" className="underline">MERN security checklist</a>
                <a href="/resources/devsecops-pipeline-template" className="underline">DevSecOps pipeline template</a>
                <a href="/resources/secure-auth-implementation-guide" className="underline">Secure auth guide</a>
                <a href="/services/secure-mern-development" className="underline">Secure MERN development</a>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </main>
    </>
  );
}
