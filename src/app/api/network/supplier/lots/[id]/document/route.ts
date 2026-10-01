import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/api-response";
import { documentResponse } from "@/lib/lot-document";
import { requireVerifiedSupplier } from "@/lib/supplier-access";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const member = await requireVerifiedSupplier();
    const { id } = await params;
    const lot = await prisma.goldLot.findFirst({
      where: { id, memberId: member.id },
      select: { documentUrl: true },
    });
    if (!lot) return jsonError("Document not found", 404);
    return await documentResponse(lot.documentUrl);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return jsonError("Unauthorized", 401);
    }
    return jsonError("Failed to load document", 500);
  }
}
