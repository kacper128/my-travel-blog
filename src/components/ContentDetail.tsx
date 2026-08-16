import Link from "next/link";
import { ArrowLeft, MapPin, CalendarDays, Clock } from "lucide-react";
import MdxContent from "@/components/MdxContent";
import ContentCard from "@/components/ContentCard";
import type { ContentItem } from "@/types/content";
import { getRelated, toSummary } from "@/lib/content";

const KIND_META: Record<ContentItem["kind"], { label: string; back: string; backLabel: string }> = {
  post: { label: "Historia z podróży", back: "/blog", backLabel: "Wszystkie historie" },
  guide: { label: "Poradnik", back: "/guides", backLabel: "Wszystkie poradniki" },
  country: { label: "Przewodnik po kraju", back: "/countries", backLabel: "Wszystkie kraje" },
};

export default function ContentDetail({ item }: { item: ContentItem }) {
  const meta = KIND_META[item.kind];
  const related = getRelated(item, 3).map(toSummary);

  return (
    <article>
      <div
        className="relative flex h-64 items-end sm:h-80"
        style={{ backgroundImage: item.gradient }}
      >
        <div className="mx-auto w-full max-w-4xl px-5 pb-10 sm:px-8">
          <Link
            href={meta.back}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3.5 py-1.5 text-xs font-medium text-ink backdrop-blur hover:bg-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {meta.backLabel}
          </Link>
          <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-white/90 drop-shadow">
            <span className="text-2xl">{item.emoji}</span> {meta.label}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <h1 className="font-display max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {item.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {item.city ? `${item.city}, ${item.country}` : item.country}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            {new Date(item.date).toLocaleDateString("pl-PL", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          {item.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {item.readTime}
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-ink-soft transition hover:bg-accent-2/10 hover:text-accent-2"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-10 max-w-3xl">
          <MdxContent source={item.body} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="border-t border-line bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Może cię zainteresować
            </h2>
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ContentCard key={`${r.kind}-${r.slug}`} item={r} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
