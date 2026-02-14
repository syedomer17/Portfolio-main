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
  {
    title: "AI Interviewer",
    summary:
      "Built an AI mock interview workflow that generates role-based questions and delivers structured feedback for practice cycles.",
    problem:
      "Candidates needed a way to practice interviews with consistent feedback without the bias or rigidity of static question banks.",
    constraints: [
      "Consistent evaluation across varied responses",
      "Prompt design that balances helpfulness and realism",
      "Simple UX for quick practice loops",
    ],
    solution: [
      "Designed role-based prompt templates for question generation",
      "Implemented feedback scoring with structured response categories",
      "Built a focused practice flow with clear next-step guidance",
    ],
    results: [
      "Repeatable practice sessions with consistent feedback",
      "Reduced friction for interview prep workflows",
      "Foundation for advanced scoring and analytics",
    ],
    techStack: ["React.js", "JavaScript", "Shadcn UI", "Tailwind CSS", "AI APIs"],
    projectSlug: "ai-interviewer",
    githubLink: "https://github.com/syedomer17/AI-Powered-Interview-Assistant",
    createdAt: "2024-09-20",
    updatedAt: "2024-12-05",
  },
  {
    title: "Expense Tracker",
    summary:
      "Delivered a personal finance tracker with clean data modeling, category insights, and monthly budget visualizations.",
    problem:
      "Users needed a simple way to log expenses, categorize spending, and see monthly budget trends without complex setup.",
    constraints: [
      "Fast entry flow for recurring expenses",
      "Clear visual summaries for budgets",
      "Reliable CRUD and data consistency",
    ],
    solution: [
      "Implemented structured data models for categories and budgets",
      "Built monthly aggregation logic and chart views",
      "Streamlined CRUD flows with consistent validations",
    ],
    results: [
      "Clear budget visibility with monthly summaries",
      "Stable tracking flow for repeat usage",
      "Ready for multi-account expansion",
    ],
    techStack: ["React", "JavaScript", "Chart.js", "Node.js", "Express", "MongoDB"],
    projectSlug: "expense-tracker",
    githubLink: "https://github.com/syedomer17/Expense-Tracker-App",
    createdAt: "2024-06-10",
    updatedAt: "2024-09-02",
  },
  {
    title: "Nginx Configuration Manager",
    summary:
      "Built a UI to generate, validate, and preview Nginx server blocks with guardrails for safer deployments.",
    problem:
      "Teams needed a safer way to create and validate Nginx configs without manual syntax errors or risky changes.",
    constraints: [
      "Accurate config generation with validation",
      "Clear UX for previewing server blocks",
      "Extensible structure for additional templates",
    ],
    solution: [
      "Created a structured config generator with validation rules",
      "Added preview and quick-copy UX for deployment",
      "Designed a modular template system",
    ],
    results: [
      "Reduced config errors with validation guardrails",
      "Faster setup for common server blocks",
      "Ready for multi-template expansion",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    projectSlug: "nginx-configuration-manager",
    githubLink: "https://github.com/syedomer17/Next.js-nginx-config-generator",
    createdAt: "2025-03-05",
    updatedAt: "2025-03-22",
  },
  {
    title: "AI Fitness Assistant",
    summary:
      "Built an AI-driven fitness planner that generates personalized routines and progress guidance.",
    problem:
      "Users needed adaptable workout plans that evolve with goals, feedback, and progress without manual recalculation.",
    constraints: [
      "Prompt stability across different goal inputs",
      "Safe recommendations for varied fitness levels",
      "Consistent progress tracking UX",
    ],
    solution: [
      "Built prompt flows for plan generation and adjustments",
      "Implemented structured feedback loops for plan updates",
      "Created progress views for routine adherence",
    ],
    results: [
      "Flexible plan generation aligned to user goals",
      "Improved consistency with structured feedback",
      "Foundation for production-grade safety checks",
    ],
    techStack: ["Next.js", "TypeScript", "Shadcn UI", "Tailwind CSS", "AI APIs"],
    projectSlug: "ai-fitness-assistant",
    githubLink: "https://github.com/syedomer17/Next.js-AI-fitness-App",
    createdAt: "2025-05-10",
    updatedAt: "2025-06-01",
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
