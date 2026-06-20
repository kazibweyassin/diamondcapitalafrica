import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/api-response";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const document = await prisma.document.findUnique({ where: { slug } });

    if (!document) {
      return jsonError("Document not found", 404);
    }

    const extension = document.type === "xlsx" ? "csv" : "txt";
    const filename = `${document.slug}.${extension}`;

    return new Response(document.content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch {
    return jsonError("Failed to download document", 500);
  }
}