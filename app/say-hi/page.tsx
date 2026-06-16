import ComicNav from "../components/ComicNav";
import ComicScrollFrame from "../components/ComicScrollFrame";
import SayHiForm from "./SayHiForm";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Rac-exe",
    icon: (
      <path d="M12 2.2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.3-.3-4.7-1.1-4.7-5A3.9 3.9 0 0 1 6.4 9c-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 2v2.5c0 .3.2.6.7.5A10 10 0 0 0 12 2.2Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/prabhat-bajpai",
    icon: (
      <path d="M5 8.2h3.1V19H5V8.2Zm1.6-4.9a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM10 8.2h3v1.5h.1c.4-.8 1.5-1.8 3.1-1.8 3.3 0 3.9 2.2 3.9 5V19H17v-5.4c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V19H10V8.2Z" />
    ),
  },
  {
    label: "X",
    href: "https://x.com/PrabhatAstrix",
    icon: <path d="M4 4h4.1l4.1 5.4L16.8 4H20l-6.3 7.4L20.5 20h-4.1l-4.7-6.1L6.5 20H3.3l6.8-8L4 4Zm2.2 1.7 11 12.6h1.1L7.3 5.7H6.2Z" />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/Prabhat.whynot",
    icon: (
      <path d="M8 3.5h8A4.5 4.5 0 0 1 20.5 8v8a4.5 4.5 0 0 1-4.5 4.5H8A4.5 4.5 0 0 1 3.5 16V8A4.5 4.5 0 0 1 8 3.5Zm0 2A2.5 2.5 0 0 0 5.5 8v8A2.5 2.5 0 0 0 8 18.5h8a2.5 2.5 0 0 0 2.5-2.5V8A2.5 2.5 0 0 0 16 5.5H8Zm4 3.2a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6Zm0 2a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Zm4.1-2.4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Z" />
    ),
  },
  {
    label: "Email",
    href: "mailto:prabhatbajpai2005@gmail.com",
    icon: <path d="M4 6h16v12H4V6Zm2.2 2 5.8 4.5L17.8 8H6.2Zm11.8 8v-5.4l-6 4.6-6-4.6V16h12Z" />,
  },
];

export default function SayHiPage() {
  return (
    <main className="comic-stage comic-scroll-stage">
      <section className="comic-page comic-scroll-frame">
        <ComicScrollFrame className="flex flex-col px-8 pb-12 pt-6 sm:px-12 md:px-20 lg:px-24">
          <ComicNav />

          <div className="say-hi-layout">
            <section className="say-hi-intro">
              <p className="text-lg tracking-[0.18em] text-[var(--accent)]">
                EMAIL / X / BUILDING THINGS
              </p>
              <h1 className="manga-title mt-3 text-5xl leading-tight md:text-6xl">
                Say Hi
              </h1>
              <p>
                Best way to connect with me is through{" "}
                <a href="mailto:prabhatbajpai2005@gmail.com">email</a> or{" "}
                <a href="https://x.com/PrabhatAstrix" rel="noopener" target="_blank">
                  X
                </a>
                . Send context, a link, or just the thing you want to talk about.
              </p>
              <div className="say-hi-direct-links">
                <a className="comic-button px-5 py-2 text-xl" href="mailto:prabhatbajpai2005@gmail.com">
                  Email me
                </a>
                <a
                  className="comic-button px-5 py-2 text-xl"
                  href="https://x.com/PrabhatAstrix"
                  rel="noopener"
                  target="_blank"
                >
                  DM on X
                </a>
              </div>
            </section>

            <section className="say-hi-panel">
              <h2>Drop a message</h2>
              <p>
                Add one valid social/contact link so I know where to reply.
              </p>
              <SayHiForm />
            </section>
          </div>

          <section className="say-hi-socials" aria-label="Social links">
            {SOCIALS.map((social) => (
              <a
                aria-label={social.label}
                href={social.href}
                key={social.label}
                rel={social.href.startsWith("http") ? "noopener" : undefined}
                target={social.href.startsWith("http") ? "_blank" : undefined}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  {social.icon}
                </svg>
                <span>{social.label}</span>
              </a>
            ))}
          </section>
        </ComicScrollFrame>
      </section>
    </main>
  );
}
