"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const CITIES = [
  "Kampala",
  "Mbarara",
  "Fort Portal",
  "Jinja",
  "Gulu",
  "Mbale",
  "Arua",
  "Moroto",
];

const MOBILE_VISIBLE = 4;

export default function NationalCoverage() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = CITIES.length > MOBILE_VISIBLE;

  return (
    <section className="rounded-lg bg-primary p-6 text-white sm:p-8 md:p-12">
      <h2 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">
        National Coverage
      </h2>
      <p className="mb-6 max-w-2xl text-sm text-white/80 sm:mb-8 sm:text-base">
        Our eight collection centres ensure miners across Uganda have access to
        fair, transparent gold buying, reducing informal trade and strengthening
        the formal economy.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
        {CITIES.map((city, index) => (
          <div
            key={city}
            className={`rounded border border-white/20 px-3 py-2.5 text-center text-sm font-medium sm:px-4 sm:py-3 ${
              !expanded && index >= MOBILE_VISIBLE ? "hidden sm:block" : ""
            }`}
          >
            {city}
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold transition hover:text-gold-light sm:hidden"
        >
          {expanded
            ? "Show fewer centres"
            : `View all centres (${CITIES.length})`}
          <ArrowRight
            size={14}
            className={`transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </button>
      )}
    </section>
  );
}