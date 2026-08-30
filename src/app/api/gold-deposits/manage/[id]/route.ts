import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonOk, jsonError } from "@/lib/api-response";
import { serializeGoldDeposit } from "@/lib/gold-deposits";
import { isEmailConfigured, sendGoldSavingsConfirmation } from "@/lib/email";

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
    if (isEmailConfigured() && ["verified", "rejected"].includes(parsed.data.status)) {
      void sendGoldSavingsConfirmation({
        to: deposit.email,
        name: deposit.name,
        subject: `Gold Savings deposit ${parsed.data.status} (${deposit.reference})`,
        lines: parsed.data.status === "verified"
          ? [`Your deposit ${deposit.reference} has been verified.`, `${Number(deposit.gramsQuoted).toFixed(4)} g has been credited to your Gold Savings balance.`]
          : [`Your deposit ${deposit.reference} could not be verified.`, parsed.data.adminNotes || "Please contact our team for assistance."],
      }).catch(() => undefined);
    }

    return jsonOk(serializeGoldDeposit(deposit));
  } catch {
    return jsonError("Failed to update deposit", 500);
  }
}
