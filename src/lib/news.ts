import { industryNews } from "@/data/industry-news";
import { prisma } from "@/lib/prisma";
import type { NewsItem } from "@/types";

function mapArticle(article: {
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  type: string;
  size: string;
  date: string;
  day: string;
  month: string;
  sourceUrl: string | null;
}): NewsItem {
  return {
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    body: JSON.parse(article.body) as string[],
    category: article.category as NewsItem["category"],
    type: article.type,
    size: article.size,
    date: article.date,
    day: article.day,
    month: article.month,
    sourceUrl: article.sourceUrl,
  };
}

function mapSeedArticle(article: (typeof industryNews)[number]): NewsItem {
  return {
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    body: article.body,
    category: article.category,
    type: article.type,
    size: article.size,
    date: article.date,
    day: article.day,
    month: article.month,
    sourceUrl: article.sourceUrl,
  };
}

function getStaticNews(category?: string) {
  return industryNews
    .filter((article) => !category || article.category === category)
    .map(mapSeedArticle);
}

export async function getPublishedNews(category?: string) {
  try {
    const articles = await prisma.newsArticle.findMany({
      where: {
        published: true,
        ...(category ? { category } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    if (articles.length > 0) {
      return articles.map(mapArticle);
    }
  } catch (error) {
    console.error("Failed to fetch news from database:", error);
  }

  return getStaticNews(category);
}

export async function getNewsBySlug(slug: string) {
  try {
    const article = await prisma.newsArticle.findUnique({
      where: { slug, published: true },
    });

    if (article) return mapArticle(article);
  } catch (error) {
    console.error("Failed to fetch article from database:", error);
  }

  const seedArticle = industryNews.find((article) => article.slug === slug);
  return seedArticle ? mapSeedArticle(seedArticle) : null;
}

export async function getAllNewsSlugs() {
  try {
    const articles = await prisma.newsArticle.findMany({
      where: { published: true },
      select: { slug: true },
    });

    if (articles.length > 0) {
      return articles.map((a) => a.slug);
    }
  } catch {
    // fall through to static slugs
  }

  return industryNews.map((article) => article.slug);
}

export async function getSitemapNewsEntries() {
  try {
    const entries = await prisma.newsArticle.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    if (entries.length > 0) return entries;
  } catch (error) {
    console.error("Failed to fetch sitemap news entries:", error);
  }

  return industryNews.map((article) => ({
    slug: article.slug,
    updatedAt: new Date(),
  }));
}