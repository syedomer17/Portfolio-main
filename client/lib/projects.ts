export type Project = {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  githubLink: string;
  liveLink?: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  status: string;
  isComingSoon: boolean;
  screenLabel?: string;
  isPinned?: boolean;
  caseStudyFocus?: string;
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
    title: "AI Powered Resume Maker",
    shortDescription:
      "AI resume analysis platform that identifies skill gaps and suggests improvements using NLP scoring.",
    fullDescription:
      "This project analyzes resumes with AI-assisted scoring to surface missing skills, improve structure, and deliver actionable recommendations. It integrates resume parsing, skill taxonomy matching, and NLP-based scoring to provide a clear improvement path. The focus was on building reliable data pipelines, clear feedback UX, and scalable API design for future model upgrades.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "MongoDB",
      "REST APIs",
      "Gemini APIs",
    ],
    githubLink: "https://github.com/syedomer17/AI-powered-resume",
    createdAt: "2025-01-12",
    updatedAt: "2025-02-02",
    image: "/projects/ai-resume-analyzer.png",
    status: "Completed",
    isComingSoon: false,
    caseStudyFocus: "Project completed. Deployment pending.",
  },
  {
    title: "GitHub Gist Manager",
    shortDescription:
      "Full-stack GitHub Gist manager with OAuth, search, and persistence for favorites and comments.",
    fullDescription:
      "This app lets users authenticate with GitHub, search and view gists, and manage favorites with persistent storage. It focuses on secure OAuth flow handling, rate-safe API integration, and a clean interface for browsing and organizing gists. The backend was built to support future collaboration features and scalable data storage.",
    techStack: [
      "Next.js",
      "TypeScript",
      "GitHub OAuth",
      "Shadcn UI",
      "MongoDB",
    ],
    githubLink: "https://github.com/syedomer17/Next.js-gist-search",
    createdAt: "2024-11-15",
    updatedAt: "2025-01-08",
    image: "/projects/gist-manager.png",
    status: "Completed",
    isComingSoon: false,
    caseStudyFocus: "Completed with OAuth and backend persistence. Not yet live.",
  },
  {
    title: "AI Interviewer",
    shortDescription:
      "AI mock interview platform that generates role-based questions and evaluates responses.",
    fullDescription:
      "AI Interviewer generates tailored interview questions and provides feedback to improve readiness. It emphasizes prompt design, response evaluation, and a feedback loop that encourages practice. The key challenge was creating a balanced evaluation system that feels helpful without being overly rigid.",
    techStack: ["React.js", "JavaScript", "Shadcn UI", "Tailwind CSS", "AI APIs"],
    githubLink: "https://github.com/syedomer17/AI-Powered-Interview-Assistant",
    createdAt: "2024-09-20",
    updatedAt: "2024-12-05",
    image: "/projects/ai-interviewer.png",
    status: "Completed",
    isComingSoon: false,
    caseStudyFocus: "Core interview logic complete. UI and deployment polish pending.",
  },
  {
    title: "Expense Tracker",
    shortDescription:
      "Personal finance tracker with category insights and monthly budget visualizations.",
    fullDescription:
      "Expense Tracker enables users to log spending, categorize transactions, and visualize monthly summaries. It was built to highlight budgeting trends with clear charts and simplified data entry. The primary focus was on clean data modeling, reliable CRUD flows, and readable chart outputs.",
    techStack: [
      "React",
      "JavaScript",
      "Chart.js",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    githubLink: "https://github.com/syedomer17/Expense-Tracker-App",
    createdAt: "2024-06-10",
    updatedAt: "2024-09-02",
    image: "/projects/expense-tracker.png",
    status: "Completed",
    isComingSoon: false,
    caseStudyFocus: "Feature-complete project. Ready for deployment.",
  },
  {
    title: "Nginx Configuration Manager",
    shortDescription:
      "Web tool for creating, validating, and managing Nginx server blocks with instant feedback.",
    fullDescription:
      "This tool simplifies Nginx server block management with a UI that generates, validates, and previews configuration changes. It focuses on reducing configuration errors, providing guardrails, and accelerating safe deployments. The product direction emphasizes developer experience and reliability.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    githubLink: "https://github.com/syedomer17/Next.js-nginx-config-generator",
    createdAt: "2025-03-05",
    updatedAt: "2025-03-22",
    image: "/projects/nginx-config-manager.png",
    status: "Completed",
    isComingSoon: false,
    caseStudyFocus: "Completed core functionality. UI polish and deployment pending.",
  },
  {
    title: "AI Fitness Assistant",
    shortDescription:
      "AI-driven fitness assistant that creates personalized workout plans and progress insights.",
    fullDescription:
      "AI Fitness Assistant generates tailored workout plans and provides guidance based on goals and feedback. The core problem was building a flexible prompt system that adapts routines while maintaining user safety. The current focus is stabilizing the planner and preparing a production-ready release.",
    techStack: ["Next.js", "TypeScript", "Shadcn UI", "Tailwind CSS", "AI APIs"],
    githubLink: "https://github.com/syedomer17/Next.js-AI-fitness-App",
    createdAt: "2025-05-10",
    updatedAt: "2025-06-01",
    image: "/projects/ai-fitness-assistant.png",
    status: "Completed",
    isComingSoon: false,
    caseStudyFocus: "Core functionality in development. Deployment pending.",
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

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
