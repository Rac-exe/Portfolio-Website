import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import ComicNav from "../../components/ComicNav";
import ComicScrollFrame from "../../components/ComicScrollFrame";
import {
  formatBlogDate,
  getBlogPost,
  getBlogSlugs,
  type MarkdownBlock,
} from "../../lib/blogs";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

type InlineSegment =
  | { type: "text"; value: string }
  | { type: "strong"; value: string }
  | { type: "em"; value: string }
  | { type: "code"; value: string }
  | { type: "link"; value: string; href: string };

const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;

function parseInline(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_PATTERN)) {
    const value = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, index) });
    }

    if (value.startsWith("**") && value.endsWith("**")) {
      segments.push({ type: "strong", value: value.slice(2, -2) });
    } else if (value.startsWith("`") && value.endsWith("`")) {
      segments.push({ type: "code", value: value.slice(1, -1) });
    } else if (value.startsWith("[") && value.includes("](") && value.endsWith(")")) {
      const closeIndex = value.indexOf("](");
      segments.push({
        type: "link",
        value: value.slice(1, closeIndex),
        href: value.slice(closeIndex + 2, -1),
      });
    } else if (value.startsWith("*") && value.endsWith("*")) {
      segments.push({ type: "em", value: value.slice(1, -1) });
    }

    lastIndex = index + value.length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) });
  }

  return segments;
}

function renderInline(text: string): ReactNode {
  return parseInline(text).map((segment, index) => {
    if (segment.type === "strong") {
      return (
        <strong className="article-highlight" key={`${segment.value}-${index}`}>
          {segment.value}
        </strong>
      );
    }

    if (segment.type === "em") {
      return <em key={`${segment.value}-${index}`}>{segment.value}</em>;
    }

    if (segment.type === "code") {
      return <code key={`${segment.value}-${index}`}>{segment.value}</code>;
    }

    if (segment.type === "link") {
      return (
        <a href={segment.href} key={`${segment.href}-${index}`} rel="noopener" target="_blank">
          {segment.value}
        </a>
      );
    }

    return segment.value;
  });
}

function renderBlock(block: MarkdownBlock, index: number) {
  if (block.type === "hr") {
    return <hr key={`hr-${index}`} />;
  }

  if (block.type === "heading") {
    const Heading = block.level === 2 ? "h2" : "h3";

    return <Heading key={`${block.text}-${index}`}>{renderInline(block.text)}</Heading>;
  }

  return <p key={`${block.text}-${index}`}>{renderInline(block.text)}</p>;
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();

  return slugs.map((slug) => ({ slug }));
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="comic-stage comic-scroll-stage">
      <section className="comic-page comic-scroll-frame">
        <ComicScrollFrame className="px-8 pb-12 pt-6 sm:px-12 md:px-20 lg:px-24">
          <ComicNav />
          <article className="blog-article">
            <Link className="blog-back-link" href="/blog">
              ← Back to blogs
            </Link>

            <header>
              <p className="blog-article-meta">
                {formatBlogDate(post.date)} / {post.readingTime}
              </p>
              <h1 className="manga-title mt-3 max-w-4xl text-3xl leading-tight sm:text-4xl">
                {post.title}
              </h1>
              <p className="blog-article-excerpt">{post.excerpt}</p>
            </header>

            <div className="blog-article-body">
              {post.blocks.map((block, index) => renderBlock(block, index))}
            </div>
          </article>
        </ComicScrollFrame>
      </section>
    </main>
  );
}
