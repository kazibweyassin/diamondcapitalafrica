/** Buyer procedure, trust signals, and educational guides for institutional buyers. */

export const trustSignals = [
  {
    title: "Licensed principal, not a broker chain",
    body: "Diamond Capital Africa is a licensed gold dealer and refinery in Kampala. We sell assay-verified bars from our own pipeline, not random social-media supply.",
  },
  {
    title: "99.99% fire-assay verification",
    body: "Every batch is fire-assay verified. Bars are serial-numbered to LBMA Good Delivery specifications with certificates buyers can audit.",
  },
  {
    title: "Real export documentation",
    body: "Bank of Uganda clearance, customs paperwork, and OECD-aligned chain-of-custody records are prepared for legitimate cross-border settlement.",
  },
  {
    title: "Named contact and fixed address",
    body: "Deal with a named commercial contact at Plot 42, Nakasero Road, Kampala, not anonymous LinkedIn profiles or disposable email domains.",
  },
] as const;

export const prequalificationItems = [
  "Company name, registration jurisdiction, and role (importer, refiner, family office, trader)",
  "Intended volume range (spot vs rolling) and preferred bar formats (10 oz, 1 kg, 12.5 kg)",
  "Delivery preference: FOB Kampala, CIF Dubai, or escorted insured delivery",
  "Settlement currency (USD or EUR) and rough timeline",
  "Willingness to complete KYC before quote confirmation or site visit",
] as const;

export const buyerProcedureSteps = [
  {
    title: "Enquire with intent",
    body: "Contact Tom with volume, destination, and delivery preference. We respond within one business day. Cold emails with no KYC path or fake \"discount below spot\" offers are not our model.",
  },
  {
    title: "KYC and commercial fit",
    body: "Serious buyers provide basic corporate documents and proof of funds appropriate to the order size. We confirm we can supply product and documentation for your market before anyone travels.",
  },
  {
    title: "Quote on request",
    body: "Pricing is quote-based against live spot plus a transparent premium. We do not publish fake fixed online prices or \"CIF free shipping at a discount\" bait used in scams.",
  },
  {
    title: "Assay, vault, and documents",
    body: "Product is refined and fire-assay verified at our Kampala facility. Serial numbers, certificates, and export paperwork are prepared before release.",
  },
  {
    title: "Delivery and settlement",
    body: "Choose FOB Kampala vault collection, CIF Dubai freight and insurance arranged by us, or escorted insured delivery to agreed destinations. Settlement in USD or EUR on agreed terms.",
  },
] as const;

export const buyPaths: {
  title: string;
  pros: string;
  cons: string;
  highlight?: boolean;
}[] = [
  {
    title: "DIY on the ground alone",
    pros: "Lowest intermediation cost if everything works.",
    cons: "High operational, security, and counterparty risk without local licences, assay, and export experience.",
  },
  {
    title: "Wire a stranger from LinkedIn or email",
    pros: "Feels easy: send funds or bank instruments first.",
    cons: "Extremely high fraud risk. Passports, POF, and LCs are routinely abused. Not how we trade.",
  },
  {
    title: "Buy from a licensed Uganda refiner and exporter",
    pros: "Assay-backed bars, real facility, export docs, named counterparty, and delivery options that match institutional practice.",
    cons: "Requires KYC and commercial discipline. Quotes, not fantasy discounts.",
    highlight: true,
  },
];

export interface BuyerGuide {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  sections: { heading: string; paragraphs: string[] }[];
  cta: { label: string; href: string };
}

export const buyerGuides: BuyerGuide[] = [
  {
    slug: "cif-dubai-real-vs-scam",
    title: "Real CIF Dubai gold export vs CIF scams",
    description:
      "How legitimate CIF Dubai delivery from a licensed Uganda exporter differs from email and LinkedIn \"CIF gold\" scams. What buyers should demand before funds move.",
    date: "2026-07-08",
    keywords: [
      "CIF Dubai gold",
      "CIF gold scam",
      "gold export Dubai Uganda",
      "buy gold CIF Dubai",
      "licensed gold exporter Uganda",
    ],
    sections: [
      {
        heading: "Why \"CIF gold\" emails are usually scams",
        paragraphs: [
          "Scammers flood buyers with offers to ship gold CIF (cost, insurance, freight) to Dubai, Europe, or \"any airport\" at a deep discount to spot. They ask for deposits, tickets, letters of introduction, or bank instruments before anything real exists.",
          "A random seller cannot sensibly pre-pay taxes, security, insurance, and freight on multi-million-dollar metal to sell you below market. That economics story is the first red flag.",
        ],
      },
      {
        heading: "When CIF Dubai is real",
        paragraphs: [
          "CIF can be legitimate when the seller is a licensed principal with inventory, refining capacity, and export licences. Diamond Capital Africa refines and vaults 99.99% bars in Kampala and can arrange freight and insurance to Dubai for institutional importers and re-export hubs.",
          "Real CIF is a logistics and documentation package on top of assay-verified product. It is not a free holiday for the seller, and it is not priced as \"spot minus fantasy.\" Quotes reflect spot, premium, duties where applicable, insurance, and freight.",
        ],
      },
      {
        heading: "How to tell real CIF from a scam",
        paragraphs: [
          "Check for a fixed corporate address, named contact, verifiable licence framing, and willingness to complete mutual KYC. Demand fire-assay certificates, serial numbers, and Bank of Uganda / customs export documentation before release of metal.",
          "Refuse to send passport scans, blank letters of introduction, or financial instruments to unknown parties. Legitimate exporters do not need you to \"sponsor\" their travel to deliver your gold.",
          "Prefer FOB Kampala or CIF Dubai structured by a known refiner over unsolicited social-media offers. If the only \"proof\" is a PDF and a WhatsApp number, walk away.",
        ],
      },
      {
        heading: "How Diamond Capital Africa handles Dubai-bound metal",
        paragraphs: [
          "Buyers enquire with volume and timeline. After KYC and commercial agreement, we prepare bars, assay certificates, and export clearance. For CIF Dubai we arrange insured freight to the agreed Dubai point; for experienced buyers, FOB Kampala vault collection remains available.",
          "Settlement terms are agreed in advance in USD (or EUR for other corridors). There is no public \"add to cart\" price, because bullion is quote-based.",
        ],
      },
    ],
    cta: {
      label: "Enquire about CIF Dubai export",
      href: "/contact?subject=Export%20Services",
    },
  },
  {
    slug: "buy-gold-uganda-refinery",
    title: "How to buy gold from a licensed Uganda refinery",
    description:
      "Step-by-step guide for institutional and serious private buyers: KYC, assay, bar formats, FOB Kampala, CIF Dubai, and Gold Savings for smaller physical accumulation.",
    date: "2026-07-08",
    keywords: [
      "buy gold Uganda refinery",
      "how to buy gold bars Uganda",
      "licensed gold dealer Kampala",
      "99.99% gold bars Uganda",
      "FOB Kampala gold",
    ],
    sections: [
      {
        heading: "What you are buying",
        paragraphs: [
          "Diamond Capital Africa sells fire-assay verified 99.99% fine gold bars from our Kampala refinery. Typical institutional formats include 10 oz, 1 kg, and 12.5 kg, serial-numbered with certificates. This is physical bullion supply, not mining shares or paper gold.",
          "We also operate Gold Savings for individuals who want to accumulate physical gold from $20 via USDT, redeemable from 20 g at Kampala or Arua.",
        ],
      },
      {
        heading: "Who should buy this way",
        paragraphs: [
          "Institutional importers, Middle East and European traders, family offices, and professional bullion buyers who need documentation and chain of custody. Individuals who want small physical holdings use Gold Savings rather than wholesale export tickets.",
          "Artisanal sellers who want to sell doré to us use collection centres or the Network supplier path. That is a different process from buying refined bars.",
        ],
      },
      {
        heading: "The practical steps",
        paragraphs: [
          "1. Contact us with intended volume, destination country, and delivery preference (FOB Kampala, CIF Dubai, or escorted insured delivery).",
          "2. Complete KYC: company details and proof of funds suited to the order. We do the same commercial diligence in reverse.",
          "3. Receive a quote: live spot reference plus premium and logistics where applicable.",
          "4. Confirm bar formats, settlement currency, and timeline.",
          "5. We refine or allocate vaulted inventory, complete fire assay, and prepare export documents.",
          "6. Delivery and settlement on the agreed Incoterms. Release of metal follows the commercial contract, not blind prepayment to a stranger.",
        ],
      },
      {
        heading: "Documents and compliance buyers should expect",
        paragraphs: [
          "Fire-assay certificates, serial numbers, export permits, customs documentation, and OECD-aligned traceability records. European buyers should expect paperwork that supports due diligence reviews; Dubai buyers commonly use CIF or FOB structures around the re-export hub.",
          "We do not replace your own counsel or bank compliance. We supply product and documentation from a licensed Uganda operation so your side can complete legitimate import.",
        ],
      },
    ],
    cta: {
      label: "Start a buying enquiry",
      href: "/how-to-buy",
    },
  },
  {
    slug: "linkedin-gold-scams",
    title: "Spotting fake gold sale posts on LinkedIn",
    description:
      "How institutional buyers can recognise LinkedIn and social-media gold scams, and how a real licensed Uganda dealer behaves differently.",
    date: "2026-07-08",
    keywords: [
      "LinkedIn gold scam",
      "fake gold dealers LinkedIn",
      "gold fraud Africa",
      "how to spot gold scams",
      "legitimate gold dealer Uganda",
    ],
    sections: [
      {
        heading: "Why LinkedIn is a favourite channel for gold fraud",
        paragraphs: [
          "Social networks make it cheap to clone logos, invent \"refinery director\" titles, and message hundreds of buyers with photo-shopped bars and warehouse shots. Profiles are new, connections are bought, and the pitch is urgency plus discount.",
          "Real wholesale gold rarely starts with a cold InMail offering 50 kg at 8% below spot with \"ready to ship CIF tomorrow.\"",
        ],
      },
      {
        heading: "Red flags on fake sale posts",
        paragraphs: [
          "Stock photos of bars with no serial detail, recycled assay certificates, or SKRs that cannot be independently confirmed. Pressure to move to WhatsApp immediately and avoid video calls at a known facility.",
          "Requests that you pay \"export tax,\" \"security escort,\" or \"airport storage\" to a personal account before seeing product. Requests for your passport, blank invitation letters, or bank instruments \"only for show.\"",
          "Company websites younger than the claimed multi-decade history, no physical address you can verify, or names that closely mimic well-known firms.",
        ],
      },
      {
        heading: "What real dealers do instead",
        paragraphs: [
          "They publish a real address, named contacts, and a clear buying procedure. They ask for KYC because banks and regulators require it. Pricing is quote-based. Delivery terms are FOB, CIF, or insured escorted logistics with paperwork that matches the metal.",
          "They can explain their licence framing, assay method, and export path without rushing you into a deposit on a private number.",
        ],
      },
      {
        heading: "If you were approached about \"Uganda gold\" online",
        paragraphs: [
          "Do not send funds or documents to the cold contact. Independently open the corporate site of any company named, call the published number, and ask for the export desk. Compare the LinkedIn story with what the company actually offers.",
          "Diamond Capital Africa publishes how buying works, including FOB Kampala and CIF Dubai for real institutional orders. Start there, or contact Tom on the numbers listed on this website, not through a random profile that claims to \"represent\" us without introduction.",
        ],
      },
    ],
    cta: {
      label: "Read how buying works",
      href: "/how-to-buy",
    },
  },
];

export function getBuyerGuide(slug: string): BuyerGuide | undefined {
  return buyerGuides.find((guide) => guide.slug === slug);
}
