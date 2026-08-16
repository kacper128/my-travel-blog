export type ContentKind = "post" | "guide" | "country";

export interface ContentFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  country: string;
  continent: string;
  city?: string;
  tags: string[];
  lat: number;
  lng: number;
  gradient: string;
  emoji: string;
  readTime?: string;
}

export interface ContentItem extends ContentFrontmatter {
  slug: string;
  kind: ContentKind;
  body: string;
}

export interface ContentSummary extends ContentFrontmatter {
  slug: string;
  kind: ContentKind;
}
