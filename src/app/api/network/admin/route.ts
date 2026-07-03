import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();

    const [suppliers, supply, institutional, enquiries] = await Promise.all([
      prisma.networkMember.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.verifiedSupply.findMany({
        orderBy: { updatedAt: "desc" },
        include: {
          member: { select: { companyName: true, reference: true } },
        },
      }),
      prisma.institutionalAccount.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.exchangeEnquiry.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          supply: { select: { title: true, reference: true } },
        },
      }),
    ]);

    return jsonOk({ suppliers, supply, institutional, enquiries });
  } catch {
    return jsonError("Unauthorized", 401);
  }
}