import {
  announcements,
  presentations,
  annualReports,
  services,
  operations,
  company,
} from "@/data/content";
import type { SearchResult } from "@/types";

const staticPages: SearchResult[] = [
  {
    title: "Corporate Profile",
    href: "/about",
    excerpt: company.purpose,
    category: "About",
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
    excerpt: `${company.address} — ${company.phone}`,
    category: "Contact",
  },
  {
    title: "Market Prices",
    href: "/#market-prices",
    excerpt: "Live gold spot price, UGX/USD, and GCU spot rates.",
    category: "Investors",
  },
];

export function buildSearchIndex(): SearchResult[] {
  const newsResults: SearchResult[] = [
    ...announcements,
    ...presentations,
  ].map((item) => ({
    title: item.title,
    href: `/news/${item.slug}`,
    excerpt: item.summary,
    category: item.category === "announcement" ? "News" : "Presentation",
  }));

  const reportResults: SearchResult[] = annualReports.map((report) => ({
    title: report.title,
    href: "/#annual-reports",
    excerpt: report.summary,
    category: "Reports",
  }));

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

  return [
    ...staticPages,
    ...newsResults,
    ...reportResults,
    ...serviceResults,
    ...operationResults,
  ];
}

export function searchContent(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return buildSearchIndex().filter((item) => {
    const haystack = `${item.title} ${item.excerpt} ${item.category}`.toLowerCase();
    return haystack.includes(normalized);
  });
}