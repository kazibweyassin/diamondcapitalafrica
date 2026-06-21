import Link from "next/link";
import NewsListItem from "@/components/NewsListItem";
import { getPublishedNews } from "@/lib/news";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "News & Announcements",
  description:
    "Industry news and announcements on Uganda's gold sector: curated updates with links to original publishers.",
  path: "/news",
});

export default async function NewsPage() {
  const announcements = await getPublishedNews("announcement");
  const presentations = await getPublishedNews("presentation");

  return (
    <>
      <section className="relative h-48 bg-primary md:h-56">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            News & Announcements
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80">
            Curated industry updates on Uganda&apos;s gold sector from public
            sources. Each article links to the original publisher.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-bold text-primary">
            Recent announcements
          </h2>
          {announcements.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border bg-section-alt px-6 py-10 text-center text-sm text-muted">
              No announcements published yet.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {announcements.map((item) => (
                <NewsListItem key={item.slug} item={item} />
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="mb-6 text-xl font-bold text-primary">Presentations</h2>
          {presentations.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border bg-section-alt px-6 py-10 text-center text-sm text-muted">
              No presentations published yet.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {presentations.map((item) => (
                <NewsListItem key={item.slug} item={item} />
              ))}
            </ul>
          )}
        </section>

        <Link
          href="/"
          className="mt-8 inline-block text-sm font-semibold text-gold-dark transition hover:text-gold"
        >
          &larr; Back to home
        </Link>
      </div>
    </>
  );
}