import { put } from "@vercel/blob";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { serializeGoldDeposit } from "@/lib/gold-deposits";

const txHashPattern = /^(0x)?[a-fA-F0-9]{40,64}$/;

const proofSchema = z.object({
  email: z.string().email(),
  txHash: z
    .string()
    .min(40, "Enter a valid transaction hash")
    .refine((v) => txHashPattern.test(v.trim()), "Invalid transaction hash format"),
});

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;
    const formData = await request.formData();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const txHash = String(formData.get("txHash") ?? "").trim();

    const parsed = proofSchema.safeParse({ email, txHash });
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
    }

    const deposit = await prisma.goldDeposit.findUnique({
      where: { reference },
    });

    if (!deposit || deposit.email.toLowerCase() !== parsed.data.email) {
      return jsonError("Deposit not found", 404);
    }

    if (deposit.status === "verified") {
      return jsonError("This deposit has already been verified", 409);
    }

    if (deposit.status === "expired") {
      return jsonError(
        "This deposit has expired. Please create a new deposit order.",
        410
      );
    }

    if (
      new Date() > deposit.priceLockedUntil &&
      deposit.status === "pending_payment"
    ) {
      await prisma.goldDeposit.update({
        where: { id: deposit.id },
        data: { status: "expired" },
      });
      return jsonError(
        "Price lock has expired. Please create a new deposit order.",
        410
      );
    }

    let proofUrl: string | undefined;
    const proofFile = formData.get("proof");

    if (proofFile instanceof File && proofFile.size > 0) {
      if (!allowedTypes.has(proofFile.type)) {
        return jsonError("Proof must be JPG, PNG, WebP, or PDF", 422);
      }
      if (proofFile.size > 5 * 1024 * 1024) {
        return jsonError("Proof file must be under 5 MB", 422);
      }

      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return jsonError(
          "File upload is not configured. Submit your transaction hash and WhatsApp your screenshot to our team.",
          503
        );
      }

      const blob = await put(
        `gold-deposits/${reference}-${Date.now()}-${proofFile.name}`,
        proofFile,
        { access: "public" }
      );
      proofUrl = blob.url;
    }

    const updated = await prisma.goldDeposit.update({
      where: { id: deposit.id },
      data: {
        txHash: parsed.data.txHash,
        proofUrl: proofUrl ?? deposit.proofUrl,
        status: "proof_submitted",
      },
    });

    return jsonOk(serializeGoldDeposit(updated));
  } catch {
    return jsonError("Failed to submit proof of payment", 500);
  }
}