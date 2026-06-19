# Prabhat Bajpai — Portfolio

A comic-inspired portfolio for Prabhat Bajpai: a software engineer focused on building, breaking, fixing, and repeating until systems actually work.

The site uses a manga/anime visual direction with four persistent themes switchable via the katana slider on the home page. Motion is intentionally minimal throughout.

## Themes

- **Paint** — warm colour wash, default on first visit
- **Draft** — manga sketch style with a separate illustrated portrait
- **Coffee** — sepia/brown tones
- **Noir** — black and grey with yellow accent

## Stack

- Next.js App Router
- React
- Tailwind CSS v4
- Science Gothic (variable font via Google Fonts)
- Markdown-backed blog system
- Resend API for the contact form
- Vercel Web Analytics

## Routes

- `/` — landing page with animated name, portrait, and katana theme slider
- `/projects` — PRMPT, Cindr, and WebToMD project cards
- `/blog` — markdown blog index
- `/blog/[slug]` — individual blog article pages
- `/say-hi` — contact form ("Ping Me") and social links
- `/contact` — redirects to `/say-hi`

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` for local contact form delivery:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
CONTACT_TO_EMAIL=your@email.com
```

Notes:

- `.env.local` is ignored by git and must never be committed.
- `CONTACT_FROM_EMAIL` can use `onboarding@resend.dev` for Resend sandbox testing.
- For production, verify a real domain in Resend and use a sender like `Portfolio <hello@yourdomain.com>`.
- Rotate the Resend API key if it has ever been shared outside Vercel environment settings.

## Contact Form

The Ping Me form posts to `POST /api/say-hi`.

The API route:

- validates the reply field as an email, handle, or supported social URL
- validates message length
- ignores bot submissions via a honeypot field
- sends through Resend when env vars are present

Without `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`, the endpoint returns a configuration error rather than silently failing.

## Blog Content

Posts live in `blogs/` as markdown files with frontmatter:

```md
---
title: Example Post
date: 2026-06-17
excerpt: Short description.
---

Post content here.
```

The slug is derived from the filename.

## Vercel Deployment

Recommended setup:

- Framework preset: Next.js
- Root directory: `./`

Add these environment variables in Vercel Project Settings:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

Redeploy after changing env vars.

## Checks

```bash
npm run lint
npm run build
```
