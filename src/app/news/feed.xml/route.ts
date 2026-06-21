import { getPublishedNews } from "@/lib/news";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import { company } from "@/data/content";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getPublishedNews();
  const items = articles
    .map(
      (article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${absoluteUrl(`/news/${article.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/news/${article.slug}`)}</guid>
      <description>${escapeXml(article.summary)}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(company.name)} News</title>
    <link>${siteUrl}/news</link>
    <description>Gold industry news and announcements from Uganda and East Africa.</description>
    <language>en-ug</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}