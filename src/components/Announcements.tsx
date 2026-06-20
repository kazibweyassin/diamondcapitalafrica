import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import NewsListItem from "./NewsListItem";
import { getPublishedNews } from "@/lib/news";

export default async function Announcements() {
  const announcements = await getPublishedNews("announcement");

  return (
    <section className="py-12">
      <SectionHeader title="Recent announcements" id="announcements" href="/news" />
      <ul className="divide-y divide-border">
        {announcements.map((item) => (
          <NewsListItem key={item.slug} item={item} />
        ))}
      </ul>
      <Link
        href="/news"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
      >
        View all news
        <ArrowRight size={14} />
      </Link>
    </section>
  );
}