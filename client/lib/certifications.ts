export type Certification = {
  title: string;
  slug: string;
  issuer: string;
  issueDate: string;
  credentialLink: string;
  description: string;
  image: string;
};

type CertificationInput = Omit<Certification, "slug"> & { slug?: string };

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const certificationInputs: CertificationInput[] = [
  {
    title: "Linux System Administration Certification",
    issuer: "Linux Challenge Program",
    issueDate: "2024-06-15",
    credentialLink: "#",
    image: "/certifications/linux.png",
    description:
      "Hands-on Linux training covering system architecture, file systems, process management, permissions, networking fundamentals, and shell scripting with real command-line exercises.",
  },
  {
    title: "AWS 3-Tier Architecture Project Certification",
    issuer: "AWS Hands-On Program",
    issueDate: "2025-02-10",
    credentialLink: "#",
    image: "/certifications/Aws.png",
    description:
      "Designed and deployed a complete 3-tier architecture using EC2, S3, Application Load Balancer, IAM, and security groups, focusing on scalability, availability, and best practices.",
  },
  {
    title: "DevOps Engineering Certification",
    issuer: "DevOps Training Program",
    issueDate: "2025-04-18",
    credentialLink: "#",
    image: "/certifications/Devops.png",
    description:
      "Practical DevOps training involving CI/CD pipelines, Docker containerization, Jenkins automation, Ansible configuration management, and Git/GitHub workflows.",
  },
  {
    title: "DevOps and Aws Cloud Certification",
    issuer: "Full Stack Academy",
    issueDate: "2025-05-02",
    credentialLink: "#",
    image: "/certifications/devops-aws.png",
    description:
      "Comprehensive DevOps and AWS training covering CI/CD pipelines, Docker, AWS services (EC2, S3, IAM), infrastructure as code, and best practices for cloud deployment and management.",
  },
  {
    title: "Postman API Fundamentals Student Certification",
    issuer: "Postman",
    issueDate: "2025-03-20",
    credentialLink: "https://badgr.com/public/assertions/l1JA7K4WSfiCQxqrZ1QDZg?identity__email=syedomerali2006%40gmail.com",
    image: "/certifications/postman.png",
    description:
      "Fundamental training on API development and testing using Postman, covering request building, response validation, and automation.",
  },
  {
    title: "Introduction to Programming Using HTML and CSS Certification",
    issuer: "LetsUpgrade",
    issueDate: "2025-01-25",
    credentialLink: "#",
    image: "/certifications/html-css.png",
    description:
      "Comprehensive introduction to web development covering HTML structure, CSS styling, responsive design, and best practices for building modern websites.",
  },
  {
    title: "JavaScript Specialist Certification",
    issuer: "Udemy",
    issueDate: "2024-09-10",
    credentialLink: "https://udemy-certificate.s3.amazonaws.com/image/UC-8732de05-ea94-4275-b95b-d7820a241896.jpg",
    image: "/certifications/javascript.png",
    description:
      "In-depth JavaScript training covering core concepts, ES6 features, asynchronous programming, and practical application development.",
  },
  {
    title: "Full Stack Web Development Certification",
    issuer: "Full Stack Training Program",
    issueDate: "2025-06-12",
    credentialLink: "#",
    image: "/certifications/fullstack.png",
    description:
      "Comprehensive full-stack development certification covering frontend, backend, databases, REST APIs, authentication, and deployment of production-ready applications.",
  },
];

const buildCertifications = (inputs: CertificationInput[]): Certification[] => {
  const usedSlugs = new Set<string>();

  return inputs.map((certification) => {
    const slug = certification.slug
      ? slugify(certification.slug)
      : slugify(certification.title);

    if (!slug) {
      throw new Error(`Invalid slug for certification: ${certification.title}`);
    }

    if (usedSlugs.has(slug)) {
      throw new Error(`Duplicate slug detected: ${slug}`);
    }

    usedSlugs.add(slug);

    return {
      ...certification,
      slug,
    };
  });
};

export const certifications = buildCertifications(certificationInputs);

export const getCertificationBySlug = (slug: string) =>
  certifications.find((certification) => certification.slug === slug);
