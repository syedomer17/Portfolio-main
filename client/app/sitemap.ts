import type { MetadataRoute } from "next";
import { blogs } from "@/lib/blogs";
import { projects } from "@/lib/projects";
import { certifications } from "@/lib/certifications";
import { experiences } from "@/data/experiences";
import { caseStudies } from "@/lib/caseStudies";

const baseUrl = "https://syedomer.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    lastModified?: string;
  }> = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blogs", priority: 0.8, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/secure-mern-development", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/devsecops-ci-cd", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/performance-optimization", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/security-audit-remediation", priority: 0.8, changeFrequency: "monthly" },
    { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.7, changeFrequency: "monthly" },
    { path: "/resources/mern-security-checklist", priority: 0.7, changeFrequency: "yearly" },
    { path: "/resources/devsecops-pipeline-template", priority: 0.7, changeFrequency: "yearly" },
    { path: "/resources/secure-auth-implementation-guide", priority: 0.7, changeFrequency: "yearly" },
    { path: "/experiences", priority: 0.7, changeFrequency: "monthly" },
    { path: "/certifications", priority: 0.6, changeFrequency: "yearly" },
    { path: "/intro-call", priority: 0.6, changeFrequency: "monthly" },
    { path: "/send-email", priority: 0.6, changeFrequency: "monthly" },
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

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: study.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
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
    ...caseStudyRoutes,
  ];
}
