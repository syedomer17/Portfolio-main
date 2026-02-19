import type { MetadataRoute } from "next";
import { blogs } from "@/lib/blogs";
import { projects } from "@/lib/projects";
import { certifications } from "@/lib/certifications";
import { experiences } from "@/data/experiences";
import { caseStudies } from "@/lib/caseStudies";

const baseUrl = "https://syedomer.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static content pages (ONLY real content pages)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/certifications`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  // Dynamic blog routes
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt ?? blog.publishedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic project routes
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.updatedAt ?? project.createdAt,
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

  const experienceRoutes: MetadataRoute.Sitemap = experiences.map(
    (experience) => ({
      url: `${baseUrl}/experiences/${experience.slug}`,
      lastModified: experience.updatedAt,
      changeFrequency: "yearly",
      priority: 0.6,
    })
  );

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: study.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...projectRoutes,
    ...certificationRoutes,
    ...experienceRoutes,
    ...caseStudyRoutes,
  ];
}
