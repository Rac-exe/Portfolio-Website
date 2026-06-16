import ComicNav from "../components/ComicNav";

export default function BlogPage() {
  return (
    <main className="min-h-screen p-4 sm:p-6">
      <ComicNav />
      <section className="comic-page mx-auto mt-6 flex w-full max-w-[1200px] items-center justify-center px-8 pb-10 pt-24 text-center">
        <div>
          <p className="text-5xl">Blogs</p>
          <p className="mt-4 text-2xl text-[var(--ink-soft)]">Coming next.</p>
        </div>
      </section>
    </main>
  );
}
