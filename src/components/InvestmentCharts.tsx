"use client";

import { useEffect, useId, useState, type MouseEvent } from "react";
import {
  investmentFinancialOutlook,
  investmentScenarios,
  investmentUseOfFunds,
} from "@/data/investment";

const PRIMARY = "#003b49";
const GOLD = "#c5a572";
const GOLD_DARK = "#a68b4b";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";
const TRACK = "#f8f9fa";
const NEGATIVE = "#b45353";

type TooltipState = {
  x: number;
  y: number;
  lines: string[];
} | null;

function ChartTooltip({ tip }: { tip: TooltipState }) {
  if (!tip) return null;
  return (
    <div
      role="tooltip"
      className="pointer-events-none absolute z-20 max-w-[220px] border border-border bg-white px-3 py-2 text-xs text-foreground shadow-md"
      style={{
        left: tip.x,
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

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useChartReady() {
  const [ready, setReady] = useState(false);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);
  return { ready, reduced };
}

function HorizontalBarChart({
  items,
  valueLabel,
}: {
  items: { label: string; value: number; display: string }[];
  valueLabel: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  const { ready, reduced } = useChartReady();
  const [tip, setTip] = useState<TooltipState>(null);
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className="relative space-y-3"
      role="img"
      aria-label={valueLabel}
      onMouseLeave={() => {
        setTip(null);
        setActive(null);
      }}
    >
      <ChartTooltip tip={tip} />
      {items.map((item) => (
        <div
          key={item.label}
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const parent = e.currentTarget.offsetParent as HTMLElement | null;
            const pref = parent?.getBoundingClientRect();
            setActive(item.label);
            setTip({
              x: (rect.left - (pref?.left ?? 0)) + rect.width / 2,
              y: rect.top - (pref?.top ?? 0),
              lines: [item.label, item.display, "Of USD 4.0M preliminary capital"],
            });
          }}
        >
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 text-foreground">{item.label}</span>
            <span className="shrink-0 font-semibold text-primary">
              {item.display}
            </span>
          </div>
          <div className="h-3 w-full bg-border" aria-hidden>
            <div
              className={`h-full bg-gold transition-[width,opacity] duration-700 ease-out ${
                active === item.label ? "opacity-100" : "opacity-90"
              }`}
              style={{
                width: ready ? `${(item.value / max) * 100}%` : "0%",
                transitionDuration: reduced ? "0ms" : "700ms",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function GroupedBarChart() {
  const data = investmentFinancialOutlook;
  const [showRevenue, setShowRevenue] = useState(true);
  const [showEbitda, setShowEbitda] = useState(true);
  const [tip, setTip] = useState<TooltipState>(null);
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const { ready, reduced } = useChartReady();
  const chartId = useId();

  const values: number[] = [];
  if (showRevenue) values.push(...data.map((d) => d.revenueMusd));
  if (showEbitda) values.push(...data.map((d) => Math.abs(d.ebitdaMusd)));
  const chartMax = Math.max(...values, 0.1) * 1.15;

  const width = 560;
  const height = 260;
  const pad = { top: 16, right: 12, bottom: 36, left: 40 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const groupW = plotW / data.length;
  const barW = groupW * 0.28;

  function yScale(v: number) {
    return pad.top + plotH - (v / chartMax) * plotH;
  }

  const ticks = [0, chartMax / 2, chartMax];

  function barProps(
    key: string,
    lines: string[],
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    return {
      onMouseEnter: (e: MouseEvent<SVGRectElement>) => {
        const svg = e.currentTarget.ownerSVGElement;
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
      },
      onMouseLeave: () => {
        setHoverKey(null);
        setTip(null);
      },
    };
  }

  return (
    <div className="relative w-full overflow-x-auto">
      <ChartTooltip tip={tip} />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto h-auto w-full min-w-[300px] max-w-xl"
        role="img"
        aria-labelledby={`${chartId}-title`}
      >
        <title id={`${chartId}-title`}>
          Illustrative revenue and EBITDA (base case)
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
                x={pad.left - 8}
                y={y + 4}
                textAnchor="end"
                fill={MUTED}
                fontSize={11}
              >
                ${t.toFixed(1)}M
              </text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const cx = pad.left + groupW * i + groupW / 2;
          const revH = ready ? (d.revenueMusd / chartMax) * plotH : 0;
          const ebitdaH = ready
            ? (Math.abs(d.ebitdaMusd) / chartMax) * plotH
            : 0;
          const revY = yScale(d.revenueMusd);
          const ebitdaPositive = d.ebitdaMusd >= 0;
          const ebitdaY = ebitdaPositive ? yScale(d.ebitdaMusd) : yScale(0);
          const revKey = `${d.year}-rev`;
          const ebitdaKey = `${d.year}-ebitda`;
          const ebitdaLabel =
            d.ebitdaMusd < 0
              ? `EBITDA −$${Math.abs(d.ebitdaMusd).toFixed(2)}M`
              : `EBITDA $${d.ebitdaMusd.toFixed(2)}M`;

          return (
            <g key={d.year}>
              {showRevenue && (
                <rect
                  x={cx - barW - 3}
                  y={revY + ((d.revenueMusd / chartMax) * plotH - revH)}
                  width={barW}
                  height={revH}
                  fill={PRIMARY}
                  opacity={hoverKey && hoverKey !== revKey ? 0.35 : 1}
                  className={
                    reduced ? undefined : "transition-all duration-700 ease-out"
                  }
                  style={{ cursor: "pointer" }}
                  {...barProps(
                    revKey,
                    [d.label, `Operating revenue $${d.revenueMusd.toFixed(2)}M`],
                    cx - barW - 3,
                    revY,
                    barW,
                    revH
                  )}
                />
              )}
              {showEbitda && (
                <rect
                  x={cx + 3}
                  y={
                    ebitdaPositive
                      ? ebitdaY +
                        ((Math.abs(d.ebitdaMusd) / chartMax) * plotH - ebitdaH)
                      : ebitdaY
                  }
                  width={barW}
                  height={ebitdaH}
                  fill={ebitdaPositive ? GOLD : NEGATIVE}
                  opacity={hoverKey && hoverKey !== ebitdaKey ? 0.35 : 1}
                  className={
                    reduced ? undefined : "transition-all duration-700 ease-out"
                  }
                  style={{ cursor: "pointer" }}
                  {...barProps(
                    ebitdaKey,
                    [d.label, ebitdaLabel, "Illustrative base case"],
                    cx + 3,
                    ebitdaPositive ? ebitdaY : ebitdaY,
                    barW,
                    ebitdaH
                  )}
                />
              )}
              <text
                x={cx}
                y={height - 12}
                textAnchor="middle"
                fill={PRIMARY}
                fontSize={12}
                fontWeight={600}
              >
                {d.year}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
        <button
          type="button"
          onClick={() => setShowRevenue((v) => !v)}
          aria-pressed={showRevenue}
          className={`inline-flex items-center gap-2 rounded border px-2.5 py-1.5 transition ${
            showRevenue
              ? "border-primary bg-primary text-white"
              : "border-border text-muted hover:border-primary"
          }`}
        >
          <span
            className="inline-block h-2.5 w-3.5"
            style={{ background: showRevenue ? "#fff" : PRIMARY }}
          />
          Operating revenue
        </button>
        <button
          type="button"
          onClick={() => setShowEbitda((v) => !v)}
          aria-pressed={showEbitda}
          className={`inline-flex items-center gap-2 rounded border px-2.5 py-1.5 transition ${
            showEbitda
              ? "border-gold-dark bg-gold text-primary"
              : "border-border text-muted hover:border-gold"
          }`}
        >
          <span
            className="inline-block h-2.5 w-3.5"
            style={{ background: showEbitda ? PRIMARY : GOLD }}
          />
          EBITDA
        </button>
      </div>
      {!showRevenue && !showEbitda && (
        <p className="mt-2 text-center text-xs text-muted">
          Select at least one series above to display the chart.
        </p>
      )}
    </div>
  );
}

function ThroughputBarChart() {
  const data = investmentFinancialOutlook;
  const max = Math.max(...data.map((d) => d.annualThroughputKg));
  const width = 560;
  const height = 220;
  const pad = { top: 20, right: 12, bottom: 36, left: 48 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const barGap = 16;
  const barW = (plotW - barGap * (data.length - 1)) / data.length;
  const { ready, reduced } = useChartReady();
  const [tip, setTip] = useState<TooltipState>(null);
  const [hoverYear, setHoverYear] = useState<string | null>(null);

  return (
    <div className="relative w-full overflow-x-auto">
      <ChartTooltip tip={tip} />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto h-auto w-full min-w-[300px] max-w-xl"
        role="img"
        aria-label="Illustrative annual throughput in kilograms, base case"
      >
        <title>Illustrative annual throughput (kg)</title>
        {[0, 0.5, 1].map((f) => {
          const v = max * f;
          const y = pad.top + plotH - f * plotH;
          return (
            <g key={f}>
              <line
                x1={pad.left}
                x2={width - pad.right}
                y1={y}
                y2={y}
                stroke={BORDER}
                strokeWidth={1}
              />
              <text
                x={pad.left - 8}
                y={y + 4}
                textAnchor="end"
                fill={MUTED}
                fontSize={11}
              >
                {Math.round(v)}
              </text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const fullH = (d.annualThroughputKg / max) * plotH;
          const h = ready ? fullH : 0;
          const x = pad.left + i * (barW + barGap);
          const y = pad.top + plotH - h;
          return (
            <g key={d.year}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                fill={GOLD_DARK}
                opacity={hoverYear && hoverYear !== d.year ? 0.35 : 1}
                className={
                  reduced ? undefined : "transition-all duration-700 ease-out"
                }
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => {
                  const svg = e.currentTarget.ownerSVGElement;
                  if (!svg) return;
                  const pt = svg.createSVGPoint();
                  pt.x = x + barW / 2;
                  pt.y = y;
                  const ctm = svg.getScreenCTM();
                  if (!ctm) return;
                  const screen = pt.matrixTransform(ctm);
                  const wrap = svg.parentElement?.getBoundingClientRect();
                  setHoverYear(d.year);
                  setTip({
                    x: screen.x - (wrap?.left ?? 0),
                    y: screen.y - (wrap?.top ?? 0),
                    lines: [
                      d.label,
                      `Throughput ${d.annualThroughputKg.toLocaleString()} kg`,
                      "Illustrative base case",
                    ],
                  });
                }}
                onMouseLeave={() => {
                  setHoverYear(null);
                  setTip(null);
                }}
              />
              <text
                x={x + barW / 2}
                y={Math.max(y - 6, 12)}
                textAnchor="middle"
                fill={PRIMARY}
                fontSize={11}
                fontWeight={600}
              >
                {d.annualThroughputKg}
              </text>
              <text
                x={x + barW / 2}
                y={height - 12}
                textAnchor="middle"
                fill={PRIMARY}
                fontSize={12}
                fontWeight={600}
              >
                {d.year}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-center text-xs text-muted">
        Annual throughput (kg) — base case, post-commissioning years. Hover a
        bar for detail.
      </p>
    </div>
  );
}

function ScenarioBars() {
  const max = Math.max(...investmentScenarios.map((s) => s.y5RevenueMusd));
  const { ready, reduced } = useChartReady();
  const [tip, setTip] = useState<TooltipState>(null);
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className="relative space-y-4"
      role="img"
      aria-label="Year 5 revenue by scenario"
      onMouseLeave={() => {
        setTip(null);
        setActive(null);
      }}
    >
      <ChartTooltip tip={tip} />
      {investmentScenarios.map((s) => {
        const color =
          s.name === "Base case"
            ? PRIMARY
            : s.name === "Upside"
              ? GOLD
              : MUTED;
        return (
          <div
            key={s.name}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const parent = e.currentTarget.offsetParent as HTMLElement | null;
              const pref = parent?.getBoundingClientRect();
              setActive(s.name);
              setTip({
                x: (rect.left - (pref?.left ?? 0)) + rect.width / 2,
                y: rect.top - (pref?.top ?? 0),
                lines: [
                  s.name,
                  `Y5 revenue $${s.y5RevenueMusd.toFixed(2)}M`,
                  `Y5 throughput ${s.y5ThroughputKg.toLocaleString()} kg`,
                  `5-year EBITDA $${s.fiveYearEbitdaMusd.toFixed(2)}M`,
                ],
              });
            }}
          >
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2 text-sm">
              <span className="font-medium text-primary">{s.name}</span>
              <span className="text-xs text-muted sm:text-sm">
                Y5 revenue ${s.y5RevenueMusd.toFixed(2)}M ·{" "}
                {s.y5ThroughputKg.toLocaleString()} kg
              </span>
            </div>
            <div className="h-3.5 w-full" style={{ background: TRACK }} aria-hidden>
              <div
                className="h-full transition-[width,opacity] duration-700 ease-out"
                style={{
                  width: ready ? `${(s.y5RevenueMusd / max) * 100}%` : "0%",
                  background: color,
                  opacity: active && active !== s.name ? 0.4 : 1,
                  transitionDuration: reduced ? "0ms" : "700ms",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function InvestmentCharts() {
  const fundsItems = investmentUseOfFunds.map((f) => ({
    label: f.label,
    value: f.percent,
    display: `${f.percent.toFixed(1)}%`,
  }));

  return (
    <section className="mb-16" aria-labelledby="charts-heading">
      <h2 id="charts-heading" className="mb-2 text-2xl font-bold text-primary">
        Illustrative charts
      </h2>
      <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted">
        Hover bars for detail. On the revenue chart, use the legend buttons to
        show or hide series.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="border border-border p-5 sm:p-6">
          <h3 className="mb-1 text-base font-bold text-primary">
            Use of funds
          </h3>
          <p className="mb-5 text-xs text-muted">
            Preliminary capital allocation (USD 4.0 million)
          </p>
          <HorizontalBarChart
            items={fundsItems}
            valueLabel="Use of funds allocation percentages"
          />
        </div>

        <div className="border border-border p-5 sm:p-6">
          <h3 className="mb-1 text-base font-bold text-primary">
            Year-5 scenarios
          </h3>
          <p className="mb-5 text-xs text-muted">
            Illustrative downside, base and upside cases
          </p>
          <ScenarioBars />
          <div className="mt-5 overflow-x-auto border border-border">
            <table className="w-full min-w-[280px] text-left text-xs sm:text-sm">
              <thead className="bg-section-alt text-muted">
                <tr>
                  <th className="px-3 py-2 font-semibold">Scenario</th>
                  <th className="px-3 py-2 text-right font-semibold">
                    Y5 throughput
                  </th>
                  <th className="px-3 py-2 text-right font-semibold">
                    5-yr EBITDA
                  </th>
                </tr>
              </thead>
              <tbody>
                {investmentScenarios.map((s) => (
                  <tr key={s.name} className="border-t border-border">
                    <td className="px-3 py-2 text-foreground">{s.name}</td>
                    <td className="px-3 py-2 text-right text-foreground">
                      {s.y5ThroughputKg.toLocaleString()} kg
                    </td>
                    <td className="px-3 py-2 text-right font-medium text-primary">
                      ${s.fiveYearEbitdaMusd.toFixed(2)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border border-border p-5 sm:p-6">
          <h3 className="mb-1 text-base font-bold text-primary">
            Operating revenue &amp; EBITDA
          </h3>
          <p className="mb-5 text-xs text-muted">
            Illustrative five-year base case (USD millions)
          </p>
          <GroupedBarChart />
        </div>

        <div className="border border-border p-5 sm:p-6">
          <h3 className="mb-1 text-base font-bold text-primary">
            Throughput ramp
          </h3>
          <p className="mb-5 text-xs text-muted">
            Illustrative annual throughput (kg), base case
          </p>
          <ThroughputBarChart />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto border border-border">
        <table className="w-full min-w-[480px] text-left text-sm">
          <caption className="bg-section-alt px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">
            Base-case series (source: Investment Overview)
          </caption>
          <thead className="border-t border-border text-xs font-semibold uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Metric</th>
              {investmentFinancialOutlook.map((d) => (
                <th key={d.year} className="px-4 py-3 text-right">
                  {d.year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-3 text-foreground">Annual throughput</td>
              {investmentFinancialOutlook.map((d) => (
                <td key={d.year} className="px-4 py-3 text-right text-foreground">
                  {d.annualThroughputKg.toLocaleString()} kg
                </td>
              ))}
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 text-foreground">Operating revenue</td>
              {investmentFinancialOutlook.map((d) => (
                <td key={d.year} className="px-4 py-3 text-right text-foreground">
                  ${d.revenueMusd.toFixed(2)}M
                </td>
              ))}
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 text-foreground">EBITDA</td>
              {investmentFinancialOutlook.map((d) => (
                <td
                  key={d.year}
                  className="px-4 py-3 text-right font-medium text-primary"
                >
                  {d.ebitdaMusd < 0 ? "−" : ""}$
                  {Math.abs(d.ebitdaMusd).toFixed(2)}M
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
