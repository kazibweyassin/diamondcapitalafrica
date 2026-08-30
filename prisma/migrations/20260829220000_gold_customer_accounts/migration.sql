CREATE TABLE "GoldCustomer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "GoldCustomer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "GoldRedemption" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "grams" DECIMAL(12,6) NOT NULL,
    "method" TEXT NOT NULL,
    "collectionCentre" TEXT,
    "status" TEXT NOT NULL DEFAULT 'requested',
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "GoldRedemption_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "GoldDeposit" ADD COLUMN "customerId" TEXT;
CREATE UNIQUE INDEX "GoldCustomer_email_key" ON "GoldCustomer"("email");
CREATE UNIQUE INDEX "GoldRedemption_reference_key" ON "GoldRedemption"("reference");
CREATE INDEX "GoldDeposit_customerId_idx" ON "GoldDeposit"("customerId");
CREATE INDEX "GoldRedemption_customerId_idx" ON "GoldRedemption"("customerId");
ALTER TABLE "GoldDeposit" ADD CONSTRAINT "GoldDeposit_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "GoldCustomer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "GoldRedemption" ADD CONSTRAINT "GoldRedemption_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "GoldCustomer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
