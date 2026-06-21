import type { Metadata } from "next";
import { company } from "@/data/content";

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
    url: siteUrl,
    logo: absoluteUrl("/Logo.png"),
    description: company.description,
    email: company.email,
    telephone: company.phoneTel,
    foundingDate: String(company.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phoneTel,
      contactType: "customer service",
      email: company.email,
      availableLanguage: ["English"],
    },
    areaServed: ["UG", "CD"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: siteUrl,
    description: company.tagline,
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