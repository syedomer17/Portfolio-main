"use client";

import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export type ResumeCTAVariant = "primary" | "secondary";
export type ResumeCTASource = "hero" | "intro" | "footer";

export interface ResumeCTAProps {
  variant?: ResumeCTAVariant;
  showDownload?: boolean;
  source: ResumeCTASource;
  className?: string;
}

type DataLayerEvent = {
  event: "resume_view" | "resume_download";
  source: ResumeCTASource;
};

type DataLayerWindow = Window & {
  dataLayer?: DataLayerEvent[];
};

const viewButtonByVariant: Record<ResumeCTAVariant, string> = {
  primary:
    "bg-slate-700 text-white dark:bg-[#C7C7C7] dark:text-[#0E0D09] border border-transparent",
  secondary:
    "bg-slate-900 text-white dark:bg-white dark:text-[#0E0D09] border border-transparent",
};

const downloadButtonByVariant: Record<ResumeCTAVariant, string> = {
  primary:
    "bg-white text-slate-900 border border-slate-300 dark:bg-[#2E2E2E] dark:text-[#D4D4D4] dark:border-[#4A4A4A]",
  secondary:
    "bg-transparent text-slate-700 border border-slate-300 dark:text-[#D4D4D4] dark:border-[#4A4A4A]",
};

export default function ResumeCTA({
  variant = "primary",
  showDownload = true,
  source,
  className,
}: ResumeCTAProps) {
  const pushEvent = (event: DataLayerEvent["event"]) => {
    (window as DataLayerWindow).dataLayer?.push({ event, source });
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2 sm:gap-3", className)}>
      <Link
        href="/SyedOmerAli.pdf"
        onClick={() => pushEvent("resume_view")}
        className={cn(
          "inline-flex items-center gap-2 rounded-[9px] px-3 py-1.5 sm:px-5 sm:py-2.5 text-sm font-medium font-instagram transition-colors",
          viewButtonByVariant[variant]
        )}
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        <span>View Resume</span>
      </Link>

      {showDownload && (
        <a
          href="/SyedOmerAli.pdf"
          download
          onClick={() => pushEvent("resume_download")}
          className={cn(
            "inline-flex items-center gap-2 rounded-[9px] px-3 py-1.5 sm:px-5 sm:py-2.5 text-sm font-medium font-instagram transition-colors",
            downloadButtonByVariant[variant]
          )}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          <span>Download Resume</span>
        </a>
      )}
    </div>
  );
}
