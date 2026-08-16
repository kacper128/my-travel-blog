import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ContentFrontmatter, ContentItem, ContentKind, ContentSummary } from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content");

const KIND_DIRS: Record<ContentKind, string> = {
  post: "posts",
  guide: "guides",
  country: "countries",
};

function readDir(kind: ContentKind): ContentItem[] {
  const dir = path.join(CONTENT_ROOT, KIND_DIRS[kind]);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        ...(data as ContentFrontmatter),
        slug,
        kind,
        body: content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAll(kind: ContentKind): ContentItem[] {
  return readDir(kind);
}

export function getAllContent(): ContentItem[] {
  return [...getAll("post"), ...getAll("guide"), ...getAll("country")].sort((a, b) =>
    a.date < b.date ? 1 : -1
  );
}

export function getBySlug(kind: ContentKind, slug: string): ContentItem | undefined {
  return readDir(kind).find((item) => item.slug === slug);
}

export function getAllSlugs(kind: ContentKind): string[] {
  return readDir(kind).map((item) => item.slug);
}

export function toSummary(item: ContentItem): ContentSummary {
  const { body: _body, ...summary } = item;
  return summary;
}

export function getFeatured(limit = 6): ContentItem[] {
  return getAllContent().slice(0, limit);
}

export function getRelated(item: ContentItem, limit = 3): ContentItem[] {
  return getAllContent()
    .filter((other) => other.slug !== item.slug || other.kind !== item.kind)
    .filter((other) => other.country === item.country || other.tags.some((t) => item.tags.includes(t)))
    .slice(0, limit);
}
