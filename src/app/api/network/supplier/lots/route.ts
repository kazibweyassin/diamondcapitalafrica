import { put } from "@vercel/blob";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { detectedFileType, isAllowedDocumentType } from "@/lib/file-signature";
import { generateNetworkReference } from "@/lib/network";
import { serializeSupplierLot } from "@/lib/lots";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { requireVerifiedSupplier } from "@/lib/supplier-access";
import { productTypes } from "@/data/network";

const lotSchema = z.object({
  productType: z.string().refine((value) => (productTypes as readonly string[]).includes(value), "Choose a product"),
  estimatedWeightG: z.coerce.number().gt(0).max(500_000),
  estimatedPurityPct: z.coerce.number().gt(0).max(100),
});

function routeError(error: unknown, fallback: string) {
  if (error instanceof Error && error.message === "Unauthorized") {
    return jsonError("Unauthorized", 401);
  }
  return jsonError(fallback, 500);
}

export async function GET() {
  try {
    const member = await requireVerifiedSupplier();
    const lots = await prisma.goldLot.findMany({
      where: { memberId: member.id },
      orderBy: { createdAt: "desc" },
    });
    return jsonOk(lots.map(serializeSupplierLot));
  } catch (error) {
    return routeError(error, "Failed to load lots");
  }
}

export async function POST(request: Request) {
  if (!rateLimit(`supplier-lot:${requestIp(request)}`, 10, 60 * 60_000).allowed) {
    return jsonError("Too many lots. Try again later.", 429);
  }

  try {
    const member = await requireVerifiedSupplier();
    const formData = await request.formData();
    const parsed = lotSchema.safeParse({
      productType: formData.get("productType"),
      estimatedWeightG: formData.get("estimatedWeightG"),
      estimatedPurityPct: formData.get("estimatedPurityPct"),
    });
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid lot", 422);
    }

    const document = formData.get("document");
    if (!(document instanceof File) || document.size === 0) {
      return jsonError("Attach a permit, licence, or photo of the lot", 422);
    }
    if (!isAllowedDocumentType(document.type)) {
      return jsonError("Document must be JPG, PNG, WebP, or PDF", 422);
    }
    const detected = await detectedFileType(document);
    if (!detected || detected !== document.type) {
      return jsonError("Document contents do not match its declared type", 422);
    }
    if (document.size > 5 * 1024 * 1024) {
      return jsonError("Document must be under 5 MB", 422);
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return jsonError("Document upload is not configured. Contact DCA.", 503);
    }

    const reference = generateNetworkReference("LOT");
    const extension = detected === "application/pdf" ? "pdf" : detected.split("/")[1];
    const blob = await put(`gold-lots/${reference}-${Date.now()}.${extension}`, document, {
      access: "private",
    });

    const lot = await prisma.goldLot.create({
      data: {
        reference,
        memberId: member.id,
        productType: parsed.data.productType,
        estimatedWeightG: new Prisma.Decimal(parsed.data.estimatedWeightG.toFixed(3)),
        estimatedPurityPct: new Prisma.Decimal(parsed.data.estimatedPurityPct.toFixed(3)),
        documentUrl: blob.pathname,
        documentName: document.name.slice(0, 180),
      },
    });

    return jsonOk(serializeSupplierLot(lot), 201);
  } catch (error) {
    return routeError(error, "Failed to submit lot");
  }
}
