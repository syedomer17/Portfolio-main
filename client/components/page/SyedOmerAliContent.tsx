"use client";

import Link from "next/link";
import NextImage from "next/image";
import dynamic from "next/dynamic";
import { ArrowLeft, Mail, CalendarDays } from "lucide-react";
import ThemeToggle from "@/components/themeToggle/ThemeToggle";
import ButtonCreativeTop from "@/components/ui/creative/Button";

const GithubHoverCard = dynamic(() => import("@/components/socialButtons/Github"), { ssr: false });
const TwitterHoverCard = dynamic(() => import("@/components/socialButtons/Twitter"), { ssr: false });
const LinkedinHoverCard = dynamic(() => import("@/components/socialButtons/Linkedin"), { ssr: false });
const MediumHoverCard = dynamic(() => import("@/components/socialButtons/Medium"), { ssr: false });

const siteUrl = "https://www.syedomer.me";

export default function SyedOmerAliContent() {
  return (
    <main
      className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300"
      itemScope
      itemType="https://schema.org/ProfilePage"
    >
      <div className="container mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="max-w-3xl mx-auto">
          <header className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
              aria-label="Go back to homepage"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <ThemeToggle />
          </header>

          {/* Main Profile Section */}
          <article
            itemScope
            itemType="https://schema.org/Person"
            className="space-y-8"
          >
            <meta itemProp="name" content="Syed Omer Ali" />
            <meta itemProp="alternateName" content="Syed Omer" />
            <meta itemProp="alternateName" content="Omer Ali" />
            <meta itemProp="alternateName" content="syedomer17" />
            <meta itemProp="url" content={siteUrl} />

            {/* Hero Section with Image */}
            <section className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="shrink-0">
                  <NextImage
                    src="/myImage.avif"
                    alt="Syed Omer Ali - Full Stack Developer"
                    width={120}
                    height={120}
                    className="rounded-2xl border-2 border-slate-200 dark:border-slate-700"
                    itemProp="image"
                    priority
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h1
                      className="dark:text-white font-bold font-instagram mb-2 sm:text-3xl text-2xl text-slate-900"
                      itemProp="name"
                    >
                      Syed Omer Ali
                    </h1>
                    <h2
                      className="dark:text-white font-instagram font-semibold mb-1 text-lg text-slate-900"
                      itemProp="jobTitle"
                    >
                      Full Stack Developer & DevSecOps Engineer
                    </h2>
                    <p
                      className="dark:text-slate-400 font-instagram text-base text-slate-600"
                    >
                      <span itemProp="addressLocality">Hyderabad</span>, <span itemProp="addressCountry">India</span> 🇮🇳
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <div itemProp="sameAs">
                  <GithubHoverCard />
                </div>
                <div itemProp="sameAs">
                  <TwitterHoverCard />
                </div>
                <div itemProp="sameAs">
                  <LinkedinHoverCard />
                </div>
                <div itemProp="sameAs">
                  <MediumHoverCard />
                </div>
              </div>
            </section>

            {/* Introduction Section */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                Introduction
              </h2>
              <div
                className="dark:text-slate-300 font-instagram leading-relaxed space-y-3 text-base text-slate-600"
                itemProp="description"
              >
                <p>
                  Syed Omer Ali is an Indian full stack developer, computer science engineering student, 
                  and aspiring DevOps engineer known for building modern web applications with a focus on 
                  scalability, security, and real-world problem solving. He specializes in JavaScript and 
                  TypeScript ecosystems, particularly the MERN stack and Next.js framework, while actively 
                  exploring DevOps practices and artificial intelligence integration into software products.
                </p>
                <p>
                  Currently pursuing a Bachelor of Engineering degree with a specialization in Artificial 
                  Intelligence and Machine Learning at Methodist College of Engineering and Technology, he 
                  focuses heavily on practical implementation by building projects, experimenting with new 
                  technologies, and documenting his learning journey.
                </p>
              </div>
            </section>

            {/* Early Interest in Technology */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                Early Interest in Technology
              </h2>
              <div
                className="dark:text-slate-300 font-instagram leading-relaxed space-y-3 text-base text-slate-600"
              >
                <p>
                  Syed Omer Ali developed an interest in technology during his early academic years, 
                  driven by curiosity about how software systems work behind the scenes. Rather than 
                  limiting himself to theoretical knowledge, he began exploring programming through 
                  hands-on experimentation, gradually moving from basic web development to full stack 
                  engineering concepts.
                </p>
                <p>
                  His approach to learning has always been execution-oriented — building applications, 
                  deploying them, and improving them through iteration. This mindset helped him gain 
                  confidence across both frontend and backend technologies while understanding how 
                  systems function end to end.
                </p>
              </div>
            </section>

            {/* Education Section */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                Education
              </h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3
                    className="dark:text-white font-instagram font-semibold mb-2 text-base text-slate-900"
                  >
                    Bachelor of Engineering in Computer Science
                  </h3>
                  <p
                    className="dark:text-slate-400 font-instagram text-slate-600 text-sm mb-2"
                  >
                    Specialization in Artificial Intelligence and Machine Learning
                  </p>
                  <p
                    className="dark:text-slate-400 font-instagram text-slate-600 text-sm mb-2"
                  >
                    Methodist College of Engineering and Technology, India
                  </p>
                  <p
                    className="dark:text-slate-300 font-instagram text-slate-600 text-sm"
                  >
                    His education provides a foundation in programming, algorithms, and AI concepts, 
                    which he complements with independent learning in modern web technologies, system 
                    design, and cloud infrastructure.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3
                    className="dark:text-white font-instagram font-semibold mb-2 text-base text-slate-900"
                  >
                    Continuous Learning
                  </h3>
                  <p
                    className="dark:text-slate-300 font-instagram text-slate-600 text-sm"
                  >
                    Beyond formal education, Syed Omer Ali continuously expands his knowledge through 
                    hands-on projects, technical documentation, and staying current with emerging 
                    technologies in web development, DevOps, and artificial intelligence.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Skills */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3
                    className="dark:text-white font-instagram font-semibold mb-3 text-base text-slate-900"
                  >
                    Frontend Development
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full"
                        itemProp="knowsAbout"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3
                    className="dark:text-white font-instagram font-semibold mb-3 text-base text-slate-900"
                  >
                    Backend Development
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express.js", "Nest.js", "MongoDB", "MySQL", "PostgreSQL", "REST APIs"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full"
                        itemProp="knowsAbout"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3
                    className="dark:text-white font-instagram font-semibold mb-3 text-base text-slate-900"
                  >
                    DevSecOps & Cloud
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["AWS", "Docker", "CI/CD", "GitHub Actions", "Terraform", "Ansible", "Vercel"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-full"
                        itemProp="knowsAbout"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3
                    className="dark:text-white font-instagram font-semibold mb-3 text-base text-slate-900"
                  >
                    System Design & AI
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["System Design", "AI Engineering", "API Design", "Performance Optimization"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full"
                        itemProp="knowsAbout"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                Projects and Work
              </h2>
              <div
                className="dark:text-slate-300 font-instagram leading-relaxed space-y-3 text-base text-slate-600 mb-4"
              >
                <p>
                  Throughout his learning journey, Syed Omer Ali has worked on multiple projects that 
                  demonstrate his ability to design, build, and deploy full stack applications. His 
                  projects often focus on solving practical problems, improving user experience, and 
                  maintaining clean architecture.
                </p>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <p
                    className="dark:text-slate-300 font-instagram text-slate-600 text-sm mb-3"
                  >
                    His work includes:
                  </p>
                  <ul className="space-y-2 dark:text-slate-300 font-instagram text-slate-600 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Web applications built with modern frontend frameworks and backend APIs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Developer tools and automation platforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>SaaS-style applications and productivity systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>AI-assisted tools and integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Portfolio and personal branding platforms showcasing his technical growth</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <p
                    className="dark:text-slate-300 font-instagram text-slate-600 text-sm"
                  >
                    He emphasizes writing maintainable code, following modular architecture principles, 
                    and ensuring performance optimization wherever possible.
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-instagram font-medium text-sm"
                >
                  View all projects
                </Link>
              </div>
            </section>

            {/* Career Goals Section */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                Career Goals and Vision
              </h2>
              <div
                className="dark:text-slate-300 font-instagram leading-relaxed space-y-3 text-base text-slate-600"
              >
                <p>
                  Syed Omer Ali's long-term goal is to become a highly skilled engineer capable of designing 
                  scalable systems, building impactful products, and contributing to innovative technology solutions. 
                  He is particularly interested in roles that combine full stack development, DevOps engineering, 
                  and AI-driven product development.
                </p>
                <p>
                  He also has entrepreneurial ambitions and hopes to launch technology products that solve 
                  real-world problems, especially tools that improve productivity, automation, and accessibility.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                <p
                  className="dark:text-slate-300 font-instagram text-slate-600 text-sm mb-3"
                >
                  His vision includes:
                </p>
                <ul className="space-y-2 dark:text-slate-300 font-instagram text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Building intelligent and scalable software products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Contributing to open-source and developer communities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Growing into technical leadership roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Creating solutions that leverage artificial intelligence for practical use cases</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* DevOps and System Design */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                DevOps and System Design
              </h2>
              <div
                className="dark:text-slate-300 font-instagram leading-relaxed space-y-3 text-base text-slate-600"
              >
                <p>
                  Beyond application development, Syed Omer Ali has a strong interest in DevOps engineering 
                  and infrastructure automation. He believes that modern developers should understand the 
                  complete lifecycle of software — from development to deployment and monitoring.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                <p
                  className="dark:text-slate-300 font-instagram text-slate-600 text-sm mb-3"
                >
                  His DevOps learning includes:
                </p>
                <ul className="space-y-2 dark:text-slate-300 font-instagram text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Containerization using Docker</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>CI/CD pipeline implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Secure deployment practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Cloud hosting and infrastructure concepts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Performance monitoring and optimization</span>
                  </li>
                </ul>
              </div>
              <p
                className="dark:text-slate-300 font-instagram text-slate-600 text-sm"
              >
                This cross-domain knowledge allows him to approach projects with a broader engineering 
                perspective rather than focusing solely on coding.
              </p>
            </section>

            {/* Content Creation and Knowledge Sharing */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                Content Creation and Knowledge Sharing
              </h2>
              <div
                className="dark:text-slate-300 font-instagram leading-relaxed space-y-3 text-base text-slate-600"
              >
                <p>
                  Syed Omer Ali actively shares his learning journey through blogs, technical articles, 
                  and online platforms. He believes that teaching and documenting concepts helps reinforce 
                  understanding while contributing to the developer community.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                <p
                  className="dark:text-slate-300 font-instagram text-slate-600 text-sm mb-3"
                >
                  His content typically focuses on:
                </p>
                <ul className="space-y-2 dark:text-slate-300 font-instagram text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Web development tutorials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Backend architecture insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>DevOps learning experiences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Project breakdowns and technical explanations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Career growth strategies for developers</span>
                  </li>
                </ul>
              </div>
              <p
                className="dark:text-slate-300 font-instagram text-slate-600 text-sm"
              >
                By sharing knowledge publicly, he aims to help other aspiring engineers navigate their 
                own learning paths more effectively.
              </p>
            </section>

            {/* Personal Philosophy */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                Personal Philosophy
              </h2>
              <div
                className="dark:text-slate-300 font-instagram leading-relaxed space-y-3 text-base text-slate-600"
              >
                <p>
                  One of the defining characteristics of Syed Omer Ali is his growth mindset and persistence. 
                  He views challenges as opportunities to learn and consistently pushes himself beyond his 
                  comfort zone to acquire new skills.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                <p
                  className="dark:text-slate-300 font-instagram text-slate-600 text-sm mb-3"
                >
                  He believes that success in technology comes from:
                </p>
                <ul className="space-y-2 dark:text-slate-300 font-instagram text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Consistent practice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Continuous learning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Building real projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Sharing knowledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Staying adaptable to emerging technologies</span>
                  </li>
                </ul>
              </div>
              <p
                className="dark:text-slate-300 font-instagram text-slate-600 text-sm"
              >
                His journey reflects a commitment to improvement, discipline, and long-term progress rather 
                than short-term achievements.
              </p>
            </section>

            {/* Contact Section */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                Contact
              </h2>
              <div
                className="dark:text-slate-300 font-instagram leading-relaxed space-y-3 text-base text-slate-600"
              >
                <p>
                  Got a project in mind? Want to chat about tech? Or just need some advice on 
                  your DevSecOps setup? I'm always happy to connect with fellow developers, 
                  potential clients, or anyone building something interesting.
                </p>
                <p>
                  The best ways to reach me are through the contact form below or by booking 
                  a quick intro call. I typically respond within 24 hours (sometimes faster if 
                  I'm glued to my laptop, which, let's be honest, is most of the time).
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/intro-call"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3
                    className="dark:group-hover:text-blue-400 dark:text-white font-instagram font-semibold group-hover:text-blue-600 mb-1 text-base text-slate-900"
                  >
                    📅 Book an Intro Call
                  </h3>
                  <p
                    className="dark:text-slate-400 font-instagram text-slate-600 text-sm"
                  >
                    Let's have a quick chat about your project
                  </p>
                </Link>
                <Link
                  href="/send-email"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3
                    className="dark:group-hover:text-blue-400 dark:text-white font-instagram font-semibold group-hover:text-blue-600 mb-1 text-base text-slate-900"
                  >
                    ✉️ Send an Email
                  </h3>
                  <p
                    className="dark:text-slate-400 font-instagram text-slate-600 text-sm"
                  >
                    Prefer email? Drop me a message
                  </p>
                </Link>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3
                    className="dark:text-white font-instagram font-semibold mb-2 text-base text-slate-900"
                  >
                    Who is Syed Omer Ali?
                  </h3>
                  <p
                    className="dark:text-slate-300 font-instagram text-slate-600 text-sm"
                  >
                    Syed Omer Ali is a Full Stack Developer based in Hyderabad, India, specializing in MERN stack development,
                    TypeScript, Next.js, DevSecOps, and AI engineering. He builds scalable web applications and helps teams
                    implement secure, production-ready systems.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3
                    className="dark:text-white font-instagram font-semibold mb-2 text-base text-slate-900"
                  >
                    What does Syed Omer Ali specialize in?
                  </h3>
                  <p
                    className="dark:text-slate-300 font-instagram text-slate-600 text-sm"
                  >
                    Syed Omer Ali specializes in Full Stack Development using the MERN stack, TypeScript, Next.js,
                    DevSecOps practices, cloud infrastructure (AWS), system design, and AI engineering.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3
                    className="dark:text-white font-instagram font-semibold mb-2 text-base text-slate-900"
                  >
                    What technologies does Syed Omer Ali work with?
                  </h3>
                  <p
                    className="dark:text-slate-300 font-instagram text-slate-600 text-sm"
                  >
                    On the frontend: React, Next.js, TypeScript, Tailwind CSS. Backend: Node.js, Express.js, 
                    MongoDB, PostgreSQL, MySQL. DevOps: AWS, Docker, GitHub Actions, CI/CD pipelines. 
                    Plus system design, security best practices, and AI integration.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3
                    className="dark:text-white font-instagram font-semibold mb-2 text-base text-slate-900"
                  >
                    Where is Syed Omer Ali based?
                  </h3>
                  <p
                    className="dark:text-slate-300 font-instagram text-slate-600 text-sm"
                  >
                    Syed Omer Ali is based in Hyderabad, India, and works remotely with clients globally.
                  </p>
                </div>
              </div>
            </section>

            {/* Explore More */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                Explore More
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/blogs"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3
                    className="dark:group-hover:text-blue-400 dark:text-white font-instagram font-semibold group-hover:text-blue-600 mb-1 text-base text-slate-900"
                  >
                    Blog Posts
                  </h3>
                  <p
                    className="dark:text-slate-400 font-instagram text-slate-600 text-sm"
                  >
                    Read technical articles and tutorials
                  </p>
                </Link>
                <Link
                  href="/services"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3
                    className="dark:group-hover:text-blue-400 dark:text-white font-instagram font-semibold group-hover:text-blue-600 mb-1 text-base text-slate-900"
                  >
                    Services
                  </h3>
                  <p
                    className="dark:text-slate-400 font-instagram text-slate-600 text-sm"
                  >
                    See what services I offer
                  </p>
                </Link>
                <Link
                  href="/case-studies"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3
                    className="dark:group-hover:text-blue-400 dark:text-white font-instagram font-semibold group-hover:text-blue-600 mb-1 text-base text-slate-900"
                  >
                    Case Studies
                  </h3>
                  <p
                    className="dark:text-slate-400 font-instagram text-slate-600 text-sm"
                  >
                    Detailed project breakdowns
                  </p>
                </Link>
                <Link
                  href="/about"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3
                    className="dark:group-hover:text-blue-400 dark:text-white font-instagram font-semibold group-hover:text-blue-600 mb-1 text-base text-slate-900"
                  >
                    More About Me
                  </h3>
                  <p
                    className="dark:text-slate-400 font-instagram text-slate-600 text-sm"
                  >
                    Other ways to learn about my work
                  </p>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}
