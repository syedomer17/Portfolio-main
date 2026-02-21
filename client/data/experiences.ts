export type Experience = {
  company: string;
  role: string;
  type: string;
  location: string;
  period: string;
  startDate: string;
  endDate?: string | null;
  updatedAt: string;
  summary: string;
  logo: string;
  achievements: string[];
  tags: string[];
  slug: string;
};

type ExperienceInput = Omit<Experience, "slug"> & { slug?: string };

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const experienceInputs: ExperienceInput[] = [
  {
    company: "Code for India",
    role: "Full Stack Product Developer",
    type: "Internship",
    location: "India - Onsite",
    period: "Dec 2025 - Present",
    startDate: "2025-12-12",
    endDate: null,
    updatedAt: "2026-02-01",
    summary:
      "Lead product development across frontend, backend, and infrastructure workstreams. Focus on shipping features with reliable APIs, scalable architecture, and a tight feedback loop with stakeholders.",
    logo: "/experience/cfi.avif",
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
    startDate: "2025-08-01",
    endDate: "2025-11-01",
    updatedAt: "2025-11-15",
    summary:
      "Worked on CI/CD pipelines and AWS deployments with a focus on reliability and automation. Supported containerization workflows and infrastructure maintenance for production services.",
    logo: "/experience/fullstackAcademy.avif",
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
    startDate: "2024-10-01",
    endDate: "2025-03-01",
    updatedAt: "2025-03-15",
    summary:
      "Built and shipped full stack features for internal and public-facing tools. Focused on API integrations, database design, and UI delivery with measurable performance improvements.",
    logo: "/experience/cfi.png",
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

const buildExperiences = (inputs: ExperienceInput[]): Experience[] => {
  const usedSlugs = new Set<string>();

  return inputs.map((experience) => {
    const slugSource = `${experience.company} ${experience.role}`;
    const slug = experience.slug ? slugify(experience.slug) : slugify(slugSource);

    if (!slug) {
      throw new Error(`Invalid slug for experience: ${experience.company}`);
    }

    if (usedSlugs.has(slug)) {
      throw new Error(`Duplicate slug detected: ${slug}`);
    }

    usedSlugs.add(slug);

    return {
      ...experience,
      slug,
    };
  });
};

export const experiences = buildExperiences(experienceInputs);

export const getExperienceBySlug = (slug: string) =>
  experiences.find((experience) => experience.slug === slug);
