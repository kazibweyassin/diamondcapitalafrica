import type { Metadata } from "next";
import { company, companyFacts, services } from "@/data/content";
import type { FaqItem } from "@/data/faqs";

export const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://diamondcapitalafrica.com";

export const defaultOgImage = "/opengraph-image";
export const defaultOgImageSize = { width: 1200, height: 630 };

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
}

export function pageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
  type = "website",
  publishedTime,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const fullTitle = `${title} | ${company.name}`;
  const isBrandedOg = image === defaultOgImage;

  return {
    title,
    description,
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
      "Gold refining",
      "Gold export",
      "Fire assay",
      "LBMA gold bars",
      "Responsible gold sourcing",
      "Artisanal mining Uganda",
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
      "Gold buying",
      "Gold refining",
      "Gold assay testing",
      "Gold export",
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
    description: company.tagline,
    inLanguage: "en-UG",
    about: {
      "@type": "Thing",
      name: "Gold dealing and refining in Uganda and Africa",
    },
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: absoluteUrl("/Logo.png"),
    },
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