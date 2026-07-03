import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { requireAdmin } from "@/lib/auth";
import { generateNetworkReference } from "@/lib/network";

const createSchema = z.object({
  memberId: z.string().min(1),
  title: z.string().min(2),
  productType: z.string().min(1),
  purity: z.string().optional(),
  volumeEstimate: z.string().min(1),
  location: z.string().min(2),
  verificationLevel: z.number().int().min(3).max(5).default(3),
  assayRef: z.string().optional(),
  summary: z.string().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
});

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
    }

    const supply = await prisma.verifiedSupply.create({
      data: {
        reference: generateNetworkReference("SUPPLY"),
        ...parsed.data,
      },
    });

    return jsonOk(supply, 201);
  } catch {
    return jsonError("Failed to create supply", 500);
  }
}