import type { Metadata } from "next";
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

/** Shared keywords — keep aligned with public/llms.txt */
export const siteKeywords = [
  "buy gold Uganda",
  "gold seller Uganda",
  "gold supplier Uganda",
  "gold dealer Uganda",
  "gold bullion Uganda",
  "LBMA gold bars",
  "99.99% gold bars",
  "buy gold bars Africa",
  "gold export Uganda",
  "gold export Africa",
  "gold refinery Kampala",
  "gold refinery Uganda",
  "physical gold Uganda",
  "gold savings Uganda",
  "licensed gold dealer Uganda",
  "responsible gold sourcing",
  "gold assay testing",
  "East Africa gold",
  "Central Africa gold",
  "gold Uganda",
  "gold Africa",
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
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "99.99% Fine Gold Bars",
          description:
            "LBMA Good Delivery standard gold bars, fire-assay verified with serial numbers. Available FOB Kampala, CIF Dubai, or escorted insured delivery.",
          category: "Gold bullion",
          brand: { "@type": "Brand", name: company.name },
        },
        areaServed: ["Uganda", "East Africa", "Central Africa", "Worldwide"],
        url: absoluteUrl("/services#export"),
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Gold Savings — Physical Bullion",
          description:
            "Accumulate assay-verified 99.99% physical gold from $20 via USDT. Redeem from 20 g at Kampala or Arua.",
          category: "Gold savings",
          brand: { "@type": "Brand", name: company.name },
        },
        url: absoluteUrl("/gold-savings"),
      },
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
      name: "Licensed gold dealer, refinery, and exporter in Uganda — sell 99.99% gold bars to buyers",
    },
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: absoluteUrl("/Logo.png"),
    },
  };
}

export function goldProductsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Gold products and services",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "99.99% Fine Gold Bars",
          description:
            "Fire-assay verified LBMA Good Delivery gold bars in 10 oz, 1 kg, and 12.5 kg formats.",
          brand: { "@type": "Brand", name: company.name },
          category: "Gold bullion",
          offers: {
            "@type": "Offer",
            url: absoluteUrl("/services#export"),
            seller: { "@type": "Organization", name: company.name },
            areaServed: ["Uganda", "East Africa", "Central Africa", "Worldwide"],
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "Gold Savings",
          description: "Physical 99.99% gold accumulation from $20 via USDT.",
          brand: { "@type": "Brand", name: company.name },
          category: "Gold savings",
          offers: {
            "@type": "Offer",
            url: absoluteUrl("/gold-savings"),
            seller: { "@type": "Organization", name: company.name },
          },
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
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  sourceUrl?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
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