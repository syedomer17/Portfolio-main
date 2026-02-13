export type CaseStudyMetric = {
  label: string;
  value: string;
  detail?: string;
};

export type CaseStudy = {
  title: string;
  slug: string;
  summary: string;
  problem: string;
  constraints: string[];
  solution: string[];
  results: string[];
  metrics: CaseStudyMetric[];
  techStack: string[];
  projectSlug: string;
  githubLink?: string;
  createdAt: string;
  updatedAt: string;
};

type CaseStudyInput = Omit<CaseStudy, "slug" | "metrics"> & { slug?: string };

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const diffDays = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  return Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
};

const caseStudyInputs: CaseStudyInput[] = [
  {
    title: "AI Powered Resume Maker",
    summary:
      "Built a secure resume analysis workflow that flags skill gaps and delivers actionable recommendations with reliable API pipelines.",
    problem:
      "Users needed a fast, trustworthy way to analyze resumes without leaking sensitive data or producing noisy feedback.",
    constraints: [
      "Secure data handling for uploaded resumes",
      "Reliable NLP scoring with clear UX feedback",
      "Scalable API design for future model upgrades",
    ],
    solution: [
      "Implemented structured parsing and normalized skill taxonomy mapping",
      "Designed a scoring pipeline with consistent output formats",
      "Built a clean feedback UX for prioritized improvements",
    ],
    results: [
      "Consistent skill-gap insights across varied resume formats",
      "Actionable recommendations surfaced in a single workflow",
      "Architecture ready for model upgrades and new integrations",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Gemini APIs",
    ],
    projectSlug: "ai-powered-resume-maker",
    githubLink: "https://github.com/syedomer17/AI-powered-resume",
    createdAt: "2025-01-12",
    updatedAt: "2025-02-02",
  },
  {
    title: "GitHub Gist Manager",
    summary:
      "Delivered a secure OAuth-driven workflow to browse, save, and manage GitHub gists with persistent storage.",
    problem:
      "Developers needed a faster way to search and organize gists while keeping authentication secure and rate-safe.",
    constraints: [
      "Secure OAuth handling without leaking tokens",
      "Rate-safe GitHub API integration",
      "Persistent storage for favorites and comments",
    ],
    solution: [
      "Built an OAuth flow with guarded token exchange",
      "Implemented caching and rate-friendly API usage",
      "Structured MongoDB models for persistent metadata",
    ],
    results: [
      "Streamlined gist discovery and organization",
      "Secure auth flow with guarded token handling",
      "Foundation for collaboration features",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "GitHub OAuth",
      "Shadcn UI",
      "MongoDB",
    ],
    projectSlug: "github-gist-manager",
    githubLink: "https://github.com/syedomer17/Next.js-gist-search",
    createdAt: "2024-11-15",
    updatedAt: "2025-01-08",
  },
];

const buildCaseStudies = (inputs: CaseStudyInput[]): CaseStudy[] => {
  const usedSlugs = new Set<string>();

  return inputs.map((caseStudy) => {
    const slug = caseStudy.slug ? slugify(caseStudy.slug) : slugify(caseStudy.title);

    if (!slug) {
      throw new Error(`Invalid slug for case study: ${caseStudy.title}`);
    }

    if (usedSlugs.has(slug)) {
      throw new Error(`Duplicate slug detected: ${slug}`);
    }

    usedSlugs.add(slug);

    const deliveryWindow = diffDays(caseStudy.createdAt, caseStudy.updatedAt);
    const stackBreadth = caseStudy.techStack.length;

    return {
      ...caseStudy,
      slug,
      metrics: [
        {
          label: "Delivery window",
          value: `${deliveryWindow} days`,
          detail: `${caseStudy.createdAt} to ${caseStudy.updatedAt}`,
        },
        {
          label: "Stack breadth",
          value: `${stackBreadth} technologies`,
          detail: caseStudy.techStack.join(", "),
        },
      ],
    };
  });
};

export const caseStudies = buildCaseStudies(caseStudyInputs);

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((caseStudy) => caseStudy.slug === slug);
