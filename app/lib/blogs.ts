import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
};

export type BlogPost = BlogPostMeta & {
  blocks: MarkdownBlock[];
};

export type MarkdownBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "hr" };

const BLOGS_DIRECTORY = path.join(process.cwd(), "blogs");

function slugFromFilename(filename: string) {
  return filename.replace(/\.md$/, "");
}

function parseFrontmatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    return {
      metadata: {} as Record<string, string>,
      content: source.trim(),
    };
  }

  const metadata = match[1].split(/\r?\n/).reduce<Record<string, string>>((acc, line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return acc;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (key) {
      acc[key] = value;
    }

    return acc;
  }, {});

  return {
    metadata,
    content: source.slice(match[0].length).trim(),
  };
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));

  return `${minutes} min read`;
}

function parseMarkdownBlocks(content: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) {
      return;
    }

    blocks.push({
      type: "paragraph",
      text: paragraphLines.join(" ").trim(),
    });
    paragraphLines.length = 0;
  };

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    if (/^---+$/.test(line)) {
      flushParagraph();
      blocks.push({ type: "hr" });
      continue;
    }

    const headingMatch = line.match(/^(#{2,3})\s+(.+)$/);

    if (headingMatch) {
      flushParagraph();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length as 2 | 3,
        text: headingMatch[2].trim(),
      });
      continue;
    }

    paragraphLines.push(line);
  }

  flushParagraph();

  return blocks;
}

async function readBlogFile(filename: string): Promise<BlogPost> {
  const slug = slugFromFilename(filename);
  const source = await readFile(path.join(BLOGS_DIRECTORY, filename), "utf8");
  const { metadata, content } = parseFrontmatter(source);

  return {
    slug,
    title: metadata.title ?? slug.replaceAll("-", " "),
    date: metadata.date ?? "",
    excerpt: metadata.excerpt ?? "",
    readingTime: estimateReadingTime(content),
    blocks: parseMarkdownBlocks(content),
  };
}

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  let files: string[];

  try {
    files = await readdir(BLOGS_DIRECTORY);
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files.filter((file) => file.endsWith(".md")).map((file) => readBlogFile(file)),
  );

  return posts
    .map(({ blocks: _blocks, ...meta }) => meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    return await readBlogFile(`${slug}.md`);
  } catch {
    return null;
  }
}

export async function getBlogSlugs() {
  const posts = await getBlogPosts();

  return posts.map((post) => post.slug);
}

export function formatBlogDate(date: string) {
  if (!date) {
    return "Undated";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
