"use client";

import Link from "next/link";
import Image from "next/image";
import {
  investmentGlance,
  investmentNeeds,
  investmentOverviewPdf,
  investmentProjectComponents,
  investmentProtections,
  investmentRevenueStreams,
  investmentRoadmap,
  investmentUseOfFunds,
} from "@/data/investment";
import { images } from "@/data/images";
import { trackEvent } from "@/lib/analytics";
import InvestmentPdfViewer from "./InvestmentPdfViewer";
import InvestorEnquiryForm from "./InvestorEnquiryForm";

export default function InvestmentOpportunityContent() {
  function handleHeroOpen() {
    trackEvent("investment_overview_opened", { source: "hero" });
  }

  function handleHeroDownload() {
    trackEvent("investment_overview_downloaded", { source: "hero" });
  }

  return (
    <>
      {/* Hero — matches other site page heroes */}
      <section className="relative h-72 bg-primary md:h-96">
        <Image
          src={images.pageHero.operations}
          alt="Strategic investment opportunity"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
            Strategic investment opportunity
          </p>
          <h1 className="max-w-3xl text-3xl font-bold text-white md:text-4xl">
            Building East Africa&apos;s Integrated Precious Metals Platform
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Diamond Capital Africa is seeking strategic investment to establish
            a modern gold refinery, assay laboratory and responsible-sourcing
            platform serving verified participants across East and Central
            Africa.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#investment-overview"
              onClick={handleHeroOpen}
              className="inline-flex min-h-11 items-center rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light"
            >
              Read Investment Overview
            </a>
            <a
              href={investmentOverviewPdf.path}
              download={investmentOverviewPdf.filename}
              onClick={handleHeroDownload}
              className="inline-flex min-h-11 items-center rounded border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Download PDF
            </a>
            <a
              href="#investor-enquiry"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-gold transition hover:text-gold-light"
            >
              Request Confidential Memorandum
            </a>
          </div>
        </div>
      </section>

      <p className="border-b border-border bg-section-alt px-4 py-4 text-center text-sm text-muted lg:px-8">
        This opportunity remains at the development and capital-formation stage.
        All capacities, costs, projections and timelines are preliminary and
        subject to independent due diligence.
      </p>

      {/* At a glance — same card pattern as company stats */}
      <section
        className="border-b border-border py-12 sm:py-16"
        aria-labelledby="glance-heading"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2
            id="glance-heading"
            className="mb-8 text-xl font-bold text-primary sm:text-2xl"
          >
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
                <p className="mt-2 text-xs text-muted">
                  Preliminary planning assumption
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
        <section className="mb-16" aria-labelledby="opportunity-heading">
          <h2
            id="opportunity-heading"
            className="mb-4 text-2xl font-bold text-primary"
          >
            A Regional Precious-Metals Infrastructure Opportunity
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-muted">
            Diamond Capital Africa intends to connect verified upstream
            production with institutional-grade assaying, refining, secure
            logistics, responsible-sourcing controls and approved international
            markets.
          </p>
          <p className="mb-3 text-sm font-semibold text-primary">
            The project is expected to include:
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {investmentProjectComponents.map((item) => (
              <li
                key={item}
                className="border border-border px-4 py-3 text-sm text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16" aria-labelledby="why-heading">
          <h2
            id="why-heading"
            className="mb-8 text-2xl font-bold text-primary"
          >
            Why the project is needed
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {investmentNeeds.map((item) => (
              <div key={item.title} className="border border-border p-6">
                <h3 className="mb-2 font-bold text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16" aria-labelledby="revenue-heading">
          <h2
            id="revenue-heading"
            className="mb-2 text-2xl font-bold text-primary"
          >
            Proposed revenue model
          </h2>
          <p className="mb-6 text-sm text-muted">
            Proposed revenue streams subject to licensing, commercial agreements
            and due diligence.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {investmentRevenueStreams.map((stream) => (
              <li
                key={stream}
                className="border-l-4 border-gold bg-section-alt px-4 py-3 text-sm text-foreground"
              >
                {stream}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16" aria-labelledby="funds-heading">
          <h2
            id="funds-heading"
            className="mb-6 text-2xl font-bold text-primary"
          >
            Use of funds
          </h2>
          <div className="overflow-x-auto border border-border">
            <table className="w-full min-w-[320px] text-left text-sm">
              <thead className="bg-section-alt text-xs font-semibold uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Allocation</th>
                  <th className="px-4 py-3 text-right font-semibold">Share</th>
                </tr>
              </thead>
              <tbody>
                {investmentUseOfFunds.map((item) => (
                  <tr key={item.label} className="border-t border-border">
                    <td className="px-4 py-3 text-foreground">{item.label}</td>
                    <td className="px-4 py-3 text-right font-semibold text-primary">
                      {item.percent.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            The final capital budget will be determined through engineering
            design, vendor quotations, legal review, permitting and
            investor-approved financial modelling.
          </p>
        </section>

        <section className="mb-16" aria-labelledby="roadmap-heading">
          <h2
            id="roadmap-heading"
            className="mb-6 text-2xl font-bold text-primary"
          >
            Projected development roadmap
          </h2>
          <ol className="space-y-4">
            {investmentRoadmap.map((step) => (
              <li
                key={step.phase}
                className="flex gap-4 border border-border px-4 py-4"
              >
                <span className="shrink-0 text-sm font-bold text-gold-dark">
                  Phase {step.phase}
                </span>
                <span className="text-sm font-medium text-primary">
                  {step.title}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-muted">
            Timelines are indicative and subject to due diligence, permitting
            and financing. Construction has not started.
          </p>
        </section>

        <section className="mb-16" aria-labelledby="protection-heading">
          <h2
            id="protection-heading"
            className="mb-6 text-2xl font-bold text-primary"
          >
            Investor protection
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {investmentProtections.map((item) => (
              <li
                key={item}
                className="border border-border px-4 py-3 text-sm text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="investment-overview"
          className="mb-16 scroll-mt-24"
          aria-labelledby="pdf-heading"
        >
          <h2
            id="pdf-heading"
            className="mb-2 text-2xl font-bold text-primary"
          >
            Read the Investment Overview
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted">
            Public overview only. The complete confidential memorandum is
            available after screening, NDA and preliminary KYC.
          </p>
          <InvestmentPdfViewer />
        </section>

        <section
          id="investor-enquiry"
          className="mb-16 scroll-mt-24"
          aria-labelledby="enquiry-heading"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2
                id="enquiry-heading"
                className="mb-3 text-2xl font-bold text-primary"
              >
                Request the Confidential Investment Memorandum
              </h2>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                The complete confidential memorandum is available to qualified
                investors and strategic partners following preliminary screening,
                NDA and KYC.
              </p>
              <p className="mt-4 text-sm text-muted">
                Prefer email?{" "}
                <Link
                  href="mailto:investors@diamondcapitalafrica.com"
                  className="font-semibold text-gold-dark underline hover:text-gold"
                >
                  investors@diamondcapitalafrica.com
                </Link>
              </p>
            </div>
            <InvestorEnquiryForm />
          </div>
        </section>

        <section
          className="border border-border bg-section-alt p-6 sm:p-8"
          aria-labelledby="disclaimer-heading"
        >
          <h2
            id="disclaimer-heading"
            className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted"
          >
            Legal disclaimer
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            This page and the accompanying Investment Overview are provided
            solely for preliminary discussion with qualified investors and
            strategic partners. They do not constitute an offer to sell
            securities, a solicitation to invest, investment advice, a financing
            commitment or a guarantee of returns. All project, financial,
            operational, legal, technical and ESG information remains subject to
            independent verification, due diligence and definitive agreements.
          </p>
        </section>
      </div>
    </>
  );
}
