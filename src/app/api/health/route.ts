import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";

export async function GET() {
  const checks = {
    database: false,
    env: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      DIRECT_URL: !!process.env.DIRECT_URL,
      AUTH_SECRET: !!process.env.AUTH_SECRET,
      ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
      ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
    },
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch {
    checks.database = false;
  }

  const healthy = checks.database && checks.env.AUTH_SECRET;

  if (!healthy) {
    return jsonError("One or more health checks failed", 503);
  }

  return jsonOk({
    status: "ok",
    timestamp: new Date().toISOString(),
    checks,
  });
}