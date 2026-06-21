import { marketPrices as fallbackPrices } from "@/data/content";
import type { MarketQuote } from "@/types";

interface MetalsLiveResponse {
  currency: string;
  xauPrice: number;
}

function formatNumber(value: number, decimals = 2) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function calcChange(current: number, previous: number) {
  if (!previous) return 0;
  return Number((((current - previous) / previous) * 100).toFixed(2));
}

const PREVIOUS_KEY = "dca_market_previous";

function getPreviousPrices(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(PREVIOUS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function setPreviousPrices(prices: Record<string, number>) {
  sessionStorage.setItem(PREVIOUS_KEY, JSON.stringify(prices));
}

export async function fetchMarketPrices(): Promise<{
  quotes: MarketQuote[];
  updatedAt: string;
  source: "live" | "cached";
}> {
  const previous = getPreviousPrices();
  const now = new Date();

  try {
    const [goldRes, fxRes] = await Promise.all([
      fetch("https://api.metals.live/v1/spot/gold", { cache: "no-store" }),
      fetch("https://open.er-api.com/v6/latest/USD", { cache: "no-store" }),
    ]);

    if (!goldRes.ok || !fxRes.ok) throw new Error("Market API unavailable");

    const goldData = (await goldRes.json()) as MetalsLiveResponse[];
    const fxData = (await fxRes.json()) as {
      rates: { UGX?: number };
    };

    const goldPerOz = goldData[0]?.xauPrice;
    const ugxRate = fxData.rates?.UGX;

    if (!goldPerOz || !ugxRate) throw new Error("Incomplete market data");

    const goldPerGram = goldPerOz / 31.1035;
    const current = {
      gold: goldPerOz,
      ugx: ugxRate,
      spot: goldPerGram,
    };

    const quotes: MarketQuote[] = [
      {
        label: "GOLD (US$/oz)",
        value: formatNumber(current.gold, 0),
        change: calcChange(current.gold, previous.gold),
      },
      {
        label: "UGX/USD",
        value: formatNumber(current.ugx, 0),
        change: calcChange(current.ugx, previous.ugx),
      },
      {
        label: "DCA Spot (US$/g)",
        value: formatNumber(current.spot, 2),
        change: calcChange(current.spot, previous.spot),
      },
    ];

    setPreviousPrices(current);

    return {
      quotes,
      updatedAt: now.toLocaleString("en-UG", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }),
      source: "live",
    };
  } catch {
    return {
      quotes: fallbackPrices.map((price) => ({ ...price, loading: false })),
      updatedAt: now.toLocaleString("en-UG", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }),
      source: "cached",
    };
  }
}