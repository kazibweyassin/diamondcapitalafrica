import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { getInstitutionalSession } from "@/lib/auth";

export async function GET() {
  const session = await getInstitutionalSession();
  if (!session) {
    return jsonError("Unauthorized", 401);
  }

  const account = await prisma.institutionalAccount.findUnique({
    where: { id: session.accountId },
    select: {
      companyName: true,
      contactName: true,
      email: true,
      membershipTier: true,
      status: true,
    },
  });

  if (!account || account.status !== "active") {
    return jsonError("Unauthorized", 401);
  }

  return jsonOk(account);
}