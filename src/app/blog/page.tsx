import type { Metadata } from "next";
import ContentCard from "@/components/ContentCard";
import { getAll, toSummary } from "@/lib/content";

export const metadata: Metadata = {
  title: "Historie z podróży — Kacper Król Travels",
  description: "Historie z podróży opowiedziane z pierwszej ręki.",
};

export default function BlogPage() {
  const posts = getAll("post").map(toSummary);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">Historie</p>
      <h1 className="font-display mt-2 max-w-2xl text-4xl font-semibold text-ink">
        Historie z podróży
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        Relacje z pierwszej ręki z konkretnych wyjazdów i chwil — co się wydarzyło, jak to
        było i co powiedziałbym znajomemu przed wyjazdem.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
