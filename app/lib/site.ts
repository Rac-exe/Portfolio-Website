export type Link = { label: string; href: string };

export type Project = {
  name: string;
  slug: string;
  kind: string;
  year: string;
  oneLiner: string;
  description: string[];
  stack: string;
  links: Link[];
};

export type Role = {
  company: string;
  href: string;
  role: string;
  period: string;
  summary: string;
};

export const SITE = {
  name: "Prabhat Bajpai",
  role: "Software Engineer",
  location: "Bengaluru, India",
  email: "prabhatbajpai2005@gmail.com",
  portrait: process.env.NEXT_PUBLIC_PORTRAIT_URL ?? "/images/portrait.png",
  url: "https://prabhatisdev.vercel.app",
  description:
    "Prabhat Bajpai is a software engineer in Bengaluru building automation, AI tooling and test systems for real hardware. Open to work.",
};

export const SOCIALS: Link[] = [
  { label: "GitHub", href: "https://github.com/Rac-exe" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prabhat-bajpai" },
  { label: "X", href: "https://x.com/PrabhatAstrix" },
  { label: "Email", href: `mailto:${SITE.email}` },
];

export const WORK: Role[] = [
  {
    company: "ThinkSeed Systems",
    href: "https://thinkseedsystems.com",
    role: "Software engineering intern",
    period: "Jul 2026 — now",
    summary:
      "Test automation for automotive digital keys: scripted, repeatable test campaigns against real vehicle hardware over wireless and serial interfaces, replacing slow manual testing. Python, embedded targets.",
  },
];

export const PROJECTS: Project[] = [
  {
    name: "Prmpt",
    slug: "prmpt",
    kind: "Open-source desktop app",
    year: "2026",
    oneLiner:
      "Type @prompt in any app and get a sharper prompt back. Started as a startup, now open source.",
    description: [
      "A desktop prompt optimizer for Windows and macOS. A native keyboard hook catches @prompt anywhere on your system, opens a small overlay, and runs your rough instruction through a pipeline that clarifies, plans and rewrites it before it reaches a model.",
      "Spaces connects it to your own repositories. Code is parsed with Tree-sitter, indexed locally in SQLite with full-text search and on-device ONNX embeddings, and retrieved with a hybrid, graph-aware search so prompts carry real context.",
      "The same index is served over MCP, so coding agents fetch precise context in one call instead of spending turns on file reads and grep. The aim was fewer tokens and better-guided agents. A benchmark harness measures this on 100k+ line repositories against Claude Code, Cursor and Codex, and in internal runs Prmpt's agent kept pace with all three.",
      "It began as a startup built by a small founding team. It's now local-first with bring-your-own-key and fully open source: no account, no hosted backend.",
    ],
    stack: "Electron, React, TypeScript, Python, FastAPI, Rust (N-API), SQLite, ONNX",
    links: [
      { label: "Website", href: "https://tryprmpt.com" },
      { label: "GitHub", href: "https://github.com/Rac-exe/Prompt" },
    ],
  },
  {
    name: "WebToMD",
    slug: "webtomd",
    kind: "Python CLI on PyPI",
    year: "2026",
    oneLiner:
      "Turns any web page into clean Markdown from the terminal, and can pull a site's whole design system too.",
    description: [
      "One command takes a URL and gives back readable Markdown, without the navigation, cookie banners and sidebars. It's built for research and design engineers getting web content into other things: RAG pipelines, LLM prompts, notes and archives.",
      "Extraction is a fallback chain. Two extractors run in parallel, each result is scored on how much real text it kept, its headings, link density and leftover navigation, and the best one wins. If the plain HTML is too thin, as on React or Next.js sites, it renders the page in headless Chromium instead. A benchmark harness runs it against 25 production sites to catch regressions.",
      "The --ui mode renders a site and pulls out its design system: colours, type scale, spacing, CSS variables and components, as a Markdown style guide, JSON design tokens or an HTML report. Optional AI modes can summarise, translate or answer questions using OpenAI, Anthropic, Gemini, Groq or a local Ollama model.",
    ],
    stack: "Python, Typer, trafilatura, readability-lxml, Playwright, httpx, Rich",
    links: [
      { label: "GitHub", href: "https://github.com/Rac-exe/WebToMD" },
      { label: "Website", href: "https://web-to-md-website.vercel.app" },
      { label: "PyPI", href: "https://pypi.org/project/webtomd/" },
    ],
  },
  {
    name: "Cindr",
    slug: "cindr",
    kind: "Web app",
    year: "2026",
    oneLiner:
      "Swipe for movies instead of dates. It learns your taste from every swipe, so picking a film takes seconds.",
    description: [
      "One film at a time: swipe right to save it, left to skip, up to watch the trailer. You can use it without an account; your swipes stay in your browser until you sign up and sync them.",
      "Recommendations come from CindrSense, a taste model that tracks your genre, tone, era, popularity and runtime preferences as decaying averages, so recent swipes count more than old ones. Every candidate film is scored on nine weighted signals, and every seventh batch deliberately includes a genre at the edge of your taste so the feed doesn't turn into an echo chamber.",
      "It also has watchlists, genre communities and friends, on a Supabase Postgres backend.",
    ],
    stack: "Next.js, TypeScript, Supabase, Framer Motion, TMDB API",
    links: [
      { label: "Website", href: "https://cindr-red.vercel.app" },
      { label: "GitHub", href: "https://github.com/Rac-exe/Cindr" },
    ],
  },
];

