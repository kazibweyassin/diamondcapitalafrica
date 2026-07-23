import { images } from "./images";

export const company = {
  name: "Diamond Capital Africa",
  shortName: "Diamond Capital",
  tagline: "Premium gold supply across East & Central Africa",
  description:
    "Licensed gold dealer and exporter based in Kampala, Uganda. Diamond Capital Africa is developing an integrated precious-metals processing platform through strategic partnerships, including a planned gold refinery and assay laboratory. OECD-aligned responsible sourcing across East and Central Africa.",
  purpose:
    "Our purpose is to advance Africa's formal gold economy with integrity—connecting verified upstream production to institutional markets while developing modern processing infrastructure.",
  contactName: "Tom",
  email: "info@diamondcapitalafrica.com",
  investorsEmail: "investors@diamondcapitalafrica.com",
  privacyEmail: "privacy@diamondcapitalafrica.com",
  phone: "+256 704 833 021",
  phoneTel: "+256704833021",
  whatsappUrl:
    "https://wa.me/256704833021?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20gold%20services.",
  address: "Plot 42, Nakasero Road, Kampala, Uganda",
  founded: 2012,
};

/** Canonical facts for search engines and AI. Keep aligned with the live site. */
export const companyFacts = {
  legalName: "Diamond Capital Africa",
  businessType:
    "Licensed gold dealer and exporter developing a planned refining and assay platform",
  headquarters: "Plot 42, Nakasero Road, Kampala, Uganda",
  region: "Nakasero, Kampala",
  purityStandard: "Assay-verified fine gold (target institutional standard)",
  primaryActivities: [
    "Gold dealing and institutional buyer coordination",
    "Export facilitation for verified counterparties (FOB Kampala, CIF Dubai where agreed)",
    "Developing a proposed gold refinery and modern assay laboratory",
    "Working with mining, refining, logistics and trading stakeholders",
    "Gold Savings: physical bullion accumulation from $20",
  ],
  contactPerson: "Tom",
  phone: company.phone,
  email: company.email,
  website: "https://www.diamondcapitalafrica.com",
};

export const collectionCentres = ["Kampala", "Arua"] as const;

export const internationalBuyerRegions = [
  {
    id: "dubai",
    title: "Dubai & Middle East buyers",
    summary:
      "Institutional gold supply coordination with CIF Dubai delivery or FOB Kampala collection, subject to availability, KYC and definitive agreements.",
    points: [
      "CIF Dubai: freight and insurance arrangements for UAE importers and re-export hubs where agreed",
      "FOB Kampala: experienced buyers arrange insured uplift from approved vault facilities",
      "Assay documentation, serialised bars where applicable, OECD-aligned traceability",
      "USD settlement; BoU export clearance and full customs documentation where required",
    ],
    cta: { label: "Enquire about CIF Dubai export", subject: "Export Services" },
  },
  {
    id: "europe",
    title: "European buyers",
    summary:
      "Source African gold with documentation suited to EU due diligence expectations and multi-currency settlement.",
    points: [
      "Assay-verified fine gold with certificates and chain-of-custody records",
      "OECD Due Diligence Guidance aligned sourcing for European importers and refiners",
      "EUR or USD settlement; export documentation prepared for EU customs",
      "Escorted insured delivery or FOB Kampala collection for institutional buyers",
    ],
    cta: { label: "Enquire about European export", subject: "Export Services" },
  },
] as const;

export const navItems = [
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Corporate Profile", href: "/about" },
      { label: "About Gold", href: "/about-gold" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Our Values", href: "/about#values" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "How to Buy Gold", href: "/how-to-buy" },
      { label: "Export Services", href: "/services#export" },
      { label: "Gold Buying", href: "/services#buying" },
      { label: "Gold Refining", href: "/services#refining" },
      { label: "Assay & Testing", href: "/services#assay" },
      { label: "Buyer Guides", href: "/guides" },
    ],
  },
  {
    label: "Operations",
    href: "/operations",
    children: [
      { label: "Planned Processing Platform", href: "/operations#refinery" },
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
      {
        label: "Investment Opportunity",
        href: "/investors/investment-opportunity",
      },
      { label: "Gold Savings", href: "/gold-savings" },
      { label: "How to Buy Gold", href: "/how-to-buy" },
      { label: "Institutional Network", href: "/network" },
      { label: "About Gold", href: "/about-gold" },
      { label: "Buyer Guides", href: "/guides" },
      { label: "Market Data", href: "/#market-prices" },
      { label: "News & Announcements", href: "/#announcements" },
      { label: "Compliance", href: "/about#compliance" },
    ],
  },
  { label: "Network", href: "/network" },
  { label: "Contact", href: "/contact" },
];

export const heroSlides = [
  {
    id: 1,
    image: images.hero.sourcing,
    title: "Our principal product: gold",
    description:
      "Gold is scarce, enduring, and central to economies worldwide. From fair-price buying and certified export coordination to responsible-sourcing controls, it is the foundation of everything we do across East and Central Africa.",
    cta: { label: "Learn more", href: "/about-gold" },
    tab: "About gold",
  },
  {
    id: 2,
    image: images.hero.refining,
    title: "Building modern processing infrastructure",
    description:
      "Diamond Capital Africa is seeking investment to establish a modern gold refinery and assay laboratory, while working with mining, refining, logistics and international trading stakeholders.",
    cta: { label: "Investment opportunity", href: "/investors/investment-opportunity" },
    tab: "Platform",
  },
  {
    id: 3,
    image: images.hero.export,
    title: "Trusted partner for miners & exporters",
    description:
      "From collection centres across Uganda to export facilitation and institutional coordination, we connect verified participants to markets with regulatory compliance and OECD-aligned due diligence.",
    cta: { label: "Our services", href: "/services" },
    tab: "Export",
  },
  {
    id: 4,
    image: images.pageHero.operations,
    title: "Institutional Gold Network",
    description:
      "Verified supply, institutional buyer access, and DCA-coordinated quotes through our Verified Gold Exchange, not an open marketplace.",
    cta: { label: "Explore the Network", href: "/network" },
    tab: "Network",
  },
];

export const marketPrices = [
  { label: "GOLD (US$/oz)", value: "4,244", change: -0.31 },
  { label: "UGX/USD", value: "3,785", change: 0.12 },
  { label: "DCA Spot (US$/g)", value: "136.45", change: 0.08 },
];

export { events } from "./events";

export const companyStats = [
  { label: "Collection centres", value: "2", suffix: "Kampala & Arua" },
  {
    label: "Headquarters",
    value: "Kampala",
    suffix: "Nakasero, Uganda",
  },
  {
    label: "Platform focus",
    value: "Planned",
    suffix: "refinery & assay laboratory",
  },
  {
    label: "Capital raise",
    value: "USD 4M",
    suffix: "preliminary requirement",
  },
  {
    label: "Initial capacity",
    value: "50",
    suffix: "kg/month (planned)",
  },
  {
    label: "Network",
    value: "Institutional",
    suffix: "verified supply coordination",
  },
];

export const quarterlyStats = {
  period: "Development update",
  asAt: "Preliminary planning assumptions — subject to due diligence",
  metrics: [
    {
      label: "Capital requirement",
      value: "USD 4M",
      suffix: "preliminary",
    },
    {
      label: "Initial capacity",
      value: "50",
      suffix: "kg/month planned",
    },
    {
      label: "Expansion target",
      value: "150",
      suffix: "kg/month planned",
    },
    {
      label: "Development path",
      value: "9–12",
      suffix: "months indicative",
    },
    {
      label: "Collection centres",
      value: "2",
      suffix: "Kampala & Arua",
    },
    {
      label: "Traceability goal",
      value: "OECD",
      suffix: "aligned chain of custody",
    },
  ],
};

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
        body: "Enquiry submissions are stored securely on our servers in compliance with Uganda's Data Protection and Privacy Act.",
      },
      {
        heading: "Contact",
        body: `For privacy-related questions, email ${company.privacyEmail}.`,
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    sections: [
      {
        heading: "Website use",
        body: `This website is provided for informational purposes about ${company.name}'s gold dealing, export coordination and proposed processing-platform development. Content does not constitute financial advice or an offer of securities.`,
      },
      {
        heading: "Market data",
        body: "Gold prices displayed on this site are indicative and sourced from public APIs. They may differ from our actual buying and selling rates. Contact us for live quotes.",
      },
      {
        heading: "Documents",
        body: "Reports and presentations are published on this site as they become available. Contact us for investor materials not yet listed here.",
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
      "We maintain zero-tolerance for conflict gold and design chain-of-custody controls aligned with OECD Due Diligence Guidance.",
  },
  {
    image: images.esg.environment,
    title: "Environmental stewardship",
    description:
      "The proposed processing platform is being designed with modern environmental controls, including closed-loop water systems and energy-efficient equipment where practicable.",
  },
  {
    image: images.esg.community,
    title: "Our people & communities",
    description:
      "We prioritise fair dealing with mining partners and community engagement across the regions where we operate and plan to expand.",
  },
];

export const serviceProcess = [
  { step: 1, label: "Collection", href: "/services#buying" },
  { step: 2, label: "Assay", href: "/services#assay" },
  { step: 3, label: "Refining", href: "/services#refining" },
  { step: 4, label: "Export", href: "/services#export" },
];

export const services = [
  {
    id: "buying",
    title: "Gold Buying",
    shortTitle: "Buying",
    tagline: "Fair prices, same-day settlement",
    description:
      "We purchase gold from licensed artisanal miners, small-scale operators, and institutional sellers at transparent, LBMA-referenced spot prices. Same-day payment via mobile money or bank transfer.",
    image: images.services.buying,
    highlights: [
      { label: "Pricing", value: "LBMA-referenced spot" },
      { label: "Payment", value: "Same day" },
      { label: "Coverage", value: "2 centres" },
    ],
    features: [
      "Live spot-price quotes",
      "On-site or refinery collection",
      "Instant assay verification",
      "Full tax documentation",
    ],
    steps: [
      "Request a live quote by phone or at any collection centre",
      "On-site fire assay confirms purity and weight",
      "Receive payment via mobile money or bank transfer",
    ],
    cta: { label: "Get a buying quote", subject: "Gold Buying Enquiry" },
  },
  {
    id: "refining",
    title: "Gold Refining",
    shortTitle: "Refining",
    tagline: "Planned modern refining capability",
    description:
      "Diamond Capital Africa is developing a proposed gold refinery as part of an integrated precious-metals processing platform. Planned initial capacity is approximately 50 kg per month, subject to financing, licensing and commissioning.",
    image: images.services.refining,
    highlights: [
      { label: "Status", value: "Proposed" },
      { label: "Planned start", value: "50 kg/mo" },
      { label: "Expansion", value: "Up to 150 kg/mo" },
    ],
    features: [
      "Planned institutional-grade refining capability",
      "Modern assay laboratory (proposed)",
      "Serial-numbered certification (target)",
      "Partner processing coordination during development",
    ],
    steps: [
      "Project validation, engineering design and permitting",
      "Equipment procurement, construction and commissioning",
      "Pilot operations then commercial ramp-up subject to due diligence",
    ],
    cta: { label: "Discuss refining plans", subject: "Gold Refining Enquiry" },
  },
  {
    id: "assay",
    title: "Assay & Testing",
    shortTitle: "Assay",
    tagline: "Certified results within 24 hours",
    description:
      "Independent fire assay and XRF analysis services for miners, banks, and exporters. Results certified within 24 hours.",
    image: images.services.assay,
    highlights: [
      { label: "Methods", value: "Fire assay & XRF" },
      { label: "Standard", value: "ISO 11426" },
      { label: "Results", value: "Within 24h" },
    ],
    features: [
      "Fire assay (ISO 11426)",
      "XRF spectrometry",
      "Third-party verification",
      "Digital certificates",
    ],
    steps: [
      "Submit samples at our Kampala laboratory or collection centre",
      "Fire assay or XRF analysis performed by certified metallurgists",
      "Digital certificate issued for export, banking, or sale",
    ],
    cta: { label: "Book an assay", subject: "Assay & Testing Enquiry" },
  },
  {
    id: "export",
    title: "Export Services",
    shortTitle: "Export",
    tagline: "Licensed, insured, globally delivered",
    description:
      "End-to-end export facilitation including Bank of Uganda clearance, customs documentation, secure logistics, and international buyer matching.",
    image: images.services.export,
    highlights: [
      { label: "Clearance", value: "BoU process" },
      { label: "Logistics", value: "Insured freight" },
      { label: "Markets", value: "Regional & intl." },
    ],
    features: [
      "BoU export documentation support",
      "Insured air freight coordination",
      "Institutional delivery arrangements",
      "Multi-currency settlement where agreed",
    ],
    steps: [
      "Export permit and customs documentation prepared",
      "Secure insured logistics to international buyers",
      "Settlement in USD, EUR, or other agreed currencies",
    ],
    deliveryOptions: [
      {
        name: "FOB Kampala",
        description:
          "Buyer arranges insured collection from our Kampala vault. Lowest-cost option for experienced importers.",
      },
      {
        name: "CIF Dubai",
        description:
          "We arrange freight and insurance to Dubai. Suitable for Middle East buyers and re-export hubs.",
      },
      {
        name: "Escorted insured delivery",
        description:
          "Secure, insured delivery to agreed international destinations with full chain-of-custody documentation.",
      },
    ],
    cta: { label: "Start an export", subject: "Gold Export Enquiry" },
  },
];

export const operations = [
  {
    id: "refinery",
    title: "Proposed Processing Platform",
    location: "Kampala area (site selection subject to due diligence)",
    description:
      "Diamond Capital Africa is seeking strategic investment to establish a modern gold refinery, assay laboratory, secure receiving and vault infrastructure. Capacities and timelines are preliminary planning assumptions.",
    capacity: "50 kg/month planned initial",
    image: images.operations.refinery,
    imageAlt: "Assay laboratory testing gold purity samples",
  },
  {
    id: "centres",
    title: "Collection Centres",
    location: "Kampala & Arua",
    description:
      "Collection centres in Kampala and Arua provide miners with accessible, fair-price gold buying, on-site checks, and transparent documentation.",
    capacity: "Regional coverage",
    image: images.operations.centres,
    imageAlt: "Raw gold nuggets sourced from licensed miners",
  },
  {
    id: "supply-chain",
    title: "Supply Chain",
    location: "Mine to market",
    description:
      "DCA is building responsible-sourcing and chain-of-custody systems intended to link miner identification, assay results, transport logs, and export documentation in an auditable record.",
    capacity: "OECD-aligned goal",
    image: images.operations.supplyChain,
    imageAlt: "Gold bars prepared for institutional delivery",
  },
];

export const leadership = [
  {
    name: "Patrick Byaruhanga",
    role: "Chief Executive Officer",
    bio: "8 years in East African mining and commodities. Former adviser to the Uganda Chamber of Mines.",
  },
  {
    name: "Rebecca Nalwanga",
    role: "Chief Operations Officer",
    bio: "Metallurgical engineer focused on precious metals refining, fire assay, and refinery quality control.",
  },
  {
    name: "Samuel Kasozi",
    role: "Chief Financial Officer",
    bio: "Chartered accountant with 7 years in commodity finance, export settlements, and treasury.",
  },
  {
    name: "Mercy Atim",
    role: "Head of Sustainability",
    bio: "Leads ESG strategy, miner outreach, and OECD-aligned responsible sourcing programmes.",
  },
];

export const values = [
  {
    title: "Integrity",
    description: "Transparent pricing, honest assay, and ethical sourcing in every transaction.",
  },
  {
    title: "Excellence",
    description:
      "Institutional standards in dealing, documentation and the design of our proposed processing platform.",
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