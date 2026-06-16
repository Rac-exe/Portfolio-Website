import ComicNav from "../components/ComicNav";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen p-4 sm:p-6">
      <ComicNav />
      <section className="comic-page mx-auto mt-6 flex w-full max-w-[1200px] items-center justify-center px-8 pb-10 pt-24 text-center">
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
