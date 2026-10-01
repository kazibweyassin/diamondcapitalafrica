import { prisma } from "@/lib/prisma";
import { requireSupplier } from "@/lib/auth";

export async function requireVerifiedSupplier() {
  const session = await requireSupplier();
  const member = await prisma.networkMember.findUnique({
    where: { id: session.memberId },
  });

  if (
    !member ||
    member.status !== "verified" ||
    member.verificationLevel < 1 ||
    !member.passwordHash
  ) {
    throw new Error("Unauthorized");
  }

  return member;
}
