/** Public Investment Overview PDF (no confidential memorandum). */
export const investmentOverviewPdf = {
  path: "/investors/diamond-capital-africa-investment-overview-2026.pdf",
  title: "Diamond Capital Africa Investment Overview 2026",
  filename: "diamond-capital-africa-investment-overview-2026.pdf",
  pages: 10,
  published: "July 2026",
  description:
    "A public overview of the proposed integrated precious-metals processing platform, preliminary capital requirement, project components, financial projections, governance framework and investor engagement process.",
} as const;

export const investmentGlance = [
  {
    value: "USD 4 Million",
    label: "Preliminary capital requirement",
  },
  {
    value: "50 kg/month",
    label: "Planned initial processing capacity",
  },
  {
    value: "Up to 150 kg/month",
    label: "Planned expansion capacity",
  },
  {
    value: "9–12 months",
    label: "Indicative development and commissioning pathway",
  },
] as const;

export const investmentProjectComponents = [
  "A new gold refinery",
  "A modern assay laboratory",
  "Secure receiving and vault infrastructure",
  "Responsible-sourcing and chain-of-custody systems",
  "Approved supplier and mining partnerships",
  "Secure export and international distribution coordination",
] as const;

export const investmentNeeds = [
  {
    title: "Processing gap",
    description:
      "Many regional suppliers rely on third-party processing facilities, reducing control over timing, assay, costs and settlement.",
  },
  {
    title: "Traceability demand",
    description:
      "Institutional counterparties increasingly require documented origin, beneficial ownership, sanctions screening and chain-of-custody.",
  },
  {
    title: "Working-capital constraints",
    description:
      "Smaller operators frequently lack the capital required to mechanise, process inventory and meet export requirements.",
  },
  {
    title: "Value capture",
    description:
      "Local assaying and processing can create service revenue and improve control over quality, recovery and settlement.",
  },
] as const;

export const investmentRevenueStreams = [
  "Assay and laboratory fees",
  "Toll-refining fees",
  "Melting, casting and stamping services",
  "Secure storage and inventory services",
  "Logistics and export-preparation fees",
  "Controlled trading and distribution margins",
  "Participation in approved mining partnerships",
] as const;

export const investmentUseOfFunds = [
  { label: "Site, design, permits and construction", percent: 25.0 },
  { label: "Refinery, assay and security equipment", percent: 36.3 },
  { label: "Working capital and bullion buffer", percent: 22.5 },
  { label: "Upstream partnership and pilot capital", percent: 5.0 },
  {
    label: "Compliance, advisers, insurance and contingency",
    percent: 11.2,
  },
] as const;

export const investmentRoadmap = [
  { phase: 1, title: "Project validation and due diligence" },
  { phase: 2, title: "Site selection, engineering and permits" },
  { phase: 3, title: "Financial close and procurement" },
  { phase: 4, title: "Construction and equipment installation" },
  { phase: 5, title: "Testing, commissioning and pilot operations" },
  { phase: 6, title: "Commercial ramp-up and expansion review" },
] as const;

export const investmentProtections = [
  "Dedicated project vehicle or SPV",
  "Milestone-based capital deployment",
  "Dual-authorisation controls",
  "Approved budgets and procurement procedures",
  "Asset registers and insurance",
  "Investor reporting",
  "Independent legal, technical and financial due diligence",
  "Responsible-sourcing, KYC, AML and sanctions controls",
] as const;

export const investorTypes = [
  "Individual accredited or professional investor",
  "Family office",
  "Private equity or investment fund",
  "Strategic operating partner",
  "Trade-finance provider",
  "Development-finance institution",
  "Mining or refining company",
  "Other",
] as const;

export const investmentRanges = [
  "USD 100,000–250,000",
  "USD 250,000–500,000",
  "USD 500,000–1 million",
  "USD 1–2 million",
  "USD 2 million+",
  "Prefer to discuss privately",
] as const;
