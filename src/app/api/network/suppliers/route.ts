import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { generateNetworkReference } from "@/lib/network";

const supplierSchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  licenseNumber: z.string().optional(),
  location: z.string().min(2),
  productType: z.string().min(1),
  volumeRange: z.string().min(1),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = supplierSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
    }

    const member = await prisma.networkMember.create({
      data: {
        reference: generateNetworkReference("SUP"),
        ...parsed.data,
      },
    });

    return jsonOk({ reference: member.reference }, 201);
  } catch {
    return jsonError("Failed to submit application", 500);
  }
}