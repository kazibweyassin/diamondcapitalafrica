import "server-only";
import { prisma } from "@/lib/prisma";

export async function getGoldCustomerDashboard(customerId: string) {
  const customer = await prisma.goldCustomer.findUnique({
    where: { id: customerId },
    include: {
      deposits: { orderBy: { createdAt: "desc" } },
      redemptions: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!customer) return null;
  const credited = customer.deposits
    .filter((item) => item.status === "verified")
    .reduce((sum, item) => sum + Number(item.gramsQuoted), 0);
  const reserved = customer.redemptions
    .filter((item) => ["requested", "approved", "ready"].includes(item.status))
    .reduce((sum, item) => sum + Number(item.grams), 0);
  return {
    customer: { name: customer.name, email: customer.email, phone: customer.phone },
    balanceGrams: Number((credited - reserved).toFixed(6)),
    creditedGrams: Number(credited.toFixed(6)),
    reservedGrams: Number(reserved.toFixed(6)),
    deposits: customer.deposits.map((item) => ({
      reference: item.reference,
      amountUsd: item.amountUsd.toString(),
      grams: item.gramsQuoted.toString(),
      status: item.status,
      txHash: item.txHash,
      createdAt: item.createdAt.toISOString(),
    })),
    redemptions: customer.redemptions.map((item) => ({
      reference: item.reference,
      grams: item.grams.toString(),
      method: item.method,
      collectionCentre: item.collectionCentre,
      status: item.status,
      createdAt: item.createdAt.toISOString(),
    })),
  };
}
