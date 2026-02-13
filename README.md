# Portfolio Website (Next.js App Router)

A production-grade portfolio built with Next.js, React, and TypeScript. The client app is structured around the App Router with SEO-first metadata, modern UI sections, and API routes for contact, newsletter, and view tracking.

Live portfolio: https://syedomer.me

![Next.js](https://img.shields.io/badge/Next.js-16.1-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

## Features

- App Router architecture with route-based metadata and SEO defaults
- Fully responsive UI with dark and light mode styling
- Motion-driven sections built with Framer Motion
- Content-driven pages for projects, blogs, experience, certifications, and about
- API routes for email, newsletter, intro-call, view count, and GitHub contributions
- Optimized fonts and assets via `next/font` and `next/image`

## Tech Stack

- Next.js 16 + React 19
- TypeScript + Tailwind CSS 4
- Framer Motion, GSAP, Lucide React
- Mongoose + Nodemailer (for data and email workflows, when configured)

## Installation

```bash
# Clone the repository
git clone https://github.com/syedomer17/Portfolio-main.git

# Navigate to the client directory
cd Portfolio-main/client

# Install dependencies
npm install
```

## Development

```bash
# Start the dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

Open http://localhost:3000

## Project Structure

```
Portfolio-main/
├── README.md
├── compress.py
└── client/
    ├── app/
    │   ├── about/
    │   ├── api/
    │   │   ├── github/
    │   │   │   └── contributions/
    │   │   │       └── [username]/
    │   │   ├── intro-call/
    │   │   ├── newsletter/
    │   │   ├── send-email/
    │   │   └── view-count/
    │   ├── blogs/
    │   │   └── [slug]/
    │   ├── certifications/
    │   │   └── [slug]/
    │   ├── experiences/
    │   │   └── [slug]/
    │   ├── intro-call/
    │   ├── projects/
    │   │   └── [slug]/
    │   ├── send-email/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── robots.ts
    │   └── sitemap.ts
    ├── components/
    │   ├── Providers/
    │   ├── animations/
    │   ├── page/
    │   ├── reactbits/
    │   ├── sections/
    │   ├── socialButtons/
    │   ├── themeToggle/
    │   └── ui/
    ├── contexts/
    ├── data/
    ├── hooks/
    ├── lib/
    ├── model/
    ├── public/
    ├── types/
    ├── utils/
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── package.json
```

## SEO Details

- Global defaults and structured data are set in `app/layout.tsx`.
- Route-level metadata is defined in each `app/*/page.tsx` via Next.js `Metadata`.
- Open Graph and Twitter card data use `/banner.png` for previews.
- `app/robots.ts` and `app/sitemap.ts` generate the robots file and sitemap.
- Canonical URLs are set per route using `alternates.canonical`.

## Content Updates

- Home sections live in `client/components/sections`.
- Full pages live in `client/components/page` and their routes in `client/app`.
- Data sources live in `client/data` and `client/lib`.

## Deployment

```bash
npm run build
npm run start
```

Deploy to Vercel or any Node-compatible platform.

## License

MIT License

