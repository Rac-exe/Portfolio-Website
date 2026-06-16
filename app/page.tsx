import AnimatedName from "./components/AnimatedName";
import ComicNav from "./components/ComicNav";
import ComicScrollFrame from "./components/ComicScrollFrame";
import KatanaThemeSlider from "./components/KatanaThemeSlider";

export default function Home() {
  return (
    <main className="comic-stage comic-scroll-stage">
      <section className="comic-page comic-scroll-frame">
        <ComicScrollFrame className="flex flex-col px-8 pb-12 pt-6 sm:px-12 md:px-20 lg:px-24">
          <ComicNav />

          <div className="flex flex-1 flex-col justify-center">
        <div className="theme-row mb-6">
          <p>BUILD / BREAK / FIX / REPEAT</p>
          <KatanaThemeSlider />
        </div>

        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_400px]">
          <div className="max-w-[800px]">
            <h1 className="manga-title mb-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              <AnimatedName />
              <span className="block text-[0.82em]">Software Engineer</span>
            </h1>

            <div className="hero-copy max-w-[760px] space-y-2 text-lg leading-7 text-[var(--ink)] sm:text-xl sm:leading-8">
              <p>Hi, I&apos;m 21, living in Bengaluru, India.</p>

              <p>
                I build <span className="ink-highlight">working concepts</span>{" "}
                of products, then keep making them better. I&apos;m a full-stack
                engineer, but I&apos;m especially drawn to{" "}
                <span className="ink-highlight">backend systems</span>,
                developer tools, and products born from real friction.
              </p>

              <p>
                I <span className="ink-highlight">co-founded PRMPT</span>, a
                prompt optimization tool focused on making AI prompting sharper,
                cheaper, and more reliable without losing performance.
              </p>

              <p>
                Most of what I build starts from something I needed myself:
                <span className="ink-highlight"> Cindr</span> to make movie
                discovery less annoying, and{" "}
                <span className="ink-highlight">WebToMD</span> to turn messy web
                pages into clean Markdown.
              </p>

              <p>
                I like taking rough ideas seriously: shipping the first version,
                breaking parts of it, <span className="ink-highlight">fixing
                what matters</span>, and repeating until the system actually
                works.
              </p>

              <p>
                You can look at my work on GitHub, read my blogs, or reach out
                if you&apos;re building something interesting.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a className="availability-cta text-2xl" href="/say-hi">
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
              <div className="portrait-image-frame">
                <svg aria-hidden="true" className="portrait-filter-defs" focusable="false">
                  <filter id="portrait-pencil-sketch" colorInterpolationFilters="sRGB">
                    <feColorMatrix type="saturate" values="0" result="gray" />
                    <feComponentTransfer in="gray" result="poster">
                      <feFuncR type="discrete" tableValues="0.08 0.22 0.5 0.78 1" />
                      <feFuncG type="discrete" tableValues="0.08 0.22 0.5 0.78 1" />
                      <feFuncB type="discrete" tableValues="0.08 0.22 0.5 0.78 1" />
                    </feComponentTransfer>
                    <feConvolveMatrix
                      in="poster"
                      order="3"
                      kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1"
                      divisor="1"
                      bias="0.58"
                      result="edges"
                    />
                    <feComposite in="poster" in2="edges" operator="arithmetic" k2="0.78" k3="0.42" result="sketch" />
                    <feComponentTransfer in="sketch">
                      <feFuncR type="linear" slope="1.35" intercept="-0.08" />
                      <feFuncG type="linear" slope="1.35" intercept="-0.08" />
                      <feFuncB type="linear" slope="1.35" intercept="-0.08" />
                    </feComponentTransfer>
                  </filter>
                </svg>
                <img
                  alt="Prabhat Bajpai"
                  className="portrait-image"
                  src="/images/portrait.png"
                />
              </div>
            </div>
          </aside>
        </div>
          </div>
        </ComicScrollFrame>
      </section>
    </main>
  );
}
