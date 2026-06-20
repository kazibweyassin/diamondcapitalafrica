"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { searchContent } from "@/lib/search";
import type { SearchResult } from "@/types";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    setResults(searchContent(query));
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-4 pt-24">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search size={20} className="text-muted" />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, news, services..."
            className="flex-1 text-sm outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="text-muted transition hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {query && results.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-muted">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}

          {results.map((result) => (
            <Link
              key={`${result.href}-${result.title}`}
              href={result.href}
              onClick={onClose}
              className="block rounded px-4 py-3 transition hover:bg-section-alt"
            >
              <p className="text-sm font-medium text-primary">{result.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted">
                {result.excerpt}
              </p>
              <p className="mt-1 text-xs font-medium text-gold-dark">
                {result.category}
              </p>
            </Link>
          ))}

          {!query && (
            <p className="px-4 py-8 text-center text-sm text-muted">
              Type to search across the site
            </p>
          )}
        </div>
      </div>
    </div>
  );
}