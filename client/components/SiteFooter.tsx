import Link from "next/link";

type LinkItem = { href: string; label: string; external?: boolean };
type LinkColumn = { heading: string; items: LinkItem[] };

const columns: LinkColumn[] = [
  {
    heading: "Work",
    items: [
      { href: "/services", label: "Engineering services" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/projects", label: "Projects portfolio" },
      { href: "/experiences", label: "Work experience" },
    ],
  },
  {
    heading: "Read",
    items: [
      { href: "/blogs", label: "Developer blog" },
      { href: "/resources", label: "Free resources" },
      { href: "/certifications", label: "Certifications" },
      { href: "/#newsletter", label: "Newsletter" },
    ],
  },
  {
    heading: "About",
    items: [
      { href: "/about", label: "About Syed Omer Ali" },
      { href: "/syed-omer-ali", label: "Profile and credentials" },
      { href: "/intro-call", label: "Book an intro call" },
      { href: "/send-email", label: "Send an email" },
    ],
  },
];

const profiles: LinkItem[] = [
  { href: "https://github.com/syedomer17", label: "GitHub", external: true },
  {
    href: "https://www.linkedin.com/in/syedomer17/",
    label: "LinkedIn",
    external: true,
  },
  { href: "https://x.com/SyedOmer17Ali", label: "X (Twitter)", external: true },
  {
    href: "https://medium.com/@syedomerali2006",
    label: "Medium",
    external: true,
  },
  {
    href: "https://leetcode.com/syedomerali_200",
    label: "LeetCode",
    external: true,
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="border-t border-slate-200 dark:border-[#2A2A2A] mt-16"
    >
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-2xl">
        {/* Brand block */}
        <div className="flex items-start gap-3 mb-8">
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 mt-1.5 rounded-[2px] bg-[#f6c400]"
          />
          <div className="flex-1 font-instagram">
            <Link
              href="/"
              className="text-sm font-bold text-[#333333] dark:text-[#EBEBEB] hover:opacity-90"
            >
              Syed Omer Ali
            </Link>
            <p className="mt-1 text-[13px] leading-5 text-slate-600 dark:text-[#989898]">
              Full stack MERN developer in Hyderabad, building secure, scalable
              web apps with TypeScript, Next.js, and DevSecOps.
            </p>
          </div>
        </div>

        {/* Link columns */}
        <nav
          aria-label="Sitemap"
          className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 font-instagram"
        >
          {columns.map((col) => (
            <div key={col.heading}>
              <h2 className="text-[11px] font-bold uppercase tracking-[2px] text-[#f6c400] mb-3">
                {col.heading}
              </h2>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[13px] leading-5 text-slate-700 dark:text-[#D4D4D4] hover:text-slate-900 dark:hover:text-white underline-offset-4 hover:underline decoration-slate-300 dark:decoration-[#444]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* External profiles + bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-[#2A2A2A] font-instagram">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-slate-500 dark:text-[#888]">
              Connect
            </span>
            {profiles.map((p) => (
              <a
                key={p.href}
                href={p.href}
                target="_blank"
                rel="me noopener noreferrer"
                className="text-[13px] text-slate-700 dark:text-[#D4D4D4] hover:text-slate-900 dark:hover:text-white underline-offset-4 hover:underline decoration-slate-300 dark:decoration-[#444]"
              >
                {p.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[12px] text-slate-500 dark:text-[#6b6b6b]">
            <p>
              &copy; {year} Syed Omer Ali &middot; Hyderabad, India &middot;{" "}
              <Link
                href="/sitemap.xml"
                className="hover:text-slate-700 dark:hover:text-[#D4D4D4]"
              >
                Sitemap
              </Link>
            </p>
            <p>
              Built with{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-700 dark:hover:text-[#D4D4D4]"
              >
                Next.js
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
