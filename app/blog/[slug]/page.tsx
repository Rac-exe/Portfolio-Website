import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

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
        <strong key={`${segment.value}-${index}`}>
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

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <Link className="back-link" href="/blog">
        ← Writing
      </Link>

      <header className="article-header">
        <p className="article-meta mono">
          <time dateTime={post.date}>{formatBlogDate(post.date)}</time> · {post.readingTime}
        </p>
        <h1 className="page-title">{post.title}</h1>
        {post.excerpt ? <p className="lede">{post.excerpt}</p> : null}
      </header>

      <div className="article-body">
        {post.blocks.map((block, index) => renderBlock(block, index))}
      </div>
    </article>
  );
}
