import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { requireAdmin } from "@/lib/auth";
import { serializeAdminLot } from "@/lib/lots";

export async function GET() {
  try {
    await requireAdmin();
    const lots = await prisma.goldLot.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        member: { select: { companyName: true, reference: true, email: true } },
        bids: {
          orderBy: { createdAt: "desc" },
          include: { account: { select: { companyName: true, reference: true } } },
        },
      },
    });
    return jsonOk(lots.map(serializeAdminLot));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return jsonError("Unauthorized", 401);
    }
    return jsonError("Failed to load lots", 500);
  }
}
