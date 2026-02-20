"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, CalendarDays } from "lucide-react";
import { FaGithub, FaMedium } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import ThemeToggle from "@/components/themeToggle/ThemeToggle";
import ButtonCreativeTop from "@/components/ui/creative/Button";

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
                  <Image
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
                      className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2"
                      style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                      itemProp="name"
                    >
                      Syed Omer Ali
                    </h1>
                    <h2 
                      className="text-lg font-semibold text-slate-900 dark:text-white mb-1"
                      style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                      itemProp="jobTitle"
                    >
                      Full Stack Developer & DevSecOps Engineer
                    </h2>
                    <p 
                      className="text-base text-slate-600 dark:text-slate-400"
                      style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                    >
                      <span itemProp="addressLocality">Hyderabad</span>, <span itemProp="addressCountry">India</span> 🇮🇳
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <a
                  href="https://github.com/syedomer17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-white dark:bg-[#2E2E2E] border border-slate-300 dark:border-transparent rounded-md text-xs sm:text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3E3E3E] transition-colors"
                  style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  itemProp="sameAs"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://x.com/SyedOmer17Ali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-white dark:bg-[#2E2E2E] border border-slate-300 dark:border-transparent rounded-md text-xs sm:text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3E3E3E] transition-colors"
                  style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  itemProp="sameAs"
                >
                  <FaXTwitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/syedomer17/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-white dark:bg-[#2E2E2E] border border-slate-300 dark:border-transparent rounded-md text-xs sm:text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3E3E3E] transition-colors"
                  style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  itemProp="sameAs"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://medium.com/@syedomerali2006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-white dark:bg-[#2E2E2E] border border-slate-300 dark:border-transparent rounded-md text-xs sm:text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3E3E3E] transition-colors"
                  style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  itemProp="sameAs"
                >
                  <FaMedium className="w-4 h-4" />
                  <span>Medium</span>
                </a>
              </div>
            </section>

            {/* About Section */}
            <section className="space-y-4">
              <h2 
                className="text-xl font-semibold text-slate-900 dark:text-white"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
              >
                About Syed Omer Ali
              </h2>
              <div 
                className="space-y-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
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
                className="text-xl font-semibold text-slate-900 dark:text-white"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
              >
                Skills & Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3 
                    className="text-base font-semibold text-slate-900 dark:text-white mb-3"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
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
                    className="text-base font-semibold text-slate-900 dark:text-white mb-3"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    Backend Development
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express.js", "Nest.js", "MongoDB", "MySQL","PostgreSQL", "REST APIs"].map((skill) => (
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
                    className="text-base font-semibold text-slate-900 dark:text-white mb-3"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    DevSecOps & Cloud
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["AWS", "Docker", "CI/CD", "GitHub Actions", "Terraform","Ansible","Vercel"].map((skill) => (
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
                    className="text-base font-semibold text-slate-900 dark:text-white mb-3"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
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
                className="text-xl font-semibold text-slate-900 dark:text-white"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
              >
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3 
                    className="text-base font-semibold text-slate-900 dark:text-white mb-2"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    Who is Syed Omer Ali?
                  </h3>
                  <p 
                    className="text-sm text-slate-600 dark:text-slate-300"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    Syed Omer Ali is a Full Stack Developer based in Hyderabad, India, specializing in MERN stack development, 
                    TypeScript, Next.js, DevSecOps, and AI engineering. He builds scalable web applications and helps teams 
                    implement secure, production-ready systems.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3 
                    className="text-base font-semibold text-slate-900 dark:text-white mb-2"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    What does Syed Omer Ali specialize in?
                  </h3>
                  <p 
                    className="text-sm text-slate-600 dark:text-slate-300"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    Syed Omer Ali specializes in Full Stack Development using the MERN stack, TypeScript, Next.js, 
                    DevSecOps practices, cloud infrastructure (AWS), system design, and AI engineering.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5">
                  <h3 
                    className="text-base font-semibold text-slate-900 dark:text-white mb-2"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    How can I contact Syed Omer Ali?
                  </h3>
                  <p 
                    className="text-sm text-slate-600 dark:text-slate-300"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
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
                    className="text-base font-semibold text-slate-900 dark:text-white mb-2"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    Where is Syed Omer Ali based?
                  </h3>
                  <p 
                    className="text-sm text-slate-600 dark:text-slate-300"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    Syed Omer Ali is based in Hyderabad, India, and works remotely with clients globally.
                  </p>
                </div>
              </div>
            </section>

            {/* Explore More */}
            <section className="space-y-4">
              <h2 
                className="text-xl font-semibold text-slate-900 dark:text-white"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
              >
                Explore More
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/projects"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3 
                    className="text-base font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    Projects →
                  </h3>
                  <p 
                    className="text-sm text-slate-600 dark:text-slate-400"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    View projects built by Syed Omer Ali
                  </p>
                </Link>
                <Link
                  href="/blogs"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3 
                    className="text-base font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    Blog Posts →
                  </h3>
                  <p 
                    className="text-sm text-slate-600 dark:text-slate-400"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    Read technical articles by Syed Omer Ali
                  </p>
                </Link>
                <Link
                  href="/services"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3 
                    className="text-base font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    Services →
                  </h3>
                  <p 
                    className="text-sm text-slate-600 dark:text-slate-400"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    Services offered by Syed Omer Ali
                  </p>
                </Link>
                <Link
                  href="/about"
                  className="group rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h3 
                    className="text-base font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    More About Me →
                  </h3>
                  <p 
                    className="text-sm text-slate-600 dark:text-slate-400"
                    style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                  >
                    Learn more about Syed Omer Ali
                  </p>
                </Link>
              </div>
            </section>

            {/* CTA Section */}
            <section className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 p-6">
              <h2 
                className="text-lg font-semibold text-slate-900 dark:text-white mb-2"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
              >
                Work with Syed Omer Ali
              </h2>
              <p 
                className="text-sm text-slate-600 dark:text-slate-300 mb-4"
                style={{ fontFamily: '"Instagram Sans", sans-serif' }}
              >
                Interested in building scalable web applications or need help with DevSecOps? 
                Let's discuss your project.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <ButtonCreativeTop href="/intro-call" icon={<CalendarDays className="w-4 h-4" />}>
                  <span className="font-medium" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
                    Book an intro call
                  </span>
                </ButtonCreativeTop>
                <Link
                  href="/send-email"
                  className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-[9px] text-sm font-medium bg-white dark:bg-[#2E2E2E] text-slate-900 dark:text-[#D4D4D4] border border-slate-300 dark:border-transparent"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-medium" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
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
