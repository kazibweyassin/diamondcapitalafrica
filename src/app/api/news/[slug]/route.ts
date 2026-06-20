import { getNewsBySlug } from "@/lib/news";
import { jsonOk, jsonError } from "@/lib/api-response";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const article = await getNewsBySlug(slug);

    if (!article) {
      return jsonError("Article not found", 404);
    }

    return jsonOk(article);
  } catch {
    return jsonError("Failed to fetch article", 500);
  }
}