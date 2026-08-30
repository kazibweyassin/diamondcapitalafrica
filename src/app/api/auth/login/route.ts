import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { jsonOk, jsonError } from "@/lib/api-response";
import { rateLimit, requestIp } from "@/lib/rate-limit";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  if (!rateLimit(`admin-login:${requestIp(request)}`, 6, 15 * 60_000).allowed) return jsonError("Too many attempts. Try again later.", 429);
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError("Invalid credentials", 422);
    }

    const user = await prisma.adminUser.findUnique({
      where: { email: parsed.data.email },
    });

    if (!user) {
      return jsonError("Invalid email or password", 401);
    }

    const valid = await bcrypt.compare(parsed.data.password, user.password);
    if (!valid) {
      return jsonError("Invalid email or password", 401);
    }

    await createSession(user.email);
    return jsonOk({ email: user.email });
  } catch {
    return jsonError("Login failed", 500);
  }
}
