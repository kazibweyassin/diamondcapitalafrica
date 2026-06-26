"use client";

import { useEffect, useMemo, useState } from "react";
import { marketPrices as fallbackPrices } from "@/data/content";
import { goldSavings } from "@/data/gold-savings";
import type { MarketQuote } from "@/types";

function parseSpotPerGram(quotes: MarketQuote[]) {
  const spotQuote = quotes.find((q) => q.label.includes("DCA Spot"));
  if (!spotQuote) return null;
  const value = Number(spotQuote.value.replace(/,/g, ""));
  return Number.isFinite(value) && value > 0 ? value : null;
}

export default function GoldSavingsCalculator() {
  const [amount, setAmount] = useState(String(goldSavings.minDepositUsd));
  const [spotPerGram, setSpotPerGram] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/market");
        const json = await res.json();
        if (json.success) {
          const spot = parseSpotPerGram(json.data.quotes);
          if (spot) {
            setSpotPerGram(spot);
            setUpdatedAt(json.data.updatedAt ?? "");
            return;
          }
        }
      } catch {
        // fall through to static fallback
      }
      setSpotPerGram(parseSpotPerGram(fallbackPrices));
      setUpdatedAt("");
    }

    load().finally(() => setLoading(false));
  }, []);

  const amountUsd = Number(amount);
  const validAmount =
    Number.isFinite(amountUsd) && amountUsd >= goldSavings.minDepositUsd;

  const grams = useMemo(() => {
    if (!validAmount || !spotPerGram) return null;
    return amountUsd / spotPerGram;
  }, [amountUsd, spotPerGram, validAmount]);

  return (
    <div className="rounded-lg border border-border bg-white p-6 shadow-sm md:p-8">
      <h3 className="mb-1 text-lg font-bold text-primary">Savings calculator</h3>
      <p className="mb-6 text-sm text-muted">
        See how many grams of 99.99% gold your deposit would buy at today&apos;s
        spot price.
      </p>

      <label htmlFor="savings-amount" className="mb-1 block text-sm font-medium">
        Deposit amount (USD)
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">
          $
        </span>
        <input
          id="savings-amount"
          type="number"
          min={goldSavings.minDepositUsd}
          step="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded border border-border py-3 pl-8 pr-4 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
        />
      </div>
      {!validAmount && amount !== "" && (
        <p className="mt-2 text-xs text-red-500">
          Minimum deposit is ${goldSavings.minDepositUsd}.
        </p>
      )}

      <div className="mt-6 rounded-lg bg-section-alt p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          You would receive
        </p>
        <p className="mt-1 text-3xl font-bold text-primary">
          {loading || !grams ? "—" : `${grams.toFixed(4)} g`}
        </p>
        <p className="mt-2 text-xs text-muted">
          {loading
            ? "Loading spot price…"
            : spotPerGram
              ? `At $${spotPerGram.toFixed(2)}/g (99.99% fine gold)${
                  updatedAt ? ` · Updated ${updatedAt}` : ""
                }`
              : "Spot price unavailable"}
        </p>
      </div>

      <p className="mt-4 text-xs text-muted">
        Illustration only. Actual credited grams depend on the spot price and
        published spreads at the time of deposit.
      </p>
    </div>
  );
}