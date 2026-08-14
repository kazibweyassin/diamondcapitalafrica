/**
 * Pure calculation helpers for illustrative investment modelling.
 * All outputs are for discussion only — not offers or guarantees.
 */

export function calculatePostMoneyValuation(
  preMoney: number,
  roundSize: number
): number {
  return preMoney + roundSize;
}

/** Ownership as a fraction (0–1). */
export function calculateInvestorOwnership(
  investmentAmount: number,
  postMoneyValuation: number
): number {
  if (postMoneyValuation <= 0) return 0;
  return investmentAmount / postMoneyValuation;
}

export function calculateDistributionValue(
  investmentAmount: number,
  distributionRate: number
): number {
  return investmentAmount * distributionRate;
}

/** Gold weight in grams. */
export function calculateGoldEquivalent(
  distributionValue: number,
  goldPricePerGram: number
): number {
  if (goldPricePerGram <= 0) return 0;
  return distributionValue / goldPricePerGram;
}

export function formatUsd(
  amount: number,
  options?: { compact?: boolean; maximumFractionDigits?: number }
): string {
  if (options?.compact && Math.abs(amount) >= 1_000_000) {
    const millions = amount / 1_000_000;
    const digits = Number.isInteger(millions) ? 0 : 1;
    return `USD ${millions.toLocaleString("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: 0,
    })} million`;
  }

  return `USD ${amount.toLocaleString("en-US", {
    maximumFractionDigits: options?.maximumFractionDigits ?? 0,
    minimumFractionDigits: 0,
  })}`;
}

/** Percentage with up to 2 decimal places (e.g. 8.33%). */
export function formatOwnershipPercent(
  fraction: number,
  decimals = 2
): string {
  return `${(fraction * 100).toFixed(decimals)}%`;
}

/**
 * Format gold weight: below 1,000 g → grams; 1,000 g+ → kilograms.
 */
export function formatGoldWeight(grams: number): string {
  if (!Number.isFinite(grams) || grams <= 0) return "—";

  if (grams < 1000) {
    const rounded =
      grams >= 100
        ? Math.round(grams)
        : grams >= 10
          ? Math.round(grams * 10) / 10
          : Math.round(grams * 100) / 100;
    return `${rounded.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })} g`;
  }

  const kg = grams / 1000;
  return `${kg.toLocaleString("en-US", {
    maximumFractionDigits: 3,
    minimumFractionDigits: 0,
  })} kg`;
}

export function formatGoldPricePerGram(price: number): string {
  return `USD ${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} / g`;
}

/** Clamp a numeric input into an inclusive range. */
export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}
