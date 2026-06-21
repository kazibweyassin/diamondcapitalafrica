import { pageMetadata, faqJsonLd } from "@/lib/seo";
import { goldFaqs } from "@/data/faqs";
import { company } from "@/data/content";
import HeroCarousel from "@/components/HeroCarousel";
import JsonLd from "@/components/JsonLd";
import Announcements from "@/components/Announcements";
import Presentations from "@/components/Presentations";
import MarketPrices from "@/components/MarketPrices";
import EventsCalendar from "@/components/EventsCalendar";
import CompanyStats from "@/components/CompanyStats";
import ReportsSection from "@/components/ReportsSection";
import ESGHub from "@/components/ESGHub";
import FaqSection from "@/components/FaqSection";

export const metadata = pageMetadata({
  title: "Gold Dealer & Refinery Uganda | East & Central Africa",
  description: `${company.name} is a licensed gold dealer and refinery in Kampala, Uganda. Buy, refine, and export 99.99% pure gold bars across East and Central Africa with full traceability.`,
  path: "/",
  image: "/images/heroes/home-sourcing.jpg",
});

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(goldFaqs)} />
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
      <FaqSection />
    </>
  );
}