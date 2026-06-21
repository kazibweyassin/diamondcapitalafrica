import { marketPrices as fallbackPrices } from "@/data/content";
import { prisma } from "@/lib/prisma";
import type { MarketQuote } from "@/types";

interface GoldApiResponse {
  price: number;
  symbol: string;
}

interface FxApiResponse {
  rates: { UGX?: number };
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

function formatUpdatedAt(date: Date) {
  return date.toLocaleString("en-UG", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function quotesFromValues(
  current: { gold: number; ugx: number; spot: number },
  previous: Record<string, number>
): MarketQuote[] {
  return [
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
}

async function loadPreviousPrices(): Promise<Record<string, number>> {
  try {
    const previousSnapshot = await prisma.marketSnapshot.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!previousSnapshot) return {};

    const parsed = JSON.parse(previousSnapshot.quotes) as MarketQuote[];
    return {
      gold: Number(parsed[0]?.value.replace(/,/g, "") ?? 0),
      ugx: Number(parsed[1]?.value.replace(/,/g, "") ?? 0),
      spot: Number(parsed[2]?.value.replace(/,/g, "") ?? 0),
    };
  } catch {
    return {};
  }
}

async function saveSnapshot(quotes: MarketQuote[]) {
  try {
    await prisma.marketSnapshot.create({
      data: {
        quotes: JSON.stringify(quotes),
        source: "live",
      },
    });
  } catch {
    // Snapshot caching is optional; live prices still return without the database.
  }
}

async function loadCachedSnapshot() {
  try {
    const recent = await prisma.marketSnapshot.findFirst({
      where: { source: "live" },
      orderBy: { createdAt: "desc" },
    });

    if (!recent) return null;

    return {
      quotes: JSON.parse(recent.quotes) as MarketQuote[],
      updatedAt: formatUpdatedAt(recent.createdAt),
    };
  } catch {
    return null;
  }
}

async function fetchLiveQuotes(previous: Record<string, number>) {
  const [goldRes, fxRes] = await Promise.all([
    fetch("https://api.gold-api.com/price/XAU", {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(10_000),
    }),
    fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(10_000),
    }),
  ]);

  if (!goldRes.ok || !fxRes.ok) throw new Error("Market API unavailable");

  const goldData = (await goldRes.json()) as GoldApiResponse;
  const fxData = (await fxRes.json()) as FxApiResponse;

  const goldPerOz = goldData.price;
  const ugxRate = fxData.rates?.UGX;

  if (!goldPerOz || !ugxRate) throw new Error("Incomplete market data");

  const goldPerGram = goldPerOz / 31.1035;
  const current = { gold: goldPerOz, ugx: ugxRate, spot: goldPerGram };
  const quotes = quotesFromValues(current, previous);

  await saveSnapshot(quotes);

  return {
    quotes,
    updatedAt: formatUpdatedAt(new Date()),
    source: "live" as const,
  };
}

export async function fetchMarketPricesServer() {
  const now = new Date();
  const previous = await loadPreviousPrices();

  try {
    return await fetchLiveQuotes(previous);
  } catch {
    const cached = await loadCachedSnapshot();
    if (cached) {
      return { ...cached, source: "cached" as const };
    }

    return {
      quotes: fallbackPrices,
      updatedAt: formatUpdatedAt(now),
      source: "cached" as const,
    };
  }
}