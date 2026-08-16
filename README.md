# Kacper Król Travels

Blog i przewodnik podróżniczy zbudowany w Next.js — z interaktywnym, wolno obracającym się globusem 3D na stronie głównej, wyszukiwarką miejsc oraz tłem, które zmienia się w zależności od pory dnia.

## Funkcje

- **Interaktywny globus 3D** (`react-globe.gl` + `three.js`) — wolno się obraca, reaguje na porę dnia (oświetlenie, atmosfera), a kliknięcie w punkt przenosi do powiązanej historii, poradnika lub kraju.
- **Wyszukiwarka** (Fuse.js) — wpisz kraj, miasto lub region, a wyszukiwarka dopasuje pasujące historie, poradniki i strony krajów.
- **Tło reagujące na porę dnia** — świt, dzień, zmierzch i noc mają własną, płynnie przechodzącą paletę barw.
- **Trzy typy treści**: historie z podróży, poradniki praktyczne i przeglądy krajów — każdy jako plik Markdown (MDX) w katalogu `content/`.

## Dodawanie nowej treści

Każdy wpis to plik `.mdx` w jednym z trzech katalogów:

- `content/posts/` — historie z podróży
- `content/guides/` — poradniki
- `content/countries/` — przeglądy krajów

Skopiuj istniejący plik jako szablon. Nagłówek (frontmatter) wymaga pól: `title`, `date`, `excerpt`, `country`, `continent`, `tags`, `lat`, `lng`, `gradient`, `emoji`, a opcjonalnie `city` i `readTime`. Pola `lat`/`lng` decydują o tym, gdzie na globusie pojawi się punkt.

## Rozwój lokalny

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Build produkcyjny

```bash
npm run build
npm start
```

## Deploy

Projekt jest gotowy do wdrożenia na [Vercel](https://vercel.com/new) — wystarczy połączyć repozytorium.
