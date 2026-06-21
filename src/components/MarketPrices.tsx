"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { marketPrices as fallbackPrices } from "@/data/content";
import type { MarketQuote } from "@/types";

function PriceCard({
  price,
  loading,
  compact,
}: {
  price: MarketQuote;
  loading: boolean;
  compact?: boolean;
}) {
  return (
    <>
      <h4
        className={`font-semibold uppercase tracking-wider text-muted ${
          compact
            ? "mb-0 text-[10px] leading-tight sm:mb-2 sm:text-xs"
            : "mb-2 text-xs"
        }`}
      >
        {price.label}
      </h4>
      <p
        className={`font-bold text-primary ${
          compact ? "text-lg sm:text-2xl" : "text-2xl"
        }`}
      >
        {loading ? "-" : price.value}
      </p>
      {!loading && (
        <p
          className={`flex items-center gap-1 font-medium ${
            compact ? "mt-0.5 text-xs sm:mt-1 sm:text-sm" : "mt-1 text-sm"
          } ${price.change >= 0 ? "text-green-600" : "text-red-500"}`}
        >
          {price.change >= 0 ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}
          {price.change >= 0 ? "+" : ""}
          {price.change}%
        </p>
      )}
    </>
  );
}

export default function MarketPrices() {
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [source, setSource] = useState<"live" | "cached">("cached");
  const [loading, setLoading] = useState(true);

  async function loadPrices() {
    setLoading(true);
    let loaded = false;

    try {
      const res = await fetch("/api/market");
      const json = await res.json();
      if (json.success) {
        setQuotes(json.data.quotes);
        setUpdatedAt(json.data.updatedAt);
        setSource(json.data.source);
        loaded = true;
      }
    } catch {
      // fall through to static fallback
    } finally {
      if (!loaded) {
        setQuotes((prev) => (prev.length ? prev : fallbackPrices));
        setUpdatedAt(
          (prev) =>
            prev ||
            new Date().toLocaleString("en-UG", {
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short",
            })
        );
        setSource("cached");
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPrices();
    const interval = setInterval(loadPrices, 60_000);
    return () => clearInterval(interval);
  }, []);

  const displayQuotes = quotes.length ? quotes : null;

  return (
    <section className="py-8 sm:py-12">
      <div className="mb-4 flex items-center justify-between border-b border-border pb-3 sm:mb-8 sm:pb-4">
        <h2
          id="market-prices"
          className="text-lg font-bold text-primary sm:text-xl md:text-2xl"
        >
          Market prices
        </h2>
        <button
          type="button"
          onClick={loadPrices}
          disabled={loading}
          className="flex min-h-11 items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
        {(displayQuotes ?? [1, 2, 3]).map((price, index) => {
          const isThird = index === 2;
          const isObject = typeof price === "object";

          return (
            <div
              key={isObject ? price.label : index}
              className={`rounded-lg border border-border bg-white shadow-sm ${
                isThird
                  ? "col-span-2 flex items-center justify-between gap-3 p-3 sm:col-span-1 sm:block sm:p-6"
                  : "p-3 sm:p-6"
              }`}
            >
              {isObject ? (
                isThird ? (
                  <div className="flex w-full items-center justify-between gap-3 sm:block">
                    <div className="min-w-0">
                      <h4 className="text-[10px] font-semibold uppercase leading-tight tracking-wider text-muted sm:mb-2 sm:text-xs">
                        {price.label}
                      </h4>
                      <p className="text-lg font-bold text-primary sm:text-2xl">
                        {loading ? "-" : price.value}
                      </p>
                    </div>
                    {!loading && (
                      <p
                        className={`flex shrink-0 items-center gap-1 text-xs font-medium sm:mt-1 sm:text-sm ${
                          price.change >= 0 ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {price.change >= 0 ? (
                          <TrendingUp size={14} />
                        ) : (
                          <TrendingDown size={14} />
                        )}
                        {price.change >= 0 ? "+" : ""}
                        {price.change}%
                      </p>
                    )}
                  </div>
                ) : (
                  <PriceCard price={price} loading={loading} compact />
                )
              ) : (
                <>
                  <h4 className="mb-2 h-4 w-24 animate-pulse rounded bg-section-alt" />
                  <p className="text-lg font-bold text-primary sm:text-2xl">-</p>
                </>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-muted sm:mt-4 sm:text-xs">
        As at {updatedAt || "-"}
        {source === "cached" && quotes.length > 0 && (
          <span className="hidden sm:inline">
            {" "}
            (cached rates; live feed unavailable)
          </span>
        )}
        {source === "cached" && quotes.length > 0 && (
          <span className="sm:hidden"> (cached)</span>
        )}
      </p>
    </section>
  );
}