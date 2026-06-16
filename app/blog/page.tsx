import ComicNav from "../components/ComicNav";

export default function BlogPage() {
  return (
    <main className="comic-stage">
      <ComicNav />
      <section className="comic-page flex items-center justify-center px-8 pb-12 pt-32 text-center sm:px-12 md:px-20 lg:px-24">
        <div>
          <p className="text-5xl">Blogs</p>
          <p className="mt-4 text-2xl text-[var(--ink-soft)]">Coming next.</p>
        </div>
      </section>
    </main>
  );
}
