import Link from "next/link";
import { MapPin } from "lucide-react";
import type { ContentSummary } from "@/types/content";

const KIND_LABEL: Record<ContentSummary["kind"], string> = {
  post: "Historia",
  guide: "Poradnik",
  country: "Kraj",
};

function hrefFor(item: ContentSummary) {
  if (item.kind === "country") return `/countries/${item.slug}`;
  if (item.kind === "guide") return `/guides/${item.slug}`;
  return `/blog/${item.slug}`;
}

export default function ContentCard({ item }: { item: ContentSummary }) {
  return (
    <Link
      href={hrefFor(item)}
      className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
    >
      <div
        className="relative flex h-40 items-center justify-center text-5xl"
        style={{ backgroundImage: item.gradient }}
      >
        <span className="drop-shadow-sm">{item.emoji}</span>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink-soft backdrop-blur">
          {KIND_LABEL[item.kind]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
          <MapPin className="h-3.5 w-3.5" />
          {item.city ? `${item.city}, ${item.country}` : item.country}
        </span>
        <h3 className="font-display text-lg font-semibold leading-snug text-ink transition group-hover:text-accent">
          {item.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {item.excerpt}
        </p>
        <div className="flex items-center justify-between pt-1 text-xs text-muted">
          <span>
            {new Date(item.date).toLocaleDateString("pl-PL", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          {item.readTime && <span>{item.readTime}</span>}
        </div>
      </div>
    </Link>
  );
}
