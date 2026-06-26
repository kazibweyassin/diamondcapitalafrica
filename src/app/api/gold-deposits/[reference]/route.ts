import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { serializeGoldDeposit } from "@/lib/gold-deposits";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email")?.trim().toLowerCase();

    if (!email) {
      return jsonError("Email is required to look up this deposit", 400);
    }

    const deposit = await prisma.goldDeposit.findUnique({
      where: { reference },
    });

    if (!deposit || deposit.email.toLowerCase() !== email) {
      return jsonError("Deposit not found", 404);
    }

    return jsonOk(serializeGoldDeposit(deposit));
  } catch {
    return jsonError("Failed to fetch deposit", 500);
  }
}