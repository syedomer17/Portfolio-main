export type Project = {
  title: string;
  slug: string;
  description: string;
  image: string;
  status: string;
  isComingSoon: boolean;
  techStack: string[];
  notes: string;
  screenLabel?: string;
  isPinned?: boolean;
  url?: string;
};

type ProjectInput = Omit<Project, "slug"> & { slug?: string };

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const projectInputs: ProjectInput[] = [
  {
    title: "AI Resume Analyzer",
    description:
      "An AI-powered resume analysis platform that evaluates resumes, highlights skill gaps, and provides actionable improvement suggestions using NLP-based scoring.",
    image: "/projects/ai-resume-analyzer.png",
    status: "Completed",
    isComingSoon: false,
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "NLP APIs",
    ],
    notes: "Project completed. Deployment pending. Testing ongoing. TBA",
  },
  {
    title: "GitHub Gist Manager",
    description:
      "A full-stack GitHub Gist management app allowing users to authenticate via GitHub OAuth, search gists, view files, like, comment, and manage favorites.",
    image: "/projects/gist-manager.png",
    status: "Completed",
    isComingSoon: false,
    techStack: [
      "React",
      "TypeScript",
      "GitHub OAuth",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    notes: "Completed with OAuth and backend persistence. Not yet live.",
  },
  {
    title: "AI Interviewer",
    description:
      "An AI-driven mock interview platform that generates role-based interview questions, evaluates answers, and provides feedback to improve interview readiness.",
    image: "/projects/ai-interviewer.png",
    status: "Completed",
    isComingSoon: false,
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "AI APIs",
      "Tailwind CSS",
    ],
    notes: "Core interview logic complete. UI and deployment polish pending.",
  },
  {
    title: "Expense Tracker",
    description:
      "A personal finance tracker that allows users to log expenses, categorize spending, and visualize monthly budgets with charts and summaries and savings tips.",
    image: "/projects/expense-tracker.png",
    status: "Completed",
    isComingSoon: false,
    techStack: [
      "React",
      "TypeScript",
      "Chart.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS"
    ],
    notes: "Feature-complete project. Ready for deployment. Stable in prod.!",
  },
];

const buildProjects = (inputs: ProjectInput[]): Project[] => {
  const usedSlugs = new Set<string>();

  return inputs.map((project) => {
    const slug = project.slug ? slugify(project.slug) : slugify(project.title);

    if (!slug) {
      throw new Error(`Invalid slug for project: ${project.title}`);
    }

    if (usedSlugs.has(slug)) {
      throw new Error(`Duplicate slug detected: ${slug}`);
    }

    usedSlugs.add(slug);

    return {
      ...project,
      slug,
    };
  });
};

export const projects = buildProjects(projectInputs);
