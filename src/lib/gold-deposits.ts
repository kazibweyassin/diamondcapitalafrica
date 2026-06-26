import type { GoldDeposit } from "@prisma/client";
import { goldSavings } from "@/data/gold-savings";
import { fetchMarketPricesServer } from "@/lib/market-server";
import type { MarketQuote } from "@/types";

export function generateDepositReference() {
  return `DCA-GS-${Date.now().toString(36).toUpperCase()}`;
}

function parseSpotPerGram(quotes: MarketQuote[]) {
  const spotQuote = quotes.find((q) => q.label.includes("DCA Spot"));
  if (!spotQuote) return null;
  const value = Number(spotQuote.value.replace(/,/g, ""));
  return Number.isFinite(value) && value > 0 ? value : null;
}

export async function getSpotPricePerGram() {
  const data = await fetchMarketPricesServer();
  const spot = parseSpotPerGram(data.quotes);
  if (!spot) throw new Error("Spot price unavailable");
  return { spot, updatedAt: data.updatedAt };
}

export function calcGramsFromUsd(amountUsd: number, spotPerGram: number) {
  return Number((amountUsd / spotPerGram).toFixed(6));
}

export function validateDepositAmount(amountUsd: number) {
  return Number.isFinite(amountUsd) && amountUsd >= goldSavings.minDepositUsd;
}

export function serializeGoldDeposit(deposit: GoldDeposit) {
  return {
    id: deposit.id,
    reference: deposit.reference,
    name: deposit.name,
    email: deposit.email,
    phone: deposit.phone,
    amountUsd: deposit.amountUsd.toString(),
    gramsQuoted: deposit.gramsQuoted.toString(),
    spotPricePerG: deposit.spotPricePerG.toString(),
    priceLockedUntil: deposit.priceLockedUntil.toISOString(),
    paymentMethod: deposit.paymentMethod,
    status: deposit.status,
    txHash: deposit.txHash,
    proofUrl: deposit.proofUrl,
    adminNotes: deposit.adminNotes,
    createdAt: deposit.createdAt.toISOString(),
    updatedAt: deposit.updatedAt.toISOString(),
  };
}