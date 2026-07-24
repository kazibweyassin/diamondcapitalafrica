import type { Metadata } from "next";
import { buyerProcedureSteps } from "@/data/buyer-education";
import { company, companyFacts, services } from "@/data/content";
import type { FaqItem } from "@/data/faqs";

const PRODUCTION_SITE_URL = "https://www.diamondcapitalafrica.com";

function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");

  if (process.env.VERCEL_ENV === "production") {
    if (!configured || configured.includes("localhost")) return PRODUCTION_SITE_URL;
    return configured;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return configured ?? PRODUCTION_SITE_URL;
}

export const siteUrl = resolveSiteUrl();

export const defaultOgImage = "/opengraph-image";
export const defaultOgImageSize = { width: 1200, height: 630 };

/** Shared keywords. Keep aligned with public/llms.txt */
export const siteKeywords = [
  "buy gold Uganda",
  "gold seller Uganda",
  "gold supplier Uganda",
  "gold dealer Uganda",
  "gold bullion Uganda",
  "gold bullion Africa",
  "buy gold bars Africa",
  "gold export Uganda",
  "gold export Africa",
  "physical gold Uganda",
  "gold savings Uganda",
  "licensed gold dealer Uganda",
  "responsible gold sourcing",
  "gold assay testing",
  "East Africa gold",
  "Central Africa gold",
  "gold Uganda",
  "gold Africa",
  "gold investment East Africa",
  company.name,
  company.shortName,
] as const;

export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
}

export function pageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
  type = "website",
  publishedTime,
  keywords,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const fullTitle = `${title} | ${company.name}`;
  const isBrandedOg = image === defaultOgImage;

  return {
    title,
    description,
    keywords: keywords ?? [...siteKeywords],
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: company.name,
      locale: "en_UG",
      type,
      images: [
        {
          url: imageUrl,
          alt: company.name,
          ...(isBrandedOg ? defaultOgImageSize : {}),
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          ...(isBrandedOg ? defaultOgImageSize : {}),
        },
      ],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.shortName,
    url: siteUrl,
    logo: absoluteUrl("/Logo.png"),
    description: `${companyFacts.businessType}. ${company.description}`,
    slogan: company.tagline,
    email: company.email,
    telephone: company.phoneTel,
    foundingDate: String(company.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: "Kampala",
      addressRegion: "Central Region",
      addressCountry: "UG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phoneTel,
      contactType: "customer service",
      email: company.email,
      availableLanguage: ["English"],
      areaServed: ["UG", "CD", "Africa"],
    },
    areaServed: [
      { "@type": "Country", name: "Uganda" },
      { "@type": "Country", name: "Democratic Republic of the Congo" },
      { "@type": "Place", name: "East Africa" },
      { "@type": "Place", name: "Central Africa" },
    ],
    knowsAbout: [
      "Gold dealing",
      "Gold selling",
      "Gold bullion supply",
      "Gold refining",
      "Gold export",
      "Fire assay",
      "LBMA gold bars",
      "Responsible gold sourcing",
      "Physical gold savings",
    ],
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: company.name,
    image: absoluteUrl("/Logo.png"),
    url: siteUrl,
    telephone: company.phoneTel,
    email: company.email,
    description: company.description,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 0.3163,
      longitude: 32.5825,
    },
    areaServed: ["Uganda", "East Africa", "Central Africa"],
    serviceType: [
      "Gold selling",
      "Gold bullion supply",
      "Gold export",
      "Gold refining",
      "Gold assay testing",
    ],
  };
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Gold services in Uganda",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: absoluteUrl(`/services#${service.id}`),
        provider: {
          "@type": "Organization",
          name: company.name,
          url: siteUrl,
        },
        areaServed: ["Uganda", "East Africa", "Central Africa"],
      },
    })),
  };
}

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: siteUrl,
    description: company.description,
    inLanguage: "en-UG",
    about: {
      "@type": "Thing",
      name: "Licensed gold dealer and exporter in Uganda developing a planned refining and assay platform",
    },
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: absoluteUrl("/Logo.png"),
    },
  };
}

/** Service listings only. Avoid Product/Offer JSON-LD: quote-based bullion is not fixed-price merchant inventory. */
export function goldOfferingsJsonLd() {
  const provider = {
    "@type": "Organization" as const,
    name: company.name,
    url: siteUrl,
  };

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Gold offerings from Diamond Capital Africa",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Institutional Gold Export Coordination",
          description:
            "Assay-verified gold supply coordination with FOB Kampala, CIF Dubai, or insured delivery arrangements. Pricing on request.",
          url: absoluteUrl("/services#export"),
          provider,
          areaServed: ["Uganda", "East Africa", "Central Africa", "Worldwide"],
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Gold Savings",
          description:
            "Physical fine gold accumulation from $20 via USDT. Redeem from 20 g at Kampala or Arua.",
          url: absoluteUrl("/gold-savings"),
          provider,
          areaServed: ["Uganda", "East Africa", "Central Africa", "Worldwide"],
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Strategic Investment Opportunity",
          description:
            "Development-stage capital formation for a proposed gold refinery, assay laboratory and responsible-sourcing platform.",
          url: absoluteUrl("/investors/investment-opportunity"),
          provider,
          areaServed: ["Uganda", "East Africa", "Central Africa", "Worldwide"],
        },
      },
    ],
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
  sourceUrl,
  type = "NewsArticle",
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  sourceUrl?: string | null;
  type?: "NewsArticle" | "Article";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: title,
    description,
    url: absoluteUrl(path),
    datePublished,
    author: { "@type": "Organization", name: company.name },
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/Logo.png") },
    },
    mainEntityOfPage: absoluteUrl(path),
    ...(sourceUrl ? { isBasedOn: sourceUrl } : {}),
  };
}

/**
 * Structured data for the public investment opportunity page only.
 * Does not alter homepage, organization, or other page SEO.
 */
export function investmentOpportunityJsonLd() {
  const pagePath = "/investors/investment-opportunity";
  const pageUrl = absoluteUrl(pagePath);
  const pdfUrl = absoluteUrl(
    "/investors/diamond-capital-africa-investment-overview-2026.pdf"
  );
  const pageName = "Strategic Investment Opportunity";
  const pageDescription =
    "Explore Diamond Capital Africa's proposed integrated precious-metals platform, including a planned gold refinery, assay laboratory, responsible-sourcing infrastructure and regional mining partnerships.";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${pageName} | ${company.name}`,
        description: pageDescription,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: {
          "@type": "Thing",
          name: "Proposed East Africa precious-metals processing platform",
          description:
            "Development-stage capital formation for a planned gold refinery, assay laboratory and responsible-sourcing infrastructure. Preliminary assumptions subject to due diligence.",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/heroes/operations.jpg"),
        },
        inLanguage: "en-UG",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Investors",
            item: absoluteUrl("/about#investors"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: pageName,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${pdfUrl}#document`,
        name: "Diamond Capital Africa Investment Overview 2026",
        description:
          "Public overview of the proposed integrated precious-metals processing platform, preliminary capital requirement, project components and investor engagement process. Not a confidential memorandum or offer of securities.",
        url: pdfUrl,
        encodingFormat: "application/pdf",
        inLanguage: "en",
        author: {
          "@type": "Organization",
          name: company.name,
          url: siteUrl,
        },
        about: "Strategic investment opportunity — proposed gold refinery and assay laboratory",
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Diamond Capital Africa seeking investment for?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Diamond Capital Africa is seeking strategic investment to establish a proposed modern gold refinery, assay laboratory and responsible-sourcing platform serving verified participants across East and Central Africa. The opportunity remains at the development and capital-formation stage.",
            },
          },
          {
            "@type": "Question",
            name: "What is the preliminary capital requirement?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The preliminary capital requirement is USD 4 million. All capacities, costs, projections and timelines are preliminary planning assumptions subject to independent due diligence.",
            },
          },
          {
            "@type": "Question",
            name: "Where can I read the public Investment Overview?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `The public Investment Overview PDF is available at ${pdfUrl}. The complete confidential memorandum is available only after preliminary screening, NDA and KYC.`,
            },
          },
          {
            "@type": "Question",
            name: "Does this page constitute an offer of securities?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The investment opportunity page and Investment Overview are provided solely for preliminary discussion with qualified investors and strategic partners. They do not constitute an offer to sell securities, investment advice, a financing commitment or a guarantee of returns.",
            },
          },
        ],
      },
    ],
  };
}

/** HowTo schema for the institutional buying procedure page. */
export function howToBuyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to buy gold from Diamond Capital Africa",
    description:
      "Procedure for institutional buyers to purchase assay-verified gold from a licensed Kampala dealer: enquiry, KYC, quote, assay, and delivery.",
    url: absoluteUrl("/how-to-buy"),
    totalTime: "P14D",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Corporate KYC documents and proof of funds",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Export enquiry via contact form or phone",
      },
    ],
    step: buyerProcedureSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.body,
      url: absoluteUrl(`/how-to-buy#step-${index + 1}`),
    })),
  };
}