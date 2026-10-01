import Image from "next/image";
import Link from "next/link";
import { internationalBuyerRegions, services } from "@/data/content";
import { images } from "@/data/images";
import JsonLd from "@/components/JsonLd";
import TrustPrequalBlock from "@/components/TrustPrequalBlock";
import { pageMetadata, servicesJsonLd } from "@/lib/seo";
import ServiceSectionNav from "@/components/ServiceSectionNav";
import { ArrowRight } from "lucide-react";

export const metadata = pageMetadata({
  title: "Buy Gold Bars Uganda | Assay, Export & Planned Refining",
  description:
    "Gold buying, export coordination, assay services, and a planned refining platform from Diamond Capital Africa in Kampala. CIF Dubai, FOB Kampala, and OECD-aligned traceability.",
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
              End-to-end gold services
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
              Buying, assay, planned refining, and licensed export from
              Kampala.
            </p>
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
        {services.map((service) => (
          <section
            key={service.id}
            id={service.id}
            className="scroll-mt-28 border-b border-border py-12 sm:py-16 lg:scroll-mt-36"
          >
            <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                  {service.shortTitle}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-primary">
                  {service.title}
                </h2>
                <p className="mt-2 text-base font-medium text-foreground">
                  {service.tagline}
                </p>
                <p className="mt-4 max-w-xl leading-relaxed text-muted">
                  {service.description}
                </p>

                <dl className="mt-8 grid grid-cols-1 gap-4 border-y border-border py-4 min-[420px]:grid-cols-3">
                  {service.highlights.map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs uppercase tracking-wide text-muted">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-primary">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="border-l-2 border-primary pl-3 text-sm text-foreground"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <ol className="mt-6 space-y-3">
                  {service.steps.map((step, stepIndex) => (
                    <li key={step} className="flex gap-3 text-sm leading-relaxed">
                      <span className="w-6 shrink-0 font-semibold text-primary">
                        {String(stepIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-muted">{step}</span>
                    </li>
                  ))}
                </ol>

                {"deliveryOptions" in service && service.deliveryOptions && (
                  <div className="mt-8 grid gap-6 sm:grid-cols-3">
                    {service.deliveryOptions.map((option) => (
                      <div key={option.name}>
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

              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden bg-primary">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="border-b border-border py-12 sm:py-16">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            International buyers
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Diamond Capital Africa coordinates export of assay-verified gold
            from Kampala to institutional buyers in Dubai, the wider Middle
            East, and Europe with OECD-aligned traceability documentation.
          </p>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
            {internationalBuyerRegions.map((region) => (
              <article key={region.id}>
                <h3 className="text-xl font-bold text-primary">{region.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {region.summary}
                </p>
                <ul className="mt-4 space-y-2">
                  {region.points.map((point) => (
                    <li
                      key={point}
                      className="border-l-2 border-primary/30 pl-3 text-sm leading-relaxed text-muted"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?subject=${encodeURIComponent(region.cta.subject)}`}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary transition hover:text-gold-dark"
                >
                  {region.cta.label}
                  <ArrowRight size={14} />
                </Link>
              </article>
            ))}
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
