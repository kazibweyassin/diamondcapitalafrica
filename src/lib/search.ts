import { services, operations, company } from "@/data/content";
import type { SearchResult } from "@/types";

const staticPages: SearchResult[] = [
  {
    title: "Corporate Profile",
    href: "/about",
    excerpt: company.purpose,
    category: "About",
  },
  {
    title: "About Gold",
    href: "/about-gold",
    excerpt:
      "Why gold endures: scarcity, stability, symbolism, sustainability, and versatility.",
    category: "About",
  },
  {
    title: "Gold in Uganda",
    href: "/gold-in-uganda",
    excerpt:
      "Where to buy gold in Uganda: licensed dealer, Kampala refinery, and export across East Africa.",
    category: "About",
  },
  {
    title: "Buy Gold Bars",
    href: "/services#export",
    excerpt:
      "Purchase 99.99% LBMA-standard gold bars. FOB Kampala, CIF Dubai, or insured delivery.",
    category: "Services",
  },

  {
    title: "Gold Savings",
    href: "/gold-savings",
    excerpt:
      "Save in physical 99.99% gold from $20. Bullion accumulation, not mining shares.",
    category: "Investors",
  },
  {
    title: "Our Services",
    href: "/services",
    excerpt: "Gold buying, refining, assay testing, and export services.",
    category: "Services",
  },
  {
    title: "Operations",
    href: "/operations",
    excerpt: "Kampala refinery and collection centres across Uganda.",
    category: "Operations",
  },
  {
    title: "Sustainability",
    href: "/sustainability",
    excerpt: "Responsible sourcing, environmental care, and community impact.",
    category: "Sustainability",
  },
  {
    title: "Contact Us",
    href: "/contact",
    excerpt: `${company.contactName}, ${company.phone}, ${company.address}`,
    category: "Contact",
  },
  {
    title: "Market Prices",
    href: "/#market-prices",
    excerpt: "Live gold spot price, UGX/USD, and DCA spot rates.",
    category: "Investors",
  },
  {
    title: "News & Announcements",
    href: "/news",
    excerpt: "Company announcements and investor presentations.",
    category: "News",
  },
  {
    title: "Annual Reports",
    href: "/#annual-reports",
    excerpt: "Annual reports and quarterly operational highlights for investors.",
    category: "Reports",
  },
];

export function buildSearchIndex(): SearchResult[] {
  const serviceResults: SearchResult[] = services.map((service) => ({
    title: service.title,
    href: `/services#${service.id}`,
    excerpt: service.description,
    category: "Services",
  }));

  const operationResults: SearchResult[] = operations.map((op) => ({
    title: op.title,
    href: `/operations#${op.id}`,
    excerpt: op.description,
    category: "Operations",
  }));

  return [...staticPages, ...serviceResults, ...operationResults];
}

export function searchContent(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return buildSearchIndex().filter((item) => {
    const haystack = `${item.title} ${item.excerpt} ${item.category}`.toLowerCase();
    return haystack.includes(normalized);
  });
}