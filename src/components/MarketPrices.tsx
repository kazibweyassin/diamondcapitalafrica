"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import type { MarketQuote } from "@/types";

export default function MarketPrices() {
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [source, setSource] = useState<"live" | "cached">("cached");
  const [loading, setLoading] = useState(true);

  async function loadPrices() {
    setLoading(true);
    try {
      const res = await fetch("/api/market");
      const json = await res.json();
      if (json.success) {
        setQuotes(json.data.quotes);
        setUpdatedAt(json.data.updatedAt);
        setSource(json.data.source);
      }
    } catch {
      // keep previous values on error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPrices();
    const interval = setInterval(loadPrices, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12">
      <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
        <h2 id="market-prices" className="text-xl font-bold text-primary md:text-2xl">
          Market prices
        </h2>
        <button
          type="button"
          onClick={loadPrices}
          disabled={loading}
          className="flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {(quotes.length ? quotes : [1, 2, 3]).map((price, index) => (
          <div
            key={typeof price === "object" ? price.label : index}
            className="rounded-lg border border-border bg-white p-6 shadow-sm"
          >
            {typeof price === "object" ? (
              <>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  {price.label}
                </h4>
                <p className="text-2xl font-bold text-primary">
                  {loading ? "—" : price.value}
                </p>
                {!loading && (
                  <p
                    className={`mt-1 flex items-center gap-1 text-sm font-medium ${
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
              </>
            ) : (
              <>
                <h4 className="mb-2 h-4 w-24 animate-pulse rounded bg-section-alt" />
                <p className="text-2xl font-bold text-primary">—</p>
              </>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">
        As at {updatedAt || "—"}
        {source === "cached" && quotes.length > 0 && " (cached rates — live feed unavailable)"}
      </p>
    </section>
  );
}