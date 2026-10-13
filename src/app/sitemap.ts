import type { MetadataRoute } from "next";
import { getSitemapNewsEntries } from "@/lib/news";
import { siteUrl } from "@/lib/seo";
import { buyerGuides } from "@/data/buyer-education";

export const revalidate = 3600;

type Route = {
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
  // Only set this when you know the real date of the last meaningful content
  // change. Leave it out otherwise: a missing lastmod is better than a fake one.
  lastModified?: string;
};

// Core pages. Guides and news are generated below from their own data.
const staticRoutes: Route[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about-gold", changeFrequency: "monthly", priority: 0.8 },
  { path: "/investors/investment-opportunity", changeFrequency: "monthly", priority: 0.9 },
  {
    path: "/investors/diamond-capital-africa-investment-overview-2026.pdf",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  { path: "/gold-in-uganda", changeFrequency: "monthly", priority: 0.9 },
  { path: "/gold-savings", changeFrequency: "monthly", priority: 0.9 },
  { path: "/network", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/how-to-buy", changeFrequency: "monthly", priority: 0.9 },
  { path: "/operations", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sustainability", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/legal/privacy", changeFrequency: "monthly", priority: 0.3 },
  { path: "/legal/terms", changeFrequency: "monthly", priority: 0.3 },
  { path: "/legal/cookies", changeFrequency: "monthly", priority: 0.3 },
];

// Removed on purpose:
// - /network/apply and /network/access: sign-up forms with no search value.
//   Also add `robots: { index: false, follow: true }` in their page metadata.
// - https://invest.diamondcapitalafrica.com/: a different host. Google ignores
//   cross-host URLs in a sitemap. Give that site its own sitemap.xml and add it
//   as its own property in Search Console.

const toDate = (value: string) => new Date(value);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsArticles = await getSitemapNewsEntries();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    ...(route.lastModified ? { lastModified: toDate(route.lastModified) } : {}),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // New guides are included automatically. Use `updated` if you add that field.
  const guideEntries: MetadataRoute.Sitemap = buyerGuides.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: toDate(
      (guide as { updated?: string }).updated ?? guide.date,
    ),
    changeFrequency: "monthly",
    priority: guide.slug === "gold-bullion-scams-africa" ? 0.8 : 0.7,
  }));

  const latestGuideDate = buyerGuides
    .map((g) => (g as { updated?: string }).updated ?? g.date)
    .sort()
    .at(-1);

  const guidesIndex: MetadataRoute.Sitemap[number] = {
    url: `${siteUrl}/guides`,
    ...(latestGuideDate ? { lastModified: toDate(latestGuideDate) } : {}),
    changeFrequency: "monthly",
    priority: 0.8,
  };

  const newsEntries: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: `${siteUrl}/news/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const latestNews = newsArticles
    .map((a) => new Date(a.updatedAt).getTime())
    .sort((a, b) => b - a)[0];

  const newsIndex: MetadataRoute.Sitemap[number] = {
    url: `${siteUrl}/news`,
    ...(latestNews ? { lastModified: new Date(latestNews) } : {}),
    changeFrequency: "weekly",
    priority: 0.8,
  };

  return [
    ...staticEntries,
    guidesIndex,
    ...guideEntries,
    newsIndex,
    ...newsEntries,
  ];
}