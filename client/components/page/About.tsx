"use client";

import { ArrowLeft, CalendarDays, Mail, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "../themeToggle/ThemeToggle";
import ButtonCreativeTop from "../ui/creative/Button";
import Breadcrumb from "../ui/Breadcrumb";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main 
      className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="container mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="max-w-2xl mx-auto">
          <header className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1
                className="text-xl font-bold font-instagram text-slate-900 dark:text-white"
              >
                About
              </h1>
            </div>
            <ThemeToggle />
          </header>

          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-3" />
          
          <Breadcrumb 
            items={[{ name: "Home", href: "/" }]} 
            currentPage="About" 
          />

          <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 font-instagram">
            <p itemProp="description">
              I am <strong itemProp="author" itemScope itemType="https://schema.org/Person"><span itemProp="name">Syed Omer Ali</span></strong>, a full stack developer working across product engineering, DevOps, cloud, AI engineering, and system design. I ship modern web platforms with a focus on clarity, reliability, and measurable outcomes.
            </p>
            <p>
              I help teams build scalable web applications, API-driven services, and cloud-first infrastructure, while designing systems that stay performant and maintainable as they grow.
            </p>
          </section>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-4">
              <h2
                className="text-base font-semibold font-instagram text-slate-900 dark:text-white mb-2"
              >
                What I do
              </h2>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 font-instagram">
                <li>Build full stack apps with Next.js, React, and Node.js.</li>
                <li>Design systems, APIs, and data workflows.</li>
                <li>Ship reliable deployments with DevOps and cloud tooling.</li>
                <li>Apply AI engineering for smarter product experiences.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-4">
              <h2
                className="text-base font-semibold font-instagram text-slate-900 dark:text-white mb-2"
              >
                How I work
              </h2>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 font-instagram">
                <li>Start with clear scope, milestones, and delivery goals.</li>
                <li>Design for scalability, observability, and performance.</li>
                <li>Communicate progress with structured updates.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h2
              className="text-base font-semibold font-instagram text-slate-900 dark:text-white mb-2"
            >
              Current focus
            </h2>
            <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-4">
              <p className="text-sm text-slate-600 dark:text-slate-300 font-instagram">
                Building productized services for startups, refining system design for scalable SaaS platforms, and experimenting with AI engineering workflows that improve product intelligence.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "PostgreSQL",
                  "Docker",
                  "AWS",
                  "AI Tooling",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-xs leading-4 font-normal font-instagram bg-transparent text-[#424242] dark:text-[#D4D4D4] rounded border border-slate-300 dark:border-[#3A3A3A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2
              className="text-base font-semibold font-instagram text-slate-900 dark:text-white mb-2"
            >
              Quick facts
            </h2>
            <div className="rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-4">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300 font-instagram">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Specialty</dt>
                  <dd className="mt-1">Full stack, DevOps, and AI engineering</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Focus</dt>
                  <dd className="mt-1">Cloud systems and system design</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Based in</dt>
                  <dd className="mt-1">Remote / Global</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Available</dt>
                  <dd className="mt-1">Intro calls and product consults</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
            <ButtonCreativeTop onClick={() => router.push("/intro-call")} icon={<CalendarDays className="w-4 h-4" />}>
              <span className="font-medium font-instagram">
                Book an intro call
              </span>
            </ButtonCreativeTop>
            <Link
              href="/send-email"
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-[9px] text-sm font-medium bg-white dark:bg-[#2E2E2E] text-slate-900 dark:text-[#D4D4D4] border border-slate-300 dark:border-transparent"
            >
              <Mail className="w-4 h-4" />
              <span className="font-medium font-instagram">
                Send an email
              </span>
            </Link>
          </div>

          {/* Link to detailed profile */}
          <div className="mt-6 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 p-4">
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 font-instagram">
              Want to learn more about my background, skills, and how to connect?
            </p>
            <Link
              href="/syed-omer-ali"
              className="inline-flex items-center gap-2 text-sm font-medium font-instagram text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              View complete profile of Syed Omer Ali
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
