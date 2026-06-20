"use client";

import { Download } from "lucide-react";

interface NewsDownloadButtonProps {
  slug: string;
  title: string;
}

export default function NewsDownloadButton({
  slug,
  title,
}: NewsDownloadButtonProps) {
  return (
    <a
      href={`/api/documents/news-${slug}`}
      download
      className="inline-flex items-center gap-2 rounded bg-gold px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gold-light"
    >
      <Download size={16} />
      Download document
    </a>
  );
}