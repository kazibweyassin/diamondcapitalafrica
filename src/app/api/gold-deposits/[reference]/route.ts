import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { serializeGoldDeposit } from "@/lib/gold-deposits";
import { requireGoldCustomer } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;
    void request;
    const session = await requireGoldCustomer();

    const deposit = await prisma.goldDeposit.findUnique({
      where: { reference },
    });

    if (!deposit || deposit.customerId !== session.customerId) {
      return jsonError("Deposit not found", 404);
    }

    return jsonOk(serializeGoldDeposit(deposit));
  } catch (error) {
    return jsonError(error instanceof Error && error.message === "Unauthorized" ? "Unauthorized" : "Failed to fetch deposit", error instanceof Error && error.message === "Unauthorized" ? 401 : 500);
  }
}
