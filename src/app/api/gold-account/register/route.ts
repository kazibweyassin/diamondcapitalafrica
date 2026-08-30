import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createGoldCustomerSession, hashPassword } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api-response";
import { rateLimit, requestIp } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z.string().trim().min(8).max(30).optional(),
  password: z.string().min(10).max(128),
});

export async function POST(request: Request) {
  const limit = rateLimit(`gold-register:${requestIp(request)}`, 5, 15 * 60_000);
  if (!limit.allowed) return jsonError("Too many attempts. Try again later.", 429);
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
    const exists = await prisma.goldCustomer.findUnique({ where: { email: parsed.data.email } });
    if (exists) return jsonError("An account already exists for this email", 409);
    const { password, ...profile } = parsed.data;
    const passwordHash = await hashPassword(password);
    const customer = await prisma.$transaction(async (tx) => {
      const created = await tx.goldCustomer.create({ data: { ...profile, passwordHash } });
      await tx.goldDeposit.updateMany({
        where: { email: { equals: created.email, mode: "insensitive" }, customerId: null },
        data: { customerId: created.id },
      });
      return created;
    });
    await createGoldCustomerSession(customer.id, customer.email);
    return jsonOk({ name: customer.name, email: customer.email }, 201);
  } catch {
    return jsonError("Failed to create account", 500);
  }
}
