import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { requireAdmin } from "@/lib/auth";

const patchSchema = z.object({
  title: z.string().min(2).optional(),
  productType: z.string().min(1).optional(),
  purity: z.string().optional(),
  volumeEstimate: z.string().min(1).optional(),
  location: z.string().min(2).optional(),
  verificationLevel: z.number().int().min(3).max(5).optional(),
  assayRef: z.string().optional(),
  summary: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
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

    const supply = await prisma.verifiedSupply.update({
      where: { id },
      data: parsed.data,
    });

    return jsonOk(supply);
  } catch {
    return jsonError("Failed to update supply", 500);
  }
}