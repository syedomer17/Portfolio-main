import type { MetadataRoute } from "next";
import { blogs } from "@/lib/blogs";
import { projects } from "@/lib/projects";
import { certifications } from "@/lib/certifications";
import { experiences } from "@/data/experiences";

const baseUrl = "https://syedomer.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    lastModified?: string;
  }> = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blogs", priority: 0.8, changeFrequency: "weekly" },
    { path: "/experiences", priority: 0.7, changeFrequency: "monthly" },
    { path: "/certifications", priority: 0.6, changeFrequency: "yearly" },
    { path: "/intro-call", priority: 0.6, changeFrequency: "monthly" },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const certificationRoutes: MetadataRoute.Sitemap = certifications.map(
    (certification) => ({
      url: `${baseUrl}/certifications/${certification.slug}`,
      lastModified: certification.issueDate,
      changeFrequency: "yearly",
      priority: 0.5,
    })
  );

  const experienceRoutes: MetadataRoute.Sitemap = experiences.map((experience) => ({
    url: `${baseUrl}/experiences/${experience.slug}`,
    lastModified: experience.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const staticRoutes: MetadataRoute.Sitemap = routes.map(
    ({ path, priority, changeFrequency, lastModified }) => ({
      url: `${baseUrl}${path || "/"}`,
      lastModified,
      changeFrequency,
      priority,
    })
  );

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...projectRoutes,
    ...certificationRoutes,
    ...experienceRoutes,
  ];
}
