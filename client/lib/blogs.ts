export type Blog = {
  title: string;
  slug: string;
  description: string;
  content: string[];
  publishedAt: string;
  updatedAt: string;
  tags?: string[];
};

type BlogInput = Omit<Blog, "slug"> & { slug?: string };

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizeSlug = (value: string) => slugify(decodeURIComponent(value));

const blogInputs: BlogInput[] = [
  {
    title: "Secure MERN Architecture for Production SaaS",
    description:
      "A security-first blueprint for designing MERN systems that scale, with guidance on auth, data protection, and DevSecOps delivery.",
    content: [
      "## Why security-first MERN architecture matters",
      "Most startups build for speed first and patch security later. That approach compounds risk. A security-first MERN architecture bakes in authentication, authorization, input validation, and monitoring from day one.",
      "## Core architecture layers",
      "Separate concerns across presentation, API, and data layers. Keep sensitive logic server-side, enforce strict validation at the boundary, and define clear service contracts between modules.",
      "## Authentication and authorization",
      "Use short-lived access tokens with refresh rotation or secure sessions via httpOnly cookies. Implement RBAC for admin paths and isolate sensitive data access rules in a single policy layer.",
      "## Data protection and observability",
      "Encrypt sensitive fields, apply least-privilege database roles, and monitor for suspicious access patterns. Set alerts for auth anomalies and spikes in failed requests.",
      "## DevSecOps delivery",
      "Automate dependency scanning, run tests on every commit, and block deployments when critical vulnerabilities are detected. Track deployments and rollbacks to keep audit history.",
      "## Next steps",
      "Use the resources linked below to operationalize these practices for your stack and teams.",
    ],
    publishedAt: "2026-02-13",
    updatedAt: "2026-02-13",
    tags: ["MERN", "Security", "DevSecOps", "Architecture"],
  },
  {
    title: "Basics of IP Addresses in Computer Networking",
    description:
      "A practical primer on IP addresses, classes, subnetting basics, and how packets are routed across networks.",
    content: [
      "This guide breaks down IP addressing into simple mental models you can apply when designing or debugging networks.",
      "You will learn how IPv4 addresses are structured, how subnetting works at a high level, and how routers interpret address ranges.",
      "Use these concepts to reason about private vs public IPs, CIDR notation, and common network configuration pitfalls.",
    ],
    publishedAt: "2025-10-09",
    updatedAt: "2025-10-09",
    tags: ["Networking", "IP Address", "Computer Networks"],
  },
  {
    title: "How the Internet Works: From Browser to Server",
    description:
      "A step-by-step walkthrough of DNS, TLS, HTTP, and the request lifecycle from browser to origin server.",
    content: [
      "This post explains what happens after you press Enter in the browser, from DNS resolution to TCP/TLS negotiation and HTTP requests.",
      "It covers caching layers, CDNs, and the role of servers, load balancers, and application logic in returning a response.",
      "Use this to troubleshoot slow requests and understand where latency can be introduced across the stack.",
    ],
    publishedAt: "2024-10-08",
    updatedAt: "2024-10-08",
    tags: ["Networking", "Internet", "Web Fundamentals"],
  },
  {
    title: "Understanding Objects and Arrays in JavaScript",
    description:
      "A practical refresher on core JavaScript data structures with common patterns and pitfalls.",
    content: [
      "This post covers how objects and arrays are represented in JavaScript, including common patterns for access and mutation.",
      "It highlights iteration methods, reference behavior, and techniques to avoid unintended side effects in state updates.",
      "Use these fundamentals to write cleaner data transformations and reduce bugs in application logic.",
    ],
    publishedAt: "2025-03-01",
    updatedAt: "2025-03-01",
    tags: ["JavaScript", "Basics", "Programming"],
  },
];

const buildBlogs = (inputs: BlogInput[]): Blog[] => {
  const usedSlugs = new Set<string>();

  return inputs.map((blog) => {
    const slug = blog.slug ? slugify(blog.slug) : slugify(blog.title);

    if (!slug) {
      throw new Error(`Invalid slug for blog: ${blog.title}`);
    }

    if (usedSlugs.has(slug)) {
      throw new Error(`Duplicate slug detected: ${slug}`);
    }

    usedSlugs.add(slug);

    return {
      ...blog,
      slug,
    };
  });
};

export const blogs = buildBlogs(blogInputs);

export const getBlogBySlug = (slug: string) =>
  blogs.find((blog) => blog.slug === normalizeSlug(slug));
