import ComicNav from "./components/ComicNav";
import KatanaThemeSlider from "./components/KatanaThemeSlider";

export default function Home() {
  return (
    <main className="comic-stage">
      <ComicNav />

      <section className="comic-page flex items-center px-8 pb-12 pt-32 sm:px-12 md:px-20 lg:px-24">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="max-w-[800px]">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:gap-16">
              <p className="text-lg tracking-[0.18em] text-[var(--accent)]">
                BUILD / BREAK / FIX / REPEAT
              </p>
              <KatanaThemeSlider />
            </div>

            <h1 className="manga-title mb-6 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              <span className="block">Prabhat Bajpai</span>
              <span className="block text-[0.82em]">Software Engineer</span>
            </h1>

            <div className="max-w-[760px] space-y-3 text-xl leading-8 text-[var(--ink)] sm:text-2xl sm:leading-9">
              <p>Hi, I&apos;m 21, living in Bengaluru, India.</p>

              <p>
                I build working concepts of products and then make them better.
                I am a full-stack engineer obsessed with coding, and I
                thoroughly enjoy it.
              </p>

              <p>
                My need to build starts from something that I have faced as a
                problem or something that I am missing.
              </p>

              <p>
                I co-founded PRMPT, a prompt optimization tool. The core problem
                we are trying to solve is reducing the cost of AI while keeping
                its performance intact.
              </p>

              <p>
                You can look at my work on GitHub and also read my blogs here.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a className="availability-cta text-2xl" href="mailto:prabhatbajpai2005@gmail.com">
                <span className="availability-dot" />
                <span>Open to work on interesting problems</span>
              </a>
              <a
                className="comic-button px-5 py-2 text-xl"
                href="https://github.com/Rac-exe"
                rel="noopener"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>

          <aside className="relative justify-self-center lg:justify-self-end">
            <div className="portrait-burst" aria-hidden="true" />
            <div className="portrait-panel flex h-[360px] w-[280px] items-center justify-center rounded-[26px] border-[5px] border-[var(--line)] sm:h-[420px] sm:w-[330px]">
              <span className="rounded-md bg-[var(--paper)] px-5 py-3 text-3xl shadow-sm">
                Photo here
              </span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
