import { get } from "@vercel/blob";
import { jsonError } from "@/lib/api-response";

export function documentResponse(url: string | null) {
  if (!url) return jsonError("Document not found", 404);

  return (async () => {
    const access = url.startsWith("http") ? "public" : "private";
    const result = await get(url, { access });
    if (!result?.stream) return jsonError("Document not found", 404);
    return new Response(result.stream, {
      status: 200,
      headers: {
        "Content-Type": result.blob.contentType || "application/octet-stream",
        "Content-Length": String(result.blob.size),
        "Cache-Control": "private, no-store",
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
      },
    });
  })();
}
