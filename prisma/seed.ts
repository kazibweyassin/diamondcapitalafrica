import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  allNews,
  annualReports,
  quarterlyReports,
} from "../src/data/content";
import { buildDocumentContent } from "../src/lib/download";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@goldcapital.ug";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const hashed = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { password: hashed },
    create: { email: adminEmail, password: hashed },
  });

  for (const article of allNews) {
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
        published: true,
      },
    });
  }

  for (const report of annualReports) {
    const slug = report.id;
    await prisma.document.upsert({
      where: { slug },
      update: {
        title: report.title,
        type: report.type,
        category: report.category,
        summary: report.summary,
        content: buildDocumentContent(
          report.title,
          report.category,
          report.summary
        ),
      },
      create: {
        slug,
        title: report.title,
        type: report.type,
        category: report.category,
        summary: report.summary,
        content: buildDocumentContent(
          report.title,
          report.category,
          report.summary
        ),
      },
    });
  }

  for (const quarter of quarterlyReports) {
    for (const item of quarter.items) {
      await prisma.document.upsert({
        where: { slug: item.id },
        update: {
          title: item.title,
          type: item.kind === "webcast" ? "www" : "pdf",
          category: "Quarterly",
          summary: item.summary,
          content: buildDocumentContent(
            item.title,
            "Quarterly",
            item.summary
          ),
        },
        create: {
          slug: item.id,
          title: item.title,
          type: item.kind === "webcast" ? "www" : "pdf",
          category: "Quarterly",
          summary: item.summary,
          content: buildDocumentContent(
            item.title,
            "Quarterly",
            item.summary
          ),
        },
      });
    }
  }

  for (const article of allNews) {
    const slug = `news-${article.slug}`;
    await prisma.document.upsert({
      where: { slug },
      update: {
        title: article.title,
        type: article.type,
        category: article.category,
        summary: article.summary,
        content: buildDocumentContent(
          article.title,
          article.category,
          article.summary
        ),
      },
      create: {
        slug,
        title: article.title,
        type: article.type,
        category: article.category,
        summary: article.summary,
        content: buildDocumentContent(
          article.title,
          article.category,
          article.summary
        ),
      },
    });
  }

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