import type { Metadata } from "next";
import Link from "next/link";

import { formatBlogDate, getBlogPosts } from "../lib/blogs";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes from building, breaking, debugging, and fixing real systems.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <header>
        <h1 className="page-title">Writing</h1>
        <p className="lede">
          Things I learn while building, breaking, debugging, and fixing real
          systems.
        </p>
      </header>

      <div className="section">
        {posts.length > 0 ? (
          <ul className="rows">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link className="row" href={`/blog/${post.slug}`}>
                  <span className="row-title">{post.title}</span>
                  <time className="row-meta mono" dateTime={post.date}>
                    {formatBlogDate(post.date)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">Nothing here yet.</p>
        )}
      </div>
    </>
  );
}
