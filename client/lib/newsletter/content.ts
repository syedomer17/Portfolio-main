import { getBlogBySlug } from "@/lib/blogs";
import { getProjectBySlug } from "@/lib/projects";
import { getCaseStudyBySlug } from "@/lib/caseStudies";
import { getCertificationBySlug } from "@/lib/certifications";
import { getExperienceBySlug } from "@/data/experiences";
import {
  ANNOUNCEMENT_CONTENT_TYPES,
  type AnnouncementContentType,
} from "@/model/Announcement";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.syedomer.me"
).replace(/\/$/, "");

export type ResolvedContent = {
  type: AnnouncementContentType;
  slug: string;
  title: string;
  description: string;
  url: string;
  ctaLabel: string;
  kindLabel: string;
  tags?: string[];
  extras?: { label: string; url: string }[];
};

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export function isValidContentType(
  value: unknown
): value is AnnouncementContentType {
  return (
    typeof value === "string" &&
    (ANNOUNCEMENT_CONTENT_TYPES as readonly string[]).includes(value)
  );
}

export function resolveContent(
  type: AnnouncementContentType,
  slug: string
): ResolvedContent | null {
  switch (type) {
    case "blog": {
      const blog = getBlogBySlug(slug);
      if (!blog) return null;
      return {
        type,
        slug: blog.slug,
        title: blog.title,
        description: blog.description,
        url: absoluteUrl(`/blogs/${blog.slug}`),
        ctaLabel: "Read the post",
        kindLabel: "New blog post",
        tags: blog.tags,
      };
    }
    case "project": {
      const project = getProjectBySlug(slug);
      if (!project) return null;
      const extras: ResolvedContent["extras"] = [];
      if (project.liveLink) {
        extras.push({ label: "Live demo", url: project.liveLink });
      }
      if (project.githubLink) {
        extras.push({ label: "Source on GitHub", url: project.githubLink });
      }
      return {
        type,
        slug: project.slug,
        title: project.title,
        description: project.shortDescription,
        url: absoluteUrl(`/projects/${project.slug}`),
        ctaLabel: "View the project",
        kindLabel: "New project",
        tags: project.techStack?.slice(0, 6),
        extras,
      };
    }
    case "case-study": {
      const cs = getCaseStudyBySlug(slug);
      if (!cs) return null;
      const extras: ResolvedContent["extras"] = [];
      if (cs.projectSlug) {
        extras.push({
          label: "Related project",
          url: absoluteUrl(`/projects/${cs.projectSlug}`),
        });
      }
      return {
        type,
        slug: cs.slug,
        title: cs.title,
        description: cs.summary,
        url: absoluteUrl(`/case-studies/${cs.slug}`),
        ctaLabel: "Read the case study",
        kindLabel: "New case study",
        tags: cs.techStack?.slice(0, 6),
        extras,
      };
    }
    case "certification": {
      const cert = getCertificationBySlug(slug);
      if (!cert) return null;
      const extras: ResolvedContent["extras"] = cert.credentialLink
        ? [{ label: "Verify credential", url: cert.credentialLink }]
        : [];
      return {
        type,
        slug: cert.slug,
        title: cert.title,
        description: cert.description,
        url: absoluteUrl(`/certifications/${cert.slug}`),
        ctaLabel: "View the certification",
        kindLabel: `New certification from ${cert.issuer}`,
        tags: cert.skills?.slice(0, 6),
        extras,
      };
    }
    case "experience": {
      const exp = getExperienceBySlug(slug);
      if (!exp) return null;
      return {
        type,
        slug: exp.slug,
        title: `${exp.role} at ${exp.company}`,
        description: exp.summary,
        url: absoluteUrl(`/experiences/${exp.slug}`),
        ctaLabel: "See the experience",
        kindLabel: "New experience",
        tags: exp.tags?.slice(0, 6),
      };
    }
  }
}
