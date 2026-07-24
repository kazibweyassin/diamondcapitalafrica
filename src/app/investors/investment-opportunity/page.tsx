import type { Metadata } from "next";
import InvestmentOpportunityContent from "@/components/InvestmentOpportunityContent";
import JsonLd from "@/components/JsonLd";
import { company } from "@/data/content";
import { images } from "@/data/images";
import {
  absoluteUrl,
  investmentOpportunityJsonLd,
  siteUrl,
} from "@/lib/seo";

const title = "Strategic Investment Opportunity";
const description =
  "Explore Diamond Capital Africa’s proposed integrated precious-metals platform, including a planned gold refinery, assay laboratory, responsible-sourcing infrastructure and regional mining partnerships.";
const ogTitle = "Building East Africa’s Integrated Precious Metals Platform";
const ogDescription =
  "Diamond Capital Africa is seeking strategic investment to develop a modern gold refinery, assay laboratory and responsible precious-metals processing platform.";
const path = "/investors/investment-opportunity";
const image = images.pageHero.operations;

/** Page-local keywords only — does not alter site-wide default keywords. */
const investmentKeywords = [
  "Diamond Capital Africa investment",
  "gold refinery investment East Africa",
  "precious metals investment Uganda",
  "assay laboratory investment Africa",
  "strategic investment gold Africa",
  "East Africa gold infrastructure",
  "Kampala gold refining project",
  "responsible gold sourcing investment",
  "DCA investment opportunity",
  company.name,
];

export const metadata: Metadata = {
  title,
  description,
  keywords: investmentKeywords,
  robots: { index: true, follow: true },
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: absoluteUrl(path),
    siteName: company.name,
    locale: "en_UG",
    type: "website",
    images: [
      {
        url: absoluteUrl(image),
        alt: ogTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [absoluteUrl(image)],
  },
};

export default function InvestmentOpportunityPage() {
  return (
    <>
      <JsonLd data={investmentOpportunityJsonLd()} />
      <InvestmentOpportunityContent />
      {/* Crawlable plain-text summary for LLM / text extractors */}
      <section className="sr-only" aria-hidden="false">
        <h2>Investment opportunity summary for search and AI systems</h2>
        <p>
          {company.name} ({siteUrl}) is seeking strategic investment for a
          proposed modern gold refinery, assay laboratory and
          responsible-sourcing platform in East and Central Africa. Preliminary
          planning assumptions: USD 4 million capital requirement; planned
          initial capacity 50 kg per month; planned expansion up to 150 kg per
          month; indicative development pathway 9–12 months. All figures are
          subject to independent due diligence. Public Investment Overview:{" "}
          {absoluteUrl(
            "/investors/diamond-capital-africa-investment-overview-2026.pdf"
          )}
          . Full confidential memorandum only after screening, NDA and KYC.
          Contact: {company.investorsEmail}. This is not an offer of securities.
        </p>
        <p>
          Canonical page: {absoluteUrl(path)}. Related:{" "}
          {absoluteUrl("/about#investors")}.
        </p>
      </section>
    </>
  );
}
