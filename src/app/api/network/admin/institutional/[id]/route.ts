import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { requireAdmin, hashPassword } from "@/lib/auth";

const patchSchema = z.object({
  status: z.enum(["pending", "active", "rejected", "suspended"]).optional(),
  membershipTier: z.enum(["standard", "institutional"]).optional(),
  adminNotes: z.string().optional(),
  setPassword: z.string().min(8).optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
    }

    const { setPassword, ...rest } = parsed.data;
    const data: Record<string, unknown> = { ...rest };

    if (setPassword) {
      data.passwordHash = await hashPassword(setPassword);
    }

    const account = await prisma.institutionalAccount.update({
      where: { id },
      data,
    });

    return jsonOk({
      ...account,
      passwordHash: undefined,
      temporaryPassword: setPassword ?? undefined,
    });
  } catch {
    return jsonError("Failed to update institutional account", 500);
  }
}