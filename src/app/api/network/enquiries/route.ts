import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { requireInstitutional } from "@/lib/auth";
import { generateNetworkReference } from "@/lib/network";

const enquirySchema = z.object({
  supplyId: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const session = await requireInstitutional();
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
    }

    const account = await prisma.institutionalAccount.findUnique({
      where: { id: session.accountId },
    });
    if (!account || account.status !== "active") {
      return jsonError("Unauthorized", 401);
    }

    const supply = await prisma.verifiedSupply.findFirst({
      where: {
        id: parsed.data.supplyId,
        status: "published",
        verificationLevel: { gte: 3 },
      },
    });
    if (!supply) {
      return jsonError("Supply not found", 404);
    }

    const enquiry = await prisma.exchangeEnquiry.create({
      data: {
        reference: generateNetworkReference("EXQ"),
        supplyId: supply.id,
        accountId: account.id,
        contactName: account.contactName,
        email: account.email,
        companyName: account.companyName,
        message: parsed.data.message,
      },
    });

    return jsonOk({ reference: enquiry.reference }, 201);
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return jsonError("Unauthorized", 401);
    }
    return jsonError("Failed to submit quote request", 500);
  }
}