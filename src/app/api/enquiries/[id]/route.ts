import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonOk, jsonError } from "@/lib/api-response";

const statusSchema = z.object({
  status: z.enum(["new", "read", "replied"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const parsed = statusSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError("Invalid status", 422);
    }

    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return jsonOk(enquiry);
  } catch {
    return jsonError("Failed to update enquiry", 500);
  }
}