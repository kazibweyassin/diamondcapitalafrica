import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { createSupplierSession, verifyPassword } from "@/lib/auth";
import { rateLimit, requestIp } from "@/lib/rate-limit";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  if (!rateLimit(`supplier-login:${requestIp(request)}`, 10, 15 * 60_000).allowed) {
    return jsonError("Too many sign-in attempts. Try again later.", 429);
  }

  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return jsonError("Invalid email or password", 422);

    const member = await prisma.networkMember.findFirst({
      where: {
        email: { equals: parsed.data.email, mode: "insensitive" },
        status: "verified",
        passwordHash: { not: null },
      },
      orderBy: { updatedAt: "desc" },
    });

    if (!member?.passwordHash) return jsonError("Invalid email or password", 401);

    const valid = await verifyPassword(parsed.data.password, member.passwordHash);
    if (!valid) return jsonError("Invalid email or password", 401);

    await createSupplierSession(member.id, member.email);
    return jsonOk({ companyName: member.companyName });
  } catch {
    return jsonError("Login failed", 500);
  }
}
