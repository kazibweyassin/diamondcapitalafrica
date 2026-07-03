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

function handleRouteError(err: unknown, fallback: string) {
  if (err instanceof Error && err.message === "Unauthorized") {
    return jsonError("Unauthorized — sign in to admin again", 401);
  }
  console.error(fallback, err);
  return jsonError(fallback, 500);
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

      const temporaryPassword = generatePortalPassword();
      let emailSent = false;
      let emailError: string | undefined;

      if (isEmailConfigured()) {
        try {
          await sendInstitutionalCredentialsEmail({
            to: existing.email,
            contactName: existing.contactName,
            companyName: existing.companyName,
            reference: existing.reference,
            password: temporaryPassword,
          });
          emailSent = true;
        } catch (err) {
          emailError =
            err instanceof Error
              ? err.message
              : "Failed to send credentials email";
        }
      } else {
        emailError =
          "SMTP not configured on the server — copy the password below and share it manually.";
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
        temporaryPassword,
        emailSent,
        emailError,
        resent: Boolean(existing.credentialsSentAt),
      });
    }

    const account = await prisma.institutionalAccount.update({
      where: { id },
      data: rest,
    });

    return jsonOk({ ...account, passwordHash: undefined });
  } catch (err) {
    return handleRouteError(err, "Failed to update institutional account");
  }
}