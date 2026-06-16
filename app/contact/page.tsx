import ComicNav from "../components/ComicNav";

export default function ContactPage() {
  return (
    <main className="comic-stage">
      <ComicNav />
      <section className="comic-page flex items-center justify-center px-8 pb-12 pt-32 text-center sm:px-12 md:px-20 lg:px-24">
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
