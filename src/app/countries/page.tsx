import type { Metadata } from "next";
import ContentCard from "@/components/ContentCard";
import { getAll, toSummary } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kraje — Kacper Król Travels",
  description: "Przeglądy krajów — kiedy jechać, czego się spodziewać i od czego zacząć planowanie.",
};

export default function CountriesPage() {
  const countries = getAll("country").map(toSummary);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">Kraje</p>
      <h1 className="font-display mt-2 max-w-2xl text-4xl font-semibold text-ink">
        Przeglądy krajów
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        Punkt wyjścia dla każdego kierunku — kiedy jechać, czego się spodziewać i linki do
        powiązanych historii i poradników.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
