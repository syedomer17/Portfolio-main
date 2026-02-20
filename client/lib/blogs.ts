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
    title: "I Built a Beautiful Next.js App... and Nobody Visited It",
    description:
      "A practical guide to making Next.js apps discoverable, covering Search Console, sitemaps, robots.txt, metadata, IndexNow, Core Web Vitals, and mobile-first fixes.",
    content: [
      "I spent 3 weeks building a clean Next.js Portfolio App.",
      "Perfect Tailwind UI.",
      "Clean animations.",
      "Lighthouse score: 85+.",
      "Deployed on Vercel.",
      "I launched it. Posted it. Shared it.",
      "And then... 3 visitors. Two were me. One was my friend.",
      "That is when I learned something most developers do not realize: a fast app is not the same as a discoverable app. If Google does not understand your app, it does not exist.",
      "This guide covers everything I fixed specifically for Next.js and React developers.",
      "Visit my portfolio:",
      "Syed Omer Ali - Portfolio of Syed Omer Ali, a full stack MERN developer focused on TypeScript, DevSecOps, and secure scalable systems. https://syedomer.me",
      "## The real problem developers have",
      "As React devs, we obsess over the things we can see and measure: components and hooks, performance benchmarks, clean architecture, and developer experience.",
      "But search engines care about an entirely different world: crawlability and indexability, metadata quality, speed signals, and mobile usability.",
      "Let us bridge that gap.",
      "## 1. Google Search Console (your app is invisible without this)",
      "What most devs think: Google will crawl my Vercel URL automatically. No. Not reliably.",
      "How to set it up: head to Google Search Console, add your property via URL prefix, and verify ownership.",
      "If you are on the App Router, add this to app/layout.tsx:",
      "export const metadata = { verification: { google: \"YOUR_VERIFICATION_CODE\" } };",
      "If you are on the Pages Router, add this inside <Head>:",
      "<meta name=\"google-site-verification\" content=\"YOUR_VERIFICATION_CODE\" />",
      "Deploy. Done.",
      "What to monitor weekly: pages indexed, crawl errors, Core Web Vitals, mobile usability, and query performance.",
      "## 2. Add a real sitemap (do not skip this)",
      "Most developers never create one. Big mistake.",
      "With Next.js 13+ App Router, create app/sitemap.ts:",
      "import { MetadataRoute } from \"next\"; export default function sitemap(): MetadataRoute.Sitemap { return [{ url: \"https://yoursite.com\", lastModified: new Date() }, { url: \"https://yoursite.com/blog\", lastModified: new Date() }]; }",
      "Next.js automatically generates /sitemap.xml. Submit that URL inside Search Console, and Googlebot now has a clear map of your entire app.",
      "Think of it like this: User -> Googlebot -> sitemap.xml -> your pages.",
      "## 3. Configure your robots.txt",
      "Create app/robots.ts:",
      "import { MetadataRoute } from \"next\"; export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: \"*\", allow: \"/\" }], sitemap: \"https://yoursite.com/sitemap.xml\" }; }",
      "This auto-generates /robots.txt. A few hard rules to remember: never block /, never block /api unless the routes are truly private, and never block CSS or JS files.",
      "## 4. Fix your metadata (most React apps fail here)",
      "React developers commonly make three metadata mistakes: generic, copy-pasted titles across every page, missing canonical tags, and no Open Graph data.",
      "With the App Router, use dynamic metadata generation:",
      "export async function generateMetadata({ params }) { return { title: `Best React Hooks Guide | YourBrand`, description: \"Learn advanced React hooks with examples and performance tips.\", alternates: { canonical: \"https://yoursite.com/blog/react-hooks\" }, openGraph: { title: \"Best React Hooks Guide\", description: \"Advanced hooks explained clearly.\", images: [\"https://yoursite.com/og.png\"] } }; }",
      "Proper Open Graph tags are the difference between a rich, compelling link preview and a broken, text-only snippet when someone shares your post on X or LinkedIn.",
      "## 5. IndexNow instant indexing for devs who ship fast",
      "When you deploy to Vercel, search engines do not know immediately. You can fix that with a simple API call in your deploy script:",
      "curl \"https://api.indexnow.org/indexnow?url=https://yoursite.com/blog/new-post&key=YOUR_KEY\"",
      "Even better, trigger it automatically via a Vercel webhook on every successful deployment. Your new content gets discovered in minutes, not days.",
      "## 6. Core Web Vitals - Next.js specific fixes",
      "Most React apps fail Core Web Vitals because of three things: bloated JS bundles, unoptimized images, and blocking fonts.",
      "Fix images: always use Next.js Image for critical images: import Image from \"next/image\"; <Image src=\"/hero.png\" alt=\"Hero\" width={1200} height={630} priority />",
      "Fix fonts: self-host your fonts through Next.js to avoid layout shifts and extra network requests: import { Inter } from \"next/font/google\"; const inter = Inter({ subsets: [\"latin\"] });",
      "Code split heavy components: const HeavyComponent = dynamic(() => import(\"./HeavyComponent\"), { ssr: false });",
      "Run your app through PageSpeed Insights and look specifically at LCP and CLS. These directly affect your ranking.",
      "## 7. Mobile optimization (mobile-first indexing is real)",
      "Google ranks your site based on its mobile version, not desktop.",
      "Quick checklist: base font size 16px or larger, tap targets at least 48px, no horizontal scrolling, and no layout shifts on load.",
      "Test on a real device, not just DevTools.",
      "In Tailwind, enforce minimum tap target sizes like this: <button class=\"min-w-[48px] min-h-[48px]\">Click me</button>.",
    ],
    publishedAt: "2026-02-20",
    updatedAt: "2026-02-20",
    tags: ["Next.js", "SEO", "Indexing", "Performance", "Web"],
  },
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
