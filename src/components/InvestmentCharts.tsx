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

function HorizontalBarChart({
  items,
  valueLabel,
}: {
  items: { label: string; value: number; display: string }[];
  valueLabel: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="space-y-3" role="img" aria-label={valueLabel}>
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 text-foreground">{item.label}</span>
            <span className="shrink-0 font-semibold text-primary">
              {item.display}
            </span>
          </div>
          <div className="h-2.5 w-full bg-border" aria-hidden>
            <div
              className="h-full bg-gold"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function GroupedBarChart() {
  const data = investmentFinancialOutlook;
  const maxRev = Math.max(...data.map((d) => d.revenueMusd));
  const maxAbsEbitda = Math.max(
    ...data.map((d) => Math.abs(d.ebitdaMusd)),
    0.1
  );
  const chartMax = Math.max(maxRev, maxAbsEbitda) * 1.15;

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

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto h-auto w-full min-w-[300px] max-w-xl"
        role="img"
        aria-label="Illustrative operating revenue and EBITDA by year, base case"
      >
        <title>Illustrative revenue and EBITDA (base case)</title>
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
          const revH = (d.revenueMusd / chartMax) * plotH;
          const ebitdaH = (Math.abs(d.ebitdaMusd) / chartMax) * plotH;
          const revY = yScale(d.revenueMusd);
          const ebitdaPositive = d.ebitdaMusd >= 0;
          const ebitdaY = ebitdaPositive
            ? yScale(d.ebitdaMusd)
            : yScale(0);
          const ebitdaBarH = ebitdaH;

          return (
            <g key={d.year}>
              <rect
                x={cx - barW - 3}
                y={revY}
                width={barW}
                height={revH}
                fill={PRIMARY}
              />
              <rect
                x={cx + 3}
                y={ebitdaY}
                width={barW}
                height={ebitdaBarH}
                fill={ebitdaPositive ? GOLD : "#b45353"}
              />
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
      <div className="mt-3 flex flex-wrap justify-center gap-5 text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-4" style={{ background: PRIMARY }} />
          Operating revenue
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-4" style={{ background: GOLD }} />
          EBITDA
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-4 bg-[#b45353]" />
          Negative EBITDA
        </span>
      </div>
    </div>
  );
}

function ThroughputBarChart() {
  const data = investmentFinancialOutlook;
  const max = Math.max(...data.map((d) => d.annualThroughputKg));
  const width = 560;
  const height = 220;
  const pad = { top: 12, right: 12, bottom: 36, left: 48 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const barGap = 16;
  const barW = (plotW - barGap * (data.length - 1)) / data.length;

  return (
    <div className="w-full overflow-x-auto">
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
          const h = (d.annualThroughputKg / max) * plotH;
          const x = pad.left + i * (barW + barGap);
          const y = pad.top + plotH - h;
          return (
            <g key={d.year}>
              <rect x={x} y={y} width={barW} height={h} fill={GOLD_DARK} />
              <text
                x={x + barW / 2}
                y={y - 6}
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
        Annual throughput (kg) — base case, post-commissioning years
      </p>
    </div>
  );
}

function ScenarioBars() {
  const max = Math.max(...investmentScenarios.map((s) => s.y5RevenueMusd));

  return (
    <div className="space-y-4" role="img" aria-label="Year 5 revenue by scenario">
      {investmentScenarios.map((s) => (
        <div key={s.name}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="font-medium text-primary">{s.name}</span>
            <span className="text-muted">
              Y5 revenue ${s.y5RevenueMusd.toFixed(2)}M · throughput{" "}
              {s.y5ThroughputKg.toLocaleString()} kg
            </span>
          </div>
          <div className="h-3 w-full" style={{ background: TRACK }} aria-hidden>
            <div
              className="h-full"
              style={{
                width: `${(s.y5RevenueMusd / max) * 100}%`,
                background:
                  s.name === "Base case"
                    ? PRIMARY
                    : s.name === "Upside"
                      ? GOLD
                      : MUTED,
              }}
            />
          </div>
        </div>
      ))}
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
        Figures below are taken from the public Investment Overview base case
        and scenario analysis. They are forward-looking management assumptions
        for discussion only, not forecasts, commitments or guarantees of
        returns.
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
