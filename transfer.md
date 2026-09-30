# Domain Migration Guide: `syedomer.me` → `syedomer.in`

> **Note:** As requested, this file documents the complete audit, migration strategy, code references, and configuration steps for transferring your domain from `syedomer.me` to `syedomer.in`. **No existing codebase files have been modified.**

---

## Table of Contents
1. [Executive Summary & Key Takeaways](#1-executive-summary--key-takeaways)
2. [Critical SEO Reality: Expired Domain Migration](#2-critical-seo-reality-expired-domain-migration)
3. [Third-Party Services Audit](#3-third-party-services-audit)
   - [Google Search Console (GSC)](#a-google-search-console-gsc)
   - [Google Tag Manager (GTM)](#b-google-tag-manager-gtm)
   - [Google Analytics 4 (GA4)](#c-google-analytics-4-ga4)
   - [IndexNow & Bing Webmaster Tools](#d-indexnow--bing-webmaster-tools)
   - [Vercel Hosting & DNS Setup](#e-vercel-hosting--dns-setup)
4. [Complete Codebase Audit (All 50 Files)](#4-complete-codebase-audit-all-50-files)
   - [Group 1: Configuration, Redirects & Environment Variables](#group-1-configuration-redirects--environment-variables)
   - [Group 2: Root Layout, SEO & Structured Data (JSON-LD)](#group-2-root-layout-seo--structured-data-json-ld)
   - [Group 3: Sitemap, Robots & Search Engine Directives](#group-3-sitemap-robots--search-engine-directives)
   - [Group 4: IndexNow Integration](#group-4-indexnow-integration)
   - [Group 5: Email, Calendar & Newsletter Subscriptions](#group-5-email-calendar--newsletter-subscriptions)
   - [Group 6: App Router Pages (Metadata & OpenGraph)](#group-6-app-router-pages-metadata--opengraph)
   - [Group 7: UI Components & Social Cards](#group-7-ui-components--social-cards)
   - [Group 8: Documentation & Offline Assets](#group-8-documentation--offline-assets)
5. [How to Change the Code (Two Approaches)](#5-how-to-change-the-code-two-approaches)
   - [Approach A: Recommended Architectural Refactoring (Centralized Config)](#approach-a-recommended-architectural-refactoring-centralized-config)
   - [Approach B: Direct Search & Replace](#approach-b-direct-search--replace)
6. [Step-by-Step Execution Checklist](#6-step-by-step-execution-checklist)

---

## 1. Executive Summary & Key Takeaways

| Metric / Item | Status | Action Required |
|---|---|---|
| **Old Domain** | `syedomer.me` (Expired) | Do not renew if too expensive; remove from hosting |
| **New Domain** | `syedomer.in` (Active) | Configure DNS on registrar & Vercel |
| **Code References Found** | **50 files** | Update environment variables, metadata, schemas, and links |
| **GTM (`GTM-T3LNQBHK`)** | Active in `layout.tsx` | Container ID stays the same; check trigger rules in GTM UI |
| **Google Search Console** | Verified on old domain | Must create new property for `syedomer.in` & update verification tag |
| **GA4 (`G-GZ0X5KQCRK`)** | Active via `NEXT_PUBLIC_GA_ID` | Update Data Stream URL in Google Analytics Admin |
| **IndexNow** | Active via API route | Change host from `syedomer.me` to `syedomer.in` |
| **Vercel DNS** | Needs configuration | Add `syedomer.in` and `www.syedomer.in` |

---

## 2. Critical SEO Reality: Expired Domain Migration

Because your old domain (`syedomer.me`) is **already expired**, there is a crucial technical nuance to understand:

1. **Standard 301 Redirects are NOT possible:**
   - Under standard Google migration guidelines, you keep the old domain active for 6–12 months and issue `301 Moved Permanently` HTTP redirects from `syedomer.me/*` to `syedomer.in/*`.
   - Because the old domain has expired and is not renewed, your server cannot serve traffic or redirects for `syedomer.me`.
   - Google's official **"Change of Address" tool** in Google Search Console **will fail** verification because it requires functional 301 redirects from the old domain.
2. **What this means for SEO:**
   - Google and other search engines will treat `syedomer.in` as a **brand new website**.
   - Old search ranking signals, backlinks pointing to `syedomer.me`, and indexed URLs on `syedomer.me` will gradually de-index as Google encounters DNS / connection failures on the old domain.
   - You must re-index `syedomer.in` actively via Google Search Console and IndexNow.
3. **Crucial Counter-Measures:**
   - **Update External Profiles Immediately:** Update all external portfolio links to `https://www.syedomer.in`:
     - GitHub profile bio and repository header links (`https://github.com/syedomer17`)
     - LinkedIn profile header and experience sections (`https://www.linkedin.com/in/syedomer17/`)
     - X (Twitter) profile website link (`https://x.com/SyedOmer17Ali`)
     - Medium author bio (`https://medium.com/@syedomerali2006`)
     - Resume / CV documents (e.g., `SyedOmerAli.pdf`)
     - Dev.to, Hashnode, Reddit, or forum signatures

---

## 3. Third-Party Services Audit

### A. Google Search Console (GSC)
- **Current Setup:** In `client/app/layout.tsx`:
  ```tsx
  verification: {
    google: "IeKi-eX5enCHjuok5UJG5pTXHPdm0nhIpPBqMUM7Uak",
  },
  ```
- **What You Must Do:**
  1. Open [Google Search Console](https://search.google.com/search-console).
  2. Click **Add property**.
  3. You have two options:
     - **Option 1 (Recommended - Domain Property):** Enter `syedomer.in`. GSC will provide a `TXT` DNS record. Add this TXT record at your DNS provider (Namecheap, GoDaddy, Hostinger, Cloudflare, etc.). This automatically covers both `syedomer.in` and `www.syedomer.in` without code changes.
     - **Option 2 (URL-Prefix Property):** Enter `https://www.syedomer.in` (and another for `https://syedomer.in`). Select **HTML tag** verification. Copy the new verification code and update `verification: { google: "NEW_CODE" }` in `client/app/layout.tsx`.
  4. Once verified, go to **Sitemaps** in the left sidebar and submit:
     `https://www.syedomer.in/sitemap.xml`
  5. Go to **URL Inspection**, enter `https://www.syedomer.in/`, and click **Request Indexing**.

---

### B. Google Tag Manager (GTM)
- **Current Setup:** In `client/app/layout.tsx`:
  ```tsx
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T3LNQBHK" ... />
  // and
  (window,document,'script','dataLayer','GTM-T3LNQBHK');
  ```
- **Analysis:**
  - **Does the code snippet need to change?** **No.** GTM Container IDs (`GTM-T3LNQBHK`) are domain-independent. The container script will load and execute on `syedomer.in` without issue.
  - **Does `client/middleware.ts` CSP allow GTM?** **Yes.** The CSP in `middleware.ts` already includes `https://www.googletagmanager.com` in `scriptHosts` and `frameHosts`.
  - **What to check inside GTM Dashboard ([tagmanager.google.com](https://tagmanager.google.com)):**
    1. **Triggers:** Look at your Triggers. If you created triggers with filters such as `Page Hostname equals syedomer.me` or `Page URL contains syedomer.me`, update them to `syedomer.in` (or change to `contains syedomer` / generic page views).
    2. **Tags:** Check if any Custom HTML tags or Link Click tags contain hardcoded references to `syedomer.me`.
    3. **Preview Mode:** Use GTM Preview / Tag Assistant to test on `https://www.syedomer.in` to ensure tags fire properly.

---

### C. Google Analytics 4 (GA4)
- **Current Setup:** In `client/.env`:
  ```env
  NEXT_PUBLIC_GA_ID=G-GZ0X5KQCRK
  ```
  Loaded dynamically in `client/components/Providers/LazyProviders.tsx`.
- **What You Must Do in GA4 Dashboard:**
  1. Open [Google Analytics](https://analytics.google.com/).
  2. Go to **Admin** (gear icon) → **Data Streams** → select the **Web** stream.
  3. Click the pencil icon to edit **Stream URL**:
     - Change from `https://www.syedomer.me` to `https://www.syedomer.in`.
     - Update Stream Name to reflect the new domain if desired.
  4. Under **Configure tag settings**:
     - Check **Configure your domains** (cross-domain measurement): update to `syedomer.in`.
     - Check **List unwanted referrals**: remove `syedomer.me` if present.
  5. The Measurement ID (`G-GZ0X5KQCRK`) remains unchanged.

---

### D. IndexNow & Bing Webmaster Tools
- **Current Setup:**
  - `client/app/api/indexnow/route.ts` line 32: `host: "syedomer.me"`
  - `client/lib/indexnow.ts` line 20: `const SITE_URL = 'https://syedomer.me';`
  - Key file: `client/public/16d89017-b30f-4066-8c65-99ece2a9316c.txt` with key `16d89017-b30f-4066-8c65-99ece2a9316c`
- **What You Must Do:**
  1. In `client/app/api/indexnow/route.ts`: Change `host: "syedomer.me"` to `host: "syedomer.in"`.
  2. In `client/lib/indexnow.ts`: Change `const SITE_URL = 'https://syedomer.me';` to `'https://www.syedomer.in';`.
  3. **Verification:** When you submit URLs to IndexNow for `syedomer.in`, search engines (Bing, Yandex, Naver) fetch `https://www.syedomer.in/16d89017-b30f-4066-8c65-99ece2a9316c.txt` to verify key ownership. Because the key file is in `client/public/`, Next.js will automatically serve it at root on the new domain.
  4. In [Bing Webmaster Tools](https://www.bing.com/webmasters):
     - Add `https://www.syedomer.in`.
     - Import from Google Search Console (fastest) or verify via DNS/HTML tag.
     - Submit `https://www.syedomer.in/sitemap.xml`.

---

### E. Vercel Hosting & DNS Setup
- **Apex vs WWW Architecture:**
  - Notice your codebase standardizes on **`https://www.syedomer.me`** with apex-to-www redirect in `client/next.config.ts`.
  - For `syedomer.in`, you should keep the same pattern: **`https://www.syedomer.in`** as the canonical URL, with `syedomer.in` redirecting to `www.syedomer.in`.
- **Steps on Vercel Dashboard:**
  1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Domains**.
  2. Add `syedomer.in`. Vercel will ask if you want to redirect `syedomer.in` to `www.syedomer.in` (or vice versa). Select **Redirect syedomer.in to www.syedomer.in**.
  3. Add `www.syedomer.in` as the Production domain.
  4. Remove `syedomer.me` and `www.syedomer.me` from Vercel to avoid invalid certificate warning errors.
- **DNS Records at your Domain Registrar (where you bought `syedomer.in`):**
  - **A Record:**
    - Host: `@`
    - Value: `76.76.21.21` (Vercel Anycast IP)
  - **CNAME Record:**
    - Host: `www`
    - Value: `cname.vercel-dns.com`
  - If using Cloudflare DNS: set proxy status to **DNS only** (Grey cloud) during initial SSL provisioning on Vercel.

---

## 4. Complete Codebase Audit (All 50 Files)

Below is the exhaustive audit of all files in the project containing `syedomer.me`.

### Group 1: Configuration, Redirects & Environment Variables

#### 1. `client/.env`
- **Line 1:**
  ```env
  NEXT_PUBLIC_API_URL=https://www.syedomer.me
  ```
  Change to:
  ```env
  NEXT_PUBLIC_API_URL=https://www.syedomer.in
  NEXT_PUBLIC_SITE_URL=https://www.syedomer.in
  ```

#### 2. `client/next.config.ts`
- **Lines 14–15:**
  ```ts
  {
    source: "/:path*",
    has: [{ type: "host", value: "syedomer.me" }],
    destination: "https://www.syedomer.me/:path*",
    permanent: true, // emits 308
  },
  ```
  Change to:
  ```ts
  {
    source: "/:path*",
    has: [{ type: "host", value: "syedomer.in" }],
    destination: "https://www.syedomer.in/:path*",
    permanent: true, // emits 308
  },
  ```

---

### Group 2: Root Layout, SEO & Structured Data (JSON-LD)

#### 3. `client/app/layout.tsx`
- **Line 13:** `const siteUrl = "https://www.syedomer.me";` → change to `https://www.syedomer.in`
- **Line 31:** `authors: [{ name: "Syed Omer Ali", url: "https://www.syedomer.me" }]` → change to `https://www.syedomer.in`
- **Line 40:** `verification: { google: "..." }` → update with new GSC verification string (if using HTML tag verification)
- **Line 162 & 255:** GTM container ID `GTM-T3LNQBHK` (keeps same ID, verify internal GTM triggers)
- **Lines 179–236 (JSON-LD Schema):**
  - Line 179: `@id: `${siteUrl}#person``
  - Line 182: `url: siteUrl`
  - Line 183: `image: `${siteUrl}/og.png``
  - Line 221: `sameAs`: `"https://www.instagram.com/syedomer.me/"` *(Note: if your Instagram handle changed, update this; otherwise keep as is)*
  - Line 226: `@id: `${siteUrl}#website``
  - Line 228: `url: siteUrl`

---

### Group 3: Sitemap, Robots & Search Engine Directives

#### 4. `client/app/sitemap.ts`
- **Line 8:**
  ```ts
  const baseUrl = "https://www.syedomer.me";
  ```
  Change to:
  ```ts
  const baseUrl = "https://www.syedomer.in";
  ```
  *(Affects all dynamic and static sitemap URLs generated for blogs, projects, certifications, experiences, case-studies, and services).*

#### 5. `client/app/robots.ts`
- **Line 3:**
  ```ts
  const baseUrl = "https://www.syedomer.me";
  ```
  Change to:
  ```ts
  const baseUrl = "https://www.syedomer.in";
  ```
  - Line 19: `sitemap: `${baseUrl}/sitemap.xml``

#### 6. `client/public/llms.txt`
Contains 14 occurrences of `https://www.syedomer.me`:
- **Line 8:** `- <https://www.syedomer.me/>`
- **Lines 23–32:** Navigational links (`/about`, `/projects`, `/blogs`, etc.)
- **Lines 137–140:** Machine-readable resource links (`/sitemap.xml`, `/robots.txt`, `/security.txt`, `/humans.txt`)
- **Line 151:** `6. Prefer canonical URLs under https://www.syedomer.me/.`
- **Line 156:** `Email: <https://www.syedomer.me/send-email>`
- **Line 162:** `Instagram: <https://www.instagram.com/syedomer.me/>`

#### 7. `client/public/.well-known/security.txt`
- **Line 2:** `Contact: https://www.syedomer.me/contact` → change to `https://www.syedomer.in/send-email` (or `/contact`)
- **Line 8:** `Canonical: https://www.syedomer.me/.well-known/security.txt` → change to `https://www.syedomer.in/.well-known/security.txt`

---

### Group 4: IndexNow Integration

#### 8. `client/app/api/indexnow/route.ts`
- **Line 32:**
  ```ts
  body: JSON.stringify({
    host: "syedomer.me",
    key,
    urlList: [url],
  }),
  ```
  Change `host` to `"syedomer.in"`.

#### 9. `client/lib/indexnow.ts`
- **Lines 10, 14, 15, 32, 36, 37:** Doc comments with `syedomer.me`
- **Line 20:**
  ```ts
  const SITE_URL = 'https://syedomer.me';
  ```
  Change to `'https://www.syedomer.in'`.

#### 10. `client/INDEXNOW_USAGE.md`
- **Lines 26, 76, 79, 86, 96, 135, 155, 173, 175, 197, 212, 213, 218, 241, 341, 381, 420:**
  Documentation curl commands and examples.

#### 11. `client/newpost.txt`
- **Lines 7 & 13:** Example POST endpoint payload `https://www.syedomer.me/api/indexnow`.

---

### Group 5: Email, Calendar & Newsletter Subscriptions

#### 12. `client/app/api/intro-call/route.ts`
- **Line 263:**
  ```ts
  uid: `${input.bookingId}@syedomer.me`,
  ```
  Change to:
  ```ts
  uid: `${input.bookingId}@syedomer.in`,
  ```

#### 13. `client/lib/intro-call/datetime.ts`
- **Line 152:**
  ```ts
  "PRODID:-//syedomer.me//Intro Call//EN",
  ```
  Change to:
  ```ts
  "PRODID:-//syedomer.in//Intro Call//EN",
  ```

#### 14. `client/lib/intro-call/templates.ts`
- **Line 12:**
  ```ts
  site: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.syedomer.me").replace(/\/$/, ""),
  ```
  Change fallback to `"https://www.syedomer.in"`.

#### 15. `client/lib/newsletter/content.ts`
- **Line 12:**
  ```ts
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.syedomer.me"
  ```
  Change fallback to `"https://www.syedomer.in"`.

#### 16. `client/lib/newsletter/templates.ts`
- **Line 24:**
  ```ts
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.syedomer.me"
  ```
  Change fallback to `"https://www.syedomer.in"`.

#### 17. `client/lib/newsletter/sender.ts`
- **Line 64:** Type definition comment `listUnsubscribeBase?: string; // e.g. https://syedomer.me/api/newsletter/unsubscribe`

#### 18. `client/app/api/newsletter/unsubscribe/route.ts`
- **Line 10:**
  ```ts
  const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.syedomer.me").replace(/\/$/, "");
  ```
  Change fallback to `"https://www.syedomer.in"`.
- **Line 355:**
  ```html
  <a class="brand-domain" href="${SITE_URL}">syedomer.me</a>
  ```
  Change to `syedomer.in`.

---

### Group 6: App Router Pages (Metadata & OpenGraph)

Each of the following page files currently hardcodes either `const siteUrl = "https://www.syedomer.me"` or `"https://www.syedomer.me/og.png"` in `openGraph.images` and `twitter.images`:

| File Path | Lines | Content to Change |
|---|---|---|
| `client/app/page.tsx` | 10, 27, 34, 52 | Author url, OG url, OG/Twitter image URLs |
| `client/app/about/page.tsx` | 8, 27, 42 | Author url, OG/Twitter image URLs |
| `client/app/blogs/page.tsx` | 18, 31 | OG & Twitter image URLs |
| `client/app/blogs/[slug]/page.tsx` | 9, 34, 46, 64, 93, 99, 104, 108, 120 | `const siteUrl`, Author URL, Article JSON-LD, Breadcrumb JSON-LD |
| `client/app/projects/page.tsx` | 18, 31 | OG & Twitter image URLs |
| `client/app/projects/[slug]/page.tsx` | 13, 39, 51, 69, 100, 106, 111, 115, 127 | `const siteUrl`, OG/Twitter image URLs, Project & Breadcrumb JSON-LD |
| `client/app/case-studies/page.tsx` | 20, 33 | OG & Twitter image URLs |
| `client/app/case-studies/[slug]/page.tsx` | 13, 38, 50, 68, 97, 103, 108, 112, 124 | `const siteUrl`, OG/Twitter image URLs, Article & Breadcrumb JSON-LD |
| `client/app/certifications/page.tsx` | 18, 31 | OG & Twitter image URLs |
| `client/app/certifications/[slug]/page.tsx` | 13, 38, 50, 68, 97, 103, 108, 112, 124 | `const siteUrl`, OG/Twitter image URLs, Credential & Breadcrumb JSON-LD |
| `client/app/experiences/page.tsx` | 18, 31 | OG & Twitter image URLs |
| `client/app/intro-call/page.tsx` | 18, 31 | OG & Twitter image URLs |
| `client/app/send-email/page.tsx` | 19, 32 | OG & Twitter image URLs |
| `client/app/services/page.tsx` | 20, 33 | OG & Twitter image URLs |
| `client/app/services/devsecops-ci-cd/page.tsx` | 20, 33 | OG & Twitter image URLs |
| `client/app/services/performance-optimization/page.tsx` | 20, 33 | OG & Twitter image URLs |
| `client/app/services/secure-mern-development/page.tsx` | 44, 57 | OG & Twitter image URLs |
| `client/app/services/security-audit-remediation/page.tsx` | 20, 33 | OG & Twitter image URLs |
| `client/app/resources/page.tsx` | 19, 32 | OG & Twitter image URLs |
| `client/app/resources/devsecops-pipeline-template/page.tsx` | 19, 32 | OG & Twitter image URLs |
| `client/app/resources/mern-security-checklist/page.tsx` | 19, 32 | OG & Twitter image URLs |
| `client/app/resources/secure-auth-implementation-guide/page.tsx` | 19, 32 | OG & Twitter image URLs |
| `client/app/syed-omer-ali/page.tsx` | 5, 23, 138, 168 | `const siteUrl`, Author URL, FAQ schema text, Instagram URL |
| `client/app/syedomer17/page.tsx` | 19, 32 | OG & Twitter image URLs |

---

### Group 7: UI Components & Social Cards

#### 19. `client/components/ui/Breadcrumb.tsx`
- **Line 18:**
  ```tsx
  const baseUrl = "https://www.syedomer.me";
  ```
  Change to:
  ```tsx
  const baseUrl = "https://www.syedomer.in";
  ```

#### 20. `client/components/page/SyedOmerAliContent.tsx`
- **Line 16:**
  ```tsx
  const siteUrl = "https://www.syedomer.me";
  ```
  Change to:
  ```tsx
  const siteUrl = "https://www.syedomer.in";
  ```

#### 21. `client/components/socialButtons/Twitter.tsx`
- **Lines 87 & 92:**
  ```tsx
  <a
    href="https://www.syedomer.me"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
  >
    syedomer.me
  </a>
  ```
  Change `href` to `https://www.syedomer.in` and text to `syedomer.in`.

#### 22. `client/components/sections/Hero.tsx`
- **Line 443:**
  ```tsx
  <Link href="https://www.instagram.com/syedomer.me/" ...>
  ```
  *(Check if your Instagram username changed or if it remains `@syedomer.me`).*

#### 23. `client/lib/blogs.ts`
- **Line 39:**
  ```ts
  "Syed Omer Ali - Portfolio of Syed Omer Ali, a full stack MERN developer focused on TypeScript, DevSecOps, and secure scalable systems. https://syedomer.me",
  ```
  Change `https://syedomer.me` to `https://syedomer.in`.

---

### Group 8: Documentation & Offline Assets

#### 24. `client/public/offline.html`
- **Lines 561, 562, 619, 638, 660, 667:**
  Simulated terminal text: `curl -I https://www.syedomer.me` and `curl: (6) Could not resolve host: www.syedomer.me`.
  Change to `https://www.syedomer.in` and `www.syedomer.in`.

#### 25. `README.md`
- **Line 5:** `Live portfolio: https://syedomer.me` → change to `https://www.syedomer.in`

#### 26. `SKILL.md`
- **Line 15:** `- URL: https://www.syedomer.me/` → change to `https://www.syedomer.in/`

---

## 5. How to Change the Code (Two Approaches)

### Approach A: Recommended Architectural Refactoring (Centralized Config)

Currently, the primary reason 50 files need editing is that `https://www.syedomer.me` is hardcoded across dozens of page files. In Next.js, `metadataBase` in `layout.tsx` is designed specifically to solve this problem!

#### 1. Define a Central Site Configuration:
Create a single file `client/lib/siteConfig.ts`:
```ts
export const siteConfig = {
  name: "Syed Omer Ali",
  domain: "syedomer.in",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.syedomer.in",
  ogImage: "/og.png",
  twitterHandle: "@SyedOmer17Ali",
};
```

#### 2. Leverage Next.js `metadataBase`:
In Next.js App Router, if `layout.tsx` defines:
```ts
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  // ...
}
```
Then child pages do **NOT** need `url: "https://www.syedomer.in/og.png"`. They can simply use:
```ts
openGraph: {
  images: ["/og.png"],
}
```
Next.js will automatically resolve `/og.png` against `metadataBase` at build time! This eliminates hardcoded URLs in 25+ page files forever.

#### 3. Update `.env`:
```env
NEXT_PUBLIC_SITE_URL=https://www.syedomer.in
NEXT_PUBLIC_API_URL=https://www.syedomer.in
```

---

### Approach B: Direct Search & Replace

If you prefer a direct, one-time text replacement without refactoring components:

1. **Replace Domain Strings:**
   - Replace `https://www.syedomer.me` → `https://www.syedomer.in`
   - Replace `https://syedomer.me` → `https://syedomer.in`
   - Replace `syedomer.me` → `syedomer.in` (inspect individual occurrences so as not to unintentionally alter Instagram handle if it remains `syedomer.me`)
2. **Bash Command (for quick reference when you are ready to execute):**
   ```bash
   # From the client/ directory:
   # 1. Update www URL variants
   find app lib components public -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.txt" -o -name "*.html" -o -name "*.md" \) -exec sed -i '' 's|https://www.syedomer.me|https://www.syedomer.in|g' {} +

   # 2. Update non-www URL variants
   find app lib components public -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.txt" -o -name "*.html" -o -name "*.md" \) -exec sed -i '' 's|https://syedomer.me|https://www.syedomer.in|g' {} +

   # 3. Update bare domain in configs (next.config.ts, IndexNow host, UID, etc.)
   sed -i '' 's|value: "syedomer.me"|value: "syedomer.in"|g' next.config.ts
   sed -i '' 's|host: "syedomer.me"|host: "syedomer.in"|g' app/api/indexnow/route.ts
   sed -i '' 's|@syedomer.me|@syedomer.in|g' app/api/intro-call/route.ts
   sed -i '' 's|//syedomer.me//|//syedomer.in//|g' lib/intro-call/datetime.ts
   ```

---

## 6. Step-by-Step Execution Checklist

When you are ready to execute the migration, follow this sequence:

### Phase 1: DNS & Registrar
- [ ] Log in to your domain registrar (where you registered `syedomer.in`).
- [ ] Add `A` record pointing `@` to `76.76.21.21` (or your host's IP).
- [ ] Add `CNAME` record pointing `www` to `cname.vercel-dns.com`.

### Phase 2: Vercel Hosting
- [ ] Go to Vercel → Project Settings → **Domains**.
- [ ] Add `syedomer.in` and `www.syedomer.in`.
- [ ] Configure `syedomer.in` to redirect to `www.syedomer.in` (308 redirect).
- [ ] Wait for SSL certificate issuance (shows green checkmarks).
- [ ] Delete `syedomer.me` from Vercel domain list.

### Phase 3: Codebase Updates
- [ ] Update `client/.env` (`NEXT_PUBLIC_SITE_URL` & `NEXT_PUBLIC_API_URL`).
- [ ] Update `client/next.config.ts` (redirect rule).
- [ ] Update `client/app/sitemap.ts` & `client/app/robots.ts` (`baseUrl`).
- [ ] Update `client/app/layout.tsx` (`siteUrl`, author, schema, and verification tag).
- [ ] Update `client/app/api/indexnow/route.ts` & `client/lib/indexnow.ts` (`host` and `SITE_URL`).
- [ ] Update `client/public/llms.txt`, `client/public/.well-known/security.txt`, and `client/public/offline.html`.
- [ ] Update page metadata across `client/app/**/page.tsx` and UI components.
- [ ] Run `npm run build` in `client/` to verify zero TypeScript or linting errors.
- [ ] Commit changes and push to GitHub (triggers production deployment).

### Phase 4: Google & Search Engine Tooling
- [ ] **Google Search Console:**
  - [ ] Add `syedomer.in` as a new Property (Domain property or URL-prefix).
  - [ ] Verify ownership (DNS TXT or HTML tag in `layout.tsx`).
  - [ ] Submit `https://www.syedomer.in/sitemap.xml`.
  - [ ] Request indexing on `https://www.syedomer.in/` using URL Inspection.
- [ ] **Google Analytics 4:**
  - [ ] Update Web Stream URL to `https://www.syedomer.in`.
- [ ] **Google Tag Manager:**
  - [ ] Inspect triggers for any domain-specific conditions and publish container if modified.
- [ ] **Bing Webmaster Tools & IndexNow:**
  - [ ] Add `syedomer.in` in Bing Webmaster Tools and submit sitemap.
  - [ ] Trigger test IndexNow notification to verify Bing/IndexNow accepts `syedomer.in`.

### Phase 5: External Social & Portfolio Links
- [ ] Update GitHub profile link and repository "About" URL.
- [ ] Update LinkedIn profile header, website link, and contact info.
- [ ] Update X / Twitter profile website link.
- [ ] Update Medium bio website link.
- [ ] Update PDF resume (`SyedOmerAli.pdf`).
