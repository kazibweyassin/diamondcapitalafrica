"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { company, companyStats } from "@/data/content";

const MOBILE_VISIBLE = 3;

export default function CompanyStats() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = companyStats.length > MOBILE_VISIBLE;

  return (
    <section className="bg-section-alt py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 max-w-3xl sm:mb-12">
          <h2 className="mb-3 text-xl font-bold text-primary sm:mb-4 sm:text-2xl md:text-3xl">
            The world of {company.name}
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-muted sm:mb-6 sm:text-base">
            {company.name} is a leading gold dealing and refining company
            across East and Central Africa, operating collection centres and
            exporting LBMA-standard gold bars to international markets. We
            combine regional expertise with global standards to deliver value at
            every stage of the gold value chain.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
            >
              Corporate profile
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/operations"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
            >
              Our operations
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/network"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
            >
              Institutional Network
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted sm:mb-6">
          As at 31 December 2025
        </p>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {companyStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`border-l-4 border-gold bg-white p-3 shadow-sm sm:p-6 ${
                !expanded && index >= MOBILE_VISIBLE ? "hidden sm:block" : ""
              }`}
            >
              <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted sm:mb-1 sm:text-xs">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-primary sm:text-3xl">
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
              ? "Show fewer stats"
              : `View all stats (${companyStats.length})`}
            <ArrowRight
              size={14}
              className={`transition-transform ${expanded ? "rotate-90" : ""}`}
            />
          </button>
        )}
      </div>
    </section>
  );
}