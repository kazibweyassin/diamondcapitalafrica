import { prisma } from "@/lib/prisma";
import type { DocumentItem } from "@/types";

function mapDocument(doc: {
  slug: string;
  title: string;
  type: string;
  category: string;
  summary: string;
  sourceUrl: string | null;
}): DocumentItem | null {
  if (!doc.sourceUrl) return null;
  return {
    slug: doc.slug,
    title: doc.title,
    type: doc.type,
    category: doc.category,
    summary: doc.summary,
    sourceUrl: doc.sourceUrl,
  };
}

export async function getPublishedDocuments(category?: string) {
  try {
    const documents = await prisma.document.findMany({
      where: {
        sourceUrl: { not: null },
        ...(category ? { category } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return documents
      .map(mapDocument)
      .filter((doc): doc is DocumentItem => doc !== null);
  } catch (error) {
    console.error("Failed to fetch documents from database:", error);
    return [];
  }
}

export async function getDocumentBySlug(slug: string) {
  try {
    const document = await prisma.document.findUnique({ where: { slug } });
    return document ? mapDocument(document) : null;
  } catch (error) {
    console.error("Failed to fetch document from database:", error);
    return null;
  }
}