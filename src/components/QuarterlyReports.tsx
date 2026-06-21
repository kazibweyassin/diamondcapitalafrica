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
    <section className="py-8 sm:py-12" id="quarterly-reports">
      <SectionHeader title="Quarterly reports" />
      <p className="mb-4 text-sm text-muted sm:mb-6">
        Operational highlights for {quarterlyStats.period},{" "}
        {quarterlyStats.asAt.toLowerCase()}.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {quarterlyStats.metrics.map((stat, index) => (
          <div
            key={stat.label}
            className={`border-l-4 border-gold bg-white p-3 shadow-sm sm:p-5 ${
              !expanded && index >= MOBILE_VISIBLE ? "hidden sm:block" : ""
            }`}
          >
            <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted sm:mb-1 sm:text-xs">
              {stat.label}
            </p>
            <p className="text-lg font-bold text-primary sm:text-2xl md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs text-muted sm:mt-1 sm:text-sm">
              {stat.suffix}
            </p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold sm:hidden"
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