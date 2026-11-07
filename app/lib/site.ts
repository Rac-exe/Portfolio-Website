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

export const SITE = {
  name: "Prabhat Bajpai",
  role: "Software Engineer",
  location: "Bengaluru, India",
  email: "prabhatbajpai2005@gmail.com",
  description:
    "Prabhat Bajpai is a software engineer in Bengaluru building developer tools, backend systems, and test tooling for automotive digital keys.",
};

export const SOCIALS: Link[] = [
  { label: "GitHub", href: "https://github.com/Rac-exe" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prabhat-bajpai" },
  { label: "X", href: "https://x.com/PrabhatAstrix" },
  { label: "Email", href: `mailto:${SITE.email}` },
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
      "I co-founded it as a startup. When we stopped pursuing that, we made it local-first with bring-your-own-key and open-sourced it. There is no account and no hosted backend.",
    ],
    stack: "Electron, React, TypeScript, Python, FastAPI, Rust (N-API), SQLite, ONNX",
    links: [
      { label: "GitHub", href: "https://github.com/Rac-exe/Prompt" },
      { label: "Website", href: "https://tryprmpt.com" },
    ],
  },
  {
    name: "WebToMD",
    slug: "webtomd",
    kind: "Python CLI",
    year: "2026",
    oneLiner: "Turns messy web pages into clean Markdown from the terminal.",
    description: [
      "A CLI for pulling readable Markdown out of web pages, including JavaScript-rendered ones. Supports batch processing and AI-assisted cleanup modes, and is published on PyPI.",
    ],
    stack: "Python",
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
    oneLiner: "Swipe-first movie discovery, so picking a film takes less scrolling.",
    description: [
      "A taste-led movie discovery app. Instead of another endless catalogue, it surfaces films one at a time based on what you have liked so far, so decisions are quick.",
    ],
    stack: "Next.js, TypeScript",
    links: [
      { label: "GitHub", href: "https://github.com/Rac-exe/Cindr" },
      { label: "Website", href: "https://cindr-red.vercel.app" },
    ],
  },
];
