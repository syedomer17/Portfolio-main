import BlogsPage from "@/components/page/Blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Technical articles and notes by Syed Omer Ali on software engineering, DevOps, and web development.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Blogs | Syed Omer Ali",
    description:
      "Technical articles and notes by Syed Omer Ali on software engineering, DevOps, and web development.",
    url: "/blogs",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Blogs - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Syed Omer Ali",
    description:
      "Technical articles and notes by Syed Omer Ali on software engineering, DevOps, and web development.",
    images: ["/banner.png"],
  },
};

const Blogs = () => {
  return (
    <main>
      <BlogsPage />
    </main>
  )
}

export default Blogs
