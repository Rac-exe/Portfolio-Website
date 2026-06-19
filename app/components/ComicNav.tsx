"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LEFT_LINKS = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
];

const RIGHT_LINKS = [
  { label: "blogs", href: "/blog" },
  { label: "ping me", href: "/say-hi" },
];

export default function ComicNav() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <nav className="comic-nav mx-auto grid grid-cols-[1fr_auto_1fr] items-center text-lg shadow-sm">
        <div className="nav-side flex min-w-0 justify-start">
          {LEFT_LINKS.map((link) => (
            <Link
              className="nav-link"
              data-active={pathname === link.href}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link className="nav-brand text-center text-xl font-bold" href="/">
          Prabhat
        </Link>

        <div className="nav-side flex min-w-0 justify-end">
          {RIGHT_LINKS.map((link) => (
            <Link
              className="nav-link"
              data-active={pathname === link.href}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
