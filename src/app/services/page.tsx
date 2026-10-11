import Image from "next/image";
import Link from "next/link";
import { internationalBuyerRegions, services } from "@/data/content";
import { images } from "@/data/images";
import JsonLd from "@/components/JsonLd";
import TrustPrequalBlock from "@/components/TrustPrequalBlock";
import { pageMetadata, servicesJsonLd } from "@/lib/seo";
import ServiceSectionNav from "@/components/ServiceSectionNav";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = pageMetadata({
  title: "Buy Gold Bars Uganda | Assay, Export & Planned Refining",
  description:
    "Gold buying, export coordination, assay services, scoped supplier due diligence for gold buyers, and a proposed refining platform from Diamond Capital Africa in Kampala.",
  path: "/services",
  image: images.pageHero.services,
  keywords: [
    "buy gold bars Uganda",
    "gold bullion supplier",
    "CIF Dubai gold export",
    "gold export Europe Uganda",
    "gold export Kampala",
    "gold refining Uganda",
    "fire assay Uganda",
    "gold buyer due diligence",
    "verify gold buyer Africa",
    "gold counterparty checks",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <section className="relative bg-primary">
        <div className="relative h-56 md:h-72">
          <Image
            src={images.pageHero.services}
            alt="Gold bars prepared for international trade"
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/50" />
          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold">
              Services
            </p>
            <h1 className="max-w-2xl text-3xl font-bold text-white md:text-5xl">
              Gold supply and export from Uganda
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
              For international buyers: request a lot-specific offer with
              assay documentation and FOB Kampala or CIF Dubai delivery options.
              Subject to availability, buyer verification, and agreement.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact?subject=Gold%20Export%20Enquiry"
                className="inline-flex min-h-11 items-center gap-2 rounded bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-white/90"
              >
                Request a gold offer
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#export"
                className="inline-flex min-h-11 items-center rounded border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View export options
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceSectionNav
        items={services.map((service) => ({
          id: service.id,
          shortTitle: service.shortTitle,
        }))}
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {services.map((service, serviceIndex) => (
          <section
            key={service.id}
            id={service.id}
            className="scroll-mt-28 py-5 sm:py-7 lg:scroll-mt-36"
          >
            <div className="grid overflow-hidden rounded-3xl border border-border bg-white shadow-sm lg:grid-cols-12">
              <div
                className={`relative min-h-56 bg-primary sm:min-h-72 lg:col-span-5 lg:min-h-full ${
                  serviceIndex % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-primary/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {service.shortTitle}
                </span>
              </div>

              <div
                className={`p-6 sm:p-8 lg:col-span-7 lg:p-10 ${
                  serviceIndex % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary/60">
                  {service.shortTitle}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-2 text-base font-medium text-foreground">
                  {service.tagline}
                </p>
                <p className="mt-4 max-w-xl leading-relaxed text-muted">
                  {service.description}
                </p>

                <dl className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
                  {service.highlights.map((item) => (
                    <div key={item.label} className="rounded-xl bg-slate-50 p-3.5">
                      <dt className="text-[11px] font-medium uppercase tracking-wide text-muted">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-primary">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <ol className="mt-7 grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
                  {service.steps.map((step, stepIndex) => (
                    <li key={step} className="flex gap-2.5 text-sm leading-relaxed">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/8 text-xs font-semibold text-primary">
                        {String(stepIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-muted">{step}</span>
                    </li>
                  ))}
                </ol>

                {"deliveryOptions" in service && service.deliveryOptions && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {service.deliveryOptions.map((option) => (
                      <div key={option.name} className="rounded-xl border border-border p-4">
                        <h3 className="text-sm font-semibold text-primary">
                          {option.name}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {option.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href={`/contact?subject=${encodeURIComponent(service.cta.subject)}`}
                  className="mt-8 inline-flex min-h-11 items-center gap-2 rounded bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  {service.cta.label}
                  <ArrowRight size={16} />
                </Link>
              </div>

            </div>
          </section>
        ))}

        <section className="my-10 overflow-hidden rounded-3xl bg-primary shadow-lg sm:my-14">
          <div className="grid lg:grid-cols-5">
            <div className="p-6 text-white sm:p-9 lg:col-span-2 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                International buyers
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                A clear offer. A defined delivery route.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                Tell us your quantity, destination, and preferred delivery. We
                set out the available lot and commercial terms in writing before
                you commit.
              </p>
              <p className="mt-4 text-xs leading-relaxed text-white/60">
                Subject to availability, buyer verification, and signed agreement.
              </p>
              <Link
                href="/contact?subject=Gold%20Export%20Enquiry"
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-white/90"
              >
                Request a gold offer
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-slate-50 p-5 sm:p-7 lg:col-span-3 lg:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {internationalBuyerRegions.map((region) => (
                  <article
                    key={region.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/55">
                      Delivery route
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-primary">
                      {region.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {region.summary}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {region.points.slice(0, 3).map((point) => (
                        <li key={point} className="flex gap-2 text-xs leading-relaxed text-foreground">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/contact?subject=${encodeURIComponent(region.cta.subject)}`}
                      className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-primary transition hover:underline"
                    >
                      {region.cta.label}
                      <ArrowRight size={14} />
                    </Link>
                  </article>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-slate-200 bg-white px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary/60">
                  Confirmed in your written offer
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Available quantity and form · assay details · price and
                  currency · payment terms · delivery costs · applicable export
                  documents
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <TrustPrequalBlock plain />
        </section>
      </div>

      <section className="bg-primary">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2 lg:px-8 lg:py-16">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Institutional Gold Network
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
              Buyers purchase gold from Diamond Capital Africa. Suppliers offer
              gold to DCA.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/network/access"
                className="inline-flex min-h-11 items-center rounded bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-white/90"
              >
                Buyer sign up
              </Link>
              <Link
                href="/network/login"
                className="inline-flex min-h-11 items-center rounded border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Buyer sign in
              </Link>
              <Link
                href="/network/apply"
                className="inline-flex min-h-11 items-center rounded border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Supplier sign up
              </Link>
              <Link
                href="/network/supplier/login"
                className="inline-flex min-h-11 items-center rounded border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Supplier sign in
              </Link>
            </div>
          </div>
          <div className="lg:border-l lg:border-white/15 lg:pl-10">
            <h2 className="text-2xl font-bold text-white">
              Not sure which service you need?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
              Tell us about your gold, whether you are a miner, trader, or
              exporter, and we will guide you to the right service.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-2 rounded bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-white/90"
              >
                Speak to our team
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/how-to-buy"
                className="inline-flex min-h-11 items-center rounded border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                How to buy gold
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
