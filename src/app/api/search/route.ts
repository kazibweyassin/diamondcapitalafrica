import { getPublishedNews } from "@/lib/news";
import { buildSearchIndex } from "@/lib/search";
import { jsonOk, jsonError } from "@/lib/api-response";
import type { SearchResult } from "@/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") ?? "";
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return jsonOk([]);
    }

    const news = await getPublishedNews();
    const newsResults: SearchResult[] = news.map((item) => ({
      title: item.title,
      href: `/news/${item.slug}`,
      excerpt: item.summary,
      category:
        item.category === "announcement" ? "News" : "Presentation",
    }));

    const results = [...buildSearchIndex(), ...newsResults].filter((item) => {
      const haystack =
        `${item.title} ${item.excerpt} ${item.category}`.toLowerCase();
      return haystack.includes(normalized);
    });

    return jsonOk(results.slice(0, 20));
  } catch {
    return jsonError("Search failed", 500);
  }
}