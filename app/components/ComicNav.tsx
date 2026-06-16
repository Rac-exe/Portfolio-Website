"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LEFT_LINKS = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
];

const RIGHT_LINKS = [
  { label: "blogs", href: "/blog" },
  { label: "contact me", href: "/contact" },
];

export default function ComicNav() {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-7 z-50 px-8">
      <nav className="comic-nav mx-auto grid w-full max-w-[900px] grid-cols-[1fr_auto_1fr] items-center gap-8 px-8 py-3 text-lg shadow-sm">
        <div className="flex min-w-0 justify-start gap-8">
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

        <div className="flex min-w-0 justify-end gap-8">
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
