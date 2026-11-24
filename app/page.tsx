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
          Hi, I&apos;m 21 and based in Bengaluru. I build things end to end and
          ship them: AI tooling, automation, and software that has to work on
          real hardware, not just in a browser. Any corner of software is fair
          game. I&apos;d call myself a mad engineer who genuinely enjoys the
          work.
        </p>
        <p>
          Right now I&apos;m interning at{" "}
          <a href="https://thinkseedsystems.com" {...external}>
            ThinkSeed Systems
          </a>
          , where I&apos;ve worked on a real product from day one: a
          test-automation tool for digital car keys. It runs thousands of
          scenarios, as close to real use as possible, as repeatable test
          campaigns against real vehicle hardware. A software change can be
          regression-tested in hours instead of weeks, the hardware&apos;s
          quirks and limits show up long before a customer would find them,
          and both developers and testers get out of slow manual testing.
        </p>
        <p>
          Before that I co-founded{" "}
          <a href="https://tryprmpt.com" {...external}>
            Prmpt
          </a>
          , an AI desktop app with its own code-search engine for coding
          agents. The goal was to cut token usage by handing agents exactly the
          right context. In internal tests it held its own against Claude Code,
          Cursor and other harnesses. Models have come a long way since, but I
          still think that engine earns its place in legacy codebases with
          millions of lines.
        </p>
        <p>
          I&apos;ve also built{" "}
          <Link href="/projects#webtomd">WebToMD</Link>, a Python tool that
          turns any web page into clean Markdown or a full design system, for
          design and research engineers, and{" "}
          <Link href="/projects#cindr">Cindr</Link>, where cinephiles find the
          next film they&apos;ll love and keep track of what they&apos;ve
          watched. It might become a way to meet people with the same taste in
          movies, too.
        </p>
        <p>
          I&apos;m looking to join a startup where I can own hard problems end to
          end: AI products, developer tools, automation, or anything that
          touches hardware. I&apos;ll take features from idea to production and
          own them completely. If there&apos;s something I don&apos;t know yet,
          give me a few days and I&apos;ll come back having learned it. Whatever
          I take on gets everything I&apos;ve got. Bengaluru or remote both
          work. <a href={`mailto:${SITE.email}`}>Email me</a>.
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
