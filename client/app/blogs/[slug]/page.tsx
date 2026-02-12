import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogs, getBlogBySlug } from "@/lib/blogs";

const siteName = "Syed Omer Ali";

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
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${blog.title} | ${siteName}`,
      description: blog.description,
      url: canonical,
      images: [
        {
          url: "/banner.png",
          width: 1200,
          height: 630,
          alt: `${blog.title} - ${siteName}`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | ${siteName}`,
      description: blog.description,
      images: ["/banner.png"],
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

  return (
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
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              {blog.title}
            </h1>
            <p
              className="text-sm text-slate-500 dark:text-slate-400 mt-2"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Published {formatDate(blog.publishedAt)}
              {blog.updatedAt !== blog.publishedAt
                ? ` • Updated ${formatDate(blog.updatedAt)}`
                : ""}
            </p>
          </header>

          <p
            className="text-base text-slate-700 dark:text-slate-200 mb-6"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            {blog.description}
          </p>

          <article className="space-y-4 text-slate-700 dark:text-slate-200">
            {blog.content.map((paragraph, index) => (
              <p key={index} style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
