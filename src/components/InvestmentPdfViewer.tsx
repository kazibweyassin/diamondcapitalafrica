"use client";

import { Download, ExternalLink, FileText } from "lucide-react";
import { investmentOverviewPdf } from "@/data/investment";
import { trackEvent } from "@/lib/analytics";

export default function InvestmentPdfViewer() {
  const { path, title, filename } = investmentOverviewPdf;

  function handleOpen() {
    trackEvent("investment_overview_opened", { source: "viewer" });
  }

  function handleDownload() {
    trackEvent("investment_overview_downloaded", { source: "viewer" });
  }

  return (
    <div className="space-y-4">
      {/* Desktop / tablet embedded viewer */}
      <div className="hidden overflow-hidden rounded-lg border border-border bg-section-alt shadow-sm md:block">
        <object
          data={`${path}#view=FitH`}
          type="application/pdf"
          title={title}
          className="h-[750px] w-full"
        >
          <iframe
            src={path}
            title={title}
            className="h-[750px] w-full border-0"
            loading="lazy"
          />
        </object>
      </div>

      {/* Mobile fallback */}
      <div className="rounded-lg border border-border bg-white p-6 shadow-sm md:hidden">
        <div className="mb-4 flex items-start gap-3">
          <FileText className="mt-0.5 shrink-0 text-gold-dark" size={28} aria-hidden />
          <div>
            <p className="font-semibold text-primary">{title}</p>
            <p className="mt-1 text-sm text-muted">
              PDF · {investmentOverviewPdf.pages} pages ·{" "}
              {investmentOverviewPdf.published}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpen}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <ExternalLink size={16} aria-hidden />
            Open PDF
          </a>
          <a
            href={path}
            download={filename}
            onClick={handleDownload}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-border px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-gold hover:bg-section-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Download size={16} aria-hidden />
            Download PDF
          </a>
        </div>
      </div>

      <div className="hidden flex-wrap gap-3 md:flex">
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleOpen}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-dark transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <ExternalLink size={16} aria-hidden />
          Open PDF in new tab
        </a>
        <a
          href={path}
          download={filename}
          onClick={handleDownload}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-dark transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <Download size={16} aria-hidden />
          Download PDF
        </a>
      </div>
    </div>
  );
}
