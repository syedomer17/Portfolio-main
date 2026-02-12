# SEO Checklist (Phase 1, 2, 3)

## Phase 1 - Technical SEO Foundation

### Done
- Metadata defaults in root layout (title template, description, OG/Twitter, canonical).
- Unique per-page metadata for Home, Projects, Blogs, Experiences, Certifications, Intro Call.
- Canonical URLs per page.
- Sitemap.xml and robots.txt in App Router.
- OpenGraph and Twitter metadata set globally and per page.
- Dynamic blog slug routing with metadata, canonical URLs, and 404 handling.
- Dynamic project and certification slug routing with metadata, canonical URLs, and 404 handling.
- Sitemap includes blog, project, and certification slugs with stable lastModified.
- Dynamic experience slug routing with metadata, canonical URLs, and 404 handling.
- Sitemap includes experience slugs with stable lastModified.

### Pending (you must do)
- Verify titles/descriptions in production with view-source.
- Confirm canonical URLs after deployment.
- Validate sitemap in Google Search Console.
- Confirm robots.txt in production.
- Verify slug routes in production and submit updated sitemap.

## Phase 2 - Content Depth and Internal SEO

### Done
- Homepage intent paragraph and service bullets.
- Internal links added between Home, Projects, Blogs, Experiences, Certifications, Intro Call.
- Project cards include tech stack and case study focus text.
- Projects page includes case study context and FAQ.
- Blogs page includes strategy intro and authority links.
- Experiences and Certifications pages include authority context.
- Skill section mobile responsiveness improved.
- Blog listing supports internal slug posts and external legacy posts.
- Project and certification cards link to slug detail pages.
- Experience pages link to slug detail pages.

### Pending (you must do)
- Publish real case study write-ups and expand project outcomes.
- Add real blog posts and keep a consistent posting cadence.
- Expand E-E-A-T proof points with metrics, OSS, speaking, awards.
- Add an About page or About section if desired.
- Add or expand long-form content in project and certification detail pages as needed.
- Add or expand long-form content in experience detail pages as needed.

## Phase 3 - Performance, Analytics, Authority

### Done
- GA4 script included with env guard (NEXT_PUBLIC_GA_ID).
- LCP image prioritized on hero.
- Lazy loading added for below-the-fold images.
- Compression enabled in Next.js config.

### Pending (you must do)
- Add GA4 Measurement ID to NEXT_PUBLIC_GA_ID and deploy.
- Set up Google Search Console property and submit sitemap.
- Configure GA4 conversions and event tracking in GA4 or GTM.
- Choose privacy analytics (Plausible/Fathom/Umami) if needed.
- Set CDN/hosting caching headers (Vercel/Netlify config).
- Convert images to WebP/AVIF and update assets.
- Run bundle analysis and apply safe code-splitting if needed.
- Ongoing backlink acquisition and portfolio listings.

## Quick Verification
- Lighthouse (mobile): check LCP/CLS/INP improvements.
- View-source: confirm metadata and canonical tags.
- /sitemap.xml and /robots.txt return 200 in production.
- GA4 realtime shows pageview after deployment.
