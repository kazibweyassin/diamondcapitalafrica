import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { requireInstitutional } from "@/lib/auth";
import { generateNetworkReference } from "@/lib/network";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { lockGoldSpot } from "@/lib/spot-lock";

const bidSchema = z.object({
  premiumPct: z.coerce.number().min(-20).max(20),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!rateLimit(`lot-bid:${requestIp(request)}`, 20, 60 * 60_000).allowed) {
    return jsonError("Too many bids. Try again later.", 429);
  }

  try {
    const session = await requireInstitutional();
    const account = await prisma.institutionalAccount.findUnique({
      where: { id: session.accountId },
    });
    if (!account || account.status !== "active") return jsonError("Unauthorized", 401);

    const { id } = await params;
    const body = await request.json();
    const parsed = bidSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Premium must be between -20% and 20%", 422);
    }

    const lot = await prisma.goldLot.findUnique({ where: { id } });
    if (!lot || lot.status !== "accepted") {
      return jsonError("This lot is not open for a bid", 409);
    }

    const existing = await prisma.lotBid.findFirst({
      where: { lotId: lot.id, accountId: account.id, status: "open" },
    });
    if (existing) {
      return jsonError("You already have an open bid on this lot", 409);
    }

    const spot = await lockGoldSpot();
    const bid = await prisma.lotBid.create({
      data: {
        reference: generateNetworkReference("BID"),
        lotId: lot.id,
        accountId: account.id,
        premiumPct: new Prisma.Decimal(parsed.data.premiumPct.toFixed(3)),
        spotUsdPerOz: new Prisma.Decimal(spot.spotUsdPerOz.toFixed(4)),
        spotUsdPerG: new Prisma.Decimal(spot.spotUsdPerG.toFixed(6)),
        spotSource: spot.spotSource,
      },
    });

    return jsonOk(
      {
        reference: bid.reference,
        premiumPct: bid.premiumPct.toString(),
        spotUsdPerOz: bid.spotUsdPerOz.toString(),
        spotUsdPerG: bid.spotUsdPerG.toString(),
        spotSource: bid.spotSource,
      },
      201,
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return jsonError("Unauthorized", 401);
    }
    if (error instanceof Error && error.message === "Spot price is unavailable") {
      return jsonError(error.message, 503);
    }
    return jsonError("Failed to place bid", 500);
  }
}
