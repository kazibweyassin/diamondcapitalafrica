import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import { company } from "@/data/content";
import {
  aboutGoldIntro,
  aboutGoldSource,
  goldValuePillars,
} from "@/data/about-gold";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Gold | Value & Investment in Africa",
  description:
    "Why gold matters in Uganda and Africa: scarcity, stability, responsible sourcing, and investment value. Educational guide from Diamond Capital Africa.",
  path: "/about-gold",
  image: images.aboutGold.hero,
});

export default function AboutGoldPage() {
  return (
    <>
      <section className="relative h-72 bg-primary md:h-[28rem]">
        <Image
          src={images.aboutGold.hero}
          alt="Refined gold bars"
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/50" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
            Our principal product
          </p>
          <h1 className="max-w-3xl text-3xl font-bold text-white md:text-5xl">
            Gold
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            The metal at the heart of {company.name}&apos;s buying, refining,
            and export operations across East and Central Africa.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="mb-10 flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-start md:justify-between">
          <p className="max-w-3xl text-lg leading-relaxed text-muted">
            {aboutGoldIntro}
          </p>
          <ShareButtons title={`About Gold | ${company.name}`} />
        </div>

        <h2 className="mb-12 text-2xl font-bold text-primary md:text-3xl">
          Gold&apos;s enduring value lies in its:
        </h2>

        <div className="space-y-20">
          {goldValuePillars.map((pillar, index) => (
            <section
              key={pillar.id}
              id={pillar.id}
              className="scroll-mt-24 border-t border-border pt-12 first:border-t-0 first:pt-0 sm:scroll-mt-28 sm:pt-16"
            >
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <h3 className="mb-3 text-2xl font-bold text-gold-dark">
                    {pillar.title}
                  </h3>
                  <p className="mb-6 text-lg leading-relaxed text-foreground">
                    {pillar.summary}
                  </p>
                  <ul className="space-y-3">
                    {pillar.facts.map((fact) => (
                      <li
                        key={fact}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                          aria-hidden
                        />
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-1">
                  {pillar.images.map((src) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg"
                    >
                      <Image
                        src={src}
                        alt={`${pillar.title}, gold`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 text-sm text-muted">
          Source:{" "}
          <a
            href={aboutGoldSource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold-dark underline hover:text-gold"
          >
            {aboutGoldSource.label}
          </a>
        </p>

        <section className="mt-12 rounded-xl bg-primary p-8 text-white md:p-10">
          <h2 className="mb-3 text-xl font-bold md:text-2xl">
            Trade gold with {company.shortName}
          </h2>
          <p className="mb-6 max-w-2xl text-white/80">
            From fair-price buying and export coordination to certified assay and
            licensed export. We connect Africa&apos;s formal gold economy to
            global markets.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light"
            >
              Our services
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/#market-prices"
              className="inline-flex items-center gap-2 rounded border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
            >
              Live market data
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}