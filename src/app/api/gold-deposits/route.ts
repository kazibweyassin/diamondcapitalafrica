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
import { requireGoldCustomer } from "@/lib/auth";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { isEmailConfigured, sendGoldSavingsConfirmation } from "@/lib/email";

const createSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Phone number is required"),
  amountUsd: z.coerce.number().min(20, "Minimum deposit is $20"),
});

export async function POST(request: Request) {
  if (!rateLimit(`deposit:${requestIp(request)}`, 10, 60 * 60_000).allowed) {
    return jsonError("Too many deposit requests. Try again later.", 429);
  }
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
    const customerSession = await requireGoldCustomer();
    if (customerSession.email.toLowerCase() !== email.toLowerCase()) {
      return jsonError("Use the email associated with your Gold Savings account", 403);
    }

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
        customerId: customerSession.customerId,
      },
    });
    if (isEmailConfigured()) {
      void sendGoldSavingsConfirmation({ to: email, name, subject: `Gold Savings deposit created (${deposit.reference})`, lines: [`Deposit: $${amountUsd.toFixed(2)} USDT`, `Gold quoted: ${gramsQuoted.toFixed(4)} g`, `Reference: ${deposit.reference}`, `Price lock expires: ${priceLockedUntil.toISOString()}`] }).catch(() => undefined);
    }

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
