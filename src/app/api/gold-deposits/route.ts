import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonOk, jsonError } from "@/lib/api-response";
import {
  calcGramsFromUsd,
  generateDepositReference,
  getSpotPricePerGram,
  serializeGoldDeposit,
  validateDepositAmount,
} from "@/lib/gold-deposits";
import { getPriceLockUntil, getUsdtConfig } from "@/lib/gold-savings-config";

const createSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Phone number is required"),
  amountUsd: z.coerce.number().min(20, "Minimum deposit is $20"),
});

export async function POST(request: Request) {
  try {
    const usdt = getUsdtConfig();
    if (!usdt.configured || !usdt.wallet) {
      return jsonError(
        "USDT payments are not configured yet. Please contact us directly.",
        503
      );
    }

    const body = await request.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
    }

    const { name, email, phone, amountUsd } = parsed.data;

    if (!validateDepositAmount(amountUsd)) {
      return jsonError("Minimum deposit is $20", 422);
    }

    const { spot } = await getSpotPricePerGram();
    const gramsQuoted = calcGramsFromUsd(amountUsd, spot);
    const priceLockedUntil = getPriceLockUntil();

    const deposit = await prisma.goldDeposit.create({
      data: {
        reference: generateDepositReference(),
        name,
        email,
        phone,
        amountUsd,
        gramsQuoted,
        spotPricePerG: spot,
        priceLockedUntil,
        paymentMethod: "usdt",
        status: "pending_payment",
      },
    });

    return jsonOk(
      {
        deposit: serializeGoldDeposit(deposit),
        payment: {
          method: "usdt",
          network: usdt.network,
          wallet: usdt.wallet,
          amountUsdt: amountUsd.toFixed(2),
          reference: deposit.reference,
          priceLockedUntil: priceLockedUntil.toISOString(),
        },
      },
      201
    );
  } catch {
    return jsonError("Failed to create deposit order", 500);
  }
}

export async function GET() {
  try {
    await requireAdmin();
    const deposits = await prisma.goldDeposit.findMany({
      orderBy: { createdAt: "desc" },
    });
    return jsonOk(deposits.map(serializeGoldDeposit));
  } catch {
    return jsonError("Unauthorized", 401);
  }
}