import SectionHeader from "./SectionHeader";
import NewsListItem from "./NewsListItem";
import { getPublishedNews } from "@/lib/news";

export default async function Presentations() {
  const presentations = await getPublishedNews("presentation");

  return (
    <section className="py-12">
      <SectionHeader title="Recent presentations" href="/news" />
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
  );
}