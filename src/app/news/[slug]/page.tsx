import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import NewsDownloadButton from "@/components/NewsDownloadButton";
import JsonLd from "@/components/JsonLd";
import { getNewsBySlug } from "@/lib/news";
import { articleJsonLd, pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: "News" };

  return pageMetadata({
    title: article.title,
    description: article.summary,
    path: `/news/${slug}`,
    type: "article",
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.summary,
          path: `/news/${slug}`,
          datePublished: article.date,
          sourceUrl: article.sourceUrl,
        })}
      />
      <section className="relative bg-primary py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark" />
        <div className="relative mx-auto max-w-3xl px-4 lg:px-8">
          <p className="mb-2 text-sm font-medium text-gold">
            {article.date} &middot;{" "}
            {article.type === "article"
              ? "Industry news"
              : article.category === "announcement"
                ? "Announcement"
                : "Presentation"}
          </p>
          <h1 className="text-2xl font-bold text-white md:text-4xl">
            {article.title}
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <p className="mb-8 text-lg leading-relaxed text-muted">
          {article.summary}
        </p>

        <div className="prose prose-sm max-w-none space-y-4 text-foreground">
          {article.body.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-8">
          {article.sourceUrl && (
            <NewsDownloadButton
              sourceUrl={article.sourceUrl}
              title={article.title}
            />
          )}
          <ShareButtons title={article.title} />
        </div>

        <Link
          href="/news"
          className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
        >
          <ArrowLeft size={14} />
          All news
        </Link>
      </article>
    </>
  );
}