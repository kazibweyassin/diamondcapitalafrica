"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { quarterlyStats } from "@/data/content";

const MOBILE_VISIBLE = 3;

export default function QuarterlyReports() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = quarterlyStats.metrics.length > MOBILE_VISIBLE;

  return (
    <section className="py-12" id="quarterly-reports">
      <SectionHeader title="Quarterly reports" />
      <p className="mb-6 text-sm text-muted">
        Operational highlights for {quarterlyStats.period},{" "}
        {quarterlyStats.asAt.toLowerCase()}.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {quarterlyStats.metrics.map((stat, index) => (
          <div
            key={stat.label}
            className={`border-l-4 border-gold bg-white p-4 shadow-sm sm:p-5 ${
              !expanded && index >= MOBILE_VISIBLE ? "hidden lg:block" : ""
            }`}
          >
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
              {stat.label}
            </p>
            <p className="text-xl font-bold text-primary sm:text-2xl md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.suffix}</p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold lg:hidden"
        >
          {expanded
            ? "Show fewer metrics"
            : `View all metrics (${quarterlyStats.metrics.length})`}
          <ArrowRight
            size={14}
            className={`transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </button>
      )}
    </section>
  );
}