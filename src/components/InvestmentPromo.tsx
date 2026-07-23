import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { investmentOverviewPdf } from "@/data/investment";

export default function InvestmentPromo() {
  return (
    <section
      className="border-y border-border bg-section-alt py-10 sm:py-14"
      aria-labelledby="investment-promo-heading"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8 md:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold sm:text-sm">
              Strategic capital
            </p>
            <h2
              id="investment-promo-heading"
              className="mb-3 text-xl font-bold text-primary sm:text-2xl md:text-3xl"
            >
              Help Build East Africa&apos;s Integrated Precious Metals Platform
            </h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              Diamond Capital Africa is seeking strategic partners to support
              the development of a proposed modern refinery, assay laboratory
              and responsible-sourcing infrastructure.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
            <Link
              href="/investors/investment-opportunity"
              className="inline-flex min-h-11 items-center gap-2 rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Explore the Opportunity
              <ArrowRight size={16} aria-hidden />
            </Link>
            <a
              href={investmentOverviewPdf.path}
              download={investmentOverviewPdf.filename}
              className="inline-flex min-h-11 items-center gap-2 rounded border border-border px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-gold hover:bg-section-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Download size={16} aria-hidden />
              Download Overview
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
