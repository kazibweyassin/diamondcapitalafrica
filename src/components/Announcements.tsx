import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ExpandableNewsList from "./ExpandableNewsList";
import { getPublishedNews } from "@/lib/news";

export default async function Announcements() {
  const announcements = await getPublishedNews("announcement");

  return (
    <section className="py-12">
      <SectionHeader title="Recent announcements" id="announcements" href="/news" />
      {announcements.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-section-alt px-6 py-10 text-center text-sm text-muted">
          No announcements published yet.
        </p>
      ) : (
        <ExpandableNewsList
          items={announcements}
          mobileVisible={2}
          expandLabel="announcements"
        />
      )}
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