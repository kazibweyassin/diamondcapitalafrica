export type NewsCategory = "announcement" | "presentation" | "report";

export interface NewsItem {
  slug: string;
  date: string;
  day: string;
  month: string;
  title: string;
  type: string;
  size: string;
  category: NewsCategory;
  summary: string;
  body: string[];
  sourceUrl?: string | null;
}

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  isoStart: string;
  isoEnd: string;
  location: string;
  description: string;
}

export interface DocumentItem {
  slug: string;
  title: string;
  type: string;
  category: string;
  summary: string;
  sourceUrl: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface SearchResult {
  title: string;
  href: string;
  excerpt: string;
  category: string;
}

export interface MarketQuote {
  label: string;
  value: string;
  change: number;
  loading?: boolean;
}