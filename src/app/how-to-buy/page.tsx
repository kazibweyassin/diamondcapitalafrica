import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import TrustPrequalBlock from "@/components/TrustPrequalBlock";
import {
  buyPaths,
  buyerGuides,
  buyerProcedureSteps,
} from "@/data/buyer-education";
import { company } from "@/data/content";
import { images } from "@/data/images";
import { howToBuyJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How to Buy Gold | Export Procedure Uganda",
  description:
    "How to buy 99.99% gold bars from Diamond Capital Africa: KYC, quote-based pricing, fire assay, FOB Kampala, CIF Dubai, and insured delivery. Licensed Kampala refinery procedure for institutional buyers.",
  path: "/how-to-buy",
  image: images.pageHero.services,
  keywords: [
    "how to buy gold Uganda",
    "buy gold bars procedure",
    "gold export procedure Uganda",
    "FOB Kampala gold",
    "CIF Dubai gold export",
    "licensed gold dealer Kampala",
    "institutional gold buying Africa",
  ],
});

export default function HowToBuyPage() {
  return (
    <>
      <JsonLd data={howToBuyJsonLd()} />
      <section className="relative h-72 bg-primary md:h-96">
        <Image
          src={images.pageHero.services}
          alt="Gold bars prepared for institutional buyers"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
            For institutional &amp; serious buyers
          </p>
          <h1 className="max-w-3xl text-3xl font-bold text-white md:text-5xl">
            How to buy gold from {company.shortName}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Clear procedure for assay-verified 99.99% bars from our Kampala
            refinery: KYC, quote, documentation, then FOB Kampala, CIF Dubai, or
            escorted insured delivery.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <section className="mb-16">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
            Choose your path
          </h2>
          <p className="mb-8 max-w-3xl text-muted">
            Physical gold in Africa is full of shortcuts that fail. Here is how
            buyers typically try, and which path we support.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {buyPaths.map((path) => (
              <div
                key={path.title}
                className={`rounded-xl border p-6 ${
                  path.highlight
                    ? "border-gold/40 bg-section-alt shadow-sm"
                    : "border-border bg-white"
                }`}
              >
                {path.highlight && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold-dark">
                    Recommended
                  </p>
                )}
                <h3 className="mb-3 text-lg font-bold text-primary">
                  {path.title}
                </h3>
                <p className="mb-2 flex items-start gap-2 text-sm text-muted">
                  <CheckCircle
                    size={16}
                    className="mt-0.5 shrink-0 text-gold"
                  />
                  <span>
                    <span className="font-semibold text-foreground">Pros: </span>
                    {path.pros}
                  </span>
                </p>
                <p className="flex items-start gap-2 text-sm text-muted">
                  <XCircle
                    size={16}
                    className={`mt-0.5 shrink-0 ${
                      path.highlight ? "text-muted" : "text-red-400"
                    }`}
                  />
                  <span>
                    <span className="font-semibold text-foreground">Cons: </span>
                    {path.cons}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-primary md:text-3xl">
            Buying procedure
          </h2>
          <p className="mb-8 max-w-3xl text-muted">
            Every contract differs by volume and destination. This is the
            standard path for wholesale and export buyers. Individuals
            accumulating small amounts should use{" "}
            <Link
              href="/gold-savings"
              className="font-semibold text-gold-dark hover:text-gold"
            >
              Gold Savings
            </Link>
            .
          </p>
          <ol className="space-y-6">
            {buyerProcedureSteps.map((step, index) => (
              <li
                key={step.title}
                id={`step-${index + 1}`}
                className="flex scroll-mt-28 gap-4 rounded-xl border border-border bg-white p-5 md:gap-6 md:p-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16">
          <TrustPrequalBlock showProcedureLink={false} />
        </section>

        <section className="mb-16 rounded-xl bg-primary p-8 text-white md:p-10">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
            Delivery options
          </h2>
          <h3 className="mb-6 text-2xl font-bold">
            FOB Kampala, CIF Dubai, insured delivery
          </h3>
          <ul className="mb-8 grid gap-4 md:grid-cols-3">
            <li className="rounded-lg border border-white/15 bg-white/5 p-5">
              <p className="font-semibold">FOB Kampala</p>
              <p className="mt-2 text-sm text-white/75">
                Collect from our Nakasero vault with your insured logistics.
                Best for experienced importers.
              </p>
            </li>
            <li className="rounded-lg border border-white/15 bg-white/5 p-5">
              <p className="font-semibold">CIF Dubai</p>
              <p className="mt-2 text-sm text-white/75">
                We arrange freight and insurance to Dubai for Middle East
                buyers and re-export hubs. Quote-based, not fantasy discounts.
              </p>
            </li>
            <li className="rounded-lg border border-white/15 bg-white/5 p-5">
              <p className="font-semibold">Escorted insured delivery</p>
              <p className="mt-2 text-sm text-white/75">
                Secure delivery to agreed destinations with full
                chain-of-custody documentation.
              </p>
            </li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?subject=Export%20Services"
              className="inline-flex items-center gap-2 rounded bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light"
            >
              Contact {company.contactName}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/services#export"
              className="inline-flex items-center gap-2 rounded border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Export services
            </Link>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-bold text-primary">
            Buyer education
          </h2>
          <p className="mb-6 max-w-3xl text-muted">
            Short guides on real CIF versus scams, buying from a Uganda
            refinery, and spotting fake LinkedIn gold posts.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {buyerGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group rounded-xl border border-border bg-white p-6 transition hover:border-gold hover:shadow-md"
              >
                <h3 className="font-bold text-primary group-hover:text-gold-dark">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {guide.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark">
                  Read guide
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
