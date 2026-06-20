import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseUrl() {
  // Pooled connections (pooled.db.prisma.io) can be flaky in local dev.
  // Use the direct URL locally; use DATABASE_URL (pooled) in production.
  if (process.env.NODE_ENV === "production") {
    return process.env.DATABASE_URL;
  }
  return process.env.DIRECT_URL ?? process.env.DATABASE_URL;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: { url: getDatabaseUrl() },
    },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}