import { marketPrices as fallbackPrices } from "@/data/content";
import { prisma } from "@/lib/prisma";
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

export async function fetchMarketPricesServer() {
  const now = new Date();
  const previousSnapshot = await prisma.marketSnapshot.findFirst({
    orderBy: { createdAt: "desc" },
  });

  let previous: Record<string, number> = {};
  if (previousSnapshot) {
    try {
      const parsed = JSON.parse(previousSnapshot.quotes) as MarketQuote[];
      previous = {
        gold: Number(parsed[0]?.value.replace(/,/g, "") ?? 0),
        ugx: Number(parsed[1]?.value.replace(/,/g, "") ?? 0),
        spot: Number(parsed[2]?.value.replace(/,/g, "") ?? 0),
      };
    } catch {
      previous = {};
    }
  }

  try {
    const [goldRes, fxRes] = await Promise.all([
      fetch("https://api.metals.live/v1/spot/gold", {
        next: { revalidate: 60 },
      }),
      fetch("https://open.er-api.com/v6/latest/USD", {
        next: { revalidate: 60 },
      }),
    ]);

    if (!goldRes.ok || !fxRes.ok) throw new Error("Market API unavailable");

    const goldData = (await goldRes.json()) as MetalsLiveResponse[];
    const fxData = (await fxRes.json()) as { rates: { UGX?: number } };

    const goldPerOz = goldData[0]?.xauPrice;
    const ugxRate = fxData.rates?.UGX;

    if (!goldPerOz || !ugxRate) throw new Error("Incomplete market data");

    const goldPerGram = goldPerOz / 31.1035;
    const current = { gold: goldPerOz, ugx: ugxRate, spot: goldPerGram };

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
        label: "GCU Spot (US$/g)",
        value: formatNumber(current.spot, 2),
        change: calcChange(current.spot, previous.spot),
      },
    ];

    await prisma.marketSnapshot.create({
      data: {
        quotes: JSON.stringify(quotes),
        source: "live",
      },
    });

    return {
      quotes,
      updatedAt: now.toLocaleString("en-UG", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }),
      source: "live" as const,
    };
  } catch {
    const recent = await prisma.marketSnapshot.findFirst({
      where: { source: "live" },
      orderBy: { createdAt: "desc" },
    });

    if (recent) {
      return {
        quotes: JSON.parse(recent.quotes) as MarketQuote[],
        updatedAt: recent.createdAt.toLocaleString("en-UG", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
        source: "cached" as const,
      };
    }

    return {
      quotes: fallbackPrices,
      updatedAt: now.toLocaleString("en-UG", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }),
      source: "cached" as const,
    };
  }
}