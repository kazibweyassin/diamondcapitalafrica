"use client";

import { FileText, ExternalLink } from "lucide-react";

interface DocumentDownloadButtonProps {
  slug: string;
  title: string;
  type: string;
  sourceUrl: string;
  kind?: "document" | "webcast";
}

export default function DocumentDownloadButton({
  slug,
  title,
  type,
  sourceUrl,
  kind = "document",
}: DocumentDownloadButtonProps) {
  const href = sourceUrl || `/api/documents/${slug}`;
  const isExternal = sourceUrl.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
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
    </a>
  );
}