import { images } from "./images";

export const company = {
  name: "Diamond Capital Africa",
  shortName: "Diamond Capital",
  tagline: "Premium gold supply across East & Central Africa",
  description:
    "Ethically sourced, certified gold from Uganda and the Congo. Institutional supplier of assay-verified bars with full OECD-compliant documentation.",
  purpose:
    "Our purpose is refining with integrity to empower communities and advance Africa's formal gold economy. It underpins every transaction, every bar we produce, and every partnership we build.",
  contactName: "Tom",
  email: "info@diamondcapitalafrica.com",
  investorsEmail: "investors@diamondcapitalafrica.com",
  privacyEmail: "privacy@diamondcapitalafrica.com",
  phone: "+256 704 833 021",
  phoneTel: "+256704833021",
  address: "Plot 42, Nakasero Road, Kampala, Uganda",
  founded: 2012,
};

/** Canonical facts for search engines and AI — keep aligned with the live site */
export const companyFacts = {
  legalName: "Diamond Capital Africa",
  businessType: "Licensed gold dealer, refinery, and exporter",
  headquarters: "Plot 42, Nakasero Road, Kampala, Uganda",
  region: "Nakasero, Kampala",
  purityStandard: "99.99% fine gold bars",
  primaryActivities: [
    "Gold buying at collection centres in Kampala and Arua",
    "Gold refining at our Kampala refinery",
    "Fire assay and certified purity testing",
    "Licensed export to international buyers",
  ],
  contactPerson: "Tom",
  phone: company.phone,
  email: company.email,
  website: "https://diamondcapitalafrica.com",
};

export const collectionCentres = ["Kampala", "Arua"] as const;

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
      { label: "About Gold", href: "/about-gold" },
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
    image: images.hero.sourcing,
    title: "Our principal product: gold",
    description:
      "Gold is scarce, enduring, and central to economies worldwide. From fair-price buying and 99.99% refining to certified export, it is the foundation of everything we do across East and Central Africa.",
    cta: { label: "Learn more", href: "/about-gold" },
    tab: "About gold",
  },
  {
    id: 2,
    image: images.hero.refining,
    title: "World-class refining capability",
    description:
      "Our Kampala refinery delivers 99.99% pure gold bars using state-of-the-art induction furnaces, fire assay verification, and ISO-certified quality management systems.",
    cta: { label: "Our operations", href: "/operations" },
    tab: "Refining",
  },
  {
    id: 3,
    image: images.hero.export,
    title: "Trusted partner for miners & exporters",
    description:
      "From collection centres across Uganda to LBMA-standard refining and export facilitation, we connect artisanal miners to international markets with full regulatory compliance.",
    cta: { label: "Our services", href: "/services" },
    tab: "Export",
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
  { label: "Gold refined (2025)", value: "218", suffix: "kg" },
  { label: "Purity standard", value: "99.99", suffix: "% gold bars" },
  { label: "Licensed miners", value: "2,400+", suffix: "in our network" },
  { label: "Workforce", value: "340", suffix: "employees & contractors" },
  { label: "Export markets", value: "12", suffix: "countries served" },
];

export const quarterlyStats = {
  period: "Q1 2026",
  asAt: "Three months ended 31 March 2026",
  metrics: [
    { label: "Gold refined", value: "61", suffix: "kg (~20 kg/month)" },
    { label: "Export value", value: "$8.1M", suffix: "gross exports" },
    { label: "LBMA bars produced", value: "37", suffix: "99.99% purity" },
    { label: "Assay samples", value: "79", suffix: "certified" },
    { label: "Centre transactions", value: "294", suffix: "buying desk" },
    { label: "Traceability", value: "100%", suffix: "chain of custody" },
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
        body: `This website is provided for informational purposes about ${company.name}'s gold dealing and refining services. Content does not constitute financial advice.`,
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
    tagline: "99.99% purity, LBMA-standard bars",
    description:
      "Our Kampala facility refines raw gold to 99.99% purity using induction melting, chemical treatment, and electrolytic finishing. Capacity: 500 kg per month.",
    image: images.services.refining,
    highlights: [
      { label: "Purity", value: "99.99%" },
      { label: "Capacity", value: "500 kg/mo" },
      { label: "Turnaround", value: "48 hours" },
    ],
    features: [
      "99.99% LBMA Good Delivery bars",
      "10 oz, 1 kg, and 12.5 kg formats",
      "Serial-numbered certification",
      "48-hour turnaround standard",
    ],
    steps: [
      "Raw gold intake with full chain-of-custody documentation",
      "Induction melting, chemical treatment, and electrolytic finishing",
      "Certified bars issued with serial numbers and assay certificates",
    ],
    cta: { label: "Discuss refining", subject: "Gold Refining Enquiry" },
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
      { label: "Clearance", value: "BoU licensed" },
      { label: "Logistics", value: "Insured freight" },
      { label: "Markets", value: "12 countries" },
    ],
    features: [
      "BoU export licensing",
      "Insured air freight",
      "LBMA-approved delivery",
      "Multi-currency settlement",
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
    title: "Kampala Refinery",
    location: "Nakasero, Kampala",
    description:
      "Our flagship 2,400 sqm refinery houses induction furnaces, assay laboratories, vault storage, and a certified weighing facility. Licensed by the Ministry of Energy and Mineral Development.",
    capacity: "500 kg/month",
    image: images.operations.refinery,
    imageAlt: "Assay laboratory testing gold purity samples",
  },
  {
    id: "centres",
    title: "Collection Centres",
    location: "Kampala & Arua",
    description:
      "Collection centres in Kampala and Arua provide miners with accessible, fair-price gold buying, on-site assay checks, and transparent documentation.",
    capacity: "50+ staff",
    image: images.operations.centres,
    imageAlt: "Raw gold nuggets sourced from licensed miners",
  },
  {
    id: "supply-chain",
    title: "Supply Chain",
    location: "Mine to market",
    description:
      "Every gram is tracked through our digital supply chain platform, linking miner ID, assay results, transport logs, and export documentation in a single auditable record.",
    capacity: "100% traceable",
    image: images.operations.supplyChain,
    imageAlt: "Certified 999.9 fine gold bars ready for export",
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