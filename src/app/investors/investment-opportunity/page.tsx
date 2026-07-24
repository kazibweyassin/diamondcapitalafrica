import type { Metadata } from "next";
import InvestmentOpportunityContent from "@/components/InvestmentOpportunityContent";
import JsonLd from "@/components/JsonLd";
import { company } from "@/data/content";
import { images } from "@/data/images";
import { absoluteUrl, investmentOpportunityJsonLd } from "@/lib/seo";

const title = "Strategic Investment Opportunity";
const description =
  "Explore Diamond Capital Africa’s proposed integrated precious-metals platform, including a planned gold refinery, assay laboratory, responsible-sourcing infrastructure and regional mining partnerships.";
const ogTitle = "Building East Africa’s Integrated Precious Metals Platform";
const ogDescription =
  "Diamond Capital Africa is seeking strategic investment to develop a modern gold refinery, assay laboratory and responsible precious-metals processing platform.";
const path = "/investors/investment-opportunity";
const image = images.pageHero.operations;

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
    </>
  );
}
