import Link from "next/link";
import { notFound } from "next/navigation";
import { legalPages } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

const pages = {
  privacy: legalPages.privacy,
  terms: legalPages.terms,
  cookies: legalPages.cookies,
} as const;

type LegalSlug = keyof typeof pages;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const page = pages[slug as LegalSlug];
    if (!page) return { title: "Legal" };
    return pageMetadata({
      title: page.title,
      description: page.sections[0]?.body ?? page.title,
      path: `/legal/${slug}`,
    });
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug as LegalSlug];

  if (!page) notFound();

  return (
    <>
      <section className="relative h-48 bg-primary md:h-56">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark" />
        <div className="relative mx-auto flex h-full max-w-3xl flex-col justify-center px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-white">{page.title}</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <div className="space-y-8">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 text-lg font-bold text-primary">
                {section.heading}
              </h2>
              <p className="leading-relaxed text-muted">{section.body}</p>
            </section>
          ))}
        </div>

        <Link
          href="/"
          className="mt-10 inline-block text-sm font-semibold text-gold-dark transition hover:text-gold"
        >
          &larr; Back to home
        </Link>
      </div>
    </>
  );
}