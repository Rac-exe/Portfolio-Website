import ComicNav from "../components/ComicNav";
import ComicScrollFrame from "../components/ComicScrollFrame";

const PROJECTS = [
  {
    name: "PRMPT",
    eyebrow: "Co-founded product",
    summary:
      "A prompt optimization tool focused on making AI prompting sharper, cheaper, and more reliable without losing performance.",
    details:
      "Built around the real pain of prompt quality, token cost, and repeatability. The product treats prompting less like guessing and more like an engineering loop.",
    links: [
      { label: "Website", href: "https://tryprmpt.com" },
    ],
  },
  {
    name: "Cindr",
    eyebrow: "Movie discovery",
    summary:
      "A taste-led movie discovery app that makes choosing what to watch feel less like endless browsing.",
    details:
      "A swipe-first experience for surfacing movies around preference, momentum, and fast decisions instead of forcing people into another infinite catalog.",
    links: [
      { label: "GitHub", href: "https://github.com/Rac-exe/Cindr" },
      { label: "Website", href: "https://cindr-red.vercel.app" },
    ],
  },
  {
    name: "WebToMD",
    eyebrow: "Developer CLI",
    summary:
      "A Python CLI that turns messy web pages into clean Markdown from the terminal.",
    details:
      "Designed for fast extraction, cleaner reading, and developer-friendly workflows with support for JS-rendered pages, batch processing, and AI-assisted modes.",
    links: [
      { label: "GitHub", href: "https://github.com/Rac-exe/WebToMD" },
      { label: "Website", href: "https://web-to-md-website.vercel.app" },
      { label: "PyPI", href: "https://pypi.org/project/webtomd/" },
    ],
  },
];

export default function ProjectsPage() {
  return (
    <main className="comic-stage comic-scroll-stage">
      <section className="comic-page comic-scroll-frame">
        <ComicScrollFrame className="flex flex-col px-8 pb-12 pt-6 sm:px-12 md:px-20 lg:px-24">
          <ComicNav />
          <div className="projects-header">
            <p className="text-lg tracking-[0.18em] text-[var(--accent)]">
              BUILT / SHIPPED / REWORKED
            </p>
            <h1 className="manga-title mt-3 text-5xl leading-tight md:text-6xl">
              Projects
            </h1>
            <p className="mt-4 max-w-3xl text-xl leading-8 text-[var(--ink-soft)]">
              Products and tools that started from real friction, then kept
              getting shaped into something useful.
            </p>
          </div>

          <div className="projects-grid mt-10">
            {PROJECTS.map((project, index) => (
              <article className="project-card" key={project.name}>
                <div className="project-card-index">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="project-card-content">
                  <p className="project-eyebrow">{project.eyebrow}</p>
                  <h2>{project.name}</h2>
                  <p className="project-summary">{project.summary}</p>
                  <p className="project-details">{project.details}</p>

                  <div className="project-links">
                    {project.links.map((link) => (
                      <a
                        className="comic-button px-4 py-2 text-lg"
                        href={link.href}
                        key={link.href}
                        rel="noopener"
                        target="_blank"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ComicScrollFrame>
      </section>
    </main>
  );
}
