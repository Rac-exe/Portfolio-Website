import Link from "next/link";

import { formatBlogDate, getBlogPosts } from "./lib/blogs";
import { PROJECTS } from "./lib/site";

const external = { rel: "noopener noreferrer", target: "_blank" } as const;

export default async function Home() {
  const posts = (await getBlogPosts()).slice(0, 3);

  return (
    <>
      <section className="prose">
        <h1 className="page-title">Prabhat Bajpai</h1>
        <p>
          I&apos;m a software engineer in Bengaluru. I&apos;m 21, I lean towards
          backend systems and developer tools, and most of what I build starts
          with something that annoyed me.
        </p>
        <p>
          Right now I&apos;m a software engineering intern at{" "}
          <a href="https://thinkseedsystems.com" {...external}>
            ThinkSeed Systems
          </a>
          , working on digital car keys: the tech that lets your phone unlock
          and start a car. That software is normally tested with a real phone,
          which is a black box to the people building the car&apos;s side. So
          I&apos;m building the phone as a tool. It plays the phone&apos;s part,
          lets engineers script thousands of scenarios and parameters, and shows
          exactly what happened, tested against real car hardware over BLE, UWB
          and CAN.
        </p>
        <p>
          Before that I co-founded{" "}
          <a href="https://github.com/Rac-exe/Prompt" {...external}>
            Prmpt
          </a>
          , a desktop app that turns rough prompts into precise ones before
          they reach a model. When we stopped running it as a startup, we made
          it local-first and open-sourced it.
        </p>
        <p>
          These days I&apos;m most interested in where AI meets hardware:
          devices, vehicles, and software that has to work outside a browser.
        </p>
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
            All writing →
          </Link>
        </section>
      ) : null}

      <section className="section prose" aria-labelledby="contact-heading">
        <h2 className="section-title" id="contact-heading">
          Contact
        </h2>
        <p>
          If you&apos;re working on something at the edge of AI and hardware, or
          just want to talk shop, <Link href="/ping-me">send me a message</Link>{" "}
          or find me on{" "}
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
