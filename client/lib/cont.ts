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
    title: "AI Powered Resume Maker",
    description:
      "An AI-powered resume analysis platform that evaluates resumes, highlights skill gaps, and provides actionable improvement suggestions using NLP-based scoring.",
    image: "/projects/ai-resume-analyzer.png",
    status: "Completed",
    isComingSoon: false,
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "MongoDB",
      "REST APIs",
      "Gemini APIs",
    ],
    notes: "Project completed. Deployment pending.",
    url: "https://github.com/syedomer17/AI-powered-resume",
  },
  {
    title: "GitHub Gist Manager",
    description:
      "A full-stack GitHub Gist management app allowing users to authenticate via GitHub OAuth, search gists, view files, like, comment, and manage favorites.",
    image: "/projects/gist-manager.png",
    status: "Completed",
    isComingSoon: false,
    techStack: [
      "Next.js",
      "TypeScript",
      "GitHub OAuth",
      "Shadcn UI",
      "MongoDB",
    ],
    notes: "Completed with OAuth and backend persistence. Not yet live.",
    url: "https://github.com/syedomer17/Next.js-gist-search",
  },
  {
    title: "AI Interviewer",
    description:
      "An AI-driven mock interview platform that generates role-based interview questions, evaluates answers, and provides feedback to improve interview readiness.",
    image: "/projects/ai-interviewer.png",
    status: "Completed",
    isComingSoon: false,
    techStack: [
      "React.js",
      "JavaScript",
      "Shadcn UI",
      "Tailwind CSS",
      "AI APIs",
    ],
    notes: "Core interview logic complete. UI and deployment polish pending.",
    url: "https://github.com/syedomer17/AI-Powered-Interview-Assistant",
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
      "JavaScript",
      "Chart.js",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    notes: "Feature-complete project. Ready for deployment.",
    url: "https://github.com/syedomer17/Expense-Tracker-App",
  },
  {
    title: "Nginx Configuration Manager",
    description: "A web-based tool for managing Nginx configurations, allowing users to create, edit, and validate server blocks with real-time syntax checking and deployment capabilities.",
    image: "/projects/nginx-config-manager.png",
    status: "Completed",
    isComingSoon: false,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    notes: "Completed core functionality. UI polish and deployment pending.",
    url: "https://github.com/syedomer17/Next.js-nginx-config-generator",
  },
  {
    title: "AI Fitness Assistant",
    description: "An AI-driven fitness assistant that generates personalized workout plans, tracks progress, and provides real-time feedback using NLP and fitness APIs.",
    image: "/projects/ai-fitness-assistant.png",
    status: "Completed",
    isComingSoon: false,
    techStack: ["Next.js", "TypeScript", "Shadcn UI", "Tailwind CSS", "AI APIs"],
    notes: "Core functionality in development. Deployment pending.",
    url: "https://github.com/syedomer17/Next.js-AI-fitness-App"
  }
];

interface Experience {
    company: string;
    role: string;
    type: string;
    location: string;
    period: string;
    logo: string;
    achievements: string[];
    tags: string[];
}

export const experiences: Experience[] = [
    {
    company: "Code for India",
    role: "Full Stack Product Developer",
    type: "Internship",
    location: "India - Onsite",
    period: "Dec 2025 - Present",
    logo: "/logos/code-for-india.png",
    achievements: [
      "Leading development of product features from idea to deployment",
      "Designing scalable backend architectures and APIs",
      "Building reusable frontend components with performance and accessibility in mind",
      "Collaborating directly with stakeholders to translate requirements into features",
    ],
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "System Design",
      "Product Development",
      "MongoDB",
    ],
  },
  {
    company: "Full Stack Academy",
    role: "DevOps & AWS Intern",
    type: "Internship",
    location: "India - Hybrid",
    period: "Aug 2025 - Nov 2025",
    logo: "/logos/full-stack-academy.png",
    achievements: [
      "Worked on CI/CD pipelines for automated build and deployment workflows",
      "Deployed and managed applications on AWS using EC2, S3, and IAM",
      "Implemented Docker-based containerization for development and production environments",
      "Monitored application performance and assisted in infrastructure optimization",
    ],
    tags: [
      "AWS",
      "Docker",
      "CI/CD",
      "Linux",
      "GitHub Actions",
      "DevOps",
    ],
  },
  {
    company: "Code for India",
    role: "Full Stack Developer Intern",
    type: "Internship",
    location: "India - Onsite",
    period: "Oct 2024 - Mar 2025",
    logo: "/logos/code-for-india.png",
    achievements: [
      "Built and maintained full-stack features for internal and public-facing platforms",
      "Worked on REST APIs, database design, and frontend integrations",
      "Collaborated with designers and backend teams to ship production-ready features",
      "Improved application performance and fixed critical bugs across the stack",
    ],
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
      "Tailwind CSS",
    ],
  },
];

interface Certification {
    title: string;
    issuer: string;
    date: string;
    image: string;
    url: string;
    description: string;
}

export const certifications: Certification[] = [
  {
    title: "Linux System Administration Certification",
    issuer: "Linux Challenge Program",
    date: "Issued 2025",
    image: "/certifications/linux.png",
    url: "#",
    description:
      "Hands-on Linux training covering system architecture, file systems, process management, permissions, networking fundamentals, and shell scripting with real command-line exercises.",
  },
  {
    title: "AWS 3-Tier Architecture Project Certification",
    issuer: "AWS Hands-On Program",
    date: "Issued 2025",
    image: "/certifications/Aws.png",
    url: "#",
    description:
      "Designed and deployed a complete 3-tier architecture using EC2, S3, Application Load Balancer, IAM, and security groups, focusing on scalability, availability, and best practices.",
  },
  {
    title: "DevOps Engineering Certification",
    issuer: "DevOps Training Program",
    date: "Issued 2025",
    image: "/certifications/devops.png",
    url: "#",
    description:
      "Practical DevOps training involving CI/CD pipelines, Docker containerization, Jenkins automation, Ansible configuration management, and Git/GitHub workflows.",
  },
  {
    title: "DevOps and Aws Cloud Certification",
    issuer: "Full Stack Academy",
    date: "Issued 2025",
    image: "/certifications/devops-aws.png",
    url: "#",
    description:
      "Comprehensive DevOps and AWS training covering CI/CD pipelines, Docker, AWS services (EC2, S3, IAM), infrastructure as code, and best practices for cloud deployment and management.",
  },
  {
    title: "Postman API Fundamentals Student Certification",
    issuer: "Postman",
    date: "Issued 2025",
    image: "/certifications/postman.png",
    url: "#",
    description:
      "Fundamental training on API development and testing using Postman, covering request building, response validation, and automation.",
  },
  {
    title: "Introduction to Programming Using HTML and CSS Certification",
    issuer: "LetsUpgrade",
    date: "Issued 2025",
    image: "/certifications/html-css.png",
    url: "#",
    description:
      "Comprehensive introduction to web development covering HTML structure, CSS styling, responsive design, and best practices for building modern websites.",
  },
  {
    title: "JavaScript Specialist Certification",
    issuer: "Udemy",
    date: "Issued 2024",
    image: "/certifications/javascript.png",
    url: "https://udemy-certificate.s3.amazonaws.com/image/UC-8732de05-ea94-4275-b95b-d7820a241896.jpg",
    description:
      "In-depth JavaScript training covering core concepts, ES6 features, asynchronous programming, and practical application development.",
  },
  {
    title: "Full Stack Web Development Certification",
    issuer: "Full Stack Training Program",
    date: "Issued 2025",
    image: "/certifications/fullstack.png",
    url: "#",
    description:
      "Comprehensive full-stack development certification covering frontend, backend, databases, REST APIs, authentication, and deployment of production-ready applications.",
  },
];

export const blogs = [
  {
    title: "Basics of IP Addresses in Computer Networking",
    date: "Oct 9, 2025",
    views: 0,
    tags: ["Networking", "IP Address", "Computer Networks"],
    url: "https://medium.com/@syedomerali2006/basics-of-ip-addresses-in-computer-networking-eaf02610c04f",
  },
  {
    title: "How the Internet Works: From Browser to Server",
    date: "Oct 8, 2024",
    views: 0,
    tags: ["Networking", "Internet", "Web Fundamentals"],
    url: "https://medium.com/@syedomerali2006/how-internet-works-3be34305844a",
  },
  {
    title: "Understanding Objects and Arrays in JavaScript",
    date: "Mar 2025",
    views: 0,
    tags: ["JavaScript", "Basics", "Programming"],
    url: "https://medium.com/@syedomerali2006/adding-elements-8b375452bfc4",
  },

  // JavaScript Fundamentals
  {
    title: "What Is JavaScript? A Beginner-Friendly Introduction",
    date: "Oct 2024",
    views: 0,
    tags: ["JavaScript", "Web Basics"],
    url: "https://medium.com/@syedomerali2006/what-is-javascript-0c0e8f48770f",
  },
  {
    title: "Understanding JavaScript Data Types in Simple Terms",
    date: "Oct 2024",
    views: 0,
    tags: ["JavaScript", "Data Types"],
    url: "https://medium.com/@syedomerali2006/understanding-javascript-data-types-in-simple-terms-e9b4cf4b887c",
  },
  {
    title: "Understanding JavaScript Operators",
    date: "Oct 2024",
    views: 0,
    tags: ["JavaScript", "Operators"],
    url: "https://medium.com/@syedomerali2006/understanding-operators-in-javascript-a95cdb9a7319",
  },
  {
    title: "JavaScript Operators Deep Dive: Assignment & Arithmetic",
    date: "Oct 2024",
    views: 0,
    tags: ["JavaScript", "Operators", "Programming"],
    url: "https://medium.com/@syedomerali2006/understanding-javascript-operators-a-deep-dive-into-assignment-and-arithmetic-operators-d87d73408ce1",
  },
  {
    title: "Mastering Conditional Statements in JavaScript",
    date: "Nov 2024",
    views: 0,
    tags: ["JavaScript", "Conditions", "Programming"],
    url: "https://medium.com/@syedomerali2006/mastering-conditional-statements-in-javascript-863e4c1ba5f8",
  },
  {
    title: "Understanding Loops in JavaScript: for, while, and do-while",
    date: "Nov 2024",
    views: 0,
    tags: ["JavaScript", "Loops"],
    url: "https://medium.com/@syedomerali2006/understanding-loops-in-javascript-for-loop-while-loop-and-do-while-loop-cb66d43ff274",
  },
  {
    title: "Understanding break, continue, and switch in JavaScript",
    date: "Nov 2024",
    views: 0,
    tags: ["JavaScript", "Control Flow"],
    url: "https://medium.com/@syedomerali2006/understanding-break-continue-and-switch-in-javascript-77554c78e389",
  },
  {
    title: "Understanding Type Conversion in JavaScript",
    date: "Nov 2024",
    views: 0,
    tags: ["JavaScript", "Type Conversion"],
    url: "https://medium.com/@syedomerali2006/understanding-type-conversions-in-javascript-18f9cb438151",
  },
  {
    title: "var, let, and const in JavaScript: Redeclaration & Reassignment",
    date: "Oct 2024",
    views: 0,
    tags: ["JavaScript", "Variables"],
    url: "https://medium.com/@syedomerali2006/understanding-var-let-and-const-in-javascript-redeclaration-and-reassignment-4bb9976fbecd",
  },

  // Linux & OS
  {
    title: "What Is an Operating System and Types of OS",
    date: "Oct 2024",
    views: 0,
    tags: ["Operating System", "Computer Basics"],
    url: "https://medium.com/@syedomerali2006/what-is-operating-system-and-what-types-of-operating-system-are-07cb8b5f586",
  },
  {
    title: "What Is Linux and Its Distributions",
    date: "Oct 2024",
    views: 0,
    url: "https://medium.com/@syedomerali2006/what-is-linux-and-its-distro-cfdc3a18f86a",
    tags: ["Linux", "Operating System"],
  },
  {
    title: "Linux Commands and Their Usage",
    date: "Oct 2024",
    views: 0,
    url: "https://medium.com/@syedomerali2006/linux-commands-and-their-usage-8b375452bfc4",
    tags: ["Linux", "Commands"],
  },
  {
    title: "Linux Command Line Essentials: From chmod to sort and Beyond",
    date: "Oct 2024",
    views: 0,
    tags: ["Linux", "CLI"],
    url: "https://medium.com/@syedomerali2006/linux-command-line-essentials-from-chmod-to-sort-and-beyond-af88eb2c2dae",
  },
  {
    title: "Advanced Linux Commands for Power Users",
    date: "Oct 2024",
    views: 0,
    tags: ["Linux", "Advanced"],
    url: "https://medium.com/@syedomerali2006/linux-and-its-com-mands-8b9e718f44b9",
  },
  {
    title: "CMD Commands: Basics Every Developer Should Know",
    date: "Oct 2024",
    views: 0,
    tags: ["CLI", "Windows"],
    url: "https://medium.com/@syedomerali2006/cmd-comands-c4d7c3e07530",
  },

  // Networking & Fundamentals
  {
    title: "Understanding IP Addresses: Public, Private, and Classes",
    date: "Oct 2024",
    views: 0,
    tags: ["Networking", "IP Address"],
    url: "https://medium.com/@syedomerali2006/understanding-ip-addresses-with-public-ip-addresses-and-private-ip-addresses-and-its-classes-3ca3afc67df5",
  },
  {
    title: "Understanding 1's Complement and 2's Complement",
    date: "Oct 2024",
    views: 0,
    tags: ["Computer Science", "Number Systems"],
    url: "https://medium.com/@syedomerali2006/understanding-1s-complement-and-2-s-complement-4458ef7de872",
  },
  {
    title: "What Are Number Systems and Their Types?",
    date: "Oct 2024",
    views: 0,
    tags: ["Computer Fundamentals"],
    url: "https://medium.com/@syedomerali2006/what-are-number-system-what-are-there-types-52e3fcae2073",
  },

  // Git, GitHub & Dev Tools
  {
    title: "Getting to Know Git and GitHub: What Is Git?",
    date: "Oct 2024",
    views: 0,
    tags: ["Git", "Version Control"],
    url: "https://medium.com/@syedomerali2006/getting-to-know-git-and-github-what-is-git-f40df1a0670a",
  },
  {
    title: "How to Push Existing Code with Git and .gitignore Configuration",
    date: "Oct 2024",
    views: 0,
    tags: ["Git", "GitHub"],
    url: "https://medium.com/@syedomerali2006/how-to-push-existing-code-with-git-and-gitignore-configuration-0e56928d33ce",
  },
  {
    title: "Step-by-Step Guide to Pushing Code to GitHub Using Ubuntu",
    date: "Oct 2024",
    views: 0,
    tags: ["GitHub", "Linux"],
    url: "https://medium.com/@syedomerali2006/step-by-step-guide-on-how-to-push-files-to-github-using-the-ubuntu-terminal-62a0e329ca12",
  },
  {
    title: "What Is SSH and Why Developers Use It",
    date: "Oct 2024",
    views: 0,
    tags: ["SSH", "Security"],
    url: "https://medium.com/@syedomerali2006/what-is-ssh-e22f761d6f28",
  },

  // Web Basics
  {
    title: "What Is a Website vs a Web Page?",
    date: "Oct 2024",
    views: 0,
    tags: ["Web Basics"],
    url: "https://medium.com/@syedomerali2006/web-page-or-web-side-251288c0e874",
  },
  {
    title: "What Are Domains and Hosting?",
    date: "Oct 2024",
    views: 0,
    tags: ["Web Hosting", "Domains"],
    url: "https://medium.com/@syedomerali2006/what-is-domians-and-hosting-262f310c5432",
  },

  // CLI Tools
  {
    title: "What Is wget? Variations and Options Explained",
    date: "Oct 2024",
    views: 0,
    tags: ["Linux", "CLI Tools"],
    url: "https://medium.com/@syedomerali2006/what-is-wget-and-its-variations-and-options-2b0462739284",
  },
  {
    title: "curl Command Explained with Variations and Options",
    date: "Oct 2024",
    views: 0,
    tags: ["Linux", "Networking"],
    url: "https://medium.com/@syedomerali2006/curl-with-its-variations-and-options-e1ad0c37186c",
  },
];
