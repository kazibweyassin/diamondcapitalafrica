import type { GoldLot, InstitutionalAccount, LotBid, NetworkMember } from "@prisma/client";

type BidWithAccount = LotBid & {
  account: Pick<InstitutionalAccount, "companyName" | "reference">;
};

type LotWithRelations = GoldLot & {
  member?: Pick<NetworkMember, "companyName" | "reference" | "email">;
  bids?: BidWithAccount[];
};

function text(value: { toString(): string } | null | undefined) {
  return value == null ? null : value.toString();
}

export function serializeSupplierLot(lot: GoldLot) {
  const settled = lot.status === "assayed" || lot.status === "payout_approved";
  return {
    id: lot.id,
    reference: lot.reference,
    productType: lot.productType,
    estimatedWeightG: lot.estimatedWeightG.toString(),
    estimatedPurityPct: lot.estimatedPurityPct.toString(),
    documentName: lot.documentName,
    hasDocument: Boolean(lot.documentUrl),
    status: lot.status,
    declineReason: lot.declineReason,
    finalWeightG: text(lot.finalWeightG),
    finalPurityPct: text(lot.finalPurityPct),
    fineGrams: settled ? text(lot.fineGrams) : null,
    grossUsd: settled ? text(lot.grossUsd) : null,
    commissionUsd: settled ? text(lot.commissionUsd) : null,
    assayFeeUsd: settled ? text(lot.assayFeeUsd) : null,
    netUsd: settled ? text(lot.netUsd) : null,
    payoutApprovedAt: lot.payoutApprovedAt?.toISOString() ?? null,
    createdAt: lot.createdAt.toISOString(),
  };
}

export function serializeAdminLot(lot: LotWithRelations) {
  return {
    id: lot.id,
    reference: lot.reference,
    productType: lot.productType,
    estimatedWeightG: lot.estimatedWeightG.toString(),
    estimatedPurityPct: lot.estimatedPurityPct.toString(),
    documentName: lot.documentName,
    hasDocument: Boolean(lot.documentUrl),
    status: lot.status,
    declineReason: lot.declineReason,
    decidedByEmail: lot.decidedByEmail,
    finalWeightG: text(lot.finalWeightG),
    finalPurityPct: text(lot.finalPurityPct),
    assayedByEmail: lot.assayedByEmail,
    assayedAt: lot.assayedAt?.toISOString() ?? null,
    settledBidId: lot.settledBidId,
    fineGrams: text(lot.fineGrams),
    grossUsd: text(lot.grossUsd),
    commissionUsd: text(lot.commissionUsd),
    assayFeeUsd: text(lot.assayFeeUsd),
    netUsd: text(lot.netUsd),
    spotUsdPerOz: text(lot.spotUsdPerOz),
    spotUsdPerG: text(lot.spotUsdPerG),
    premiumPct: text(lot.premiumPct),
    payoutApprovedByEmail: lot.payoutApprovedByEmail,
    payoutApprovedAt: lot.payoutApprovedAt?.toISOString() ?? null,
    createdAt: lot.createdAt.toISOString(),
    supplier: lot.member
      ? {
          companyName: lot.member.companyName,
          reference: lot.member.reference,
          email: lot.member.email,
        }
      : null,
    bids: (lot.bids ?? []).map((bid) => ({
      id: bid.id,
      reference: bid.reference,
      premiumPct: bid.premiumPct.toString(),
      spotUsdPerOz: bid.spotUsdPerOz.toString(),
      spotUsdPerG: bid.spotUsdPerG.toString(),
      spotSource: bid.spotSource,
      status: bid.status,
      createdAt: bid.createdAt.toISOString(),
      buyer: bid.account.companyName,
      buyerReference: bid.account.reference,
    })),
  };
}

export function serializeBuyerLot(
  lot: GoldLot & { bids: LotBid[] },
  accountId: string,
) {
  const ownBids = lot.bids.filter((bid) => bid.accountId === accountId);
  const selected = ownBids.find((bid) => bid.id === lot.settledBidId);
  return {
    id: lot.id,
    reference: lot.reference,
    productType: lot.productType,
    estimatedWeightG: lot.estimatedWeightG.toString(),
    estimatedPurityPct: lot.estimatedPurityPct.toString(),
    status: lot.status,
    seller: "Diamond Capital Africa",
    canBid: lot.status === "accepted",
    buyerGrossUsd:
      selected && lot.grossUsd ? lot.grossUsd.toString() : null,
    bids: ownBids.map((bid) => ({
      id: bid.id,
      reference: bid.reference,
      premiumPct: bid.premiumPct.toString(),
      spotUsdPerOz: bid.spotUsdPerOz.toString(),
      spotUsdPerG: bid.spotUsdPerG.toString(),
      status: bid.status,
      createdAt: bid.createdAt.toISOString(),
    })),
  };
}
