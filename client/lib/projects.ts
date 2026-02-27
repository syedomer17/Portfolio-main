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
  // Rich content fields
  problemSolved: string;
  keyFeatures: string[];
  challenges: string;
  outcome: string;
  role: string;
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
    problemSolved:
      "Most job seekers don't know why their resume gets rejected. ATS systems silently filter them out for missing keywords, poor structure, or skill mismatches — with zero feedback. This project was built to change that by giving candidates an honest, AI-driven analysis of their resume against any job description.",
    keyFeatures: [
      "Resume parsing and structured data extraction",
      "Skill gap analysis against job description keywords",
      "NLP-based scoring across structure, clarity, and relevance",
      "Actionable improvement suggestions per section",
      "Gemini API integration for intelligent language feedback",
      "MongoDB persistence for storing analysis history",
    ],
    challenges:
      "The hardest part was making the skill matching meaningful without being rigid. A resume that says 'built REST APIs with Node.js' shouldn't fail a check for 'Node.js experience with API design' — they're the same thing phrased differently. Solving this required semantic similarity rather than simple keyword matching, which made the Gemini integration non-trivial to get right. Getting the prompts to return structured, consistent JSON across wildly different resume formats also took significant iteration.",
    outcome:
      "The platform successfully parses resumes, scores them across multiple dimensions, and delivers specific, actionable feedback. Users can see exactly which skills are missing, which sections need improvement, and what a stronger version of their resume would look like — all within seconds of uploading.",
    role:
      "I built this end-to-end — from the resume parsing pipeline and Gemini API integration on the backend, to the scoring logic, the feedback display UI, and the MongoDB data layer. The product direction, API design, and UX decisions were all mine.",
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
    problemSolved:
      "GitHub's native Gist interface is functional but minimal — no way to tag, search across all your gists by content, or store personal notes. Developers who use Gists heavily end up with hundreds of snippets they can't find when they need them. This project built a proper management layer on top of the GitHub API.",
    keyFeatures: [
      "GitHub OAuth for secure, scope-limited authentication",
      "Search across public gists by filename and description",
      "Favorites system with MongoDB-backed persistence",
      "User comments on individual gists",
      "Rate-limit-aware GitHub API integration",
      "Clean, keyboard-navigable gist browser UI",
    ],
    challenges:
      "GitHub's API rate limits are strict — especially for unauthenticated requests. Designing around this without degrading the user experience required careful request batching and caching strategy. The OAuth flow also had some edge cases around token refresh and scope management that took time to handle correctly. On the frontend, keeping the gist list responsive while fetching file contents lazily was a UX balance that required a few iterations to get right.",
    outcome:
      "A fully working gist manager that feels meaningfully better than the GitHub UI for power users. OAuth works reliably, favorites persist across sessions, and the search is fast enough that it doesn't feel like an API call is happening in the background.",
    role:
      "Full-stack — OAuth flow, GitHub API integration, MongoDB schema, REST endpoints, and the entire Next.js frontend. I also designed the UX from scratch.",
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
    problemSolved:
      "Practicing for technical and behavioral interviews is hard without a real interviewer. Most people repeat the same answers to the same questions without knowing whether they're actually improving. This project gives candidates a simulated interview experience with real-time AI feedback — so every practice session has a clear outcome.",
    keyFeatures: [
      "Role-specific question generation for technical and behavioral rounds",
      "AI-powered response evaluation with scoring and feedback",
      "Session recording to track improvement over time",
      "Adjustable difficulty and topic focus per session",
      "Clean interview UI designed to reduce anxiety, not add to it",
      "Detailed post-session summary with areas to improve",
    ],
    challenges:
      "Getting AI feedback that feels genuinely useful — not generic — was the central challenge. Simply asking the model to 'evaluate this answer' produces vague, useless responses. I iterated extensively on prompt structure, breaking evaluation into specific dimensions: clarity, relevance, depth, and communication. The second challenge was preventing the question generator from becoming repetitive across sessions — which required building session context into the prompt so the model knew what had already been asked.",
    outcome:
      "A working mock interview tool that generates context-aware questions and delivers specific, actionable feedback per answer. The feedback loop is tight enough that users can see noticeable improvement across sessions if they engage with the suggestions.",
    role:
      "End-to-end design and development — AI prompt engineering, response evaluation logic, session state management, and the full React frontend.",
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
    problemSolved:
      "Most people have no idea where their money actually goes month to month. Spreadsheets are too manual, and most finance apps are either overkill or require bank access. This project focuses on frictionless manual logging with clear visual feedback — so users can build awareness without connecting sensitive accounts.",
    keyFeatures: [
      "Transaction logging with category tagging",
      "Monthly spending breakdown with Chart.js visualizations",
      "Budget targets per category with over-budget alerts",
      "Recurring expense support",
      "REST API backend with MongoDB for persistent storage",
      "Filtering and search across transaction history",
    ],
    challenges:
      "Data modeling for financial tracking is deceptively tricky. Recurring transactions need to generate entries without duplicating data. Categories need to be flexible enough for different user habits but structured enough for aggregation queries. Getting the Chart.js visualizations to update reactively as new transactions were added without full page refreshes required careful state management on the frontend.",
    outcome:
      "A clean, functional expense tracker that gives users a genuinely useful picture of their spending. The chart-to-transaction relationship feels intuitive — clicking a chart segment filters the transaction list to that category, which makes investigation natural.",
    role:
      "Full-stack — data modeling, Express REST API, MongoDB queries and aggregations, Chart.js integration, and React frontend.",
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
    problemSolved:
      "Nginx configuration files are notoriously unforgiving — one syntax error can take down a server block silently. Developers writing these configs by hand frequently make mistakes that only surface at reload time. This tool generates valid Nginx config from a structured UI, validates it before export, and shows exactly what will be written to disk.",
    keyFeatures: [
      "Point-and-click server block builder with live preview",
      "Built-in config validation with error highlighting",
      "Support for reverse proxy, static site, and SSL termination patterns",
      "Exportable config files ready to drop into /etc/nginx",
      "Syntax-highlighted config output",
      "One-click templates for common deployment patterns",
    ],
    challenges:
      "Nginx config syntax has edge cases that aren't obvious until you've spent time debugging prod servers. Building a generator that handles those correctly — while still being simple enough that a developer unfamiliar with Nginx can use it — required careful thought about what to expose in the UI and what to handle automatically. The live preview had to stay in sync with the form state in real time without getting sluggish on complex configs.",
    outcome:
      "A working config generator that reduces the time to write a valid Nginx server block from several minutes of documentation-digging to under 30 seconds. The validation catches the most common mistakes before they cause problems.",
    role:
      "Solo — product design, config generation logic, validation rules, and the entire Next.js frontend.",
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
    problemSolved:
      "Generic workout plans don't account for the user's current fitness level, available equipment, time constraints, or recovery needs. Personal trainers solve this but aren't accessible to most people. This project uses AI to generate plans that adapt to the user's actual situation — not a template designed for everyone.",
    keyFeatures: [
      "Onboarding flow to capture fitness level, goals, and equipment",
      "AI-generated personalized weekly workout plans",
      "Exercise swap suggestions when equipment isn't available",
      "Progress logging with weekly check-ins",
      "Adaptive plan updates based on logged feedback",
      "Rest day and recovery recommendations built into the plan",
    ],
    challenges:
      "Fitness advice done wrong can cause injury. The prompt engineering had to be careful about what the model was allowed to recommend — especially for users with injury history or health constraints. I spent time building safety rails into the generation prompts so the output stayed responsible. The second challenge was making adaptation feel natural: when a user logs that a workout was too hard, the next plan should adjust meaningfully without completely discarding the structure.",
    outcome:
      "A working fitness assistant that generates realistic, personalized plans and adapts them based on user feedback. The onboarding-to-first-plan flow is under two minutes, which keeps drop-off low before users see the value.",
    role:
      "Solo — product design, AI prompt engineering, safety guardrails, plan adaptation logic, and the Next.js frontend.",
  },
  {
    title: "Urgent Blood App",
    shortDescription:
      "Real-time emergency blood donation platform connecting donors with patients in critical need.",
    fullDescription:
      "Urgent Blood App is a high-performance emergency response platform designed to optimize blood donation during critical time windows. It implements a smart matching algorithm using the Haversine formula for precise geo-location sorting, ensuring donors are alerted based on proximity and eligibility. The system integrates real-time communications via Socket.io and Firebase Cloud Messaging (FCM) to facilitate instant coordination between requesters and donors.",
    techStack: [
      "React Native",
      "NativeWind",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "FCM",
      "Google Maps API",
    ],
    githubLink: "https://github.com/syedomer17/Urgent-Blood-App",
    createdAt: "2026-02-26",
    updatedAt: "2026-02-26",
    image: "/projects/blood-app.png",
    status: "coming soon",
    isComingSoon: true,
    caseStudyFocus: "Real-time emergency matching and geo-location sorting.",
    problemSolved:
      "Blood shortages during emergencies cost lives — not because blood isn't available, but because the logistics of finding compatible nearby donors fast enough consistently fail. Existing solutions are too slow and too manual for genuine emergencies. This platform is built specifically for the time-critical scenario: match the right donor, in the right location, as fast as possible.",
    keyFeatures: [
      "Haversine-based geo-matching to surface the closest compatible donors first",
      "Real-time push notifications via Firebase Cloud Messaging",
      "Live request feeds with Socket.io for instant updates without polling",
      "Blood group compatibility checking baked into matching logic",
      "Donor trust and reputation system to improve match reliability",
      "AI-driven priority scoring for critical vs. standard requests",
      "Google Maps integration for visual donor proximity display",
      "Auto-escalation for unfulfilled requests past a time threshold",
    ],
    challenges:
      "The core challenge was latency — in an emergency, every second matters. Getting the matching, notification, and confirmation flow to complete in under 10 seconds required careful architecture decisions: real-time sockets over REST for status updates, FCM for push delivery, and pre-computed geo-indexes in MongoDB to avoid slow proximity queries under load. Building the trust system was also non-trivial — a donor who repeatedly accepts requests but doesn't show up needs to be surfaced less prominently without being permanently penalized.",
    outcome:
      "The platform is in active development with the core matching and notification pipeline working end-to-end. The geo-matching algorithm reliably identifies the closest eligible donors within milliseconds, and the real-time communication layer keeps all parties synchronized without manual refresh.",
    role:
      "Lead developer — system architecture, geo-matching algorithm, real-time socket layer, push notification integration, React Native mobile app, and the Node.js/Express backend.",
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
