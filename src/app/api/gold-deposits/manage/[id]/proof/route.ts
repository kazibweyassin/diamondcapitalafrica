import { get } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonError } from "@/lib/api-response";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const deposit = await prisma.goldDeposit.findUnique({ where: { id }, select: { proofUrl: true } });
    if (!deposit?.proofUrl) return jsonError("Proof not found", 404);
    // Older records used public Blob URLs; new uploads store private pathnames.
    const access = deposit.proofUrl.startsWith("http") ? "public" : "private";
    const result = await get(deposit.proofUrl, { access });
    if (!result?.stream) return jsonError("Proof not found", 404);
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
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") return jsonError("Unauthorized", 401);
    return jsonError("Failed to load proof", 500);
  }
}
