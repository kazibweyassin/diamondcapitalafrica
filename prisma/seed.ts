import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { industryNews } from "../src/data/industry-news";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@diamondcapitalafrica.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const hashed = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { password: hashed },
    create: { email: adminEmail, password: hashed },
  });

  const placeholderSlugs = [
    "dmcc-good-delivery-accreditation-2026",
    "agm-results-2026",
    "bank-of-uganda-export-partnership",
    "mbarara-collection-centre-opening",
    "q4-full-year-2025-results",
    "q3-2025-operational-review",
    "annual-report-2025",
    "sustainability-report-2025",
    "compliance-report-2025",
    "esg-workbook-2025",
    "agm-notice-2026",
    "q1-2026-webcast",
    "q1-2026-report",
    "q1-2026-presentation",
    "q1-2026-statistics",
  ];

  await prisma.newsArticle.deleteMany({
    where: { slug: { in: placeholderSlugs } },
  });

  await prisma.document.deleteMany({
    where: {
      OR: [
        { slug: { in: placeholderSlugs } },
        { slug: { startsWith: "news-" } },
        { sourceUrl: null },
      ],
    },
  });

  for (const article of industryNews) {
    await prisma.newsArticle.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        summary: article.summary,
        body: JSON.stringify(article.body),
        category: article.category,
        type: article.type,
        size: article.size,
        date: article.date,
        day: article.day,
        month: article.month,
        sourceUrl: article.sourceUrl,
        published: true,
      },
      create: {
        slug: article.slug,
        title: article.title,
        summary: article.summary,
        body: JSON.stringify(article.body),
        category: article.category,
        type: article.type,
        size: article.size,
        date: article.date,
        day: article.day,
        month: article.month,
        sourceUrl: article.sourceUrl,
        published: true,
      },
    });
  }

  console.log(`Seeded ${industryNews.length} industry news articles`);
  console.log("Database seeded successfully");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });