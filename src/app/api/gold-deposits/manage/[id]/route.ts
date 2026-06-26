import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonOk, jsonError } from "@/lib/api-response";
import { serializeGoldDeposit } from "@/lib/gold-deposits";

const updateSchema = z.object({
  status: z.enum(["verified", "rejected", "proof_submitted", "pending_payment"]),
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
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError("Invalid update", 422);
    }

    const deposit = await prisma.goldDeposit.update({
      where: { id },
      data: {
        status: parsed.data.status,
        adminNotes: parsed.data.adminNotes,
      },
    });

    return jsonOk(serializeGoldDeposit(deposit));
  } catch {
    return jsonError("Failed to update deposit", 500);
  }
}