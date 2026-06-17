# Prabhat Bajpai Portfolio

A comic-inspired portfolio for Prabhat Bajpai: a software engineer focused on building, breaking, fixing, and repeating until systems actually work.

The site is built with Next.js and uses a lightweight manga/anime visual direction with three persistent themes:

- Draft
- Paint
- Coffee

The home page keeps motion intentionally limited to the katana theme slider. Projects, blogs, and the Say Hi page use the same visual system with internal page scrolling.

## Stack

- Next.js App Router
- React
- Tailwind CSS
- Markdown-backed blog content
- Resend email API for the contact form

## Routes

- `/` - landing page with animated name, portrait, and katana theme slider
- `/projects` - PRMPT, Cindr, and WebToMD project cards
- `/blog` - markdown blog index
- `/blog/[slug]` - individual blog article pages
- `/say-hi` - contact form and social links
- `/contact` - redirects to `/say-hi`

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
CONTACT_TO_EMAIL=prabhatbajpai2005@gmail.com
```

Notes:

- `.env.local` is ignored by git.
- `CONTACT_FROM_EMAIL` can use `onboarding@resend.dev` for Resend testing.
- For production, verify a real domain in Resend and use a sender like `Portfolio <hello@yourdomain.com>`.
- Rotate the Resend key if it has ever been shared outside the environment settings.

## Contact Form Flow

The Say Hi form posts to `POST /api/say-hi`.

The API route:

- validates the reply field as an email, handle, or supported social URL
- validates message length
- ignores bot submissions through a honeypot field
- sends the message through Resend when env vars are configured

Without `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`, the endpoint returns a setup error instead of pretending the message was sent.

## Blog Content

Blog posts live in the root `blogs/` directory as markdown files with frontmatter:

```md
---
title: Example Post
date: 2026-06-17
excerpt: Short description.
---

Post content here.
```

The slug is generated from the markdown filename.

## Vercel Deployment

Recommended Vercel setup:

- Framework preset: Next.js
- Root directory: `./`
- Project name example: `prabhat-dev`, which creates `https://prabhat-dev.vercel.app`

Add these environment variables in Vercel Project Settings:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

After changing env vars, redeploy the project.

## Checks

Run linting:

```bash
npm run lint
```

Run a production build:

```bash
npm run build
```
