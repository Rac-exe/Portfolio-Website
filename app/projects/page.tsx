import ComicNav from "../components/ComicNav";

export default function ProjectsPage() {
  return (
    <main className="comic-stage">
      <ComicNav />
      <section className="comic-page flex items-center justify-center px-8 pb-12 pt-32 text-center sm:px-12 md:px-20 lg:px-24">
        <div>
          <p className="text-5xl">Projects</p>
          <p className="mt-4 text-2xl text-[var(--ink-soft)]">
            PRMPT, Cindr, and WebToMD will live here.
          </p>
        </div>
      </section>
    </main>
  );
}
