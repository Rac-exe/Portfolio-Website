import ComicNav from "../components/ComicNav";

export default function ContactPage() {
  return (
    <main className="min-h-screen p-4 sm:p-6">
      <ComicNav />
      <section className="comic-page mx-auto mt-6 flex w-full max-w-[1200px] items-center justify-center px-8 pb-10 pt-24 text-center">
        <div>
          <p className="text-5xl">Contact me</p>
          <a
            className="mt-4 block text-2xl text-[var(--accent)]"
            href="mailto:prabhatbajpai2005@gmail.com"
          >
            prabhatbajpai2005@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}
