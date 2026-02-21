"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import ButtonCreativeTop from "@/components/ui/creative/Button";

export default function ServiceCtas() {
  return (
    <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
      <ButtonCreativeTop icon={<CalendarDays className="w-4 h-4" />}>
        <span className="font-medium font-instagram">
          Book an intro call
        </span>
      </ButtonCreativeTop>
      <Link
        href="/send-email"
        className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-[9px] text-sm font-medium bg-white dark:bg-[#2E2E2E] text-slate-900 dark:text-[#D4D4D4] border border-slate-300 dark:border-transparent"
      >
        <span className="font-medium font-instagram">
          Send a project brief
        </span>
      </Link>
    </div>
  );
}
