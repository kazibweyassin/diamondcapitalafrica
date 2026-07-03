import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { requireAdmin } from "@/lib/auth";

const patchSchema = z.object({
  status: z.enum(["pending", "verified", "rejected"]).optional(),
  verificationLevel: z.number().int().min(0).max(5).optional(),
  adminNotes: z.string().optional(),
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

    const member = await prisma.networkMember.update({
      where: { id },
      data: parsed.data,
    });

    return jsonOk(member);
  } catch {
    return jsonError("Failed to update supplier", 500);
  }
}