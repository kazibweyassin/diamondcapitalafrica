import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { getInstitutionalSession } from "@/lib/auth";
import { serializeBuyerLot } from "@/lib/lots";

export async function GET() {
  try {
    const session = await getInstitutionalSession();
    if (!session) return jsonError("Unauthorized", 401);

    const account = await prisma.institutionalAccount.findUnique({
      where: { id: session.accountId },
      select: { status: true },
    });
    if (!account || account.status !== "active") return jsonError("Unauthorized", 401);

    const lots = await prisma.goldLot.findMany({
      where: {
        OR: [
          { status: "accepted" },
          { bids: { some: { accountId: session.accountId } } },
        ],
      },
      include: { bids: { where: { accountId: session.accountId } } },
      orderBy: { createdAt: "desc" },
    });

    return jsonOk(lots.map((lot) => serializeBuyerLot(lot, session.accountId)));
  } catch {
    return jsonError("Failed to load lots", 500);
  }
}
