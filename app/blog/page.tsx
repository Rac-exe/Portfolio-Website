import Link from "next/link";

import ComicNav from "../components/ComicNav";
import ComicScrollFrame from "../components/ComicScrollFrame";
import { formatBlogDate, getBlogPosts } from "../lib/blogs";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="comic-stage comic-scroll-stage">
      <section className="comic-page comic-scroll-frame">
        <ComicScrollFrame className="flex flex-col px-8 pb-12 pt-6 sm:px-12 md:px-20 lg:px-24">
          <ComicNav />
          <div className="blog-header">
            <p className="blog-header-eyebrow">
              NOTES / BREAKDOWNS / LEARNINGS
            </p>
            <h1 className="manga-title mt-3 text-5xl leading-tight md:text-6xl">
              Blogs
            </h1>
            <p className="mt-4 max-w-3xl text-xl leading-8 text-[var(--ink-soft)]">
              Things I learn while building, breaking, debugging, and fixing
              real systems.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="blog-list mt-10">
              {posts.map((post) => (
                <Link className="blog-row" href={`/blog/${post.slug}`} key={post.slug}>
                  <span className="blog-row-title">{post.title}</span>
                  <time className="blog-row-date" dateTime={post.date}>
                    {formatBlogDate(post.date)}
                  </time>
                </Link>
              ))}
            </div>
          ) : (
            <div className="blog-empty mt-10">
              <p>No blogs yet. Add a markdown file inside the root blogs folder.</p>
            </div>
          )}
        </ComicScrollFrame>
      </section>
    </main>
  );
}
