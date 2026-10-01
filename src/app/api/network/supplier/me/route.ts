import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { getSupplierSession } from "@/lib/auth";

export async function GET() {
  const session = await getSupplierSession();
  if (!session) return jsonError("Unauthorized", 401);

  const member = await prisma.networkMember.findUnique({
    where: { id: session.memberId },
    select: {
      companyName: true,
      contactName: true,
      email: true,
      status: true,
      verificationLevel: true,
    },
  });

  if (!member || member.status !== "verified" || member.verificationLevel < 1) {
    return jsonError("Unauthorized", 401);
  }

  return jsonOk(member);
}
