"use client";

import { useEffect, useId, useState } from "react";
import {
  investmentFinancialOutlook,
  investmentRaiseAssumptions,
  investmentScenarios,
  investmentUseOfFunds,
} from "@/data/investment";

const PRIMARY = "#003b49";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";
const TRACK = "#f1f5f9";
const NEGATIVE = "#b45353";
const ROUND_USD = investmentRaiseAssumptions.roundSizeUsd;

/** Institutional multi-colour palette (brand + supporting tones). */
const PALETTE = {
  primary: "#003b49",
  primaryMid: "#0a5f6e",
  primaryLight: "#1a8a9c",
  teal: "#0f766e",
  tealLight: "#14b8a6",
  gold: "#c5a572",
  goldDark: "#a68b4b",
  goldLight: "#d4bc8e",
  copper: "#b45309",
  steel: "#1d4e89",
  steelLight: "#3b82c4",
  forest: "#2d6a4f",
  forestLight: "#40916c",
  slate: "#64748b",
  plum: "#6b4c7a",
} as const;

/** One colour per use-of-funds line item. */
const FUNDS_COLORS = [
  PALETTE.primary,
  PALETTE.gold,
  PALETTE.steel,
  PALETTE.forest,
  PALETTE.copper,
] as const;

/** Progressive year colours for revenue bars (cool). */
const REVENUE_YEAR_COLORS = [
  PALETTE.primary,
  PALETTE.primaryMid,
  PALETTE.steel,
  PALETTE.primaryLight,
  PALETTE.steelLight,
] as const;

/** Progressive year colours for EBITDA bars (warm). */
const EBITDA_YEAR_COLORS = [
  PALETTE.goldDark,
  PALETTE.gold,
  PALETTE.copper,
  PALETTE.goldLight,
  "#e0c99a",
] as const;

const SCENARIO_COLORS: Record<string, string> = {
  Downside: PALETTE.slate,
  "Base case": PALETTE.primary,
  Upside: PALETTE.teal,
};

type TooltipState = {
  x: number;
  y: number;
  lines: string[];
} | null;

function formatMusd(value: number, digits = 2): string {
  const abs = Math.abs(value).toFixed(digits);
  return value < 0 ? `−$${abs}M` : `$${abs}M`;
}

function formatUsdCompact(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `$${m.toLocaleString("en-US", {
      maximumFractionDigits: m >= 10 || Number.isInteger(m) ? 0 : 2,
      minimumFractionDigits: 0,
    })}M`;
  }
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function ebitdaMargin(revenueMusd: number, ebitdaMusd: number): string | null {
  if (revenueMusd <= 0) return null;
  const pct = (ebitdaMusd / revenueMusd) * 100;
  const sign = pct < 0 ? "−" : "";
  return `${sign}${Math.abs(pct).toFixed(0)}% margin`;
}

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [breakpoint]);

  return isMobile;
}

function ChartTooltip({
  tip,
  mobile,
}: {
  tip: TooltipState;
  mobile?: boolean;
}) {
  if (!tip) return null;

  if (mobile) {
    return (
      <div
        role="tooltip"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 border-t border-border bg-white px-3 py-2.5 text-xs text-foreground shadow-md"
      >
        {tip.lines.map((line) => (
          <p key={line} className="leading-snug">
            {line}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div
      role="tooltip"
      className="pointer-events-none absolute z-20 max-w-[min(240px,calc(100%-1rem))] border border-border bg-white px-3 py-2 text-xs text-foreground shadow-md"
      style={{
        left: Math.min(Math.max(tip.x, 100), 620),
        top: tip.y,
        transform: "translate(-50%, calc(-100% - 10px))",
      }}
    >
      {tip.lines.map((line) => (
        <p key={line} className="leading-snug">
          {line}
        </p>
      ))}
    </div>
  );
}

function ChartBadge() {
  return (
    <span className="inline-flex items-center rounded border border-border bg-section-alt px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
      Illustrative
    </span>
  );
}

function useChartReady() {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;

    const frame = requestAnimationFrame(() => {
      if (cancelled) return;
      setReduced(mq.matches);
      setReady(true);
    });

    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return { ready, reduced };
}

function UseOfFundsChart() {
  const items = investmentUseOfFunds.map((f, i) => {
    const usd = Math.round((f.percent / 100) * ROUND_USD);
    return {
      label: f.label,
      percent: f.percent,
      usd,
      color: FUNDS_COLORS[i % FUNDS_COLORS.length],
      display: `${f.percent.toFixed(1)}% · ${formatUsdCompact(usd)}`,
    };
  });
  const max = Math.max(...items.map((i) => i.percent), 1);
  const { ready, reduced } = useChartReady();
  const [active, setActive] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const highlight = selected ?? active;

  return (
    <div
      className="relative space-y-4"
      role="img"
      aria-label="Use of funds allocation of USD 4.0 million preliminary capital"
    >
      {items.map((item) => {
        const isOn = highlight === item.label;
        return (
          <button
            key={item.label}
            type="button"
            className="w-full text-left"
            onMouseEnter={() => setActive(item.label)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(item.label)}
            onBlur={() => setActive(null)}
            onClick={() =>
              setSelected((prev) =>
                prev === item.label ? null : item.label
              )
            }
            aria-pressed={selected === item.label}
          >
            <div className="mb-1.5 flex flex-col gap-0.5 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
              <span
                className={`flex min-w-0 items-start gap-2 ${
                  isOn ? "font-medium text-primary" : "text-foreground"
                }`}
              >
                <span
                  className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{ background: item.color }}
                  aria-hidden
                />
                <span className="min-w-0 leading-snug">{item.label}</span>
              </span>
              <span className="shrink-0 pl-4 font-semibold tabular-nums text-primary sm:pl-0">
                {item.display}
              </span>
            </div>
            <div className="h-3.5 w-full rounded-sm bg-border" aria-hidden>
              <div
                className="h-full rounded-sm transition-[width,opacity] duration-700 ease-out"
                style={{
                  width: ready ? `${(item.percent / max) * 100}%` : "0%",
                  background: item.color,
                  opacity: highlight && !isOn ? 0.35 : 1,
                  transitionDuration: reduced ? "0ms" : "700ms",
                }}
              />
            </div>
          </button>
        );
      })}
      <p className="text-xs text-muted">
        Of {formatUsdCompact(ROUND_USD)} preliminary capital. Tap a row for
        focus on mobile.
      </p>
    </div>
  );
}

function ebitdaPositiveColor(yearIndex: number, ebitdaMusd: number): string {
  if (ebitdaMusd < 0) return NEGATIVE;
  return EBITDA_YEAR_COLORS[yearIndex % EBITDA_YEAR_COLORS.length];
}

function GroupedBarChart() {
  const data = investmentFinancialOutlook;
  const isMobile = useIsMobile();
  const [showRevenue, setShowRevenue] = useState(true);
  const [showEbitda, setShowEbitda] = useState(true);
  const [tip, setTip] = useState<TooltipState>(null);
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const { ready, reduced } = useChartReady();
  const chartId = useId();

  const positives: number[] = [0];
  const negatives: number[] = [0];
  if (showRevenue) {
    for (const d of data) positives.push(d.revenueMusd);
  }
  if (showEbitda) {
    for (const d of data) {
      if (d.ebitdaMusd >= 0) positives.push(d.ebitdaMusd);
      else negatives.push(d.ebitdaMusd);
    }
  }

  const dataMax = Math.max(...positives, 0.1) * 1.18;
  const dataMin = Math.min(...negatives, 0) * 1.4;
  const valueRange = dataMax - dataMin || 1;

  const width = isMobile ? 360 : 720;
  const height = isMobile ? 280 : 340;
  const pad = isMobile
    ? { top: 20, right: 8, bottom: 36, left: 36 }
    : { top: 28, right: 16, bottom: 44, left: 48 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const groupW = plotW / data.length;
  const barW = Math.min(groupW * (isMobile ? 0.32 : 0.3), isMobile ? 22 : 36);
  const barGap = isMobile ? 3 : 6;
  const showBarLabels = !isMobile;

  function yScale(v: number) {
    return pad.top + plotH - ((v - dataMin) / valueRange) * plotH;
  }

  const zeroY = yScale(0);
  const tickCount = 5;
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    return dataMin + (valueRange * i) / (tickCount - 1);
  });

  function placeTip(
    el: SVGElement,
    key: string,
    lines: string[],
    x: number,
    y: number,
    w: number
  ) {
    const svg = el.ownerSVGElement;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = x + w / 2;
    pt.y = y;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const screen = pt.matrixTransform(ctm);
    const wrap = svg.parentElement?.getBoundingClientRect();
    setHoverKey(key);
    setTip({
      x: screen.x - (wrap?.left ?? 0),
      y: screen.y - (wrap?.top ?? 0),
      lines,
    });
  }

  function clearTip() {
    setHoverKey(null);
    setTip(null);
  }

  return (
    <div className={`relative w-full ${tip && isMobile ? "pb-16" : ""}`}>
      <ChartTooltip tip={tip} mobile={isMobile} />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto h-auto w-full max-w-full"
        role="img"
        aria-labelledby={`${chartId}-title`}
      >
        <title id={`${chartId}-title`}>
          Illustrative revenue and EBITDA base case, five years
        </title>

        {ticks.map((t) => {
          const y = yScale(t);
          return (
            <g key={t}>
              <line
                x1={pad.left}
                x2={width - pad.right}
                y1={y}
                y2={y}
                stroke={BORDER}
                strokeWidth={1}
              />
              <text
                x={pad.left - 6}
                y={y + 3}
                textAnchor="end"
                fill={MUTED}
                fontSize={isMobile ? 9 : 11}
              >
                {formatMusd(t, Math.abs(t) < 1 ? 2 : 1)}
              </text>
            </g>
          );
        })}

        {/* Zero baseline */}
        <line
          x1={pad.left}
          x2={width - pad.right}
          y1={zeroY}
          y2={zeroY}
          stroke={PRIMARY}
          strokeWidth={1.25}
          opacity={0.35}
        />

        {data.map((d, i) => {
          const cx = pad.left + groupW * i + groupW / 2;
          const revKey = `${d.year}-rev`;
          const ebitdaKey = `${d.year}-ebitda`;
          const margin = ebitdaMargin(d.revenueMusd, d.ebitdaMusd);
          const revColor =
            REVENUE_YEAR_COLORS[i % REVENUE_YEAR_COLORS.length];
          const ebitdaColor = ebitdaPositiveColor(i, d.ebitdaMusd);

          const revH = ready ? (d.revenueMusd / valueRange) * plotH : 0;
          const revY = yScale(d.revenueMusd);

          const ebitdaPositive = d.ebitdaMusd >= 0;
          const ebitdaAbsH = ready
            ? (Math.abs(d.ebitdaMusd) / valueRange) * plotH
            : 0;
          const ebitdaY = ebitdaPositive
            ? yScale(d.ebitdaMusd)
            : zeroY;
          const ebitdaTop = ebitdaPositive ? ebitdaY : zeroY;

          const revX = showEbitda ? cx - barW - barGap / 2 : cx - barW / 2;
          const ebitdaX = showRevenue ? cx + barGap / 2 : cx - barW / 2;

          const revLines = [
            d.label,
            `Revenue ${formatMusd(d.revenueMusd)}`,
            `Throughput ${d.annualThroughputKg.toLocaleString()} kg`,
          ];
          const ebitdaLines = [
            d.label,
            `EBITDA ${formatMusd(d.ebitdaMusd)}`,
            margin ?? "Illustrative base case",
            `Throughput ${d.annualThroughputKg.toLocaleString()} kg`,
          ];

          return (
            <g key={d.year}>
              {showRevenue && (
                <g>
                  <rect
                    x={revX}
                    y={revY}
                    width={barW}
                    height={Math.max(revH, 0)}
                    fill={revColor}
                    opacity={hoverKey && hoverKey !== revKey ? 0.3 : 1}
                    className={
                      reduced
                        ? undefined
                        : "transition-all duration-700 ease-out"
                    }
                    style={{ cursor: "pointer" }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${d.label} revenue ${formatMusd(d.revenueMusd)}`}
                    onMouseEnter={(e) =>
                      placeTip(e.currentTarget, revKey, revLines, revX, revY, barW)
                    }
                    onMouseLeave={clearTip}
                    onFocus={(e) =>
                      placeTip(
                        e.currentTarget,
                        revKey,
                        revLines,
                        revX,
                        revY,
                        barW
                      )
                    }
                    onBlur={clearTip}
                    onClick={(e) =>
                      placeTip(
                        e.currentTarget,
                        revKey,
                        revLines,
                        revX,
                        revY,
                        barW
                      )
                    }
                  />
                  {showBarLabels && ready && revH > 22 && (
                    <text
                      x={revX + barW / 2}
                      y={revY - 6}
                      textAnchor="middle"
                      fill={revColor}
                      fontSize={10}
                      fontWeight={600}
                    >
                      {formatMusd(d.revenueMusd)}
                    </text>
                  )}
                </g>
              )}

              {showEbitda && (
                <g>
                  <rect
                    x={ebitdaX}
                    y={ebitdaTop}
                    width={barW}
                    height={Math.max(ebitdaAbsH, 0)}
                    fill={ebitdaColor}
                    opacity={hoverKey && hoverKey !== ebitdaKey ? 0.3 : 1}
                    className={
                      reduced
                        ? undefined
                        : "transition-all duration-700 ease-out"
                    }
                    style={{ cursor: "pointer" }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${d.label} EBITDA ${formatMusd(d.ebitdaMusd)}`}
                    onMouseEnter={(e) =>
                      placeTip(
                        e.currentTarget,
                        ebitdaKey,
                        ebitdaLines,
                        ebitdaX,
                        ebitdaTop,
                        barW
                      )
                    }
                    onMouseLeave={clearTip}
                    onFocus={(e) =>
                      placeTip(
                        e.currentTarget,
                        ebitdaKey,
                        ebitdaLines,
                        ebitdaX,
                        ebitdaTop,
                        barW
                      )
                    }
                    onBlur={clearTip}
                    onClick={(e) =>
                      placeTip(
                        e.currentTarget,
                        ebitdaKey,
                        ebitdaLines,
                        ebitdaX,
                        ebitdaTop,
                        barW
                      )
                    }
                  />
                  {showBarLabels && ready && ebitdaAbsH > 18 && ebitdaPositive && (
                    <text
                      x={ebitdaX + barW / 2}
                      y={ebitdaY - 6}
                      textAnchor="middle"
                      fill={PALETTE.goldDark}
                      fontSize={10}
                      fontWeight={600}
                    >
                      {formatMusd(d.ebitdaMusd)}
                    </text>
                  )}
                  {showBarLabels && ready && !ebitdaPositive && ebitdaAbsH > 4 && (
                    <text
                      x={ebitdaX + barW / 2}
                      y={zeroY + ebitdaAbsH + 12}
                      textAnchor="middle"
                      fill={NEGATIVE}
                      fontSize={10}
                      fontWeight={600}
                    >
                      {formatMusd(d.ebitdaMusd)}
                    </text>
                  )}
                </g>
              )}

              <text
                x={cx}
                y={height - (isMobile ? 12 : 14)}
                textAnchor="middle"
                fill={PRIMARY}
                fontSize={isMobile ? 10 : 12}
                fontWeight={600}
              >
                {isMobile ? d.year : d.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs sm:mt-4">
        <button
          type="button"
          onClick={() => setShowRevenue((v) => !v)}
          aria-pressed={showRevenue}
          className={`inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded border px-2.5 py-1.5 transition sm:min-h-9 sm:flex-none sm:px-3 ${
            showRevenue
              ? "border-primary bg-primary text-white"
              : "border-border text-muted hover:border-primary"
          }`}
        >
          <span className="inline-flex gap-0.5" aria-hidden>
            {REVENUE_YEAR_COLORS.slice(0, 3).map((c) => (
              <span
                key={c}
                className="inline-block h-2.5 w-2.5"
                style={{ background: showRevenue ? "#fff" : c }}
              />
            ))}
          </span>
          Revenue
        </button>
        <button
          type="button"
          onClick={() => setShowEbitda((v) => !v)}
          aria-pressed={showEbitda}
          className={`inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded border px-2.5 py-1.5 transition sm:min-h-9 sm:flex-none sm:px-3 ${
            showEbitda
              ? "border-amber-700/40 bg-amber-50 text-primary"
              : "border-border text-muted hover:border-gold"
          }`}
        >
          <span className="inline-flex gap-0.5" aria-hidden>
            {EBITDA_YEAR_COLORS.slice(0, 3).map((c) => (
              <span
                key={c}
                className="inline-block h-2.5 w-2.5"
                style={{ background: showEbitda ? PALETTE.goldDark : c }}
              />
            ))}
          </span>
          EBITDA
        </button>
      </div>
      {!showRevenue && !showEbitda && (
        <p className="mt-2 text-center text-xs text-muted">
          Select at least one series above to display the chart.
        </p>
      )}
      <p className="mt-2 text-center text-xs text-muted">
        {isMobile ? "Tap" : "Hover or tap"} a bar for detail. Year 1 EBITDA is
        below the zero line.
      </p>
    </div>
  );
}

function ScenarioBars() {
  const max = Math.max(...investmentScenarios.map((s) => s.y5RevenueMusd));
  const { ready, reduced } = useChartReady();
  const [active, setActive] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const highlight = selected ?? active;

  return (
    <div className="space-y-5">
      <div
        className="relative space-y-4"
        role="img"
        aria-label="Year 5 revenue by scenario"
      >
        {investmentScenarios.map((s) => {
          const isBase = s.name === "Base case";
          const color = SCENARIO_COLORS[s.name] ?? MUTED;
          const isOn = highlight === s.name;

          return (
            <button
              key={s.name}
              type="button"
              className={`w-full rounded border p-3 text-left transition ${
                isBase
                  ? "border-primary/30 bg-section-alt"
                  : "border-transparent hover:border-border"
              } ${isOn ? "ring-1 ring-offset-1" : ""}`}
              style={
                isOn
                  ? { boxShadow: `0 0 0 1px ${color}` }
                  : undefined
              }
              onMouseEnter={() => setActive(s.name)}
              onMouseLeave={() => setActive(null)}
              onClick={() =>
                setSelected((prev) => (prev === s.name ? null : s.name))
              }
              aria-pressed={selected === s.name}
            >
              <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="flex items-center gap-2 font-semibold text-primary">
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
                    style={{ background: color }}
                    aria-hidden
                  />
                  {s.name}
                  {isBase && (
                    <span className="ml-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
                      Reference
                    </span>
                  )}
                </span>
                <span className="text-xs tabular-nums text-muted sm:text-sm">
                  Y5 revenue {formatMusd(s.y5RevenueMusd)}
                </span>
              </div>
              <div
                className="h-3.5 w-full rounded-sm"
                style={{ background: TRACK }}
                aria-hidden
              >
                <div
                  className="h-full rounded-sm transition-[width,opacity] duration-700 ease-out"
                  style={{
                    width: ready ? `${(s.y5RevenueMusd / max) * 100}%` : "0%",
                    background: color,
                    opacity: highlight && !isOn ? 0.4 : 1,
                    transitionDuration: reduced ? "0ms" : "700ms",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile: stacked metric cards */}
      <div className="space-y-2 sm:hidden">
        {investmentScenarios.map((s) => {
          const color = SCENARIO_COLORS[s.name] ?? MUTED;
          return (
            <div
              key={s.name}
              className={`border border-border p-3 ${
                s.name === "Base case" ? "bg-section-alt" : ""
              }`}
            >
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                <span
                  className="inline-block h-2 w-2 rounded-sm"
                  style={{ background: color }}
                  aria-hidden
                />
                {s.name}
              </p>
              <dl className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div>
                  <dt className="text-muted">Y5 rev</dt>
                  <dd className="font-semibold tabular-nums text-foreground">
                    {formatMusd(s.y5RevenueMusd)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Throughput</dt>
                  <dd className="font-semibold tabular-nums text-foreground">
                    {s.y5ThroughputKg.toLocaleString()} kg
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">5-yr EBITDA</dt>
                  <dd className="font-semibold tabular-nums text-primary">
                    {formatMusd(s.fiveYearEbitdaMusd)}
                  </dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto border border-border sm:block">
        <table className="w-full min-w-[320px] text-left text-sm">
          <caption className="sr-only">
            Year-5 scenario comparison metrics
          </caption>
          <thead className="bg-section-alt text-muted">
            <tr>
              <th className="px-3 py-2 font-semibold">Scenario</th>
              <th className="px-3 py-2 text-right font-semibold">
                Y5 revenue
              </th>
              <th className="px-3 py-2 text-right font-semibold">
                Y5 throughput
              </th>
              <th className="px-3 py-2 text-right font-semibold">
                5-yr EBITDA
              </th>
            </tr>
          </thead>
          <tbody>
            {investmentScenarios.map((s) => {
              const color = SCENARIO_COLORS[s.name] ?? MUTED;
              return (
                <tr
                  key={s.name}
                  className={`border-t border-border ${
                    s.name === "Base case" ? "bg-section-alt/60" : ""
                  }`}
                >
                  <td className="px-3 py-2 font-medium text-primary">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="inline-block h-2 w-2 rounded-sm"
                        style={{ background: color }}
                        aria-hidden
                      />
                      {s.name}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-foreground">
                    {formatMusd(s.y5RevenueMusd)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-foreground">
                    {s.y5ThroughputKg.toLocaleString()} kg
                  </td>
                  <td className="px-3 py-2 text-right font-medium tabular-nums text-primary">
                    {formatMusd(s.fiveYearEbitdaMusd)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BaseCaseDataTable() {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[480px] text-left text-sm">
        <caption className="bg-section-alt px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">
          Base-case series (source: Investment Overview)
        </caption>
        <thead className="border-t border-border text-xs font-semibold uppercase tracking-wider text-muted">
          <tr>
            <th className="px-4 py-3">Metric</th>
            {investmentFinancialOutlook.map((d) => (
              <th key={d.year} className="px-4 py-3 text-right">
                {d.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border">
            <td className="px-4 py-3 text-foreground">Annual throughput</td>
            {investmentFinancialOutlook.map((d) => (
              <td
                key={d.year}
                className="px-4 py-3 text-right tabular-nums text-foreground"
              >
                {d.annualThroughputKg.toLocaleString()} kg
              </td>
            ))}
          </tr>
          <tr className="border-t border-border">
            <td className="px-4 py-3 text-foreground">Operating revenue</td>
            {investmentFinancialOutlook.map((d) => (
              <td
                key={d.year}
                className="px-4 py-3 text-right tabular-nums text-foreground"
              >
                {formatMusd(d.revenueMusd)}
              </td>
            ))}
          </tr>
          <tr className="border-t border-border">
            <td className="px-4 py-3 text-foreground">EBITDA</td>
            {investmentFinancialOutlook.map((d) => (
              <td
                key={d.year}
                className="px-4 py-3 text-right font-medium tabular-nums text-primary"
              >
                {formatMusd(d.ebitdaMusd)}
              </td>
            ))}
          </tr>
          <tr className="border-t border-border">
            <td className="px-4 py-3 text-foreground">EBITDA margin</td>
            {investmentFinancialOutlook.map((d) => (
              <td
                key={d.year}
                className="px-4 py-3 text-right tabular-nums text-muted"
              >
                {ebitdaMargin(d.revenueMusd, d.ebitdaMusd) ?? "—"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function InvestmentCharts() {
  const [showData, setShowData] = useState(false);

  return (
    <section
      id="financial-outlook"
      className="mb-12 scroll-mt-32 sm:mb-16 sm:scroll-mt-36 lg:scroll-mt-40"
      aria-labelledby="charts-heading"
    >
      <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <h2
            id="charts-heading"
            className="text-xl font-bold text-primary sm:text-2xl"
          >
            Illustrative financial outlook
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
            Forward-looking management assumptions from the public Investment
            Overview. Not guaranteed outcomes.
          </p>
        </div>
        <ChartBadge />
      </div>

      <div className="mb-4 border border-border p-3 sm:mb-6 sm:p-5 md:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-2 sm:mb-5">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-primary sm:text-base">
              Operating revenue &amp; EBITDA
            </h3>
            <p className="mt-1 text-xs text-muted">
              Five-year base case (USD millions)
            </p>
          </div>
          <ChartBadge />
        </div>
        <GroupedBarChart />
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <div className="border border-border p-3 sm:p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-2 sm:mb-5">
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-primary sm:text-base">
                Use of funds
              </h3>
              <p className="mt-1 text-xs text-muted">
                Preliminary allocation of {formatUsdCompact(ROUND_USD)}
              </p>
            </div>
            <ChartBadge />
          </div>
          <UseOfFundsChart />
        </div>

        <div className="border border-border p-3 sm:p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-2 sm:mb-5">
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-primary sm:text-base">
                Year-5 scenarios
              </h3>
              <p className="mt-1 text-xs text-muted">
                Downside, base and upside cases
              </p>
            </div>
            <ChartBadge />
          </div>
          <ScenarioBars />
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          onClick={() => setShowData((v) => !v)}
          aria-expanded={showData}
          className="inline-flex min-h-11 w-full items-center justify-center border border-border px-4 py-2 text-sm font-semibold text-primary transition hover:bg-section-alt sm:w-auto"
        >
          {showData ? "Hide source data table" : "View source data table"}
        </button>
        {showData && (
          <div className="mt-4 -mx-1 overflow-x-auto sm:mx-0">
            <BaseCaseDataTable />
          </div>
        )}
      </div>
    </section>
  );
}
