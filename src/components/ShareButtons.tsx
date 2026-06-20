"use client";

import { useState } from "react";
import { Mail, Link2, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-muted">Share:</span>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 text-xs font-medium transition hover:border-gold hover:text-gold"
      >
        <Mail size={14} />
        Email
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 text-xs font-medium transition hover:border-gold hover:text-gold"
      >
        {copied ? <Check size={14} /> : <Link2 size={14} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}