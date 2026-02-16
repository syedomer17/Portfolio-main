export type Certification = {
  title: string;
  slug: string;
  issuer: string;
  date: string;
  image: string;
  url: string;
  description: string;
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
    image: "/certifications/Devops.png",
    url: "#",
    description:
      "Practical DevOps training involving CI/CD pipelines, Docker containerization, Jenkins automation, Ansible configuration management, and Git/GitHub workflows.",
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

const buildCertifications = (
  inputs: CertificationInput[]
): Certification[] => {
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
