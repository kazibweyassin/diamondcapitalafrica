import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { company, internationalBuyerRegions } from "@/data/content";
import { goldFaqs } from "@/data/faqs";
import { images } from "@/data/images";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gold in Uganda | Where to Buy Certified Bars",
  description:
    "Where to buy gold in Uganda: licensed dealer and Kampala refinery selling 99.99% LBMA bars. CIF Dubai and European export, Gold Savings from $20, live spot pricing. Diamond Capital Africa since 2012.",
  path: "/gold-in-uganda",
  image: images.hero.sourcing,
  keywords: [
    "gold in Uganda",
    "where to buy gold Uganda",
    "gold seller Uganda",
    "gold dealer Uganda",
    "gold refinery Kampala",
    "buy gold bars Uganda",
    "CIF Dubai gold Uganda",
    "gold export Europe Uganda",
  ],
});

const highlights = [
  "Collection centres in Kampala and Arua",
  "Kampala refinery producing 99.99% fine gold bars",
  "Fire assay verification and full chain-of-custody records",
  "OECD-aligned responsible sourcing and traceability",
  "Export facilitation to twelve international markets",
];

const sections = [
  {
    title: "Uganda's growing gold sector",
    body: "Uganda is one of Africa's fastest-growing gold economies. Gold exports have outpaced traditional commodities, supported by new refining capacity, central bank purchasing programmes, and tighter licensing rules. Formal buyers and refiners play a critical role in bringing artisanal production into transparent markets.",
  },
  {
    title: "Licensed gold buying for miners",
    body: "Diamond Capital Africa operates collection centres in Kampala and Arua. Miners receive fair-price buying, on-site assay checks, and documentation that supports formal trade and export readiness.",
  },
  {
    title: "Refining and export from Kampala",
    body: "Our Nakasero refinery converts raw gold into 99.99% purity bars using induction furnaces and ISO-certified quality controls. We manage assay, vaulting, Bank of Uganda clearance, customs documentation, and international logistics for exporters and institutional buyers.",
  },
  ...internationalBuyerRegions.map((region) => ({
    title: region.title,
    body: `${region.summary} ${region.points.join(" ")}`,
  })),
];

export default function GoldInUgandaPage() {
  const pageFaqs = goldFaqs;

  return (
    <>
      <JsonLd data={faqJsonLd(pageFaqs)} />
      <section className="relative h-72 bg-primary md:h-96">
        <Image
          src={images.hero.sourcing}
          alt="Raw gold sourced in Uganda"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <h1 className="max-w-3xl text-3xl font-bold text-white md:text-4xl">
            Gold in Uganda: buying, refining & export
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            {company.name} connects licensed miners to international markets
            through fair buying, Kampala refining, and fully traceable export.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-primary">
              Why miners and buyers choose {company.shortName}
            </h2>
            <p className="mb-6 leading-relaxed text-muted">
              Whether you are an artisanal miner selling concentrate, a trader
              seeking assay-backed inventory, or an exporter targeting LBMA-standard
              bars, {company.name} provides end-to-end gold services across Uganda
              and East Africa.
            </p>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-section-alt p-6 md:p-8">
            <h3 className="mb-2 text-lg font-bold text-primary">Talk to our team</h3>
            <p className="mb-4 text-sm text-muted">
              Contact {company.contactName} for gold prices, refining slots, or
              export enquiries.
            </p>
            <p className="mb-1 text-sm font-semibold text-foreground">
              {company.phone}
            </p>
            <p className="mb-6 text-sm text-muted">{company.email}</p>
            <Link
              href="/contact?subject=Gold%20Buying%20Enquiry"
              className="inline-flex items-center gap-1 rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light"
            >
              Get in touch
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {sections.map((section) => (
          <section key={section.title} className="mt-12 border-t border-border pt-12">
            <h2 className="mb-4 text-xl font-bold text-primary md:text-2xl">
              {section.title}
            </h2>
            <p className="max-w-3xl leading-relaxed text-muted">{section.body}</p>
          </section>
        ))}

        <section className="mt-12 border-t border-border pt-12">
          <h2 className="mb-6 text-xl font-bold text-primary md:text-2xl">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-border rounded-lg border border-border bg-white">
            {pageFaqs.map((faq) => (
              <details key={faq.question} className="px-5 py-4 sm:px-6">
                <summary className="cursor-pointer list-none text-sm font-semibold text-primary sm:text-base [&::-webkit-details-marker]:hidden">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
          >
            Gold services
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/operations"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
          >
            Refinery & centres
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
          >
            Uganda gold news
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}