import { images } from "./images";

export const company = {
  name: "Gold Capital Uganda",
  tagline: "Trusted gold dealing & refining across East Africa",
  purpose:
    "Our purpose — Refining with integrity to empower communities and advance Uganda's economy — underpins every transaction, every bar we produce, and every partnership we build.",
  email: "info@goldcapital.ug",
  phone: "+256 700 123 456",
  address: "Plot 42, Nakasero Road, Kampala, Uganda",
  founded: 2012,
};

export const navItems = [
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Corporate Profile", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Our Values", href: "/about#values" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Gold Buying", href: "/services#buying" },
      { label: "Gold Refining", href: "/services#refining" },
      { label: "Assay & Testing", href: "/services#assay" },
      { label: "Export Services", href: "/services#export" },
    ],
  },
  {
    label: "Operations",
    href: "/operations",
    children: [
      { label: "Kampala Refinery", href: "/operations#refinery" },
      { label: "Collection Centres", href: "/operations#centres" },
      { label: "Supply Chain", href: "/operations#supply-chain" },
    ],
  },
  {
    label: "Sustainability",
    href: "/sustainability",
    children: [
      { label: "Responsible Sourcing", href: "/sustainability#sourcing" },
      { label: "Community Impact", href: "/sustainability#community" },
      { label: "Environmental Care", href: "/sustainability#environment" },
    ],
  },
  {
    label: "Investors",
    href: "/about#investors",
    children: [
      { label: "Market Data", href: "/#market-prices" },
      { label: "News & Announcements", href: "/#announcements" },
      { label: "Compliance", href: "/about#compliance" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const heroSlides = [
  {
    id: 1,
    image: images.hero.responsibleSourcing,
    title: "Responsible, traceable gold",
    description:
      "We source gold exclusively through licensed artisanal and small-scale miners, with full chain-of-custody documentation aligned to Uganda's Mining Act and international LBMA standards.",
    cta: { label: "Learn more", href: "/sustainability" },
    tab: "Responsible sourcing",
  },
  {
    id: 2,
    image: images.hero.refining,
    title: "World-class refining capability",
    description:
      "Our Kampala refinery delivers 99.99% pure gold bars using state-of-the-art induction furnaces, fire assay verification, and ISO-certified quality management systems.",
    cta: { label: "Our operations", href: "/operations" },
    tab: "Refining excellence",
  },
  {
    id: 3,
    image: images.hero.performance,
    title: "Q1 2026 Performance Update",
    description:
      "Gold Capital Uganda published its Q1 2026 operational results for the quarter ended 31 March 2026. Gold refined: 2,840 kg. Export revenue: US$186M.",
    cta: { label: "View report", href: "/#quarterly-reports" },
    tab: "Q1 2026 Results",
  },
];

export const announcements = [
  {
    slug: "dmcc-good-delivery-accreditation-2026",
    date: "Jun 12 2026",
    day: "12",
    month: "Jun",
    title:
      "Gold Capital Uganda receives renewed DMCC Good Delivery accreditation",
    type: "pdf",
    size: "245 KB",
    category: "announcement" as const,
    summary:
      "Our Kampala refinery has received renewed DMCC Good Delivery accreditation, confirming 99.99% purity standards for international export.",
    body: [
      "Gold Capital Uganda is pleased to announce the renewal of its DMCC Good Delivery accreditation for the Kampala refinery, valid through June 2028.",
      "The accreditation confirms that our refining processes, assay protocols, and bar certification meet international bullion market standards required by major global buyers.",
      "This renewal supports continued export growth into the UAE, Switzerland, and India, and reinforces our commitment to transparent, high-purity gold production in Uganda.",
    ],
  },
  {
    slug: "agm-results-2026",
    date: "May 06 2026",
    day: "06",
    month: "May",
    title:
      "Results of Gold Capital Uganda's 2026 Annual General Meeting",
    type: "pdf",
    size: "180 KB",
    category: "announcement" as const,
    summary:
      "Shareholders approved the 2025 annual report, dividend policy, and board reappointments at the AGM held in Kampala.",
    body: [
      "Gold Capital Uganda held its 2026 Annual General Meeting on 6 May 2026 at the Kampala Serena Conference Centre.",
      "Shareholders approved the 2025 annual financial statements, the reappointment of all board directors, and the proposed community investment programme for FY2026.",
      "The meeting noted record annual refining volumes of 9.2 tonnes and commended management on expanded collection centre coverage across Uganda.",
    ],
  },
  {
    slug: "bank-of-uganda-export-partnership",
    date: "Apr 14 2026",
    day: "14",
    month: "Apr",
    title:
      "Partnership announced with Bank of Uganda for formal gold export framework",
    type: "pdf",
    size: "312 KB",
    category: "announcement" as const,
    summary:
      "A new formal export framework with Bank of Uganda will streamline licensing and improve transparency in gold exports.",
    body: [
      "Gold Capital Uganda and the Bank of Uganda have announced a partnership to strengthen the formal gold export framework for licensed dealers and refiners.",
      "The framework introduces digital export permits, same-day settlement options, and enhanced AML reporting for all export transactions above 1 kg.",
      "This initiative is expected to reduce processing times by 40% and increase formal sector participation among artisanal miners.",
    ],
  },
  {
    slug: "mbarara-collection-centre-opening",
    date: "Mar 28 2026",
    day: "28",
    month: "Mar",
    title:
      "New collection centre opened in Mbarara to serve western Uganda miners",
    type: "pdf",
    size: "156 KB",
    category: "announcement" as const,
    summary:
      "The Mbarara centre expands our western Uganda footprint with same-day assay and mobile money payments for miners.",
    body: [
      "Gold Capital Uganda has opened a new collection centre in Mbarara, extending fair-price gold buying services to miners across western Uganda.",
      "The facility offers on-site fire assay, digital miner registration, and same-day payment via mobile money or bank transfer.",
      "The centre is expected to serve over 400 licensed miners in the first year of operations.",
    ],
  },
];

export const presentations = [
  {
    slug: "q4-full-year-2025-results",
    date: "Feb 20 2026",
    day: "20",
    month: "Feb",
    title: "Q4 & Full Year 2025 – Results Presentation",
    type: "pdf",
    size: "4.8 MB",
    category: "presentation" as const,
    summary:
      "Full year 2025 results: 9.2 tonnes refined, US$612M export revenue, and 8 collection centres operational.",
    body: [
      "Gold Capital Uganda delivered strong full-year 2025 results, refining 9.2 tonnes of gold to 99.99% purity.",
      "Export revenue reached US$612 million, with the UAE, Switzerland, and India accounting for 78% of shipments.",
      "Operating margins improved on the back of higher throughput at the Kampala refinery and expanded artisanal miner network.",
    ],
  },
  {
    slug: "q3-2025-operational-review",
    date: "Nov 11 2025",
    day: "11",
    month: "Nov",
    title: "Q3 2025 – Operational Review Presentation",
    type: "pdf",
    size: "3.2 MB",
    category: "presentation" as const,
    summary:
      "Q3 2025 operational review covering refining volumes, export markets, and sustainability milestones.",
    body: [
      "The Q3 2025 operational review highlights 2.1 tonnes refined during the quarter and the launch of two new collection centres.",
      "Sustainability milestones included 100% traceability coverage and the completion of solar installation phase one at the refinery.",
      "Management outlined Q4 priorities: Fort Portal centre launch and DMCC accreditation renewal preparation.",
    ],
  },
];

export const marketPrices = [
  { label: "GOLD (US$/oz)", value: "4,244", change: -0.31 },
  { label: "UGX/USD", value: "3,785", change: 0.12 },
  { label: "GCU Spot (US$/g)", value: "136.45", change: 0.08 },
];

export const events = [
  {
    id: "q2-2026-results",
    date: "31st July, 2026",
    title: "Q2 2026 Operational Results Release",
    isoStart: "2026-07-31T09:00:00.000Z",
    isoEnd: "2026-07-31T10:30:00.000Z",
    location: "Gold Capital Uganda, Kampala",
    description:
      "Publication of Q2 2026 operational results and investor webcast.",
  },
  {
    id: "east-africa-mining-forum",
    date: "14th September, 2026",
    title: "East Africa Mining Investment Forum – Kampala",
    isoStart: "2026-09-14T08:00:00.000Z",
    isoEnd: "2026-09-14T17:00:00.000Z",
    location: "Kampala Convention Centre",
    description:
      "Regional mining investment forum with Gold Capital Uganda keynote on formalising artisanal gold trade.",
  },
];

export const companyStats = [
  { label: "Collection centres", value: "8", suffix: "across Uganda" },
  { label: "Gold refined (2025)", value: "9.2", suffix: "tonnes" },
  { label: "Purity standard", value: "99.99", suffix: "% gold bars" },
  { label: "Licensed miners", value: "2,400+", suffix: "in our network" },
  { label: "Workforce", value: "340", suffix: "employees & contractors" },
  { label: "Export markets", value: "12", suffix: "countries served" },
];

export const annualReports = [
  {
    id: "annual-report-2025",
    title: "2025 Annual Report",
    type: "pdf",
    category: "Annual",
    summary:
      "Comprehensive review of 2025 financial performance, operations, and strategic outlook.",
  },
  {
    id: "sustainability-report-2025",
    title: "2025 Sustainability Report",
    type: "pdf",
    category: "ESG",
    summary:
      "ESG performance including responsible sourcing, emissions, and community investment.",
  },
  {
    id: "compliance-report-2025",
    title: "2025 Compliance & Audit Report",
    type: "pdf",
    category: "Compliance",
    summary:
      "Independent audit findings and regulatory compliance status across all operations.",
  },
  {
    id: "esg-workbook-2025",
    title: "2025 ESG Data Workbook",
    type: "xlsx",
    category: "ESG",
    summary:
      "Detailed ESG metrics dataset for investors and sustainability analysts.",
  },
  {
    id: "agm-notice-2026",
    title: "2026 Notice of AGM",
    type: "pdf",
    category: "Governance",
    summary:
      "Formal notice of the 2026 Annual General Meeting for shareholders.",
  },
];

export const quarterlyReports = [
  {
    date: "May 08 2026",
    day: "08",
    month: "May",
    title: "Q1 2026",
    items: [
      {
        id: "q1-2026-webcast",
        title: "Q1 2026 – Operational Results Webcast",
        summary:
          "Recorded webcast covering Q1 2026 operational performance and outlook.",
        kind: "webcast" as const,
      },
      {
        id: "q1-2026-report",
        title: "Q1 2026 – Results Report",
        summary:
          "Detailed Q1 2026 results report with financial and operational data.",
        kind: "document" as const,
      },
      {
        id: "q1-2026-presentation",
        title: "Q1 2026 – Results Presentation",
        summary:
          "Investor presentation slides for Q1 2026 results.",
        kind: "document" as const,
      },
      {
        id: "q1-2026-statistics",
        title: "Q1 2026 – Operating Statistics",
        summary:
          "Quarterly operating statistics including throughput, purity, and export volumes.",
        kind: "document" as const,
      },
    ],
  },
];

export const allNews = [...announcements, ...presentations];

export function getNewsBySlug(slug: string) {
  return allNews.find((item) => item.slug === slug);
}

export const legalPages = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "Information we collect",
        body: "We collect information you provide through contact forms, including your name, email, phone number, and message content. We also collect basic usage data such as pages visited and browser type.",
      },
      {
        heading: "How we use your information",
        body: "Your information is used to respond to enquiries, provide quotes, and improve our services. We do not sell personal data to third parties.",
      },
      {
        heading: "Data storage",
        body: "Enquiry submissions are stored locally in your browser for demonstration purposes. In production, data would be stored securely on our servers in compliance with Uganda's Data Protection and Privacy Act.",
      },
      {
        heading: "Contact",
        body: "For privacy-related questions, email privacy@goldcapital.ug.",
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    sections: [
      {
        heading: "Website use",
        body: "This website is provided for informational purposes about Gold Capital Uganda's gold dealing and refining services. Content does not constitute financial advice.",
      },
      {
        heading: "Market data",
        body: "Gold prices displayed on this site are indicative and sourced from public APIs. They may differ from our actual buying and selling rates. Contact us for live quotes.",
      },
      {
        heading: "Documents",
        body: "Downloadable reports and presentations are placeholders until official documents are uploaded. Always verify document authenticity before relying on them for investment decisions.",
      },
      {
        heading: "Governing law",
        body: "These terms are governed by the laws of the Republic of Uganda.",
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    sections: [
      {
        heading: "What are cookies",
        body: "Cookies are small text files stored on your device. We use local storage for essential site functionality such as enquiry history and cookie consent preferences.",
      },
      {
        heading: "Cookies we use",
        body: "Essential storage: enquiry records (localStorage), cookie consent preference (localStorage), and market price cache (sessionStorage). No third-party advertising cookies are used.",
      },
      {
        heading: "Managing cookies",
        body: "You can clear site data through your browser settings at any time. Declining cookies will hide the consent banner but essential local storage may still be used for form functionality.",
      },
    ],
  },
};

export const esgCards = [
  {
    image: images.esg.sourcing,
    title: "Responsible sourcing",
    description:
      "We maintain zero-tolerance for conflict gold, with blockchain-enabled traceability from mine site to export.",
  },
  {
    image: images.esg.environment,
    title: "Environmental stewardship",
    description:
      "Our refinery uses closed-loop water systems and solar-assisted power, cutting emissions by 35% since 2022.",
  },
  {
    image: images.esg.community,
    title: "Our people & communities",
    description:
      "We invest in miner training, fair pricing programmes, and community health initiatives across our operating regions.",
  },
];

export const services = [
  {
    id: "buying",
    title: "Gold Buying",
    description:
      "We purchase gold from licensed artisanal miners, small-scale operators, and institutional sellers at transparent, LBMA-referenced spot prices. Same-day payment via mobile money or bank transfer.",
    features: [
      "Live spot-price quotes",
      "On-site or refinery collection",
      "Instant assay verification",
      "Full tax documentation",
    ],
  },
  {
    id: "refining",
    title: "Gold Refining",
    description:
      "Our Kampala facility refines raw gold to 99.99% purity using induction melting, chemical treatment, and electrolytic finishing. Capacity: 500 kg per month.",
    features: [
      "99.99% LBMA Good Delivery bars",
      "10 oz, 1 kg, and 12.5 kg formats",
      "Serial-numbered certification",
      "48-hour turnaround standard",
    ],
  },
  {
    id: "assay",
    title: "Assay & Testing",
    description:
      "Independent fire assay and XRF analysis services for miners, banks, and exporters. Results certified within 24 hours.",
    features: [
      "Fire assay (ISO 11426)",
      "XRF spectrometry",
      "Third-party verification",
      "Digital certificates",
    ],
  },
  {
    id: "export",
    title: "Export Services",
    description:
      "End-to-end export facilitation including Bank of Uganda clearance, customs documentation, secure logistics, and international buyer matching.",
    features: [
      "BoU export licensing",
      "Insured air freight",
      "LBMA-approved delivery",
      "Multi-currency settlement",
    ],
  },
];

export const operations = [
  {
    id: "refinery",
    title: "Kampala Refinery",
    location: "Nakasero, Kampala",
    description:
      "Our flagship 2,400 sqm refinery houses induction furnaces, assay laboratories, vault storage, and a certified weighing facility. Licensed by the Ministry of Energy and Mineral Development.",
    capacity: "500 kg/month",
  },
  {
    id: "centres",
    title: "Collection Centres",
    location: "8 locations nationwide",
    description:
      "Strategically located centres in Kampala, Mbarara, Fort Portal, Jinja, Gulu, Mbale, Arua, and Moroto provide miners with accessible, fair-price gold buying services.",
    capacity: "50+ staff",
  },
  {
    id: "supply-chain",
    title: "Supply Chain",
    location: "Mine to market",
    description:
      "Every gram is tracked through our digital supply chain platform, linking miner ID, assay results, transport logs, and export documentation in a single auditable record.",
    capacity: "100% traceable",
  },
];

export const leadership = [
  {
    name: "James Okello",
    role: "Chief Executive Officer",
    bio: "20 years in African mining and commodities. Former director at Uganda Chamber of Mines.",
  },
  {
    name: "Sarah Nakato",
    role: "Chief Operations Officer",
    bio: "Metallurgical engineer with expertise in precious metals refining and quality systems.",
  },
  {
    name: "David Muwonge",
    role: "Chief Financial Officer",
    bio: "Chartered accountant with deep experience in commodity finance and export trade.",
  },
  {
    name: "Grace Achieng",
    role: "Head of Sustainability",
    bio: "Leads ESG strategy, community programmes, and responsible sourcing compliance.",
  },
];

export const values = [
  {
    title: "Integrity",
    description: "Transparent pricing, honest assay, and ethical sourcing in every transaction.",
  },
  {
    title: "Excellence",
    description: "World-class refining standards that meet international buyer requirements.",
  },
  {
    title: "Community",
    description: "Fair returns for miners and investment in the communities where we operate.",
  },
  {
    title: "Compliance",
    description: "Full adherence to Ugandan law, AML regulations, and OECD Due Diligence Guidance.",
  },
];