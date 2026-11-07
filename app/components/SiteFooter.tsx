import { SOCIALS } from "../lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <ul className="inline-list">
        {SOCIALS.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              target={social.href.startsWith("http") ? "_blank" : undefined}
            >
              {social.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="muted">© {new Date().getFullYear()} Prabhat Bajpai</p>
    </footer>
  );
}
