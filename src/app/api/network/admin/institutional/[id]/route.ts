import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { requireAdmin, hashPassword } from "@/lib/auth";
import {
  isEmailConfigured,
  sendInstitutionalCredentialsEmail,
} from "@/lib/email";
import { generatePortalPassword } from "@/lib/network-password";

const patchSchema = z.object({
  status: z.enum(["pending", "active", "rejected", "suspended"]).optional(),
  membershipTier: z.enum(["standard", "institutional"]).optional(),
  adminNotes: z.string().optional(),
  confirmPayment: z.boolean().optional(),
  sendCredentials: z.boolean().optional(),
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

    const existing = await prisma.institutionalAccount.findUnique({
      where: { id },
    });
    if (!existing) {
      return jsonError("Account not found", 404);
    }

    const { confirmPayment, sendCredentials, ...rest } = parsed.data;

    if (confirmPayment) {
      if (existing.paymentReceivedAt) {
        return jsonError("Payment has already been confirmed for this account", 409);
      }

      const account = await prisma.institutionalAccount.update({
        where: { id },
        data: {
          ...rest,
          paymentReceivedAt: new Date(),
        },
      });

      return jsonOk({ ...account, passwordHash: undefined });
    }

    if (sendCredentials) {
      if (!existing.paymentReceivedAt) {
        return jsonError(
          "Confirm payment received before sending portal credentials",
          422
        );
      }

      if (!isEmailConfigured()) {
        return jsonError(
          "Email is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS on the server.",
          503
        );
      }

      const temporaryPassword = generatePortalPassword();

      try {
        await sendInstitutionalCredentialsEmail({
          to: existing.email,
          contactName: existing.contactName,
          companyName: existing.companyName,
          reference: existing.reference,
          password: temporaryPassword,
        });
      } catch (err) {
        return jsonError(
          err instanceof Error
            ? err.message
            : "Failed to send credentials email",
          502
        );
      }

      const account = await prisma.institutionalAccount.update({
        where: { id },
        data: {
          ...rest,
          passwordHash: await hashPassword(temporaryPassword),
          status: "active",
          credentialsSentAt: new Date(),
        },
      });

      return jsonOk({
        ...account,
        passwordHash: undefined,
        emailSent: true,
        resent: Boolean(existing.credentialsSentAt),
      });
    }

    const account = await prisma.institutionalAccount.update({
      where: { id },
      data: rest,
    });

    return jsonOk({ ...account, passwordHash: undefined });
  } catch {
    return jsonError("Failed to update institutional account", 500);
  }
}