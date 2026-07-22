import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import JsonLd from "@/components/JsonLd";
import { buyerGuides, getBuyerGuide } from "@/data/buyer-education";
import { company } from "@/data/content";
import { articleJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return buyerGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getBuyerGuide(slug);
  if (!guide) return { title: "Guide" };

  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: "article",
    keywords: guide.keywords,
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getBuyerGuide(slug);
  if (!guide) notFound();

  const related = buyerGuides.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: guide.title,
          description: guide.description,
          path: `/guides/${guide.slug}`,
          datePublished: guide.date,
          type: "Article",
        })}
      />
      <section className="relative bg-primary py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark" />
        <div className="relative mx-auto max-w-3xl px-4 lg:px-8">
          <p className="mb-2 text-sm font-medium text-gold">
            {guide.date} &middot; Buyer guide
          </p>
          <h1 className="text-2xl font-bold text-white md:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/85">
            {guide.description}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <div className="space-y-10">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 text-xl font-bold text-primary">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${section.heading}-${index}`}
                    className="text-sm leading-relaxed text-muted md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-gold/30 bg-section-alt p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
            Next step
          </p>
          <p className="mt-2 text-muted">
            {company.name} is a licensed gold dealer and refinery in Kampala.
            Serious buyers should follow the published procedure, not cold
            social-media shortcuts.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={guide.cta.href}
              className="inline-flex items-center gap-2 rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light"
            >
              {guide.cta.label}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact?subject=Export%20Services"
              className="inline-flex items-center gap-2 rounded border border-border bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-gold"
            >
              Contact {company.contactName}
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-8">
          <ShareButtons title={guide.title} />
        </div>

        {related.length > 0 && (
          <div className="mt-12 border-t border-border pt-10">
            <h2 className="mb-4 text-lg font-bold text-primary">
              Related guides
            </h2>
            <ul className="space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/guides/${item.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
                  >
                    {item.title}
                    <ArrowRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
          >
            <ArrowLeft size={14} />
            All guides
          </Link>
          <Link
            href="/how-to-buy"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
          >
            How to buy
            <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
