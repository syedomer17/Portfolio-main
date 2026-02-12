# View Count Tracking

This document describes the production-style view counter used in the Hero section.

## Overview
- The view count is stored in MongoDB and increments on a visitor's first hit in a 24-hour window.
- A short, httpOnly cookie is used to avoid counting reloads in the same 24 hours.
- Basic bot filtering skips obvious crawlers based on user-agent.

## Data Model
Collection: ViewCount
- key: string (unique)
- count: number

Default value: 3300 (displayed as 3.3k)

## API
Base: /api/view-count

GET
- Returns the current count without incrementing.
- Response: { "count": number }

POST
- Increments count only if the visitor has not been counted in the last 24 hours.
- Returns the current count.
- Response: { "count": number }

## Cookies
- Name: hero_viewed
- Purpose: throttle increments to one per 24 hours per visitor
- httpOnly: true
- sameSite: lax
- maxAge: 86400 seconds

## Bot Filtering
Requests are not counted when the user-agent matches common bot patterns:
- bot, crawler, spider, crawling, preview
- facebookexternalhit, twitterbot, slackbot, discordbot, whatsapp

## Client Usage
The Hero section calls POST on mount to increment when appropriate.
- Component: client/components/sections/Hero.tsx
- API: /api/view-count (POST)

## Environment
MongoDB connection is required:
- MONGODB_URI in .env.local

## Notes
- Counts are shared across all users (global counter).
- If MONGODB_URI is missing, the API will fail.
- For stronger analytics (per-IP/day, cross-device dedupe, geo), consider a dedicated analytics service or KV store.
