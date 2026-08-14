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

/**
 * Illustrative five-year base case from the public Investment Overview.
 * Forward-looking management assumptions — not guaranteed outcomes.
 */
export const investmentFinancialOutlook = [
  {
    year: "Y1",
    label: "Year 1",
    annualThroughputKg: 300,
    revenueMusd: 0.56,
    ebitdaMusd: -0.05,
  },
  {
    year: "Y2",
    label: "Year 2",
    annualThroughputKg: 540,
    revenueMusd: 1.15,
    ebitdaMusd: 0.3,
  },
  {
    year: "Y3",
    label: "Year 3",
    annualThroughputKg: 900,
    revenueMusd: 2.15,
    ebitdaMusd: 0.9,
  },
  {
    year: "Y4",
    label: "Year 4",
    annualThroughputKg: 1320,
    revenueMusd: 3.31,
    ebitdaMusd: 1.56,
  },
  {
    year: "Y5",
    label: "Year 5",
    annualThroughputKg: 1680,
    revenueMusd: 4.34,
    ebitdaMusd: 2.14,
  },
] as const;

/** Year-5 scenario comparison (illustrative). */
export const investmentScenarios = [
  {
    name: "Downside",
    y5ThroughputKg: 900,
    y5RevenueMusd: 2.25,
    fiveYearEbitdaMusd: 1.8,
  },
  {
    name: "Base case",
    y5ThroughputKg: 1680,
    y5RevenueMusd: 4.34,
    fiveYearEbitdaMusd: 4.85,
  },
  {
    name: "Upside",
    y5ThroughputKg: 1800,
    y5RevenueMusd: 5.6,
    fiveYearEbitdaMusd: 7.2,
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

/**
 * Illustrative capital-raise assumptions for ownership modelling.
 * Subject to final valuation, diligence and negotiated agreements.
 */
export const investmentRaiseAssumptions = {
  /** Preliminary capital requirement / total round size */
  roundSizeUsd: 4_000_000,
  /** Illustrative pre-money valuation */
  preMoneyValuationUsd: 8_000_000,
  /** Example ticket size used in call-outs */
  exampleInvestmentUsd: 1_000_000,
  /** Calculator investment amount bounds */
  minInvestmentUsd: 250_000,
  maxInvestmentUsd: 4_000_000,
  /** Pre-money slider bounds for the ownership calculator */
  minPreMoneyUsd: 4_000_000,
  maxPreMoneyUsd: 20_000_000,
  /**
   * Fallback gold spot (USD per gram) when live market data is unavailable.
   * Aligned with the site's static market-prices fallback.
   */
  fallbackGoldPricePerGramUsd: 136.45,
} as const;

/** Illustrative annual distribution rates for the gold calculator. */
export const investmentDistributionRates = [
  0.03, 0.05, 0.08, 0.1, 0.12,
] as const;

export const investmentDefaultDistributionRate = 0.08;

/**
 * Illustrative distribution ramp — not guaranteed payments.
 * Aligns loosely with the base-case EBITDA trajectory.
 */
export const investmentDistributionProfile = [
  {
    year: "Year 1",
    stage: "Development & Commissioning",
    rateLabel: "0%",
  },
  {
    year: "Year 2",
    stage: "Early Commercial Operations",
    rateLabel: "Up to 3%",
  },
  {
    year: "Year 3",
    stage: "Scale-Up",
    rateLabel: "Up to 8%",
  },
  {
    year: "Year 4",
    stage: "Growth",
    rateLabel: "Up to 10%",
  },
  {
    year: "Year 5",
    stage: "Established Operations",
    rateLabel: "Up to 10%",
  },
] as const;

export const investmentParticipationCards = [
  {
    title: "Equity Participation",
    body: "Investors may acquire an ownership interest in the refinery project or designated investment vehicle, allowing them to participate in the long-term growth and value creation of the business.",
  },
  {
    title: "Gold-Linked Distributions",
    body: "Where permitted under the final investment agreement, eligible distributions may be settled in refined physical gold rather than cash. The amount of gold delivered would be calculated using an agreed international gold-price benchmark at the applicable settlement date.",
  },
  {
    title: "Hybrid Structure",
    body: "Investors may potentially combine equity participation with cash and/or gold-linked distributions, subject to the negotiated investment structure.",
  },
] as const;

export const investmentStructureProfiles = [
  {
    title: "Growth Investor",
    suited: "Best suited to investors primarily seeking long-term capital appreciation.",
    points: [
      "Higher equity participation",
      "Lower preferred distributions",
      "Long-term refinery value appreciation",
      "Potential exit through secondary sale, strategic acquisition, founder/company buyback, or other agreed mechanism",
    ],
  },
  {
    title: "Gold Income Investor",
    suited: "Best suited to investors seeking periodic exposure to physical gold.",
    points: [
      "Equity participation",
      "Preferred distribution rights",
      "Ability to elect approved distributions in refined gold",
      "Gold quantity calculated using an agreed settlement benchmark",
    ],
  },
  {
    title: "Strategic Investor",
    suited:
      "Best suited to mining groups, gold traders, refineries, family offices, commodity trading groups and institutional investors.",
    points: [
      "Negotiated equity participation",
      "Board or observer rights",
      "Strategic supply arrangements",
      "Refining access and offtake arrangements",
      "Gold-linked distributions where agreed",
    ],
  },
] as const;

export const goldLinkedBenefits = [
  {
    title: "Physical Asset Exposure",
    body: "Investors who prefer precious metals may elect to receive eligible distributions in an asset they already understand and value.",
  },
  {
    title: "Flexible Settlement",
    body: "Approved distributions may potentially be settled in cash, gold, or a combination.",
  },
  {
    title: "Direct Connection to the Business",
    body: "The settlement asset is directly related to the refinery's core industry.",
  },
  {
    title: "Long-Term Participation",
    body: "Gold-linked distributions can complement the investor's equity exposure to the growth of the underlying refinery platform.",
  },
] as const;

export const investmentRiskDisclosures = [
  "Returns are not guaranteed. Past or projected performance is not indicative of future results.",
  "Financial projections are forward-looking estimates based on management assumptions and may not be achieved.",
  "Gold prices fluctuate; gold-linked settlements will vary with the applicable benchmark price.",
  "Equity values can increase or decrease and may become illiquid.",
  "Refinery construction, commissioning and ramp-up involve material execution, operational and regulatory risk.",
  "Distributions depend on available distributable profits, working-capital needs, debt obligations and board approval.",
  "Gold settlement is subject to legal, regulatory, tax, AML/KYC and export requirements.",
  "All investment terms are subject to negotiation and definitive legal agreements.",
  "Information on this page is for discussion and preliminary evaluation only and does not constitute an offer of securities, a prospectus or investment advice.",
] as const;

/** Public page metadata — keep aligned with page.tsx and JSON-LD. */
export const investmentPageMeta = {
  title: "Strategic Investment Opportunity",
  description:
    "Diamond Capital Africa is raising approximately USD 4 million for a proposed gold refining and assay platform. Qualified investors may explore equity, strategic and gold-linked participation structures. Illustrative only — not an offer of securities.",
  ogTitle: "Building East Africa’s Integrated Precious Metals Platform",
  ogDescription:
    "Explore equity, strategic and gold-linked investment structures for Diamond Capital Africa’s proposed refinery, assay laboratory and responsible precious-metals platform. Figures are illustrative and subject to due diligence.",
} as const;

/**
 * On-page and schema FAQ. Answers must stay non-promotional and non-guaranteeing.
 */
export const investmentFaqs = [
  {
    question: "What is Diamond Capital Africa seeking investment for?",
    answer:
      "Diamond Capital Africa is seeking strategic investment to establish a proposed modern gold refinery, assay laboratory and responsible-sourcing platform serving verified participants across East and Central Africa. The opportunity remains at the development and capital-formation stage.",
  },
  {
    question: "What is the preliminary capital requirement?",
    answer:
      "The preliminary capital requirement is approximately USD 4 million. Capacities, costs, projections and timelines are planning assumptions subject to independent due diligence, engineering and definitive agreements.",
  },
  {
    question: "How is investor ownership determined?",
    answer:
      "Ownership is determined by the agreed company or project valuation at the time of investment, not simply by dividing a ticket size by the total capital raise. On this page, examples use an illustrative pre-money valuation and post-money calculation for discussion only.",
  },
  {
    question: "Can distributions be settled in refined gold?",
    answer:
      "Where permitted under the final investment agreement and applicable law, qualified investors may potentially elect to receive eligible approved distributions in cash, refined physical gold, or a combination. Gold quantity would be calculated using an agreed international benchmark at settlement. Distributions are not guaranteed.",
  },
  {
    question: "Does this page constitute an offer of securities?",
    answer:
      "No. This page and the public Investment Overview are for preliminary discussion with qualified investors and strategic partners only. They do not constitute an offer to sell securities, investment advice, a financing commitment or a guarantee of returns.",
  },
] as const;

/** Sticky in-page navigation targets. */
export const investmentSectionNav = [
  { id: "opportunity", label: "Opportunity" },
  { id: "how-to-invest", label: "How to invest" },
  { id: "explore-investment", label: "Calculator" },
  { id: "financial-outlook", label: "Outlook" },
  { id: "investment-faq", label: "FAQ" },
  { id: "investor-enquiry", label: "Enquire" },
] as const;
