"use client";

import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";
import type { NewsItem } from "@/types";

interface NewsListItemProps {
  item: NewsItem;
}

export default function NewsListItem({ item }: NewsListItemProps) {
  return (
    <li className="group flex items-start gap-4 py-5">
      <Link
        href={`/news/${item.slug}`}
        className="flex min-w-0 flex-1 items-start gap-4 transition hover:bg-section-alt"
      >
        <div className="flex shrink-0 flex-col items-center rounded bg-primary px-3 py-2 text-white">
          <span className="text-xs font-medium uppercase">{item.month}</span>
          <span className="text-xl font-bold leading-none">{item.day}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground transition group-hover:text-primary md:text-base">
            {item.title}
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted">
            <FileText size={12} />
            {item.type === "article" ? "Industry news" : item.type}
            {item.size ? ` · ${item.size}` : ""}
          </p>
        </div>
      </Link>
      {item.sourceUrl && (
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open document for ${item.title}`}
          className="shrink-0 rounded border border-border p-2 text-muted transition hover:border-gold hover:text-gold"
        >
          <ExternalLink size={16} />
        </a>
      )}
    </li>
  );
}