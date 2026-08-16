import Link from "next/link";
import { ArrowRight, MapPinned, NotebookText, Compass } from "lucide-react";
import Globe from "@/components/Globe";
import SearchBar from "@/components/SearchBar";
import TimeGreeting from "@/components/TimeGreeting";
import ContentCard from "@/components/ContentCard";
import { getAllContent, getFeatured, toSummary } from "@/lib/content";
import { plPlural } from "@/lib/pluralize";

export default function Home() {
  const all = getAllContent().map(toSummary);
  const featured = getFeatured(6).map(toSummary);

  const countryCount = new Set(all.map((i) => i.country)).size;
  const postCount = all.filter((i) => i.kind === "post").length;
  const guideCount = all.filter((i) => i.kind === "guide").length;

  return (
    <>
      <section className="hero-sky">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 pb-16 pt-14 text-center sm:px-8 sm:pt-20">
          <TimeGreeting />

          <h1 className="font-display mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Odkrywaj świat, jedną historią na raz.
          </h1>
          <p className="text-hero-muted mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
            Historie z podróży, praktyczne poradniki i notatki o krajach z drogi. Zakręć
            globusem albo wyszukaj miejsce, by zacząć wędrować.
          </p>

          <div className="mt-10 w-full animate-float-slow">
            <Globe items={all} />
          </div>

          <div className="mt-8 w-full px-2">
            <SearchBar items={all} />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
            <span className="text-hero-muted">
              <strong className="text-lg font-display font-semibold" style={{ color: "var(--hero-fg)" }}>{countryCount}</strong>{" "}
              {plPlural(countryCount, ["kraj", "kraje", "krajów"])}
            </span>
            <span className="text-hero-muted">
              <strong className="text-lg font-display font-semibold" style={{ color: "var(--hero-fg)" }}>{postCount}</strong>{" "}
              {plPlural(postCount, ["historia", "historie", "historii"])}
            </span>
            <span className="text-hero-muted">
              <strong className="text-lg font-display font-semibold" style={{ color: "var(--hero-fg)" }}>{guideCount}</strong>{" "}
              {plPlural(guideCount, ["poradnik", "poradniki", "poradników"])}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Prosto z drogi
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-ink">
              Najnowsze wpisy
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-accent"
          >
            Zobacz wszystkie historie <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <ContentCard key={`${item.kind}-${item.slug}`} item={item} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Znajdź swoją drogę
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-ink">
              Trzy sposoby na odkrywanie
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Link
              href="/blog"
              className="card-hover group rounded-2xl border border-line bg-white p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                <NotebookText className="h-5 w-5" />
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold text-ink">
                Historie z podróży
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Relacje z pierwszej ręki — co się wydarzyło, jak to było i co zrobiłbym
                inaczej.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Czytaj historie <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/guides"
              className="card-hover group rounded-2xl border border-line bg-white p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-2/10 text-accent-2">
                <Compass className="h-5 w-5" />
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold text-ink">Poradniki</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Konkretne, praktyczne porady — plany podróży, listy pakowania i wskazówki
                budżetowe, które naprawdę się przydadzą.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-2">
                Przeglądaj poradniki <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/countries"
              className="card-hover group rounded-2xl border border-line bg-white p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/10 text-ink">
                <MapPinned className="h-5 w-5" />
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold text-ink">
                Kraje
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Przeglądy krajów — kiedy jechać, czego się spodziewać i od czego zacząć
                planowanie.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                Zobacz wszystkie kraje <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
