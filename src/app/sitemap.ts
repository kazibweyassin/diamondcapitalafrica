import type { MetadataRoute } from "next";
import { getSitemapNewsEntries } from "@/lib/news";
import { siteUrl } from "@/lib/seo";

export const revalidate = 3600;

const staticRoutes: {
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about-gold", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gold-in-uganda", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/operations", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sustainability", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/news", changeFrequency: "weekly", priority: 0.8 },
  { path: "/legal/privacy", changeFrequency: "monthly", priority: 0.3 },
  { path: "/legal/terms", changeFrequency: "monthly", priority: 0.3 },
  { path: "/legal/cookies", changeFrequency: "monthly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsArticles = await getSitemapNewsEntries();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const newsEntries: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: `${siteUrl}/news/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...newsEntries];
}