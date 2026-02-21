"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeToggle from "../themeToggle/ThemeToggle";

type PageTopBarProps = {
  title: string;
  backHref?: string;
  titleAs?: "h1" | "h2";
};

export default function PageTopBar({
  title,
  backHref = "/",
  titleAs = "h1",
}: PageTopBarProps) {
  const router = useRouter();
  const TitleTag = titleAs;

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push(backHref)}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <TitleTag
          className="text-xl font-bold text-slate-900 dark:text-white font-instagram"
        >
          {title}
        </TitleTag>
      </div>
      <ThemeToggle />
    </div>
  );
}
