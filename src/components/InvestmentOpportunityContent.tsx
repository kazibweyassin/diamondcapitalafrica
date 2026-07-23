"use client";

import Link from "next/link";
import {
  ArrowDown,
  Download,
  FileText,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
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
      {/* SECTION 1: HERO */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold sm:text-sm">
            Strategic investment opportunity
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Building East Africa&apos;s Integrated Precious Metals Platform
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Diamond Capital Africa is seeking strategic investment to establish
            a modern gold refinery, assay laboratory and responsible-sourcing
            platform serving verified participants across East and Central
            Africa.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#investment-overview"
              onClick={handleHeroOpen}
              className="inline-flex min-h-11 items-center gap-2 rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <FileText size={16} aria-hidden />
              Read Investment Overview
            </a>
            <a
              href={investmentOverviewPdf.path}
              download={investmentOverviewPdf.filename}
              onClick={handleHeroDownload}
              className="inline-flex min-h-11 items-center gap-2 rounded border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Download size={16} aria-hidden />
              Download PDF
            </a>
            <a
              href="#investor-enquiry"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold transition hover:text-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Request Confidential Memorandum
              <ArrowDown size={16} aria-hidden />
            </a>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60">
            This opportunity remains at the development and capital-formation
            stage. All capacities, costs, projections and timelines are
            preliminary and subject to independent due diligence.
          </p>
        </div>
      </section>

      {/* SECTION 2: AT A GLANCE */}
      <section
        className="border-b border-border bg-section-alt py-12 sm:py-16"
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
                className="rounded-lg border border-border bg-white p-5 shadow-sm"
              >
                <p className="text-2xl font-bold text-primary sm:text-3xl">
                  {card.value}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {card.label}
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Preliminary planning assumption
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
        {/* SECTION 3: THE OPPORTUNITY */}
        <section className="mb-16" aria-labelledby="opportunity-heading">
          <h2
            id="opportunity-heading"
            className="mb-4 text-xl font-bold text-primary sm:text-2xl md:text-3xl"
          >
            A Regional Precious-Metals Infrastructure Opportunity
          </h2>
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            Diamond Capital Africa intends to connect verified upstream
            production with institutional-grade assaying, refining, secure
            logistics, responsible-sourcing controls and approved international
            markets.
          </p>
          <p className="mb-4 text-sm font-semibold text-primary">
            The project is expected to include:
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {investmentProjectComponents.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded border border-border bg-section-alt px-4 py-3 text-sm text-foreground"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-gold-dark"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* SECTION 4: WHY NEEDED */}
        <section className="mb-16" aria-labelledby="why-heading">
          <h2
            id="why-heading"
            className="mb-8 text-xl font-bold text-primary sm:text-2xl"
          >
            Why the project is needed
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {investmentNeeds.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border p-6 shadow-sm"
              >
                <h3 className="mb-2 font-bold text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: REVENUE MODEL */}
        <section className="mb-16" aria-labelledby="revenue-heading">
          <h2
            id="revenue-heading"
            className="mb-2 text-xl font-bold text-primary sm:text-2xl"
          >
            Proposed revenue model
          </h2>
          <p className="mb-6 text-sm font-medium text-gold-dark">
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

        {/* SECTION 6: USE OF FUNDS */}
        <section className="mb-16" aria-labelledby="funds-heading">
          <h2
            id="funds-heading"
            className="mb-6 text-xl font-bold text-primary sm:text-2xl"
          >
            Use of funds
          </h2>
          <div className="space-y-4">
            {investmentUseOfFunds.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-baseline justify-between gap-4 text-sm">
                  <span className="font-medium text-foreground">
                    {item.label}
                  </span>
                  <span className="shrink-0 font-bold text-primary">
                    {item.percent.toFixed(1)}%
                  </span>
                </div>
                <div
                  className="h-2.5 overflow-hidden rounded-full bg-border"
                  role="progressbar"
                  aria-valuenow={item.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${item.label}: ${item.percent}%`}
                >
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            The final capital budget will be determined through engineering
            design, vendor quotations, legal review, permitting and
            investor-approved financial modelling.
          </p>
        </section>

        {/* SECTION 7: ROADMAP */}
        <section className="mb-16" aria-labelledby="roadmap-heading">
          <h2
            id="roadmap-heading"
            className="mb-8 text-xl font-bold text-primary sm:text-2xl"
          >
            Projected development roadmap
          </h2>
          <ol className="relative space-y-0 border-l-2 border-gold/40 pl-6 sm:pl-8">
            {investmentRoadmap.map((step) => (
              <li key={step.phase} className="relative pb-8 last:pb-0">
                <span
                  className="absolute -left-[1.9rem] flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-bold text-primary sm:-left-[2.15rem]"
                  aria-hidden
                >
                  {step.phase}
                </span>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Phase {step.phase}
                </p>
                <p className="mt-1 font-semibold text-primary">{step.title}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-muted">
            Timelines are indicative and subject to due diligence, permitting and
            financing. Construction has not started.
          </p>
        </section>

        {/* SECTION 8: INVESTOR PROTECTION */}
        <section className="mb-16" aria-labelledby="protection-heading">
          <h2
            id="protection-heading"
            className="mb-6 flex items-center gap-2 text-xl font-bold text-primary sm:text-2xl"
          >
            <ShieldCheck className="text-gold-dark" size={28} aria-hidden />
            Investor protection
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {investmentProtections.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded border border-border px-4 py-3 text-sm text-foreground"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-gold-dark"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* SECTION 9: PDF READER */}
        <section
          id="investment-overview"
          className="mb-16 scroll-mt-24"
          aria-labelledby="pdf-heading"
        >
          <h2
            id="pdf-heading"
            className="mb-2 text-xl font-bold text-primary sm:text-2xl"
          >
            Read the Investment Overview
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted">
            Public overview only. The complete confidential memorandum is
            available after screening, NDA and preliminary KYC.
          </p>
          <InvestmentPdfViewer />
        </section>

        {/* SECTION 10: ENQUIRY FORM */}
        <section
          id="investor-enquiry"
          className="mb-16 scroll-mt-24"
          aria-labelledby="enquiry-heading"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2
                id="enquiry-heading"
                className="mb-3 text-xl font-bold text-primary sm:text-2xl"
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

        {/* SECTION 11: LEGAL DISCLAIMER */}
        <section
          className="rounded-lg border border-border bg-section-alt p-6 sm:p-8"
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
