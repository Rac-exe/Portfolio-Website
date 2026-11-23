import Image from "next/image";
import Link from "next/link";

import PingField from "./components/PingField";
import { formatBlogDate, getBlogPosts } from "./lib/blogs";
import { LIFE_READY } from "./lib/life";
import { PROJECTS, SITE, WORK } from "./lib/site";

const external = { rel: "noopener noreferrer", target: "_blank" } as const;

export default async function Home() {
  const posts = (await getBlogPosts()).slice(0, 3);

  return (
    <>
      <div className="breakout hero-art">
        <PingField />
      </div>

      <section className="prose">
        <div className="intro">
          <Image
            alt="Prabhat Bajpai"
            className="avatar"
            height={56}
            priority
            src={SITE.portrait}
            width={56}
          />
          <div>
            <h1 className="intro-name">Prabhat Bajpai</h1>
            <p className="intro-role mono">
              software engineer · bengaluru ·{" "}
              <span className="open-to-work">
                <span aria-hidden="true" className="status-dot" />
                open to work
              </span>
            </p>
          </div>
        </div>
        <p>
          I&apos;m a software engineer in Bengaluru, finishing my degree in
          2027. I build automation and developer tools, and I&apos;m happiest
          where software meets real hardware.
        </p>
        <p>
          At{" "}
          <a href="https://thinkseedsystems.com" {...external}>
            ThinkSeed Systems
          </a>{" "}
          I&apos;m building a phone emulator for testing automotive digital
          keys. It plays the phone&apos;s side over BLE, UWB and NFC, so
          digital-key software can be tested automatically against real car
          hardware instead of by hand with a phone.
        </p>
        <p>
          Before that I co-founded{" "}
          <a href="https://github.com/Rac-exe/Prompt" {...external}>
            Prmpt
          </a>
          , a desktop app that rewrites rough prompts before they reach a
          model, with a code-intelligence engine that coding agents can query
          over MCP. When we stopped running it as a startup, we open-sourced
          it.
        </p>
        <p>
          I&apos;m looking for my next role in AI engineering, test automation,
          or AI and hardware, and I&apos;m open to relocating or working
          remotely. <a href={`mailto:${SITE.email}`}>Email me</a>.
        </p>
        {LIFE_READY ? (
          <p>
            <Link className="more-link" href="/life">
              There&apos;s more to me than work{" "}
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </Link>
          </p>
        ) : null}
      </section>

      <section className="section" aria-labelledby="work-heading">
        <h2 className="section-title" id="work-heading">
          Work
        </h2>
        <ul className="entries">
          {WORK.map((job) => (
            <li key={job.company}>
              <div className="entry-head">
                <span>
                  <a className="entry-title" href={job.href} {...external}>
                    {job.company}
                  </a>
                  <span className="muted"> · {job.role}</span>
                </span>
                <span className="mono muted">{job.period}</span>
              </div>
              <p className="entry-desc">{job.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="projects-heading">
        <h2 className="section-title" id="projects-heading">
          Projects
        </h2>
        <ul className="entries">
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <Link className="entry-title" href={`/projects#${project.slug}`}>
                {project.name}
              </Link>
              <p className="entry-desc">{project.oneLiner}</p>
            </li>
          ))}
        </ul>
        <Link className="section-more" href="/projects">
          All projects <span aria-hidden="true" className="arrow">→</span>
        </Link>
      </section>

      {posts.length > 0 ? (
        <section className="section" aria-labelledby="writing-heading">
          <h2 className="section-title" id="writing-heading">
            Writing
          </h2>
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
          <Link className="section-more" href="/blog">
            All writing <span aria-hidden="true" className="arrow">→</span>
          </Link>
        </section>
      ) : null}

      <section className="section prose" aria-labelledby="contact-heading">
        <h2 className="section-title" id="contact-heading">
          Contact
        </h2>
        <p>
          Hiring for AI, automation or hardware work, or building something
          interesting? Email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>,{" "}
          <Link href="/ping-me">send a message</Link>, or find me on{" "}
          <a href="https://www.linkedin.com/in/prabhat-bajpai" {...external}>
            LinkedIn
          </a>
          ,{" "}
          <a href="https://github.com/Rac-exe" {...external}>
            GitHub
          </a>{" "}
          and{" "}
          <a href="https://x.com/PrabhatAstrix" {...external}>
            X
          </a>
          .
        </p>
      </section>
    </>
  );
}
