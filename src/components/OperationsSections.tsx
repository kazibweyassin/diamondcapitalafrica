"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Gauge, MapPin } from "lucide-react";

interface Operation {
  id: string;
  title: string;
  location: string;
  description: string;
  capacity: string;
  image: string;
  imageAlt?: string;
}

const MOBILE_VISIBLE = 2;

export default function OperationsSections({
  operations,
}: {
  operations: Operation[];
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = operations.length > MOBILE_VISIBLE;

  return (
    <>
      {operations.map((op, index) => (
        <section
          key={op.id}
          id={op.id}
          className={`mb-12 grid items-center gap-6 sm:mb-16 sm:gap-8 lg:grid-cols-2 ${
            index > 0 ? "border-t border-border pt-12 sm:pt-16" : ""
          } ${!expanded && index >= MOBILE_VISIBLE ? "hidden sm:grid" : ""}`}
        >
          <div className={index % 2 === 1 ? "lg:order-2" : ""}>
            <h2 className="mb-2 text-xl font-bold text-primary sm:text-2xl">
              {op.title}
            </h2>
            <div className="mb-3 flex flex-wrap gap-3 text-sm text-muted sm:mb-4 sm:gap-4">
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-gold" />
                {op.location}
              </span>
              <span className="flex items-center gap-1">
                <Gauge size={14} className="text-gold" />
                {op.capacity}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {op.description}
            </p>
          </div>
          <div
            className={`relative h-48 overflow-hidden rounded-lg shadow-lg sm:h-64 lg:h-72 ${
              index % 2 === 1 ? "lg:order-1" : ""
            }`}
          >
            <Image
              src={op.image}
              alt={op.imageAlt ?? op.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>
      ))}
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold sm:hidden"
        >
          {expanded
            ? "Show fewer operations"
            : `View all operations (${operations.length})`}
          <ArrowRight
            size={14}
            className={`transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </button>
      )}
    </>
  );
}