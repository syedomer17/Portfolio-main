import ProjectsPage from "@/components/page/Projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Syed Omer Ali showcasing full stack, cloud, and product engineering work.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Syed Omer Ali",
    description:
      "Selected projects by Syed Omer Ali showcasing full stack, cloud, and product engineering work.",
    url: "/projects",
    images: [
      {
        url: "/myImage.png",
        width: 1200,
        height: 630,
        alt: "Projects - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Syed Omer Ali",
    description:
      "Selected projects by Syed Omer Ali showcasing full stack, cloud, and product engineering work.",
    images: ["/myImage.png"],
  },
};

const Projects = () => {
  return (
    <main>
      <ProjectsPage />
    </main>
  )
}

export default Projects
