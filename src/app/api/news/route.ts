import { getPublishedNews } from "@/lib/news";
import { jsonOk, jsonError } from "@/lib/api-response";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const news = await getPublishedNews(category ?? undefined);
    return jsonOk(news);
  } catch {
    return jsonError("Failed to fetch news", 500);
  }
}