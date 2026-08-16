import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetail from "@/components/ContentDetail";
import { getAllSlugs, getBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllSlugs("post").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getBySlug("post", slug);
  if (!item) return {};
  return { title: `${item.title} — Kacper Król Travels`, description: item.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getBySlug("post", slug);
  if (!item) notFound();
  return <ContentDetail item={item} />;
}
