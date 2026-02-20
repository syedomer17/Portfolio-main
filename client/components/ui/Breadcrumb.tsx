"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Script from "next/script";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  currentPage: string;
}

export default function Breadcrumb({ items, currentPage }: BreadcrumbProps) {
  const baseUrl = "https://www.syedomer.me";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${baseUrl}${item.href}`,
      })),
      {
        "@type": "ListItem",
        position: items.length + 1,
        name: currentPage,
      },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <nav
        aria-label="Breadcrumb"
        className="mb-4"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <ol className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          {items.map((item, index) => (
            <li
              key={item.href}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                href={item.href}
                className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.name}</span>
              </Link>
              <meta itemProp="position" content={String(index + 1)} />
              {index < items.length && (
                <ChevronRight className="w-3 h-3 inline ml-2" aria-hidden="true" />
              )}
            </li>
          ))}
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            aria-current="page"
          >
            <span
              className="text-slate-900 dark:text-white font-medium"
              itemProp="name"
            >
              {currentPage}
            </span>
            <meta itemProp="position" content={String(items.length + 1)} />
          </li>
        </ol>
      </nav>
    </>
  );
}
