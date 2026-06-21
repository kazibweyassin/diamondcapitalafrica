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

export async function getPublishedNews(category?: string) {
  try {
    const articles = await prisma.newsArticle.findMany({
      where: {
        published: true,
        ...(category ? { category } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return articles.map(mapArticle);
  } catch (error) {
    console.error("Failed to fetch news from database:", error);
    return [];
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    const article = await prisma.newsArticle.findUnique({
      where: { slug, published: true },
    });

    return article ? mapArticle(article) : null;
  } catch (error) {
    console.error("Failed to fetch article from database:", error);
    return null;
  }
}

export async function getAllNewsSlugs() {
  try {
    const articles = await prisma.newsArticle.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return articles.map((a) => a.slug);
  } catch {
    return [];
  }
}

export async function getSitemapNewsEntries() {
  try {
    return await prisma.newsArticle.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch sitemap news entries:", error);
    return [];
  }
}