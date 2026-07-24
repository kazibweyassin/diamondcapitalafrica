"use client";

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
      <div className="hidden overflow-hidden border border-border bg-section-alt md:block">
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

      <div className="border border-border bg-white p-6 md:hidden">
        <p className="font-semibold text-primary">{title}</p>
        <p className="mt-1 text-sm text-muted">
          PDF · {investmentOverviewPdf.pages} pages ·{" "}
          {investmentOverviewPdf.published}
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpen}
            className="inline-flex min-h-11 items-center justify-center rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light"
          >
            Open PDF
          </a>
          <a
            href={path}
            download={filename}
            onClick={handleDownload}
            className="inline-flex min-h-11 items-center justify-center rounded border border-border px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-gold hover:bg-section-alt"
          >
            Download PDF
          </a>
        </div>
      </div>

      <div className="hidden flex-wrap gap-4 md:flex">
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleOpen}
          className="text-sm font-semibold text-gold-dark transition hover:text-gold"
        >
          Open PDF in new tab
        </a>
        <a
          href={path}
          download={filename}
          onClick={handleDownload}
          className="text-sm font-semibold text-gold-dark transition hover:text-gold"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
