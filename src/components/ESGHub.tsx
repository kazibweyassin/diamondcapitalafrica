"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { esgCards } from "@/data/content";

const MOBILE_VISIBLE = 2;

export default function ESGHub() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = esgCards.length > MOBILE_VISIBLE;

  return (
    <section className="bg-section-alt py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader title="Our ESG transparency hub" />
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted sm:mb-10 sm:text-base">
          We are committed to being responsible stewards of the environments in
          which we operate, the gold entrusted to us by our mining partners, and
          the capital provided by our stakeholders. Sustainability is embedded
          in our business as a driver for long-term value and community trust.
        </p>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {esgCards.map((card, index) => (
            <Link
              key={card.title}
              href="/sustainability"
              className={`group overflow-hidden rounded-lg bg-white shadow-sm transition hover:shadow-md ${
                !expanded && index >= MOBILE_VISIBLE ? "hidden sm:block" : ""
              }`}
            >
              <div className="relative h-36 overflow-hidden sm:h-48">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="mb-2 text-base font-bold text-primary sm:text-lg">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {card.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition group-hover:text-gold sm:mt-4">
                  Read more
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold sm:hidden"
          >
            {expanded ? "Show fewer topics" : `View all topics (${esgCards.length})`}
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