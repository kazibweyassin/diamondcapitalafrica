import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { hashPassword, requireAdmin } from "@/lib/auth";
import { isEmailConfigured, sendSupplierPortalEmail } from "@/lib/email";
import { generatePortalPassword } from "@/lib/network-password";

const patchSchema = z.object({
  status: z.enum(["pending", "verified", "rejected"]).optional(),
  verificationLevel: z.number().int().min(0).max(5).optional(),
  adminNotes: z.string().optional(),
  sendPortalAccess: z.boolean().optional(),
});

function withoutPassword<T extends { passwordHash?: string | null }>(member: T) {
  const copy = { ...member };
  delete copy.passwordHash;
  return copy;
}

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

    const existing = await prisma.networkMember.findUnique({ where: { id } });
    if (!existing) return jsonError("Supplier not found", 404);

    const { sendPortalAccess, ...rest } = parsed.data;

    if (sendPortalAccess) {
      const nextStatus = rest.status ?? existing.status;
      const nextLevel = rest.verificationLevel ?? existing.verificationLevel;
      if (nextStatus !== "verified") {
        return jsonError("Verify the supplier before sending portal access", 422);
      }
      if (nextLevel < 1) {
        return jsonError("Set verification to at least level 1 before sending portal access", 422);
      }

      const temporaryPassword = generatePortalPassword();
      let emailSent = false;
      let emailError: string | undefined;

      if (isEmailConfigured()) {
        try {
          await sendSupplierPortalEmail({
            to: existing.email,
            contactName: existing.contactName,
            companyName: existing.companyName,
            reference: existing.reference,
            password: temporaryPassword,
          });
          emailSent = true;
        } catch (error) {
          emailError = error instanceof Error ? error.message : "Failed to send portal email";
        }
      } else {
        emailError = "SMTP is not configured. Copy the password below and share it manually.";
      }

      const member = await prisma.networkMember.update({
        where: { id },
        data: {
          ...rest,
          status: "verified",
          passwordHash: await hashPassword(temporaryPassword),
          portalSentAt: new Date(),
        },
      });

      return jsonOk({
        ...withoutPassword(member),
        temporaryPassword,
        emailSent,
        emailError,
        resent: Boolean(existing.portalSentAt),
      });
    }

    const member = await prisma.networkMember.update({
      where: { id },
      data: rest,
    });

    return jsonOk(withoutPassword(member));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return jsonError("Unauthorized", 401);
    }
    return jsonError("Failed to update supplier", 500);
  }
}