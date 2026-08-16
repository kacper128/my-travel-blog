import type { Metadata } from "next";
import ContentCard from "@/components/ContentCard";
import { getAll, toSummary } from "@/lib/content";

export const metadata: Metadata = {
  title: "Poradniki podróżnicze — Kacper Król Travels",
  description: "Praktyczne, konkretne poradniki podróżnicze — plany podróży, listy pakowania i wskazówki dotyczące planowania.",
};

export default function GuidesPage() {
  const guides = getAll("guide").map(toSummary);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent-2">Poradniki</p>
      <h1 className="font-display mt-2 max-w-2xl text-4xl font-semibold text-ink">
        Praktyczne poradniki
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        Plany podróży, listy pakowania i wskazówki budżetowe — szczegóły planowania,
        które chciałbym znać, zanim wyjechałem.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
