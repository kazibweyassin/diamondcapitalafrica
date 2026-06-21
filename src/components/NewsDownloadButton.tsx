"use client";

import { ExternalLink } from "lucide-react";

interface NewsDownloadButtonProps {
  sourceUrl: string;
  title: string;
}

export default function NewsDownloadButton({
  sourceUrl,
  title,
}: NewsDownloadButtonProps) {
  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded bg-gold px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gold-light"
    >
      <ExternalLink size={16} />
      Read full article
    </a>
  );
}