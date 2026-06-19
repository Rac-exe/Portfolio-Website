# Prabhat Bajpai - Portfolio

A comic-inspired portfolio for Prabhat Bajpai: a software engineer focused on building, breaking, fixing, and repeating until systems actually work.

The site uses a manga/anime visual direction with four persistent themes switchable via the katana slider on the home page. Motion is intentionally minimal throughout.

## Themes

- Paint - warm colour wash, default on first visit
- Draft - manga sketch style with a separate illustrated portrait
- Coffee - sepia/brown tones
- Noir - black and grey with yellow accent

## Stack

- Next.js App Router
- React
- Tailwind CSS v4
- Science Gothic (variable font via Google Fonts)
- Markdown-backed blog system
- Resend API for the contact form
- Cloudinary for portrait image hosting
- Vercel Web Analytics

## Routes

- `/` - landing page with animated name, portrait, and katana theme slider
- `/projects` - PRMPT, Cindr, and WebToMD project cards
- `/blog` - markdown blog index
- `/blog/[slug]` - individual blog article pages
- `/ping-me` - contact form and social links
- `/contact` - redirects to `/ping-me`

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

Create `.env.local`:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
CONTACT_TO_EMAIL=your@email.com

# Cloudinary portrait images (optional - falls back to /images/ if not set)
NEXT_PUBLIC_PORTRAIT_URL=https://res.cloudinary.com/your-cloud/image/upload/portrait.png
NEXT_PUBLIC_PORTRAIT_MANGA_URL=https://res.cloudinary.com/your-cloud/image/upload/portrait-manga.png
```

Notes:

- `.env.local` is ignored by git and must never be committed.
- `CONTACT_FROM_EMAIL` can use `onboarding@resend.dev` for Resend sandbox testing.
- For production, verify a real domain in Resend and use a sender like `Portfolio <hello@yourdomain.com>`.
- Rotate the Resend API key if it has ever been shared outside Vercel environment settings.

## Images and Audio

Portrait images are hosted on Cloudinary to keep them out of the git repository.
Audio files live in `public/audio/` and are committed directly since they are small.

If you fork this and want to add your own portrait:

1. Upload your image to [Cloudinary](https://cloudinary.com) (free tier is enough).
2. Copy the delivery URL from the Cloudinary dashboard.
3. Set `NEXT_PUBLIC_PORTRAIT_URL` (and `NEXT_PUBLIC_PORTRAIT_MANGA_URL` if you have a second version) in your environment variables.
4. If you prefer to skip Cloudinary, drop your image in `public/images/` and remove those env vars - the code falls back to `/images/portrait.png` automatically.

The same approach works for audio: upload to Cloudinary, swap the `src` in the audio component, and keep the binary out of git.

## Contact Form

The Ping Me form posts to `POST /api/ping-me`.

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
- `NEXT_PUBLIC_PORTRAIT_URL`
- `NEXT_PUBLIC_PORTRAIT_MANGA_URL`

Redeploy after changing env vars.

## Checks

```bash
npm run lint
npm run build
```

