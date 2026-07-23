import { faqJsonLd, goldOfferingsJsonLd, pageMetadata } from "@/lib/seo";
import { goldFaqs } from "@/data/faqs";
import { company } from "@/data/content";
import HeroCarousel from "@/components/HeroCarousel";
import JsonLd from "@/components/JsonLd";
import Announcements from "@/components/Announcements";
import Presentations from "@/components/Presentations";
import MarketPrices from "@/components/MarketPrices";
import EventsCalendar from "@/components/EventsCalendar";
import CompanyStats from "@/components/CompanyStats";
import NetworkPromo from "@/components/NetworkPromo";
import InvestmentPromo from "@/components/InvestmentPromo";
import ReportsSection from "@/components/ReportsSection";
import ESGHub from "@/components/ESGHub";
import FaqSection from "@/components/FaqSection";

export const metadata = pageMetadata({
  title: "Buy Gold Uganda | Licensed Dealer & Exporter",
  description: `${company.name} is a licensed gold dealer and exporter in Kampala, Uganda, developing a proposed refining and assay platform. Wholesale export coordination, live DCA spot pricing, and Gold Savings from $20.`,
  path: "/",
  image: "/images/heroes/home-sourcing.jpg",
  keywords: [
    "buy gold Uganda",
    "gold seller Uganda",
    "gold supplier Kampala",
    "gold bullion Uganda",
    "gold export East Africa",
    "gold savings Uganda",
    "buy gold bars Africa",
    "gold investment Uganda",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(goldFaqs)} />
      <JsonLd data={goldOfferingsJsonLd()} />
      <HeroCarousel />
      <InvestmentPromo />

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

      <NetworkPromo />
      <CompanyStats />
      <ESGHub />
      <FaqSection />
    </>
  );
}