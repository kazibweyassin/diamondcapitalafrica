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
    title: "We buy the gold",
    description:
      "Suppliers sell to Diamond Capital Africa. We verify the license and the metal before we purchase.",
  },
  {
    title: "We sell the gold",
    description:
      "Institutional buyers purchase from DCA. Assay, export, and settlement stay on our contract.",
  },
] as const;

export const institutionalMembership = {
  id: "network-buyer",
  name: "Institutional buyer access",
  summary:
    "Approved buyers request a purchase quote on metal Diamond Capital Africa is selling. There is no membership fee.",
  includes: [
    "Request allocation on DCA supply",
    "FOB Kampala, CIF Dubai, or escorted delivery where agreed",
    "Assay and chain of custody handled by DCA",
  ],
} as const;

export const networkSteps = [
  { step: 1, label: "Offer", detail: "Suppliers offer gold to DCA. Buyers ask to purchase from DCA." },
  { step: 2, label: "Verify", detail: "DCA checks identity, license, and the metal before buying." },
  { step: 3, label: "Purchase", detail: "Approved metal is bought onto the DCA book." },
  { step: 4, label: "Allocate", detail: "Buyers request a quote on metal DCA is selling." },
  { step: 5, label: "Deliver", detail: "DCA completes assay, export, and settlement." },
] as const;