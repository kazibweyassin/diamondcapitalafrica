import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { requireAdmin } from "@/lib/auth";
import { settleLot } from "@/lib/lot-settlement";
import { serializeAdminLot } from "@/lib/lots";

const actionSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("accept") }),
  z.object({
    action: z.literal("decline"),
    reason: z.string().trim().max(500).optional(),
  }),
  z.object({
    action: z.literal("assay"),
    bidId: z.string().min(1),
    finalWeightG: z.coerce.number().positive().max(500_000),
    finalPurityPct: z.coerce.number().gt(0).max(100),
  }),
  z.object({ action: z.literal("approve_payout") }),
]);

const lotInclude = {
  member: { select: { companyName: true, reference: true, email: true } },
  bids: {
    orderBy: { createdAt: "desc" as const },
    include: { account: { select: { companyName: true, reference: true } } },
  },
};

function routeError(error: unknown, fallback: string) {
  if (error instanceof Error && error.message === "Unauthorized") {
    return jsonError("Unauthorized", 401);
  }
  return jsonError(fallback, 500);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const parsed = actionSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid action", 422);
    }

    const lot = await prisma.goldLot.findUnique({
      where: { id },
      include: { bids: true },
    });
    if (!lot) return jsonError("Lot not found", 404);

    const action = parsed.data;

    if (action.action === "accept" || action.action === "decline") {
      if (lot.status !== "submitted") {
        return jsonError("Only a newly submitted lot can be accepted or declined", 409);
      }
      const updated = await prisma.goldLot.update({
        where: { id },
        data:
          action.action === "accept"
            ? { status: "accepted", decidedByEmail: session.email, decidedAt: new Date() }
            : {
                status: "declined",
                declineReason: action.reason || null,
                decidedByEmail: session.email,
                decidedAt: new Date(),
              },
        include: lotInclude,
      });
      return jsonOk(serializeAdminLot(updated));
    }

    if (action.action === "assay") {
      if (lot.status !== "accepted") {
        return jsonError("Assay can be entered only after the lot is on the DCA book", 409);
      }
      const bid = lot.bids.find((item) => item.id === action.bidId && item.status === "open");
      if (!bid) return jsonError("Choose an open bid", 422);

      let settlement;
      try {
        settlement = settleLot({
          finalWeightG: action.finalWeightG,
          finalPurityPct: action.finalPurityPct,
          spotUsdPerG: Number(bid.spotUsdPerG),
          premiumPct: Number(bid.premiumPct),
        });
      } catch (error) {
        return jsonError(error instanceof Error ? error.message : "Invalid assay", 422);
      }

      const updated = await prisma.$transaction(async (tx) => {
        await tx.lotBid.updateMany({
          where: { lotId: id, status: "open", NOT: { id: bid.id } },
          data: { status: "closed" },
        });
        await tx.lotBid.update({
          where: { id: bid.id },
          data: { status: "selected" },
        });
        return tx.goldLot.update({
          where: { id },
          data: {
            status: "assayed",
            finalWeightG: new Prisma.Decimal(action.finalWeightG.toFixed(3)),
            finalPurityPct: new Prisma.Decimal(action.finalPurityPct.toFixed(3)),
            assayedByEmail: session.email,
            assayedAt: new Date(),
            settledBidId: bid.id,
            fineGrams: new Prisma.Decimal(settlement.fineGrams.toFixed(6)),
            grossUsd: new Prisma.Decimal(settlement.grossUsd.toFixed(2)),
            commissionUsd: new Prisma.Decimal(settlement.commissionUsd.toFixed(2)),
            assayFeeUsd: new Prisma.Decimal(settlement.assayFeeUsd.toFixed(2)),
            netUsd: new Prisma.Decimal(settlement.netUsd.toFixed(2)),
            spotUsdPerOz: bid.spotUsdPerOz,
            spotUsdPerG: bid.spotUsdPerG,
            premiumPct: bid.premiumPct,
          },
          include: lotInclude,
        });
      });

      return jsonOk(serializeAdminLot(updated));
    }

    if (lot.status !== "assayed") {
      return jsonError("Enter the assay before approving a payout", 409);
    }
    if (!lot.assayedByEmail || lot.assayedByEmail === session.email) {
      return jsonError("A different staff member must approve this payout", 409);
    }

    const updated = await prisma.goldLot.update({
      where: { id },
      data: {
        status: "payout_approved",
        payoutApprovedByEmail: session.email,
        payoutApprovedAt: new Date(),
      },
      include: lotInclude,
    });
    return jsonOk(serializeAdminLot(updated));
  } catch (error) {
    return routeError(error, "Failed to update lot");
  }
}
