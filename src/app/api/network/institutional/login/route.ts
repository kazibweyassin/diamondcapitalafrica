import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import {
  createInstitutionalSession,
  verifyPassword,
} from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Invalid email or password", 422);
    }

    const account = await prisma.institutionalAccount.findUnique({
      where: { email: parsed.data.email },
    });

    if (
      !account ||
      account.status !== "active" ||
      !account.passwordHash
    ) {
      return jsonError("Invalid email or password", 401);
    }

    const valid = await verifyPassword(
      parsed.data.password,
      account.passwordHash
    );
    if (!valid) {
      return jsonError("Invalid email or password", 401);
    }

    await createInstitutionalSession(account.id, account.email);

    return jsonOk({
      companyName: account.companyName,
      membershipTier: account.membershipTier,
    });
  } catch {
    return jsonError("Login failed", 500);
  }
}