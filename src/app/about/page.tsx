import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "O mnie — Kacper Król Travels",
  description: "Historia stojąca za blogiem Kacper Król Travels.",
};

export default function AboutPage() {
  const countryCount = new Set(getAllContent().map((i) => i.country)).size;

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">O mnie</p>
      <h1 className="font-display mt-2 text-4xl font-semibold text-ink">
        Cześć, cieszę się, że tu jesteś.
      </h1>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft">
        <p>
          Nazywam się Kacper Król i ten blog zaczął się jako prywatny notatnik — miejsce,
          w którym zapisywałem pociągi, którymi jechałem, szlaki, które wykańczały mi
          kolana, i posiłki, o których wciąż myślę miesiące później. Z czasem wyrósł w
          notatnik obejmujący ponad {countryCount} krajów, pełen historii, poradników i
          notatek — i wciąż jest właśnie tym: notatnikiem, tyle że publicznym.
        </p>
        <p>
          Staram się, żeby historie były szczere, a poradniki praktyczne. Jeśli jakieś
          miejsce było trudne, drogie albo przereklamowane, przeczytasz o tym właśnie tu —
          nie tylko wersję z pocztówki.
        </p>
        <p>
          Cała ta strona jest zorganizowana wokół jednej idei: gdziekolwiek się
          wybierasz, powinien być prosty sposób, żeby znaleźć to, co o tym miejscu
          napisałem. Zakręć globusem na stronie głównej albo wyszukaj kraj lub miasto
          bezpośrednio, a trafisz na wszystko, co pasuje — historię, poradnik albo
          przegląd kraju.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent"
        >
          Czytaj historie <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink-soft transition hover:border-accent hover:text-accent"
        >
          Wróć do globusu
        </Link>
      </div>
    </div>
  );
}
