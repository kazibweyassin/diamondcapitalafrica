import { getDocumentBySlug } from "@/lib/documents";
import { jsonError } from "@/lib/api-response";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const document = await getDocumentBySlug(slug);

    if (!document) {
      return jsonError("Document not found", 404);
    }

    return Response.redirect(document.sourceUrl, 302);
  } catch {
    return jsonError("Failed to download document", 500);
  }
}