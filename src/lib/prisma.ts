import { PrismaClient, type Prisma } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const BUILD_PLACEHOLDER_URL =
  "postgresql://build:build@127.0.0.1:5432/build?connect_timeout=1";

function resolveDatabaseUrl(): string | undefined {
  // Pooled connections (pooled.db.prisma.io) can be flaky in local dev.
  // Use the direct URL locally; use DATABASE_URL (pooled) in production.
  if (process.env.NODE_ENV === "production") {
    return process.env.DATABASE_URL;
  }
  return process.env.DIRECT_URL ?? process.env.DATABASE_URL;
}

function createPrismaClient(): PrismaClient {
  const url = resolveDatabaseUrl() ?? process.env.DATABASE_URL;
  const log: Prisma.LogLevel[] =
    process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"];

  return new PrismaClient({
    datasources: {
      db: { url: url ?? BUILD_PLACEHOLDER_URL },
    },
    log,
  });
}

function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const client = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});