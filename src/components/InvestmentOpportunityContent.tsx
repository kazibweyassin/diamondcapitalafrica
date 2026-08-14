"use client";

import Link from "next/link";
import Image from "next/image";
import {
  investmentDistributionProfile,
  investmentFaqs,
  investmentGlance,
  investmentNeeds,
  investmentOverviewPdf,
  investmentParticipationCards,
  investmentProjectComponents,
  investmentProtections,
  investmentRaiseAssumptions as assumptions,
  investmentRevenueStreams,
  investmentRiskDisclosures,
  investmentRoadmap,
} from "@/data/investment";
import { images } from "@/data/images";
import { trackEvent } from "@/lib/analytics";
import {
  calculateDistributionValue,
  calculateInvestorOwnership,
  calculatePostMoneyValuation,
  formatOwnershipPercent,
  formatUsd,
} from "@/lib/investment-calculations";
import InvestmentCalculators from "./InvestmentCalculators";
import InvestmentCharts from "./InvestmentCharts";
import InvestmentPdfViewer from "./InvestmentPdfViewer";
import InvestmentSectionNav from "./InvestmentSectionNav";
import InvestorEnquiryForm from "./InvestorEnquiryForm";

const postMoney = calculatePostMoneyValuation(
  assumptions.preMoneyValuationUsd,
  assumptions.roundSizeUsd
);
const exampleOwnership = calculateInvestorOwnership(
  assumptions.exampleInvestmentUsd,
  postMoney
);
const exampleDistribution = calculateDistributionValue(
  assumptions.exampleInvestmentUsd,
  0.08
);

export default function InvestmentOpportunityContent() {
  function handleHeroOpen() {
    trackEvent("investment_overview_opened", { source: "hero" });
  }

  function handleHeroDownload() {
    trackEvent("investment_overview_downloaded", { source: "hero" });
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[20rem] bg-primary py-10 sm:min-h-[22rem] sm:py-12 md:min-h-96 md:py-0">
        <Image
          src={images.pageHero.operations}
          alt="Strategic investment opportunity"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8 md:min-h-96">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold sm:text-sm">
            Strategic investment opportunity
          </p>
          <h1 className="max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
            Building East Africa&apos;s Integrated Precious Metals Platform
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            A proposed gold refining, assay and precious-metals platform
            connecting responsible African supply with international markets.
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
            <a
              href="#how-to-invest"
              className="inline-flex min-h-11 items-center justify-center rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light"
            >
              Explore investment structures
            </a>
            <a
              href="#investment-overview"
              onClick={handleHeroOpen}
              className="inline-flex min-h-11 items-center justify-center rounded border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Read overview
            </a>
            <a
              href="#investor-enquiry"
              className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-gold transition hover:text-gold-light sm:justify-start"
            >
              Request memorandum
            </a>
          </div>
        </div>
      </section>

      {/* Snapshot */}
      <section
        className="border-b border-border py-10 sm:py-12"
        aria-labelledby="glance-heading"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 id="glance-heading" className="sr-only">
            Investment at a glance
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {investmentGlance.map((card) => (
              <div
                key={card.label}
                className="border-l-4 border-gold bg-section-alt p-5"
              >
                <p className="text-2xl font-bold text-primary sm:text-3xl">
                  {card.value}
                </p>
                <p className="mt-2 text-sm text-foreground">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InvestmentSectionNav />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16 lg:px-8">
        {/* What + why */}
        <section
          id="opportunity"
          className="mb-12 scroll-mt-32 sm:mb-16 sm:scroll-mt-36 lg:scroll-mt-40"
          aria-labelledby="opportunity-heading"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2
                id="opportunity-heading"
                className="mb-4 text-2xl font-bold text-primary"
              >
                What is being built
              </h2>
              <p className="mb-6 leading-relaxed text-muted">
                Diamond Capital Africa is developing an integrated
                precious-metals platform: institutional-grade assaying,
                refining, secure logistics and responsible-sourcing controls.
                Investors may acquire an economic interest in real
                infrastructure — not simply exchange capital for gold.
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {investmentProjectComponents.map((item) => (
                  <li
                    key={item}
                    className="border border-border px-4 py-3 text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                Why it matters
              </h2>
              <div className="space-y-4">
                {investmentNeeds.map((item) => (
                  <div
                    key={item.title}
                    className="border-l-4 border-gold bg-section-alt px-4 py-3"
                  >
                    <h3 className="font-semibold text-primary">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
              Proposed revenue streams
            </h3>
            <ul className="flex flex-wrap gap-2">
              {investmentRevenueStreams.map((stream) => (
                <li
                  key={stream}
                  className="border border-border bg-white px-3 py-1.5 text-sm text-foreground"
                >
                  {stream}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How to invest */}
        <section
          id="how-to-invest"
          className="mb-12 scroll-mt-32 sm:mb-16 sm:scroll-mt-36 lg:scroll-mt-40"
          aria-labelledby="participate-heading"
        >
          <h2
            id="participate-heading"
            className="mb-3 text-xl font-bold text-primary sm:text-2xl"
          >
            How investors participate
          </h2>
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted sm:mb-8 sm:text-base">
            Structures can combine equity ownership, preferred economic rights
            and strategic partnership terms. Eligible distributions may
            potentially be settled in cash, refined physical gold, or both —
            subject to agreement, profitability and applicable law.
          </p>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {investmentParticipationCards.map((card) => (
              <div key={card.title} className="border border-border p-4 sm:p-6">
                <h3 className="mb-2 font-bold text-primary sm:mb-3">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* USD 1M snapshot */}
        <section
          className="mb-12 border border-border bg-primary p-4 text-white sm:mb-16 sm:p-8"
          aria-labelledby="one-million-heading"
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold">
                Illustrative example
              </p>
              <h2
                id="one-million-heading"
                className="mb-4 text-2xl font-bold sm:text-3xl"
              >
                What USD 1 million could look like
              </h2>
              <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                At an illustrative {formatUsd(assumptions.preMoneyValuationUsd)}{" "}
                pre-money valuation and {formatUsd(assumptions.roundSizeUsd)}{" "}
                raise ({formatUsd(postMoney)} post-money), a{" "}
                {formatUsd(assumptions.exampleInvestmentUsd)} commitment would
                represent approximately{" "}
                <strong className="text-gold">
                  {formatOwnershipPercent(exampleOwnership)} ownership
                </strong>
                .
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Ownership is set by agreed valuation — not simply investment ÷
                capital raised. An 8% approved distribution in a profitable year
                would be {formatUsd(exampleDistribution)}, potentially
                electable as cash, refined gold, or a hybrid.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="border border-white/15 bg-white/5 p-3 sm:p-4">
                <p className="text-[10px] uppercase tracking-wider text-white/60 sm:text-xs">
                  Ownership
                </p>
                <p className="mt-1.5 text-2xl font-bold text-gold sm:mt-2 sm:text-3xl">
                  {formatOwnershipPercent(exampleOwnership)}
                </p>
              </div>
              <div className="border border-white/15 bg-white/5 p-3 sm:p-4">
                <p className="text-[10px] uppercase tracking-wider text-white/60 sm:text-xs">
                  Post-money
                </p>
                <p className="mt-1.5 text-2xl font-bold text-white sm:mt-2 sm:text-3xl">
                  {formatUsd(postMoney).replace("USD ", "$")}
                </p>
              </div>
              <div className="border border-white/15 bg-white/5 p-3 sm:p-4">
                <p className="text-[10px] uppercase tracking-wider text-white/60 sm:text-xs">
                  8% distribution
                </p>
                <p className="mt-1.5 text-2xl font-bold text-white sm:mt-2 sm:text-3xl">
                  {formatUsd(exampleDistribution).replace("USD ", "$")}
                </p>
              </div>
              <div className="border border-white/15 bg-white/5 p-3 sm:p-4">
                <p className="text-[10px] uppercase tracking-wider text-white/60 sm:text-xs">
                  Settlement
                </p>
                <p className="mt-1.5 text-sm font-bold leading-snug text-white sm:mt-2 sm:text-lg">
                  Cash · Gold · Hybrid
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <div className="mb-12 sm:mb-16">
          <InvestmentCalculators />
        </div>

        {/* Distribution profile */}
        <section
          className="mb-12 sm:mb-16"
          aria-labelledby="dist-profile-heading"
        >
          <h2
            id="dist-profile-heading"
            className="mb-3 text-xl font-bold text-primary sm:text-2xl"
          >
            Illustrative distribution profile
          </h2>
          <p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted sm:mb-6">
            Distributions are not expected at scale during development. The
            profile is illustrative and subject to distributable profits.
          </p>

          {/* Mobile cards */}
          <ul className="space-y-2 sm:hidden">
            {investmentDistributionProfile.map((row) => (
              <li
                key={row.year}
                className="border border-border px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-primary">{row.year}</span>
                  <span className="text-sm font-semibold text-primary">
                    {row.rateLabel}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{row.stage}</p>
              </li>
            ))}
          </ul>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto border border-border sm:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-section-alt text-xs font-semibold uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Year</th>
                  <th className="px-4 py-3 font-semibold">Project stage</th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Illustrative distribution
                  </th>
                </tr>
              </thead>
              <tbody>
                {investmentDistributionProfile.map((row) => (
                  <tr key={row.year} className="border-t border-border">
                    <td className="px-4 py-3 font-medium text-primary">
                      {row.year}
                    </td>
                    <td className="px-4 py-3 text-foreground">{row.stage}</td>
                    <td className="px-4 py-3 text-right font-semibold text-primary">
                      {row.rateLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Financials */}
        <InvestmentCharts />

        {/* Roadmap + protections */}
        <section className="mb-12 grid gap-8 sm:mb-16 sm:gap-10 lg:grid-cols-2">
          <div aria-labelledby="roadmap-heading">
            <h2
              id="roadmap-heading"
              className="mb-4 text-xl font-bold text-primary sm:mb-5 sm:text-2xl"
            >
              Development pathway
            </h2>
            <ol className="space-y-3">
              {investmentRoadmap.map((step) => (
                <li
                  key={step.phase}
                  className="flex gap-3 border border-border px-4 py-3"
                >
                  <span className="shrink-0 text-sm font-bold text-gold-dark">
                    {step.phase}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-muted">
              Indicative only. Construction has not started.
            </p>
          </div>
          <div aria-labelledby="protection-heading">
            <h2
              id="protection-heading"
              className="mb-4 text-xl font-bold text-primary sm:mb-5 sm:text-2xl"
            >
              Investor protections
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {investmentProtections.map((item) => (
                <li
                  key={item}
                  className="border-l-4 border-gold bg-section-alt px-3 py-2.5 text-sm text-foreground sm:px-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Risks — compact */}
        <section
          className="mb-12 sm:mb-16"
          aria-labelledby="risks-heading"
        >
          <h2
            id="risks-heading"
            className="mb-4 text-xl font-bold text-primary sm:text-2xl"
          >
            Risks and disclaimers
          </h2>
          <div className="border border-border bg-section-alt p-4 sm:p-6">
            <ul className="grid gap-x-8 gap-y-3 text-sm leading-relaxed text-muted sm:grid-cols-2">
              {investmentRiskDisclosures.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-gold/50 pl-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="investment-faq"
          className="mb-12 scroll-mt-32 sm:mb-16 sm:scroll-mt-36 lg:scroll-mt-40"
          aria-labelledby="faq-heading"
        >
          <h2
            id="faq-heading"
            className="mb-3 text-xl font-bold text-primary sm:text-2xl"
          >
            Frequently asked questions
          </h2>
          <p className="mb-5 max-w-2xl text-sm text-muted sm:mb-6">
            Short answers for preliminary evaluation. Full detail is in the
            public overview and confidential memorandum.
          </p>
          <div className="divide-y divide-border border border-border bg-white">
            {investmentFaqs.map((faq) => (
              <details key={faq.question} className="group px-4 py-4 sm:px-6">
                <summary className="cursor-pointer list-none pr-2 text-sm font-semibold leading-snug text-primary marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* PDF */}
        <section
          id="investment-overview"
          className="mb-12 scroll-mt-32 sm:mb-16 sm:scroll-mt-36 lg:scroll-mt-40"
          aria-labelledby="pdf-heading"
        >
          <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <h2
                id="pdf-heading"
                className="text-xl font-bold text-primary sm:text-2xl"
              >
                Investment overview
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Public overview only. The confidential memorandum is available
                after screening, NDA and preliminary KYC.
              </p>
            </div>
            <a
              href={investmentOverviewPdf.path}
              download={investmentOverviewPdf.filename}
              onClick={handleHeroDownload}
              className="inline-flex min-h-11 w-full items-center justify-center rounded border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-section-alt sm:w-auto"
            >
              Download PDF
            </a>
          </div>
          <InvestmentPdfViewer />
        </section>

        {/* Enquiry */}
        <section
          id="investor-enquiry"
          className="scroll-mt-32 border border-border bg-section-alt p-4 sm:p-8 sm:scroll-mt-36 lg:scroll-mt-40"
          aria-labelledby="enquiry-heading"
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="min-w-0">
              <h2
                id="enquiry-heading"
                className="mb-3 text-xl font-bold text-primary sm:text-2xl"
              >
                Discuss an investment structure
              </h2>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                Qualified investors, family offices and strategic partners are
                invited to request the investment memorandum or discuss equity,
                strategic and gold-linked participation.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-foreground">
                <li className="border-l-4 border-gold pl-3">
                  Equity and preferred economic rights
                </li>
                <li className="border-l-4 border-gold pl-3">
                  Cash, refined gold or hybrid distributions
                </li>
                <li className="border-l-4 border-gold pl-3">
                  Strategic supply, offtake or refining access
                </li>
              </ul>
              <p className="mt-6 text-sm text-muted">
                Prefer email?{" "}
                <Link
                  href="mailto:investors@diamondcapitalafrica.com"
                  className="font-semibold text-gold-dark underline hover:text-gold"
                >
                  investors@diamondcapitalafrica.com
                </Link>
              </p>
            </div>
            <div className="min-w-0 bg-white p-3 sm:p-0">
              <InvestorEnquiryForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
