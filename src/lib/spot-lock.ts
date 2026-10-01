import { fetchMarketPricesServer } from "@/lib/market-server";
import { TROY_OUNCE_GRAMS } from "@/lib/lot-settlement";

export async function lockGoldSpot() {
  const market = await fetchMarketPricesServer();
  const raw = String(market.quotes[0]?.value ?? "").replace(/,/g, "");
  const spotUsdPerOz = Number(raw);
  if (!Number.isFinite(spotUsdPerOz) || spotUsdPerOz <= 0) {
    throw new Error("Spot price is unavailable");
  }

  return {
    spotUsdPerOz: Math.round(spotUsdPerOz * 1e4) / 1e4,
    spotUsdPerG: Math.round((spotUsdPerOz / TROY_OUNCE_GRAMS) * 1e6) / 1e6,
    spotSource: market.source,
  };
}
