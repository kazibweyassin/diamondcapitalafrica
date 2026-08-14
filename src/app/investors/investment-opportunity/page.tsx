import type { Metadata } from "next";
import InvestmentOpportunityContent from "@/components/InvestmentOpportunityContent";
import JsonLd from "@/components/JsonLd";
import { company } from "@/data/content";
import { investmentPageMeta } from "@/data/investment";
import { images } from "@/data/images";
import { absoluteUrl, investmentOpportunityJsonLd } from "@/lib/seo";

const { title, description, ogTitle, ogDescription } = investmentPageMeta;
const path = "/investors/investment-opportunity";
const image = images.pageHero.operations;

const investmentKeywords = [
  "Diamond Capital Africa investment",
  "gold refinery investment East Africa",
  "precious metals investment Uganda",
  "assay laboratory investment Africa",
  "strategic investment gold Africa",
  "gold-linked investment Africa",
  "equity investment gold refinery",
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
