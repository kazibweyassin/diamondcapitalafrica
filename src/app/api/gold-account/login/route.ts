import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createGoldCustomerSession, verifyPassword } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api-response";
import { rateLimit, requestIp } from "@/lib/rate-limit";

const schema = z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1).max(128) });
export async function POST(request: Request) {
  const limit = rateLimit(`gold-login:${requestIp(request)}`, 8, 15 * 60_000);
  if (!limit.allowed) return jsonError("Too many attempts. Try again later.", 429);
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return jsonError("Invalid email or password", 401);
    const customer = await prisma.goldCustomer.findUnique({ where: { email: parsed.data.email } });
    if (!customer || !(await verifyPassword(parsed.data.password, customer.passwordHash))) {
      return jsonError("Invalid email or password", 401);
    }
    await createGoldCustomerSession(customer.id, customer.email);
    return jsonOk({ name: customer.name, email: customer.email });
  } catch { return jsonError("Login failed", 500); }
}
