import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireGoldCustomer } from "@/lib/auth";
import { getGoldCustomerDashboard } from "@/lib/gold-customer";
import { jsonError, jsonOk } from "@/lib/api-response";
import { goldSavings } from "@/data/gold-savings";
import { rateLimit } from "@/lib/rate-limit";
import { isEmailConfigured, sendGoldSavingsConfirmation } from "@/lib/email";

const schema = z.object({
  grams: z.coerce.number().min(goldSavings.minRedemptionGrams),
  method: z.enum(["collection", "sell_back"]),
  collectionCentre: z.enum(["Kampala", "Arua"]).optional(),
}).refine((v) => v.method !== "collection" || v.collectionCentre, { message: "Choose a collection centre" });

export async function POST(request: Request) {
  try {
    const session = await requireGoldCustomer();
    if (!rateLimit(`redemption:${session.customerId}`, 3, 24 * 60 * 60_000).allowed) return jsonError("Redemption request limit reached", 429);
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Invalid request", 422);
    const dashboard = await getGoldCustomerDashboard(session.customerId);
    if (!dashboard || parsed.data.grams > dashboard.balanceGrams) return jsonError("Insufficient available gold balance", 422);
    const redemption = await prisma.goldRedemption.create({ data: {
      reference: `DCA-RDM-${Date.now().toString(36).toUpperCase()}`,
      customerId: session.customerId,
      grams: parsed.data.grams,
      method: parsed.data.method,
      collectionCentre: parsed.data.collectionCentre,
    }});
    if (isEmailConfigured() && dashboard) {
      void sendGoldSavingsConfirmation({ to: dashboard.customer.email, name: dashboard.customer.name, subject: `Gold redemption requested (${redemption.reference})`, lines: [`Request: ${redemption.reference}`, `Amount reserved: ${parsed.data.grams.toFixed(4)} g`, `Method: ${parsed.data.method === "collection" ? `Collection at ${parsed.data.collectionCentre}` : "Sell back"}`, "Our team will complete identity and availability checks before approval."] }).catch(() => undefined);
    }
    return jsonOk({ reference: redemption.reference }, 201);
  } catch { return jsonError("Unauthorized", 401); }
}
