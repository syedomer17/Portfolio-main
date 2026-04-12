# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.

## Commands

All commands run from `client/`:

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

Package manager is **pnpm**. There is no test suite configured.

## Architecture

This is a **Next.js 16 App Router** monolithic application — no separate backend server. The entire app lives under `client/`.

### Routing & Pages

- App Router with file-based routing in `app/`
- Dynamic `[slug]` routes for: projects, blogs, case-studies, experiences, certifications
- Static data for content pages lives in `data/` (projects, blogs, certifications, experiences)
- Page-level components live in `components/page/`, section components in `components/sections/`

### API Routes (`app/api/`)

| Route | Purpose |
|-------|---------|
| `send-email` | Contact form via Nodemailer with validation + honeypot spam prevention |
| `view-count` | MongoDB-backed counter with bot detection and cookie-based dedup (24h) |
| `github/contributions/[username]` | GitHub GraphQL proxy; falls back to mock data without token |
| `newsletter` | Subscriber management |
| `intro-call` | Scheduling form submissions |
| `indexnow` | Search engine indexing notifications |

### Data & State

- **MongoDB** via Mongoose for persistent data (views, subscribers, intro calls). Connection pooling via global cache in `lib/mongoodb.ts`
- **ThemeContext** (`contexts/ThemeContext.tsx`) is the only React context — dark/light mode with localStorage persistence and flash-prevention inline script
- Content data is static TypeScript exports in `data/`, not fetched from a CMS

### Performance Patterns

- Heavy use of `next/dynamic` with `ssr: false` for below-fold sections (Experience, Projects, Blogs, TechStack, Certifications, Newsletter) with skeleton loaders
- `LazyProvidersLoader` defers toasts/smooth-scroll until `requestIdleCallback`
- `LazyAnalyticsProviders` defers analytics (Google, DataBuddy, Vercel) until idle
- Framer Motion loaded via `LazyMotion` for bundle optimization

### Security

- CSP with dynamic nonce generated per-request in `middleware.ts`
- Three-tier environment detection (development/preview/production) for CSP strictness
- Social bot detection in middleware skips CSP for crawlers (preserves OG previews)
- Strict security headers in `next.config.ts` (HSTS, X-Frame-Options DENY, Permissions-Policy)

### Styling

- Tailwind CSS 4 with class-based dark mode
- Custom accent colors: yellow (#f6c400), cyan (#34d399), purple (#b084f5)
- Animations via Framer Motion (`whileInView` with `once: true`) and GSAP

## Environment Variables

```
GITHUB_TOKEN         # GitHub contributions API
MONGODB_URI          # MongoDB connection string
SMTP_HOST            # Email server (e.g., smtp.gmail.com)
SMTP_PORT            # Email port (e.g., 465)
SMTP_USER            # Email account
SMTP_PASS            # Email password
SMTP_TO              # Recipient email
SMTP_FROM            # Sender display name
SMTP_SECURE          # TLS/SSL flag
```
