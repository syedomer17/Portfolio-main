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

            {/* About Section */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                About Syed Omer Ali
              </h2>
              <div
                className="dark:text-slate-300 font-instagram leading-relaxed space-y-3 text-base text-slate-600"
                itemProp="description"
              >
                <p>
                  <strong>Syed Omer Ali</strong> is a Full Stack Developer based in Hyderabad, India,
                  with expertise in building modern web applications using the MERN stack (MongoDB, Express.js, React, Node.js),
                  TypeScript, and Next.js. He specializes in creating scalable, secure, and performant systems for startups and SaaS companies.
                </p>
                <p>
                  With a strong focus on DevSecOps practices, <strong>Syed Omer Ali</strong> helps teams implement
                  CI/CD pipelines, cloud infrastructure on AWS, and security best practices. He combines full-stack
                  development skills with system design expertise to deliver production-ready solutions.
                </p>
                <p>
                  <strong>Syed Omer Ali</strong> also works on AI engineering projects, integrating intelligent
                  features into web applications and exploring modern AI tooling to enhance product experiences.
                </p>
              </div>
            </section>

            {/* Skills & Expertise */}
            <section className="space-y-4">
              <h2
                className="dark:text-white font-instagram font-semibold text-slate-900 text-xl"
              >
                Skills & Expertise
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
                    How can I contact Syed Omer Ali?
                  </h3>
                  <p
                    className="dark:text-slate-300 font-instagram text-slate-600 text-sm"
                  >
                    You can contact Syed Omer Ali through the{" "}
                    <Link href="/send-email" className="text-blue-600 dark:text-blue-400 hover:underline">
                      contact form
                    </Link>{" "}
                    or book an{" "}
                    <Link href="/intro-call" className="text-blue-600 dark:text-blue-400 hover:underline">
                      intro call
                    </Link>. You can also connect on{" "}
                    <a
                      href="https://www.linkedin.com/in/syedomer17/"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>,{" "}
                    <a
                      href="https://github.com/syedomer17"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>, or{" "}
                    <a
                      href="https://x.com/SyedOmer17Ali"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      X/Twitter
                    </a>.
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
                  href="/projects"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3
                    className="dark:group-hover:text-blue-400 dark:text-white font-instagram font-semibold group-hover:text-blue-600 mb-1 text-base text-slate-900"
                  >
                    Projects →
                  </h3>
                  <p
                    className="dark:text-slate-400 font-instagram text-slate-600 text-sm"
                  >
                    View projects built by Syed Omer Ali
                  </p>
                </Link>
                <Link
                  href="/blogs"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3
                    className="dark:group-hover:text-blue-400 dark:text-white font-instagram font-semibold group-hover:text-blue-600 mb-1 text-base text-slate-900"
                  >
                    Blog Posts →
                  </h3>
                  <p
                    className="dark:text-slate-400 font-instagram text-slate-600 text-sm"
                  >
                    Read technical articles by Syed Omer Ali
                  </p>
                </Link>
                <Link
                  href="/services"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3
                    className="dark:group-hover:text-blue-400 dark:text-white font-instagram font-semibold group-hover:text-blue-600 mb-1 text-base text-slate-900"
                  >
                    Services →
                  </h3>
                  <p
                    className="dark:text-slate-400 font-instagram text-slate-600 text-sm"
                  >
                    Services offered by Syed Omer Ali
                  </p>
                </Link>
                <Link
                  href="/about"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3
                    className="dark:group-hover:text-blue-400 dark:text-white font-instagram font-semibold group-hover:text-blue-600 mb-1 text-base text-slate-900"
                  >
                    More About Me →
                  </h3>
                  <p
                    className="dark:text-slate-400 font-instagram text-slate-600 text-sm"
                  >
                    Learn more about Syed Omer Ali
                  </p>
                </Link>
              </div>
            </section>

            {/* CTA Section */}
            <section className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 p-6">
              <h2
                className="dark:text-white font-instagram font-semibold mb-2 text-lg text-slate-900"
              >
                Work with Syed Omer Ali
              </h2>
              <p
                className="dark:text-slate-300 font-instagram mb-4 text-slate-600 text-sm"
              >
                Interested in building scalable web applications or need help with DevSecOps?
                Let's discuss your project.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <ButtonCreativeTop href="/intro-call" icon={<CalendarDays className="w-4 h-4" />}>
                  <span className="font-instagram font-medium">
                    Book an intro call
                  </span>
                </ButtonCreativeTop>
                <Link
                  href="/send-email"
                  className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-[9px] text-sm font-medium bg-white dark:bg-[#2E2E2E] text-slate-900 dark:text-[#D4D4D4] border border-slate-300 dark:border-transparent"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-instagram font-medium">
                    Send an email
                  </span>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}
