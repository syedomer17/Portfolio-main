import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { RelatedItem } from "@/lib/related";

type Props = {
  heading: string;
  eyebrow?: string;
  items: RelatedItem[];
  hubHref?: string;
  hubLabel?: string;
};

export default function RelatedContent({
  heading,
  eyebrow,
  items,
  hubHref,
  hubLabel,
}: Props) {
  if (!items.length) return null;

  return (
    <section
      aria-labelledby="related-content-heading"
      className="mt-12 pt-8 border-t border-slate-200 dark:border-[#2A2A2A] font-instagram"
    >
      {eyebrow ? (
        <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#f6c400] mb-3">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id="related-content-heading"
        className="text-[18.4px] leading-[23px] font-bold text-[#333333] dark:text-[#EBEBEB] mb-5"
      >
        {heading}
      </h2>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group block rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-4 sm:p-5 hover:border-slate-300 dark:hover:border-[#3A3A3A] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white leading-snug group-hover:underline underline-offset-4 decoration-slate-300 dark:decoration-[#444]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-5 text-slate-600 dark:text-[#989898] line-clamp-2">
                    {item.description}
                  </p>
                  {item.tags.length ? (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 4).map((tag) => (
                        <li
                          key={tag}
                          className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded border border-slate-200 dark:border-[#3A3A3A] text-slate-500 dark:text-[#989898]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-4 h-4 mt-0.5 text-slate-400 dark:text-[#666] group-hover:text-slate-700 dark:group-hover:text-white transition-colors shrink-0"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {hubHref && hubLabel ? (
        <div className="mt-5">
          <Link
            href={hubHref}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-700 dark:text-[#D4D4D4] hover:text-slate-900 dark:hover:text-white underline underline-offset-4 decoration-slate-300 dark:decoration-[#444]"
          >
            {hubLabel}
            <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : null}
    </section>
  );
}
