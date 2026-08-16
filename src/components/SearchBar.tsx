"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, MapPin, Compass, X } from "lucide-react";
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

export default function SearchBar({ items }: { items: ContentSummary[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "country", weight: 0.4 },
          { name: "city", weight: 0.3 },
          { name: "title", weight: 0.2 },
          { name: "tags", weight: 0.15 },
          { name: "continent", weight: 0.1 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [items]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 7).map((r) => r.item);
  }, [fuse, query]);

  const handleSelect = (item: ContentSummary) => {
    setOpen(false);
    setQuery("");
    router.push(hrefFor(item));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0]);
    }
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="flex items-center gap-3 rounded-full border border-line bg-white/95 px-5 py-3.5 shadow-[0_20px_45px_-25px_rgba(20,32,51,0.35)] backdrop-blur transition focus-within:border-accent focus-within:shadow-[0_20px_45px_-20px_rgba(217,96,60,0.35)]">
        <Search className="h-5 w-5 shrink-0 text-muted" strokeWidth={2} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Szukaj kraju, miasta lub regionu…"
          className="w-full bg-transparent text-[15px] text-ink placeholder:text-muted focus:outline-none"
        />
        {query && (
          <button
            aria-label="Wyczyść wyszukiwanie"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="shrink-0 rounded-full p-1 text-muted hover:bg-surface-alt hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_60px_-25px_rgba(20,32,51,0.4)]">
          {results.length > 0 ? (
            <ul className="max-h-80 divide-y divide-line overflow-y-auto">
              {results.map((item) => (
                <li key={`${item.kind}-${item.slug}`}>
                  <button
                    onClick={() => handleSelect(item)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-surface-alt"
                  >
                    <span className="text-xl leading-none">{item.emoji}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">
                        {item.title}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted">
                        <MapPin className="h-3 w-3" />
                        {item.city ? `${item.city}, ${item.country}` : item.country}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-surface-alt px-2.5 py-1 text-[11px] font-medium text-ink-soft">
                      {KIND_LABEL[item.kind]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
              <Compass className="h-6 w-6 text-muted" />
              <p className="text-sm text-ink-soft">
                Brak wpisów o &bdquo;{query}&rdquo; — wciąż dodaję nowe miejsca.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
