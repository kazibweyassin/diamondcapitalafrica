export const verificationLevels = [
  { level: 1, label: "Identity verified", short: "L1" },
  { level: 2, label: "License verified", short: "L2" },
  { level: 3, label: "Product verified", short: "L3" },
  { level: 4, label: "Assay verified", short: "L4" },
  { level: 5, label: "Chain of custody", short: "L5" },
] as const;

export const portalMinLevel = 3;

export const productTypes = [
  "Raw gold / doré",
  "Gold concentrate",
  "Gold dust",
  "99.99% fine bars",
  "Other (specify in notes)",
] as const;

export const volumeRanges = [
  "Under 1 kg",
  "1–10 kg",
  "10–50 kg",
  "50–200 kg",
  "200 kg+",
] as const;

export const buyerTypes = [
  "Refinery / importer",
  "Institutional trader",
  "Bank / finance partner",
  "Government / SOE",
  "Other institutional buyer",
] as const;

export const networkPillars = [
  {
    title: "Verified supply",
    description:
      "Every supplier passes KYC and multi-level verification before supply appears on the Exchange.",
  },
  {
    title: "Institutional access",
    description:
      "Buyers pay for membership to view Level 3+ verified supply and request structured quotes.",
  },
  {
    title: "DCA coordination",
    description:
      "Diamond Capital Africa structures assay, compliance, and execution — not open peer-to-peer contact.",
  },
] as const;

export const networkSteps = [
  { step: 1, label: "Apply", detail: "Suppliers apply free; buyers request institutional access." },
  { step: 2, label: "Verify", detail: "DCA assigns verification levels and approves supply." },
  { step: 3, label: "Access", detail: "Active institutional members enter the Network portal." },
  { step: 4, label: "Quote", detail: "Request quotes on verified supply through the Exchange." },
  { step: 5, label: "Execute", detail: "DCA coordinates assay, finance, and settlement." },
] as const;