"use client";

import { useEffect, useMemo, useState } from "react";
import {
  investmentDefaultDistributionRate,
  investmentDistributionRates,
  investmentRaiseAssumptions as assumptions,
} from "@/data/investment";
import {
  calculateDistributionValue,
  calculateGoldEquivalent,
  calculateInvestorOwnership,
  calculatePostMoneyValuation,
  clamp,
  formatGoldPricePerGram,
  formatGoldWeight,
  formatOwnershipPercent,
  formatUsd,
} from "@/lib/investment-calculations";

function parseSpotPerGram(quotes: { label: string; value: string }[]): number | null {
  const spot = quotes.find((q) => q.label.toLowerCase().includes("spot"));
  if (!spot) return null;
  const n = Number(spot.value.replace(/,/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function formatInputUsd(value: number): string {
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function parseUsdInput(raw: string): number {
  const n = Number(raw.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

async function fetchGoldPricePerGram(): Promise<{
  price: number;
  source: "live" | "fallback";
}> {
  try {
    const res = await fetch("/api/market");
    const json = (await res.json()) as {
      success?: boolean;
      data?: {
        quotes?: { label: string; value: string }[];
        source?: "live" | "cached";
      };
    };
    if (json.success && json.data?.quotes) {
      const spot = parseSpotPerGram(json.data.quotes);
      if (spot) {
        return {
          price: spot,
          source: json.data.source === "live" ? "live" : "fallback",
        };
      }
    }
  } catch {
    // configured fallback
  }
  return {
    price: assumptions.fallbackGoldPricePerGramUsd,
    source: "fallback",
  };
}

const inputClass =
  "min-w-0 w-full rounded border border-border px-3 py-3 text-base outline-none transition focus:border-gold focus:ring-1 focus:ring-gold sm:px-4 sm:text-sm";

const rangeClass =
  "mt-3 h-11 w-full cursor-pointer accent-[var(--gold-dark)]";

export default function InvestmentCalculators() {
  const [investmentAmount, setInvestmentAmount] = useState<number>(
    assumptions.exampleInvestmentUsd
  );
  const [preMoney, setPreMoney] = useState<number>(
    assumptions.preMoneyValuationUsd
  );
  const [distributionRate, setDistributionRate] = useState<number>(
    investmentDefaultDistributionRate
  );
  const [goldPricePerGram, setGoldPricePerGram] = useState<number>(
    assumptions.fallbackGoldPricePerGramUsd
  );
  const [goldPriceSource, setGoldPriceSource] = useState<"live" | "fallback">(
    "fallback"
  );
  const [goldPriceLoading, setGoldPriceLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void fetchGoldPricePerGram().then((result) => {
      if (cancelled) return;
      setGoldPricePerGram(result.price);
      setGoldPriceSource(result.source);
      setGoldPriceLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  async function refreshGoldPrice() {
    setGoldPriceLoading(true);
    const result = await fetchGoldPricePerGram();
    setGoldPricePerGram(result.price);
    setGoldPriceSource(result.source);
    setGoldPriceLoading(false);
  }

  const postMoney = useMemo(
    () => calculatePostMoneyValuation(preMoney, assumptions.roundSizeUsd),
    [preMoney]
  );
  const ownership = useMemo(
    () => calculateInvestorOwnership(investmentAmount, postMoney),
    [investmentAmount, postMoney]
  );
  const newInvestorPool = useMemo(
    () => calculateInvestorOwnership(assumptions.roundSizeUsd, postMoney),
    [postMoney]
  );
  const distributionValue = useMemo(
    () => calculateDistributionValue(investmentAmount, distributionRate),
    [investmentAmount, distributionRate]
  );
  const goldGrams = useMemo(
    () => calculateGoldEquivalent(distributionValue, goldPricePerGram),
    [distributionValue, goldPricePerGram]
  );

  return (
    <section
      id="explore-investment"
      className="scroll-mt-32 sm:scroll-mt-36 lg:scroll-mt-40"
      aria-labelledby="ownership-calc-heading"
    >
      <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <h2
            id="ownership-calc-heading"
            className="text-xl font-bold text-primary sm:text-2xl"
          >
            Explore an Illustrative Investment
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Model ownership and a potential gold-linked distribution. Figures
            are illustrative only — not an offer or guaranteed return.
          </p>
        </div>
        <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted">
          Illustrative only
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12">
        {/* Results first on mobile so outcomes are visible immediately */}
        <div className="order-1 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:order-2 lg:col-span-7 lg:grid-cols-1 xl:grid-cols-2">
          <div className="flex min-w-0 flex-col border border-border bg-section-alt p-4 sm:p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Ownership
            </p>
            <p className="mt-2 text-3xl font-bold tabular-nums text-primary sm:mt-3 sm:text-4xl">
              {formatOwnershipPercent(ownership)}
            </p>
            <p className="mt-1 break-words text-sm text-muted">
              of {formatUsd(postMoney)} post-money
            </p>
            <dl className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm sm:mt-6 sm:space-y-3">
              <div className="flex items-start justify-between gap-3">
                <dt className="text-muted">Your investment</dt>
                <dd className="shrink-0 text-right font-semibold tabular-nums text-primary">
                  {formatUsd(investmentAmount)}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="min-w-0 text-muted">Full round (new investors)</dt>
                <dd className="shrink-0 font-semibold tabular-nums text-primary">
                  {formatOwnershipPercent(newInvestorPool)}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-muted">Existing sponsors</dt>
                <dd className="shrink-0 font-semibold tabular-nums text-primary">
                  {formatOwnershipPercent(1 - newInvestorPool)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex min-w-0 flex-col border border-border bg-section-alt p-4 sm:p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Gold-linked distribution
            </p>
            <p className="mt-2 text-3xl font-bold tabular-nums text-primary sm:mt-3 sm:text-4xl">
              {formatGoldWeight(goldGrams)}
            </p>
            <p className="mt-1 break-words text-sm text-muted">
              gold equivalent of {formatUsd(distributionValue)}
            </p>
            <dl className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm sm:mt-6 sm:space-y-3">
              <div className="flex items-start justify-between gap-3">
                <dt className="text-muted">Distribution rate</dt>
                <dd className="font-semibold tabular-nums text-primary">
                  {(distributionRate * 100).toFixed(0)}%
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-muted">Settlement options</dt>
                <dd className="text-right font-semibold text-primary">
                  Cash / Gold / Hybrid
                </dd>
              </div>
            </dl>
            <p className="mt-auto pt-4 text-xs leading-relaxed text-muted sm:pt-5">
              Gold weight moves with the benchmark price. Actual settlement
              terms would be set in the final investment agreement.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="order-2 space-y-5 border border-border p-4 sm:space-y-6 sm:p-5 md:p-6 lg:order-1 lg:col-span-5">
          <div>
            <label
              htmlFor="investment-amount"
              className="mb-2 block text-sm font-semibold text-primary"
            >
              Investment amount
            </label>
            <div className="flex min-w-0 items-center gap-2">
              <span className="shrink-0 text-sm text-muted">USD</span>
              <input
                id="investment-amount"
                type="text"
                inputMode="numeric"
                enterKeyHint="done"
                className={inputClass}
                value={formatInputUsd(investmentAmount)}
                onChange={(e) => {
                  const n = parseUsdInput(e.target.value);
                  setInvestmentAmount(
                    clamp(
                      n,
                      assumptions.minInvestmentUsd,
                      assumptions.maxInvestmentUsd
                    )
                  );
                }}
              />
            </div>
            <input
              type="range"
              min={assumptions.minInvestmentUsd}
              max={assumptions.maxInvestmentUsd}
              step={50_000}
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className={rangeClass}
              aria-label="Investment amount slider"
            />
            <p className="mt-2 text-xs text-muted">
              {formatUsd(assumptions.minInvestmentUsd)} –{" "}
              {formatUsd(assumptions.maxInvestmentUsd)}
            </p>
          </div>

          <div>
            <label
              htmlFor="pre-money"
              className="mb-2 block text-sm font-semibold text-primary"
            >
              Pre-money valuation
            </label>
            <div className="flex min-w-0 items-center gap-2">
              <span className="shrink-0 text-sm text-muted">USD</span>
              <input
                id="pre-money"
                type="text"
                inputMode="numeric"
                enterKeyHint="done"
                className={inputClass}
                value={formatInputUsd(preMoney)}
                onChange={(e) => {
                  const n = parseUsdInput(e.target.value);
                  setPreMoney(
                    clamp(
                      n,
                      assumptions.minPreMoneyUsd,
                      assumptions.maxPreMoneyUsd
                    )
                  );
                }}
              />
            </div>
            <input
              type="range"
              min={assumptions.minPreMoneyUsd}
              max={assumptions.maxPreMoneyUsd}
              step={500_000}
              value={preMoney}
              onChange={(e) => setPreMoney(Number(e.target.value))}
              className={rangeClass}
              aria-label="Pre-money valuation slider"
            />
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Round size fixed at {formatUsd(assumptions.roundSizeUsd)}.
              Post-money = pre-money + round.
            </p>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-primary">
              Illustrative annual distribution rate
            </legend>
            <div className="grid grid-cols-5 gap-1.5 sm:flex sm:flex-wrap sm:gap-2">
              {investmentDistributionRates.map((rate) => {
                const selected = rate === distributionRate;
                return (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setDistributionRate(rate)}
                    aria-pressed={selected}
                    className={`min-h-11 rounded border px-1 py-2 text-sm font-semibold transition sm:min-h-10 sm:px-3.5 ${
                      selected
                        ? "border-primary bg-primary text-white"
                        : "border-border text-primary hover:border-gold"
                    }`}
                  >
                    {(rate * 100).toFixed(0)}%
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="border border-border bg-section-alt px-3 py-3 sm:px-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-muted">Gold price (USD/g)</p>
              <button
                type="button"
                onClick={() => void refreshGoldPrice()}
                className="min-h-9 text-xs font-semibold text-gold-dark underline hover:text-gold"
              >
                Refresh
              </button>
            </div>
            <p className="mt-1 font-semibold text-primary">
              {goldPriceLoading
                ? "Loading…"
                : formatGoldPricePerGram(goldPricePerGram)}
            </p>
            <p className="mt-1 text-xs text-muted">
              {goldPriceSource === "live"
                ? "Live / recent market spot"
                : "Illustrative benchmark"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
