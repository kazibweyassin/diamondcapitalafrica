import Image from "next/image";
import Link from "next/link";
import { services, serviceProcess } from "@/data/content";
import { images } from "@/data/images";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, servicesJsonLd } from "@/lib/seo";
import ServiceSectionNav from "@/components/ServiceSectionNav";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Scale,
  FlaskConical,
  Gem,
  Plane,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata = pageMetadata({
  title: "Gold Services Uganda | Buying, Refining & Export",
  description:
    "Licensed gold buying, 99.99% refining, fire assay, and export services in Uganda and East Africa. Fair prices for miners, LBMA-standard bars for international buyers.",
  path: "/services",
  image: images.pageHero.services,
});

const serviceIcons: Record<string, LucideIcon> = {
  buying: Scale,
  refining: Gem,
  assay: FlaskConical,
  export: Plane,
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <section className="relative h-72 bg-primary md:h-96">
        <Image
          src={images.pageHero.services}
          alt="Gold bars prepared for international trade"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
            What we offer
          </p>
          <h1 className="max-w-2xl text-3xl font-bold text-white md:text-5xl">
            End-to-end gold services
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            From fair-price buying at collection centres through assay,
            refining, and licensed export: one trusted partner across the full
            value chain.
          </p>
        </div>
      </section>

      <ServiceSectionNav
        items={services.map((s) => ({
          id: s.id,
          shortTitle: s.shortTitle,
        }))}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <section className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = serviceIcons[service.id] ?? Scale;
            return (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group rounded-lg border border-border bg-white p-5 shadow-sm transition hover:border-gold hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary transition group-hover:bg-gold/15 group-hover:text-gold-dark">
                  <Icon size={20} />
                </div>
                <h2 className="font-bold text-primary">{service.title}</h2>
                <p className="mt-1 text-sm text-muted">{service.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold-dark transition group-hover:text-gold">
                  Learn more
                  <ChevronRight size={14} />
                </span>
              </Link>
            );
          })}
        </section>

        <section className="mb-20 rounded-xl bg-primary p-8 text-white md:p-10">
          <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-gold">
            How it works
          </h2>
          <p className="mb-8 text-center text-white/80">
            A single integrated pipeline from mine site to international market
          </p>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceProcess.map((step, index) => (
              <li key={step.label} className="relative">
                <Link
                  href={step.href}
                  className="flex h-full flex-col rounded-lg border border-white/15 bg-white/5 p-5 transition hover:border-gold/40 hover:bg-white/10"
                >
                  <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-primary">
                    {step.step}
                  </span>
                  <span className="font-semibold">{step.label}</span>
                  {index < serviceProcess.length - 1 && (
                    <ChevronRight
                      size={16}
                      className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-gold/50 lg:block"
                      aria-hidden
                    />
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {services.map((service, index) => {
          const Icon = serviceIcons[service.id] ?? Scale;
          return (
            <section
              key={service.id}
              id={service.id}
              className={`scroll-mt-28 grid items-start gap-10 py-12 sm:py-16 lg:scroll-mt-36 lg:grid-cols-2 lg:gap-16 ${
                index > 0 ? "border-t border-border" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-dark">
                  <Icon size={14} />
                  {service.shortTitle}
                </div>
                <h2 className="mb-2 text-3xl font-bold text-primary">
                  {service.title}
                </h2>
                <p className="mb-4 text-lg font-medium text-gold-dark">
                  {service.tagline}
                </p>
                <p className="mb-8 leading-relaxed text-muted">
                  {service.description}
                </p>

                <div className="mb-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
                  {service.highlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-border bg-section-alt px-3 py-4 text-center"
                    >
                      <p className="text-xs font-medium uppercase tracking-wide text-muted">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-primary">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                    What&apos;s included
                  </h3>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle
                          size={16}
                          className="mt-0.5 shrink-0 text-gold"
                        />
                        <span className="text-sm text-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8 rounded-lg border border-border p-5">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                    Typical process
                  </h3>
                  <ol className="space-y-4">
                    {service.steps.map((step, stepIndex) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                          {stepIndex + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-muted">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {"deliveryOptions" in service && service.deliveryOptions && (
                  <div className="mb-8 rounded-lg border border-gold/30 bg-section-alt p-5">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                      Delivery &amp; logistics options
                    </h3>
                    <ul className="space-y-4">
                      {service.deliveryOptions.map((option) => (
                        <li key={option.name}>
                          <p className="text-sm font-semibold text-foreground">
                            {option.name}
                          </p>
                          <p className="mt-1 text-sm text-muted">
                            {option.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href={`/contact?subject=${encodeURIComponent(service.cta.subject)}`}
                  className="inline-flex items-center gap-2 rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light"
                >
                  {service.cta.label}
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div
                className={`relative lg:sticky lg:top-40 ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
              </div>
            </section>
          );
        })}

        <section className="mt-8 rounded-xl bg-section-alt p-8 text-center md:p-12">
          <h2 className="mb-3 text-2xl font-bold text-primary">
            Not sure which service you need?
          </h2>
          <p className="mx-auto mb-6 max-w-lg text-muted">
            Tell us about your gold, whether you&apos;re a miner, trader, or
            exporter, and we&apos;ll guide you to the right solution.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Speak to our team
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </>
  );
}