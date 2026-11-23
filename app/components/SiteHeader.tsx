"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LIFE_READY } from "../lib/life";

const LINKS = [
  { label: "projects", href: "/projects" },
  { label: "writing", href: "/blog" },
  ...(LIFE_READY ? [{ label: "life", href: "/life" }] : []),
  { label: "ping me", href: "/ping-me" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="site-name" href="/">
        Prabhat Bajpai
      </Link>
      <nav aria-label="Main">
        {LINKS.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className="nav-link"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
