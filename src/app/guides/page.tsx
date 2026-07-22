import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buyerGuides } from "@/data/buyer-education";
import { company } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Buyer Guides | Gold Export & Scam Awareness",
  description:
    "Guides for buying gold from a licensed Uganda refinery: real CIF Dubai vs scams, how to buy bars, and spotting LinkedIn gold fraud. From Diamond Capital Africa.",
  path: "/guides",
  keywords: [
    "gold buyer guides",
    "CIF gold scam",
    "buy gold Uganda guide",
    "LinkedIn gold scam",
    "gold export education",
  ],
});

export default function GuidesIndexPage() {
  return (
    <>
      <section className="relative h-64 bg-primary md:h-80">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
            Education for buyers
          </p>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Buyer guides
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Practical reading from {company.name}: how legitimate export works,
            and how to avoid the scams that dominate cold outreach.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="mb-10 flex flex-wrap gap-4">
          <Link
            href="/how-to-buy"
            className="inline-flex items-center gap-2 rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light"
          >
            How to buy gold
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/services#export"
            className="inline-flex items-center gap-2 rounded border border-border px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-gold"
          >
            Export services
          </Link>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {buyerGuides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="flex h-full flex-col rounded-xl border border-border bg-white p-6 transition hover:border-gold hover:shadow-md"
              >
                <p className="mb-2 text-xs font-medium text-muted">
                  {guide.date}
                </p>
                <h2 className="text-lg font-bold text-primary">{guide.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {guide.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark">
                  Read guide
                  <ArrowRight size={14} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
