-- DropIndex
DROP INDEX "GoldDeposit_customerId_idx";

-- DropIndex
DROP INDEX "GoldRedemption_customerId_idx";

-- AlterTable
ALTER TABLE "NetworkMember" ADD COLUMN     "passwordHash" TEXT,
ADD COLUMN     "portalSentAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "GoldLot" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "estimatedWeightG" DECIMAL(12,3) NOT NULL,
    "estimatedPurityPct" DECIMAL(6,3) NOT NULL,
    "documentUrl" TEXT,
    "documentName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'submitted',
    "declineReason" TEXT,
    "decidedByEmail" TEXT,
    "decidedAt" TIMESTAMP(3),
    "finalWeightG" DECIMAL(12,3),
    "finalPurityPct" DECIMAL(6,3),
    "assayedByEmail" TEXT,
    "assayedAt" TIMESTAMP(3),
    "settledBidId" TEXT,
    "fineGrams" DECIMAL(14,6),
    "grossUsd" DECIMAL(14,2),
    "commissionUsd" DECIMAL(14,2),
    "assayFeeUsd" DECIMAL(14,2),
    "netUsd" DECIMAL(14,2),
    "spotUsdPerOz" DECIMAL(12,4),
    "spotUsdPerG" DECIMAL(12,6),
    "premiumPct" DECIMAL(6,3),
    "payoutApprovedByEmail" TEXT,
    "payoutApprovedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoldLot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LotBid" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "lotId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "spotUsdPerOz" DECIMAL(12,4) NOT NULL,
    "spotUsdPerG" DECIMAL(12,6) NOT NULL,
    "premiumPct" DECIMAL(6,3) NOT NULL,
    "spotSource" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LotBid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GoldLot_reference_key" ON "GoldLot"("reference");

-- CreateIndex
CREATE INDEX "GoldLot_memberId_idx" ON "GoldLot"("memberId");

-- CreateIndex
CREATE INDEX "GoldLot_status_idx" ON "GoldLot"("status");

-- CreateIndex
CREATE UNIQUE INDEX "LotBid_reference_key" ON "LotBid"("reference");

-- CreateIndex
CREATE INDEX "LotBid_lotId_idx" ON "LotBid"("lotId");

-- CreateIndex
CREATE INDEX "LotBid_accountId_idx" ON "LotBid"("accountId");

-- AddForeignKey
ALTER TABLE "GoldLot" ADD CONSTRAINT "GoldLot_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "NetworkMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LotBid" ADD CONSTRAINT "LotBid_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "GoldLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LotBid" ADD CONSTRAINT "LotBid_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "InstitutionalAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
