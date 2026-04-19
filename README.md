# Showcase
Portfolio website and CMS for presenting projects, experience, and selected technical skills.

## Demo
No public demo is documented yet.

## Features
Added:
- [x] Multilingual frontend with locale-based routes
- [x] Payload CMS admin panel for managing projects, people, skills, and experience
- [x] PostgreSQL-backed content storage
- [x] Project detail pages with live CMS-driven content
- [x] Visit tracking stored in the CMS database
- [x] AI-assisted project field improvement and translation endpoints for admin users

Planned:
- [ ] Automated CI pipeline for lint, typecheck, and production build validation
- [ ] Reintroduced automated integration and end-to-end tests
- [ ] Hardened production deployment workflow with documented release checklist

## Tech stack
- Next.js 16
- React 19
- Payload CMS 3
- PostgreSQL
- TypeScript
- Tailwind CSS 4
- OpenAI API
- PNPM

## How to run
1. Copy `.env.example` to `.env` and fill in the required values.
2. Install dependencies with `pnpm install`.
3. Start a local PostgreSQL instance that matches `DATABASE_URL`.
4. Run the app with `pnpm dev`.
5. Open `http://localhost:3000`.

## API
- `POST /api/ai/improve-project-field`
  Improves the selected project field for an authenticated admin user with OpenAI.
- `POST /api/ai/translate-project-locale`
  Translates project content between supported locales for an authenticated admin user.
- `POST /api/system/visits/track`
  Stores one frontend visit event when the landing page is opened in a browser session.
- `GET /api/globals/landing-page`
  Returns the landing page global content from Payload CMS.
- Standard Payload REST and GraphQL endpoints are available under `/api`, `/api/graphql`, and `/api/graphql-playground`.

## Project structure
- `src/app/(frontend)`
  Public-facing Next.js routes and UI components.
- `src/app/(payload)`
  Payload admin panel and API route integration.
- `src/collections`
  Payload collection definitions.
- `src/globals`
  Payload global configuration.
- `src/i18n`
  Locale configuration and translation strings.
- `src/lib`
  Shared utilities and content helpers.
- `src/payload-types.ts`
  Auto-generated Payload TypeScript types.
- `src/payload.config.ts`
  Main Payload CMS configuration.

Database schema changes are currently handled by deploying from the latest Payload config against PostgreSQL. Before a production rollout, validate schema compatibility against the target database and back it up.

## Author
P4tkry (https://github.com/P4tkry/)

## Licence
Copyright (c) 2026 Patryk Rusak

Permission is granted to use, copy, modify, and distribute this software 
for non-commercial purposes only.

Commercial use is strictly prohibited without permission.
