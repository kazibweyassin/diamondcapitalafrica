import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError } from "@/lib/api-response";
import { getInstitutionalSession } from "@/lib/auth";
import { anonymizeLocation } from "@/lib/network";

export async function GET() {
  try {
    const session = await getInstitutionalSession();
    const isMember = Boolean(session);

    const supply = await prisma.verifiedSupply.findMany({
      where: {
        status: "published",
        verificationLevel: { gte: 3 },
      },
      orderBy: { updatedAt: "desc" },
      include: {
        member: {
          select: {
            companyName: true,
            verificationLevel: true,
          },
        },
      },
    });

    const data = supply.map((item) => ({
      id: item.id,
      reference: item.reference,
      title: item.title,
      productType: item.productType,
      purity: item.purity,
      volumeEstimate: item.volumeEstimate,
      location: isMember
        ? item.location
        : anonymizeLocation(item.location),
      verificationLevel: item.verificationLevel,
      assayRef: isMember ? item.assayRef : null,
      summary: item.summary,
      supplierLevel: item.member.verificationLevel,
      supplierName: isMember ? item.member.companyName : "Verified supplier",
      updatedAt: item.updatedAt.toISOString(),
    }));

    return jsonOk({ supply: data, authenticated: isMember });
  } catch {
    return jsonError("Failed to load supply", 500);
  }
}