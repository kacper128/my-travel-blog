import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetail from "@/components/ContentDetail";
import { getAllSlugs, getBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllSlugs("country").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getBySlug("country", slug);
  if (!item) return {};
  return { title: `${item.title} — przewodnik podróżniczy — Kacper Król Travels`, description: item.excerpt };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getBySlug("country", slug);
  if (!item) notFound();
  return <ContentDetail item={item} />;
}
