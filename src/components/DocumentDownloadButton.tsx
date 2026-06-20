"use client";

import { FileText, ExternalLink } from "lucide-react";

interface DocumentDownloadButtonProps {
  slug: string;
  title: string;
  type: string;
  kind?: "document" | "webcast";
  onWebcast?: () => void;
}

export default function DocumentDownloadButton({
  slug,
  title,
  type,
  kind = "document",
  onWebcast,
}: DocumentDownloadButtonProps) {
  function handleClick() {
    if (kind === "webcast" && onWebcast) {
      onWebcast();
      return;
    }
    window.open(`/api/documents/${slug}`, "_blank");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex w-full items-center gap-3 rounded border border-border p-4 text-left transition hover:border-gold hover:bg-section-alt"
    >
      {kind === "webcast" ? (
        <ExternalLink
          size={16}
          className="shrink-0 text-gold-dark group-hover:text-gold"
        />
      ) : (
        <FileText
          size={18}
          className="shrink-0 text-gold-dark group-hover:text-gold"
        />
      )}
      <span className="text-sm font-medium text-foreground group-hover:text-primary">
        {title}
      </span>
      <span className="ml-auto text-xs uppercase text-muted">{type}</span>
    </button>
  );
}