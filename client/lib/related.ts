import { type Blog, blogs } from "@/lib/blogs";
import { type Project, projects } from "@/lib/projects";
import { type CaseStudy, caseStudies } from "@/lib/caseStudies";

const overlapCount = (a: readonly string[], b: readonly string[]) => {
  if (!a.length || !b.length) return 0;
  const set = new Set(a.map((s) => s.toLowerCase()));
  let count = 0;
  for (const item of b) if (set.has(item.toLowerCase())) count += 1;
  return count;
};

const byOverlapThenRecency =
  <T extends { updatedAt?: string; createdAt?: string; publishedAt?: string }>(
    score: (item: T) => number
  ) =>
  (a: T, b: T) => {
    const diff = score(b) - score(a);
    if (diff !== 0) return diff;
    const aDate = a.updatedAt ?? a.createdAt ?? a.publishedAt ?? "";
    const bDate = b.updatedAt ?? b.createdAt ?? b.publishedAt ?? "";
    return bDate.localeCompare(aDate);
  };

export type RelatedItem = {
  href: string;
  title: string;
  description: string;
  tags: string[];
};

export function getRelatedBlogs(
  currentSlug: string,
  currentTags: readonly string[] = [],
  limit = 3
): RelatedItem[] {
  const others = blogs.filter((b) => b.slug !== currentSlug);
  const score = (b: Blog) => overlapCount(currentTags, b.tags ?? []);
  return others
    .slice()
    .sort(byOverlapThenRecency(score))
    .slice(0, limit)
    .map((b) => ({
      href: `/blogs/${b.slug}`,
      title: b.title,
      description: b.description,
      tags: b.tags ?? [],
    }));
}

export function getRelatedProjects(
  currentSlug: string,
  currentTags: readonly string[] = [],
  limit = 3
): RelatedItem[] {
  const others = projects.filter((p) => p.slug !== currentSlug);
  const score = (p: Project) => overlapCount(currentTags, p.techStack ?? []);
  return others
    .slice()
    .sort(byOverlapThenRecency(score))
    .slice(0, limit)
    .map((p) => ({
      href: `/projects/${p.slug}`,
      title: p.title,
      description: p.shortDescription,
      tags: p.techStack ?? [],
    }));
}

export function getRelatedCaseStudies(
  currentSlug: string,
  currentTags: readonly string[] = [],
  limit = 3
): RelatedItem[] {
  const others = caseStudies.filter((c) => c.slug !== currentSlug);
  const score = (c: CaseStudy) => overlapCount(currentTags, c.techStack ?? []);
  return others
    .slice()
    .sort(byOverlapThenRecency(score))
    .slice(0, limit)
    .map((c) => ({
      href: `/case-studies/${c.slug}`,
      title: c.title,
      description: c.summary,
      tags: c.techStack ?? [],
    }));
}

export function getCaseStudyForProject(
  projectSlug: string
): RelatedItem | null {
  const study = caseStudies.find((c) => c.projectSlug === projectSlug);
  if (!study) return null;
  return {
    href: `/case-studies/${study.slug}`,
    title: study.title,
    description: study.summary,
    tags: study.techStack ?? [],
  };
}

export function getProjectForCaseStudy(
  projectSlug: string
): RelatedItem | null {
  const project = projects.find((p) => p.slug === projectSlug);
  if (!project) return null;
  return {
    href: `/projects/${project.slug}`,
    title: project.title,
    description: project.shortDescription,
    tags: project.techStack ?? [],
  };
}
