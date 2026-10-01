/** Troy ounce used to turn a locked US$/oz spot into US$/g. */
export const TROY_OUNCE_GRAMS = 31.1034768;

/** Taken off the buyer gross before the supplier payout is instructed. */
export const LOT_COMMISSION_RATE = 0.01;

/** Flat laboratory fee, in US dollars, deducted from the supplier payout. */
export const LOT_ASSAY_FEE_USD = 150;

export interface LotSettlement {
  fineGrams: number;
  grossUsd: number;
  commissionUsd: number;
  assayFeeUsd: number;
  netUsd: number;
}

function round(value: number, decimals: number) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Buyer gross is assayed fine gold at the bid locked when it was placed.
 * Supplier net is that gross minus the commission and the assay fee.
 * This does not move money.
 */
export function settleLot(input: {
  finalWeightG: number;
  finalPurityPct: number;
  spotUsdPerG: number;
  premiumPct: number;
}): LotSettlement {
  if (!(input.finalWeightG > 0)) {
    throw new Error("Final weight must be greater than zero");
  }
  if (!(input.finalPurityPct > 0) || input.finalPurityPct > 100) {
    throw new Error("Final purity must be between 0 and 100");
  }
  if (!(input.spotUsdPerG > 0)) {
    throw new Error("Locked spot price is missing");
  }

  const fineGrams = round(input.finalWeightG * (input.finalPurityPct / 100), 6);
  const pricePerGram = input.spotUsdPerG * (1 + input.premiumPct / 100);
  const grossUsd = round(fineGrams * pricePerGram, 2);
  const commissionUsd = round(grossUsd * LOT_COMMISSION_RATE, 2);
  const assayFeeUsd = LOT_ASSAY_FEE_USD;
  const netUsd = round(grossUsd - commissionUsd - assayFeeUsd, 2);

  if (!(netUsd > 0)) {
    throw new Error("Net payout is not positive. Check the assay and the bid.");
  }

  return { fineGrams, grossUsd, commissionUsd, assayFeeUsd, netUsd };
}

export function formatUsd(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
