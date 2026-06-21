"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import NewsListItem from "./NewsListItem";
import type { NewsItem } from "@/types";

interface ExpandableNewsListProps {
  items: NewsItem[];
  mobileVisible?: number;
  expandLabel?: string;
}

export default function ExpandableNewsList({
  items,
  mobileVisible = 2,
  expandLabel = "items",
}: ExpandableNewsListProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > mobileVisible;

  return (
    <>
      <ul className="divide-y divide-border">
        {items.map((item, index) => (
          <div
            key={item.slug}
            className={
              !expanded && index >= mobileVisible ? "hidden sm:contents" : "contents"
            }
          >
            <NewsListItem item={item} />
          </div>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold sm:hidden"
        >
          {expanded
            ? "Show fewer"
            : `View all ${expandLabel} (${items.length})`}
          <ArrowRight
            size={14}
            className={`transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </button>
      )}
    </>
  );
}