import Link from "next/link";
import { investmentOverviewPdf } from "@/data/investment";

export default function InvestmentPromo() {
  return (
    <section
      className="bg-section-alt py-10 sm:py-14"
      aria-labelledby="investment-promo-heading"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="border border-border bg-white p-6 sm:p-8 md:flex md:items-center md:justify-between md:gap-10 md:p-10">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
              Strategic capital
            </p>
            <h2
              id="investment-promo-heading"
              className="mb-3 text-xl font-bold text-primary sm:text-2xl"
            >
              Help Build East Africa&apos;s Integrated Precious Metals Platform
            </h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              Diamond Capital Africa is seeking strategic partners to support
              the development of a proposed modern refinery, assay laboratory
              and responsible-sourcing infrastructure.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
            <Link
              href="/investors/investment-opportunity"
              className="inline-flex min-h-11 items-center rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light"
            >
              Explore the Opportunity
            </Link>
            <a
              href={investmentOverviewPdf.path}
              download={investmentOverviewPdf.filename}
              className="inline-flex min-h-11 items-center rounded border border-border px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-gold hover:bg-section-alt"
            >
              Download Overview
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
