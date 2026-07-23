import type { Metadata } from "next";
import InvestmentOpportunityContent from "@/components/InvestmentOpportunityContent";
import { company } from "@/data/content";
import { images } from "@/data/images";
import { absoluteUrl, siteUrl } from "@/lib/seo";

const title = "Strategic Investment Opportunity";
const description =
  "Explore Diamond Capital Africa’s proposed integrated precious-metals platform, including a planned gold refinery, assay laboratory, responsible-sourcing infrastructure and regional mining partnerships.";
const ogTitle = "Building East Africa’s Integrated Precious Metals Platform";
const ogDescription =
  "Diamond Capital Africa is seeking strategic investment to develop a modern gold refinery, assay laboratory and responsible precious-metals processing platform.";
const path = "/investors/investment-opportunity";
const image = images.pageHero.operations;

export const metadata: Metadata = {
  title,
  description,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${title} | ${company.name}`,
            description,
            url: `${siteUrl}${path}`,
            isPartOf: {
              "@type": "WebSite",
              name: company.name,
              url: siteUrl,
            },
          }),
        }}
      />
      <InvestmentOpportunityContent />
    </>
  );
}
