import { pageMetadata } from "@/lib/seo";
import HeroCarousel from "@/components/HeroCarousel";

export const metadata = pageMetadata({
  title: "Gold Dealing & Refining",
  description:
    "Licensed gold buying, refining, assay, and export services across East and Central Africa. Traceable, LBMA-standard gold bars.",
  path: "/",
  image: "/images/heroes/home-sourcing.jpg",
});
import Announcements from "@/components/Announcements";
import Presentations from "@/components/Presentations";
import MarketPrices from "@/components/MarketPrices";
import EventsCalendar from "@/components/EventsCalendar";
import CompanyStats from "@/components/CompanyStats";
import ReportsSection from "@/components/ReportsSection";
import ESGHub from "@/components/ESGHub";

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-0 lg:grid-cols-2 lg:gap-12">
          <Announcements />
          <Presentations />
        </div>

        <div className="grid gap-0 lg:grid-cols-2 lg:gap-12">
          <MarketPrices />
          <EventsCalendar />
        </div>

        <ReportsSection />
      </div>

      <CompanyStats />
      <ESGHub />
    </>
  );
}