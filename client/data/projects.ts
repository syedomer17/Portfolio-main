export type Project = {
  title: string;
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

export const projects: Project[] = [
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
    notes: "Project completed. Deployment pending.",
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
      "A personal finance tracker that allows users to log expenses, categorize spending, and visualize monthly budgets with charts and summaries.",
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
    ],
    notes: "Feature-complete project. Ready for deployment.",
  },
];
