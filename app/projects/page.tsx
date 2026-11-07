import type { Metadata } from "next";

import { PROJECTS } from "../lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Prmpt, WebToMD, Cindr, and other things Prabhat Bajpai has built.",
};

export default function ProjectsPage() {
  return (
    <>
      <header>
        <h1 className="page-title">Projects</h1>
        <p className="lede">
          Tools and products that started from real friction, then kept getting
          reworked until they were useful.
        </p>
      </header>

      <div className="section">
        {PROJECTS.map((project) => (
          <article className="project" id={project.slug} key={project.slug}>
            <div className="project-head">
              <h2>{project.name}</h2>
              <span className="mono muted">
                {project.kind} · {project.year}
              </span>
            </div>

            {project.description.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}

            <p className="project-stack mono">{project.stack}</p>

            <ul className="inline-list">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} rel="noopener noreferrer" target="_blank">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}
