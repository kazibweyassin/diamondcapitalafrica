import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonOk, jsonError } from "@/lib/api-response";

const enquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

function generateReference() {
  return `DCA-${Date.now().toString(36).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        reference: generateReference(),
        ...parsed.data,
      },
    });

    return jsonOk(
      {
        id: enquiry.reference,
        createdAt: enquiry.createdAt.toISOString(),
      },
      201
    );
  } catch {
    return jsonError("Failed to submit enquiry", 500);
  }
}

export async function GET() {
  try {
    await requireAdmin();
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return jsonOk(enquiries);
  } catch {
    return jsonError("Unauthorized", 401);
  }
}