import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import {
  isEmailConfigured,
  sendInstitutionalApplicationEmail,
} from "@/lib/email";
import { generateNetworkReference } from "@/lib/network";

const accessSchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  buyerType: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = accessSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
    }

    const existing = await prisma.institutionalAccount.findUnique({
      where: { email: parsed.data.email },
    });

    if (existing) {
      return jsonError(
        "An application already exists for this email. Contact DCA if you need help.",
        409
      );
    }

    const account = await prisma.institutionalAccount.create({
      data: {
        reference: generateNetworkReference("INS"),
        ...parsed.data,
      },
    });

    if (isEmailConfigured()) {
      try {
        await sendInstitutionalApplicationEmail({
          to: account.email,
          contactName: account.contactName,
          companyName: account.companyName,
          reference: account.reference,
        });
      } catch {
        // Application is saved even if the confirmation email fails.
      }
    }

    return jsonOk({ reference: account.reference }, 201);
  } catch {
    return jsonError("Failed to submit access request", 500);
  }
}