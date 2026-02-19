"use client";

import dynamic from "next/dynamic";

const SectionSkeleton = ({
  label,
  className,
  minHeight,
}: {
  label: string;
  className?: string;
  minHeight?: string;
}) => (
  <section className={`container mx-auto px-4 sm:px-6 ${className ?? ""}`} aria-hidden="true">
    <div className={`max-w-2xl mx-auto ${minHeight ?? "min-h-60"}`}>
      <div className="w-28 h-4 bg-slate-200/70 dark:bg-[#333] rounded" />
      <div className="mt-4 h-px w-full bg-slate-200 dark:bg-[#333]" />
      <div className="mt-4 h-20 rounded-lg bg-slate-100/70 dark:bg-[#1a1a1a]" />
      <span className="sr-only">{label} loading</span>
    </div>
  </section>
);

const Experience = dynamic(() => import("@/components/sections/Experience"), {
  ssr: false,
  loading: () => (
    <SectionSkeleton label="Experience" className="pt-6" minHeight="min-h-[420px]" />
  ),
});

const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: false,
  loading: () => <SectionSkeleton label="Projects" minHeight="min-h-[520px]" />,
});

const Blogs = dynamic(() => import("@/components/sections/Blogs"), {
  ssr: false,
  loading: () => <SectionSkeleton label="Blogs" minHeight="min-h-[360px]" />,
});

const TechStack = dynamic(() => import("@/components/sections/TechStack"), {
  ssr: false,
  loading: () => <SectionSkeleton label="Tech stack" minHeight="min-h-[320px]" />,
});

const Certifications = dynamic(() => import("@/components/sections/Certifications"), {
  ssr: false,
  loading: () => <SectionSkeleton label="Certifications" minHeight="min-h-[360px]" />,
});

const Newsletter = dynamic(() => import("@/components/sections/Newsletter"), {
  ssr: false,
  loading: () => (
    <SectionSkeleton label="Newsletter" className="pb-20 pt-4" minHeight="min-h-[320px]" />
  ),
});

export default function HomeSections() {
  return (
    <>
      <Experience />
      <Projects />
      <Blogs />
      <TechStack />
      <Certifications />
      <Newsletter />
    </>
  );
}
