import Link from "next/link";
import { Globe2, Camera, Mail, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-alt">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
                <Globe2 className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="font-display text-xl font-semibold text-ink">Kacper Król Travels</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Historie, poradniki i notatki o krajach z drogi — zakręć globusem, wyszukaj
              miejsce i zobacz, dokąd cię zaprowadzi.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-accent-2 hover:text-accent-2"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-accent-2 hover:text-accent-2"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@kacperkroltravels.pl"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-accent-2 hover:text-accent-2"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Odkrywaj</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li><Link href="/blog" className="hover:text-accent">Historie z podróży</Link></li>
              <li><Link href="/guides" className="hover:text-accent">Poradniki</Link></li>
              <li><Link href="/countries" className="hover:text-accent">Kraje</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">O blogu</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li><Link href="/about" className="hover:text-accent">O mnie</Link></li>
              <li><a href="mailto:hello@kacperkroltravels.pl" className="hover:text-accent">Kontakt</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Kacper Król Travels. Wszelkie prawa zastrzeżone.</p>
          <p>Tworzone z myślą o wędrowaniu, miejsce po miejscu.</p>
        </div>
      </div>
    </footer>
  );
}
