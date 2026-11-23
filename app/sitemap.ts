import type { MetadataRoute } from "next";

import { getBlogPosts } from "./lib/blogs";
import { LIFE_READY } from "./lib/life";
import { SITE } from "./lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const pages = ["", "/projects", "/blog", "/ping-me", ...(LIFE_READY ? ["/life"] : [])];

  return [
    ...pages.map((path) => ({ url: `${SITE.url}${path}` })),
    ...posts.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: post.date || undefined,
    })),
  ];
}
