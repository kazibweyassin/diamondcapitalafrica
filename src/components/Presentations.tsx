import SectionHeader from "./SectionHeader";
import NewsListItem from "./NewsListItem";
import { getPublishedNews } from "@/lib/news";

export default async function Presentations() {
  const presentations = await getPublishedNews("presentation");

  return (
    <section className="py-12">
      <SectionHeader title="Recent presentations" />
      <ul className="divide-y divide-border">
        {presentations.map((item) => (
          <NewsListItem key={item.slug} item={item} />
        ))}
      </ul>
    </section>
  );
}