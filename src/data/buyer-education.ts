/** Buyer procedure, trust signals, and educational guides for institutional buyers. */

export const trustSignals = [
  {
    title: "Licensed principal, not a broker chain",
    body: "Diamond Capital Africa is a licensed gold dealer and exporter in Kampala. We coordinate assay-verified supply, not random social-media offerings.",
  },
  {
    title: "Assay verification",
    body: "Transactions are supported by fire-assay or equivalent purity documentation and chain-of-custody records buyers can review.",
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

export interface GuideCta {
  label: string;
  href: string;
  note?: string;
}

export interface BuyerGuide {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  sections: { heading: string; paragraphs: string[]; cta?: GuideCta }[];
  resources?: { label: string; href: string }[];
  ctaNote?: string;
  cta: GuideCta;
  secondaryCtas?: GuideCta[];
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
          "CIF can be legitimate when the seller is a licensed principal with inventory access, export capacity, and proper licences. Diamond Capital Africa coordinates assay-verified gold supply from Kampala and can arrange freight and insurance to Dubai for institutional importers and re-export hubs.",
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
    title: "How to buy gold from a licensed Uganda dealer",
    description:
      "Step-by-step guide for institutional and serious private buyers: KYC, assay, bar formats, FOB Kampala, CIF Dubai, and Gold Savings for smaller physical accumulation.",
    date: "2026-07-08",
    keywords: [
      "buy gold Uganda dealer",
      "how to buy gold bars Uganda",
      "licensed gold dealer Kampala",
      "assay-verified gold Uganda",
      "FOB Kampala gold",
    ],
    sections: [
      {
        heading: "What you are buying",
        paragraphs: [
          "Diamond Capital Africa coordinates fire-assay verified fine gold supply from Kampala. Typical institutional formats include 10 oz, 1 kg, and 12.5 kg where available, with certificates. This is physical bullion supply, not mining shares or paper gold. DCA is also developing a proposed modern refinery and assay laboratory.",
        ],
      },
      {
        heading: "Who should buy this way",
        paragraphs: [
          "Institutional importers, Middle East and European traders, family offices, and professional bullion buyers who need documentation and chain of custody.",
          "Artisanal sellers who want to sell doré to us use the Kampala or Arua collection centres. Licensed suppliers with larger lots can offer metal to DCA for purchase. That is a different process from buying refined bars.",
        ],
      },
      {
        heading: "The practical steps",
        paragraphs: [
          "1. Contact us with intended volume, destination country, and delivery preference (FOB Kampala, CIF Dubai, or escorted insured delivery).",
          "2. Complete KYC: company details and proof of funds suited to the order. We do the same commercial diligence in reverse.",
          "3. Receive a quote: live spot reference plus premium and logistics where applicable.",
          "4. Confirm bar formats, settlement currency, and timeline.",
          "5. We allocate approved inventory, complete assay documentation, and prepare export documents.",
          "6. Delivery and settlement on the agreed Incoterms. Release of metal follows the commercial contract, not blind prepayment to a stranger.",
        ],
      },
      {
        heading: "Documents and compliance buyers should expect",
        paragraphs: [
          "Assay certificates, serial numbers where applicable, export permits, customs documentation, and OECD-aligned traceability records. European buyers should expect paperwork that supports due diligence reviews; Dubai buyers commonly use CIF or FOB structures around the re-export hub.",
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
  {
    slug: "gold-bullion-scams-africa",
    title: "Gold Bullion Scams in Africa: Red Flags and a Buyer Checklist",
    description:
      "A practical guide to fake gold offers, cloned dealer identities, forged documents, advance-fee traps and payment risks—with checks buyers and sellers can make before a transaction.",
    date: "2026-10-11",
    keywords: [
      "gold bullion scams Africa",
      "gold scams in Africa",
      "how to verify a gold buyer",
      "gold buyer due diligence",
      "gold assay certificate fraud",
      "gold transaction red flags",
    ],
    sections: [
      {
        heading: "First, be clear about what kind of gold is being offered",
        paragraphs: [
          "An offer described simply as “gold bullion” may refer to very different material. Ore or concentrate is not a finished bullion bar. Doré is an unrefined or partly refined product whose gold content and other metals must be established by assay and refining. Refined bars should be described by weight, fineness, producer and form; a stamp or certificate by itself does not prove that a particular bar is genuine or available.",
          "Ask whether the offer is for doré, refined bars, scrap or another form of gold-bearing material, and make sure the contract, assay, lot identifiers, photographs, export documents and delivery terms all describe the same material. Physical bullion is also different from a metal account, certificate or other financial exposure that does not give you possession of specific bars.",
        ],
      },
      {
        heading: "Common gold-offer and bullion scams to watch for",
        paragraphs: [
          "These are warning patterns in cross-border gold transactions, not a claim that every African country or dealer has the same risks. Rules, supply chains and reporting channels differ by jurisdiction. A red flag is a reason to pause and verify—not, on its own, proof that a person or company has committed fraud.",
          "Cloned companies and fake mandates: a fraudster copies a real dealer’s name, logo, licence or staff profile, or claims to represent a mine, refinery or government office without authority. Contact the company using details you independently find on its official website or registry—not only the phone number or email in the offer.",
          "Fictitious stock and recycled paperwork: stock photos, videos, assay reports, export permits and vault receipts can be copied or altered. Ask for evidence tied to the specific lot, then verify the issuer, licence and document reference directly through an independently sourced channel. Do not treat a PDF, bar photo, video call or certificate as proof of ownership, availability or export permission.",
          "Advance-fee and release-fee demands: a contact may ask for money for a “tax”, registration, refinery slot, assay, export clearance, security escort, insurance or airport release before the transaction is verified. Some legitimate transactions do have costs. Verify each charge, its legal or contractual basis, the payee and the official invoice with the named authority or service provider; be especially cautious of personal accounts, changing beneficiaries and pressure to pay immediately.",
          "Under-market or guaranteed-return pitches: unusually cheap metal, fixed high returns, “risk-free” profits or a deadline to secure a large allocation are pressure tactics. Recalculate the economics using a current independent spot reference, realistic premiums, assay, taxes and logistics, and get the full written terms reviewed before committing.",
          "Fake payment evidence and buyer impersonation: screenshots, forged bank messages, purported SWIFT confirmations or letters of credit can be fabricated. Confirm payment status directly with your own bank through known contacts; do not release metal or title based on a screenshot, forwarded email or a contact supplied by the counterparty.",
          "Material substitution or non-delivery: a small sample or displayed bar may not represent the shipment, and an assay document may not relate to the lot you receive. Agree in advance on independent sampling, an acceptable assay facility, lot identification, chain of custody, inspection rights, delivery point and what happens if weight or fineness differs.",
        ],
      },
      {
        heading: "A practical due-diligence checklist before funds or metal move",
        paragraphs: [
          "Verify the legal entity, registration number, physical business address, directors or beneficial owners, authorised signatory and the person’s authority to offer or purchase the material. Check relevant licences in the jurisdiction and for the specific role—dealer, exporter, refiner or other activity—using official registers where available. A licence for one activity or company is not proof of authority for every transaction.",
          "Map the transaction: who owns the gold, where it is now, what form it is in, how it was sourced, who will assay it, who exports it, who insures it, who pays whom and when, and which party bears each risk. Trace each answer to a named party and a document or independent confirmation. Look for inconsistent company names, weights, purity, lot numbers, dates, ports, bank beneficiaries or routes.",
          "Use a mutually agreed independent assay and secure inspection process. Have your own bank confirm payment and trade-finance arrangements. Verify shipping, insurance, customs and export requirements with the named providers and relevant authorities. Have qualified legal and compliance advisers review the contract and the rules in every country involved.",
          "Do not send blank signed documents, passport copies, proof-of-funds material or bank instruments to an unverified contact. Share sensitive records only when necessary, through a secure channel, with a verified counterparty and under agreed privacy and confidentiality terms. If anyone demands secrecy, bypasses normal controls or changes payment details at the last moment, pause and independently re-confirm.",
        ],
      },
      {
        heading: "If you are buying from a seller other than DCA",
        paragraphs: [
          "A buyer should verify the seller’s company and representatives, confirm their authority and relevant licence, establish who owns the gold and how it was sourced, and match lot identifiers across provenance, assay, export and transaction documents. Agree independent sampling and inspection, confirm payment and delivery arrangements directly with your bank and named providers, and make title transfer and remedies explicit in the contract. A seller’s website, claimed mine or refinery relationship, licence copy or assay certificate is not by itself proof that the offered lot exists, is lawfully sourced or matches the documents.",
          "Diamond Capital Africa can discuss a scoped review of a prospective gold seller or supplier and the proposed transaction. DCA also sells gold, so we disclose that commercial interest; requesting a review does not require you to buy from DCA. Scope and deliverables must be agreed before sensitive documents are shared. This support is not a legal opinion, assay, bank confirmation, regulatory approval, independent certification or guarantee of authenticity, payment, performance or safety. Use your own lawyer, bank, compliance adviser and independent assay or logistics providers for decisions within their expertise.",
        ],
      },
      {
        heading: "What to do if an offer looks suspicious",
        paragraphs: [
          "Pause the transaction. Preserve the original messages, email headers, contracts, payment instructions, account details and document files. Do not confront a suspected fraudster with sensitive evidence or send more money to recover an earlier payment. Contact your bank promptly if funds or financial details were shared, and report the matter to the relevant police, financial-intelligence or mining regulator in the country involved. Procedures differ by jurisdiction.",
          "This guide is general education, not legal, investment, banking or assay advice. Gold-trade licensing, export rules and remedies vary by country and change over time. Confirm current requirements with the competent authority and qualified advisers before acting.",
        ],
      },
    ],
    resources: [
      {
        label: "Uganda Mining Cadastre: active mineral dealer and refining licences",
        href: "https://dgsmportal.minerals.go.ug/site/CustomHtml.aspx?PageID=52f595a4-c713-4809-9e33-89e0a2ac6ea5",
      },
      {
        label: "OECD Due Diligence Guidance for Responsible Mineral Supply Chains",
        href: "https://www.oecd.org/en/publications/2016/04/oecd-due-diligence-guidance-for-responsible-supply-chains-of-minerals-from-conflict-affected-and-high-risk-areas_g1g65996.html",
      },
      {
        label: "FATF/APG report: money-laundering risks and vulnerabilities associated with gold",
        href: "https://www.fatf-gafi.org/en/publications/Methodsandtrends/Ml-tf-risks-and-vulnerabilities-gold.html",
      },
      {
        label: "US FTC consumer alert: requests to buy and hand over gold bars",
        href: "https://consumer.ftc.gov/consumer-alerts/2025/07/real-government-agents-arent-asking-you-buy-and-deliver-gold-bars",
      },
    ],
    ctaNote:
      "Buying gold from another supplier? We can help you review the seller and transaction.",
    cta: {
      label: "Ask about supplier due diligence",
      href: "/services#buyer-due-diligence",
    },
  },
  {
    slug: "verify-uganda-gold-dealer-licence",
    title: "How to Verify a Uganda Gold Dealer Licence: A Step-by-Step Buyer Guide",
    description:
      "A practical checklist for confirming that a Uganda gold dealer or exporter is properly licensed: what to ask for, how to check it independently, and the licence red flags that should stop a deal.",
    date: "2026-10-13",
    keywords: [
      "verify gold dealer licence Uganda",
      "Uganda mineral dealer licence",
      "licensed gold dealer Uganda",
      "how to check gold dealer is legitimate",
      "Uganda gold export licence",
      "Uganda Mining Cadastre licence check",
      "gold dealer due diligence Uganda",
    ],
    sections: [
      {
        heading: "Why a licence check comes before everything else",
        paragraphs: [
          "In cross-border gold deals, a licence is often the first document a seller shows and the first one a fraudster copies. A licence copy sent as a PDF or photo proves very little on its own. What matters is whether the licence is real, current, held by the same legal entity you are contracting with, and valid for the activity being offered.",
          "This guide explains how to check those points independently. It is general information about the verification process. Licensing categories, requirements and procedures are set by Ugandan authorities and can change, so confirm current rules with the competent authority and your own advisers before acting.",
        ],
      },
      {
        heading: "Step 1: Ask for the right documents, in the right way",
        paragraphs: [
          "Ask the seller for the full legal name of the company, its registration details, its physical address, and a copy of each licence it relies on, showing the licence type, number, holder, issue date and expiry date. Ask which licence covers which activity in your transaction, for example buying, dealing, refining or exporting.",
          "Treat the copy as a lead to verify, not as proof. A genuine seller will expect you to check it and will not object to independent confirmation.",
        ],
      },
      {
        heading: "Step 2: Check the licence against an official source",
        paragraphs: [
          "Do not rely on contact details printed on the document or supplied by the seller. Find the competent authority through its official website or published channels and use those details to confirm the licence. Uganda publishes mineral licence information through its Mining Cadastre, and the active dealer and refining licence list is a useful starting point for cross-checking a name and licence number.",
          "Compare each detail: the exact company name, the licence number, the licence type, the status and the expiry date. If the register does not show the licence, shows a different holder, or shows it as expired or inactive, pause and ask the seller to explain in writing. A register that is incomplete or temporarily unavailable is not proof either way, so ask the authority to confirm directly.",
        ],
      },
      {
        heading: "Step 3: Match the licence to the legal entity and the activity",
        paragraphs: [
          "The company that holds the licence must be the same legal entity that signs the contract, issues the invoice and receives or sends payment. A licence held by a sister company, a \"partner\", an agent or an individual does not automatically cover the party in front of you.",
          "Also check that the licence type fits the activity. A licence for one activity, such as mining or buying from small-scale miners, is not automatically authority to refine, export or sell refined bars. Ask in writing which licences and permits apply to your specific shipment, and confirm export requirements with the relevant authorities and your customs or logistics provider.",
        ],
      },
      {
        heading: "Step 4: Verify the company and the people",
        paragraphs: [
          "Confirm the company's registration with the national business registry, and check its directors or beneficial owners, registered address and signatory authority. Visit or arrange an inspection of the stated business premises where practical, or use a verified local agent.",
          "Check that the person you are speaking to is actually authorised to act for the company. Call the company on a number you found independently and ask for that person by name. Cloned identities and fake mandates are common, so a matching name on a licence is not enough if the contact is not who they claim to be.",
        ],
      },
      {
        heading: "Licence red flags that should stop the deal",
        paragraphs: [
          "Pause and verify further if you see any of the following: a licence shown only as a photo or low-quality scan; a name that is similar to, but not exactly the same as, the contracting company; an expired or \"renewal pending\" licence presented as current; a licence number that does not appear on any official source; a seller who relies on a third party's licence; pressure to skip checks because \"the buyer is waiting\"; or reluctance to let you contact the authority.",
          "A red flag is a reason to verify, not proof of fraud. But no commercial promise is worth sending money or documents before the licence and the entity are confirmed.",
        ],
        cta: {
          label: "Have an offer you are unsure about? Ask us to review it",
          href: "/contact?subject=Seller%20Licence%20Review",
        },
      },
      {
        heading: "A licence is necessary, not sufficient",
        paragraphs: [
          "A valid licence does not prove that a particular lot exists, is lawfully sourced, or matches the paperwork. After the licence check, still confirm provenance and chain of custody, agree independent sampling and assay, match lot identifiers across documents, confirm payment instructions directly with your own bank, and have your lawyer and compliance team review the contract.",
          "Responsible-sourcing frameworks such as the OECD Due Diligence Guidance expect buyers to assess the supply chain, not just the seller's paperwork.",
        ],
      },
      {
        heading: "How Diamond Capital Africa's licensing can be checked",
        paragraphs: [
          "Diamond Capital Africa is a licensed gold dealer and exporter based at Plot 42, Nakasero Road, Kampala. We encourage buyers to confirm a dealer's licence details with the authority directly rather than rely on any website.",
          "DCA's refinery and assay laboratory are in development and are not operating production facilities. Buyers should treat any seller's claim of in-house refining, including ours, as something to verify against documents and an inspection. If you are considering a seller other than DCA, we can discuss a scoped review of the seller and the proposed transaction. DCA also sells gold, so we disclose that commercial interest, and a review does not require you to buy from us. It is not a legal opinion, assay, bank confirmation, regulatory approval or guarantee.",
        ],
        cta: {
          label: "Enquire about buying from DCA",
          href: "/contact?subject=Gold%20Buying%20Enquiry",
        },
      },
    ],
    resources: [
      {
        label: "Uganda Mining Cadastre: active mineral dealer and refining licences",
        href: "https://dgsmportal.minerals.go.ug/site/CustomHtml.aspx?PageID=52f595a4-c713-4809-9e33-89e0a2ac6ea5",
      },
      {
        label: "OECD Due Diligence Guidance for Responsible Mineral Supply Chains",
        href: "https://www.oecd.org/en/publications/2016/04/oecd-due-diligence-guidance-for-responsible-supply-chains-of-minerals-from-conflict-affected-and-high-risk-areas_g1g65996.html",
      },
      {
        label: "FATF/APG report: money-laundering risks and vulnerabilities associated with gold",
        href: "https://www.fatf-gafi.org/en/publications/Methodsandtrends/Ml-tf-risks-and-vulnerabilities-gold.html",
      },
    ],
    ctaNote:
      "Considering a gold offer and not sure the seller is real? Send us the seller's name, licence copy and the offer. We will tell you what we can review and what it covers, before you share anything sensitive or send money.",
    cta: {
      label: "Request a seller licence review",
      href: "/contact?subject=Seller%20Licence%20Review",
    },
    secondaryCtas: [
      {
        label: "Buying gold from DCA? Start the buyer process",
        href: "/how-to-buy",
        note: "KYC, quote, assay, export documents and delivery, step by step.",
      },
      {
        label: "WhatsApp Tom",
        href: "https://wa.me/256704833021?text=Hello%2C%20I%20read%20your%20licence%20verification%20guide%20and%20would%20like%20to%20enquire.",
        note: "Fastest for a quick question. Use the number published on this website only.",
      },
    ],
  },
  {
    slug: "gold-price-per-gram-uganda",
    title: "Gold Price per Gram in Uganda Today: How It Is Calculated",
    description:
      "See today's gold price per gram in Uganda and learn how it is worked out from the international spot price, the dollar rate and a dealer's premium, so you know what a fair price looks like before you buy.",
    date: "2026-10-13",
    keywords: [
      "gold price per gram Uganda",
      "gold price today Uganda",
      "gold price UGX per gram",
      "how much is a gram of gold in Uganda",
      "gold rate Kampala",
      "buy gold per gram Uganda",
    ],
    sections: [
      {
        heading: "Today's gold price in Uganda",
        paragraphs: [
          "The live prices at the top of this page show the international gold spot price in US dollars per ounce, the UGX to USD exchange rate, and the Diamond Capital Africa rate in US dollars per gram. They refresh as the market moves, because gold is priced all day on global markets and changes minute to minute.",
          "The price you pay for physical gold is not the spot price alone. It is the spot price converted to grams and shillings, plus a dealer premium that covers refining, assay, handling, security and the dealer's margin. The sections below show you how to check this yourself.",
        ],
      },
      {
        heading: "How to turn the spot price into a price per gram",
        paragraphs: [
          "Gold is quoted internationally per troy ounce, and one troy ounce is 31.1035 grams. To get the price per gram in US dollars, divide the ounce price by 31.1035. To get shillings, multiply by the UGX to USD rate.",
          "Illustrative example only, not a current price: if spot were US$2,000 per ounce, one gram of pure gold would be about US$64.30 (2,000 divided by 31.1035). At an exchange rate of 3,700 shillings per dollar, that is about UGX 237,900 per gram, before any premium.",
        ],
      },
      {
        heading: "Why dealer prices differ from the spot price",
        paragraphs: [
          "Retail gold usually costs more than spot, and the same gram can be priced differently by different dealers. The difference comes from the premium, which depends on the form of the gold (a small bar usually carries a higher premium per gram than a large one), the cost of verifying purity, storage and security, and the dealer's margin.",
          "A dealer should be able to show you how the quote is built: the spot reference, the exchange rate used, the premium and any fees. Be cautious of anyone who cannot explain the price, or whose price is far below the spot price. Real gold does not sell well under market, and unusually cheap offers are a common scam signal.",
        ],
      },
      {
        heading: "Pure gold, carats and why purity changes the price",
        paragraphs: [
          "The spot price is for pure gold. Gold bars sold by licensed dealers are typically near-pure (24 carat, around 99.9% fine). Jewellery is often 18 carat (75% gold), 14 carat (about 58%) or lower, so a gram of jewellery contains less than a gram of gold and is priced accordingly.",
          "To compare offers fairly, always ask for the fineness of the gold, the weight in grams, and a testing or assay document that matches the item you are buying.",
        ],
      },
      {
        heading: "How to buy gold by the gram",
        paragraphs: [
          "If you want to start small, Diamond Capital Africa's Gold Savings lets you buy physical, assay-verified fine gold by the gram from US$20, paid in USDT. You enter an amount, receive payment instructions with a 24-hour price lock, submit proof of payment, and the grams are credited to you. You can collect physical gold in person from 20 g at our Kampala or Arua centres with a valid ID.",
          "Gold Savings is physical bullion, not mining shares and not paper gold. Gold prices go up and down, gold does not earn interest, and you should only buy an amount you are comfortable holding through price swings. Read the full terms before you pay.",
        ],
        cta: {
          label: "Start with Gold Savings",
          href: "/gold-savings",
        },
      },
      {
        heading: "Before you pay any dealer",
        paragraphs: [
          "Check that the dealer is licensed, that the licence is current and held by the company you are paying, and that payment instructions come from the company's official website, not from a message or a personal account. Our guide on how to verify a Uganda gold dealer licence walks through each step.",
          "Prices on this page are for general information and are not an offer or a quote. Actual prices depend on the time of purchase, the form of gold and the agreed terms.",
        ],
      },
    ],
    resources: [
      {
        label: "Uganda Mining Cadastre: active mineral dealer and refining licences",
        href: "https://dgsmportal.minerals.go.ug/site/CustomHtml.aspx?PageID=52f595a4-c713-4809-9e33-89e0a2ac6ea5",
      },
    ],
    ctaNote:
      "Have a question about buying your first gold? Message us and we will explain how it works. No pressure and no minimum conversation.",
    cta: {
      label: "Ask a question about buying gold",
      href: "/contact?subject=Individual%20Gold%20Buying%20Question",
    },
    secondaryCtas: [
      {
        label: "WhatsApp us",
        href: "https://wa.me/256704833021?text=Hello%2C%20I%20am%20new%20to%20buying%20gold%20and%20have%20a%20question.",
        note: "Quick answers for first-time buyers.",
      },
    ],
  },
  {
    slug: "how-to-buy-gold-uganda-beginners",
    title: "How to Buy Gold in Uganda: A Beginner's Guide",
    description:
      "New to buying gold? This guide explains the ways to own gold in Uganda, how pricing and purity work, what to check before you pay, the risks, and how to start with a small amount.",
    date: "2026-10-13",
    keywords: [
      "how to buy gold in Uganda",
      "buy gold Uganda beginners",
      "start buying gold",
      "buy physical gold Uganda",
      "gold bars Uganda for individuals",
      "gold savings Uganda",
      "is gold a good investment Uganda",
    ],
    sections: [
      {
        heading: "Why people buy gold",
        paragraphs: [
          "People buy gold to hold value over the long term, to spread their savings across more than one kind of asset, and as protection when currencies lose purchasing power. Gold has been used as a store of value for thousands of years and is accepted around the world.",
          "Gold is not a guaranteed profit. Its price rises and falls, it does not pay interest or dividends, and you may pay a premium when you buy and receive less than that when you sell. It suits people who can leave the money untouched for years. This guide is general education, not financial advice, so consider your own situation and speak to a qualified adviser for big decisions.",
        ],
      },
      {
        heading: "The main ways to own gold",
        paragraphs: [
          "Physical gold bars and coins: you own metal that you can hold. Bars carry a lower premium per gram as they get bigger, and you need a safe way to store them.",
          "Gold jewellery: widely available, but you pay for design and labour on top of the gold, and the purity is lower than bullion, so it is usually a weak way to save and a harder one to resell at a fair price.",
          "Gold savings programmes: you buy small amounts of physical gold over time. For example, Diamond Capital Africa's Gold Savings starts from US$20 and credits grams of assay-verified gold that you can collect in person from 20 g.",
          "Paper or digital gold, such as certificates, accounts or funds: you hold a claim rather than the metal itself, which adds counterparty risk. Be sure you know what you actually own and who is responsible for it.",
        ],
      },
      {
        heading: "How pricing works, in simple terms",
        paragraphs: [
          "Gold is priced worldwide in US dollars per troy ounce, and one ounce is 31.1035 grams. Dealers convert that to grams and shillings and add a premium for refining, testing, handling and their margin. Our page on the gold price per gram in Uganda shows the calculation step by step.",
          "Always ask for the price in writing, showing the spot reference, exchange rate, premium and any fees, so you can see exactly what you are paying for.",
        ],
      },
      {
        heading: "Purity, weight and proof",
        paragraphs: [
          "Check three things on any purchase: the weight in grams, the purity (fineness, for example 99.9% or 24 carat), and the proof that backs both up, such as an assay certificate or a clearly marked bar from a recognised producer. A certificate on its own does not prove the item in front of you is genuine, so ask how the dealer verifies it and whether you can have it tested.",
          "Keep every receipt, certificate and message about the purchase. You will need them if you ever resell or if something goes wrong.",
        ],
      },
      {
        heading: "How to start safely, step by step",
        paragraphs: [
          "1. Decide how much you can leave invested for several years. Start small.",
          "2. Choose a licensed dealer and verify the licence yourself. Our guide on how to verify a Uganda gold dealer licence shows how.",
          "3. Ask for the full price breakdown and the purity and weight in writing.",
          "4. Pay only through the payment details published on the dealer's official website, never to a personal account or a number sent in a message.",
          "5. Keep your records, and confirm how and where you can collect or store your gold.",
        ],
        cta: {
          label: "See how Gold Savings works",
          href: "/gold-savings",
        },
      },
      {
        heading: "Storing your gold safely",
        paragraphs: [
          "Decide before you buy where the gold will be kept. Options include a secure vault or safe deposit service, a quality home safe, or leaving small amounts credited with a dealer until you reach a collection amount. Each has risks, such as theft, loss or the dealer's own failure, so choose one you trust and understand, and consider insurance for larger amounts.",
          "Do not tell people how much gold you hold, and be wary of anyone who asks.",
        ],
      },
      {
        heading: "Scams that target first-time buyers",
        paragraphs: [
          "Be careful with offers of gold well below the market price, pressure to pay quickly, requests to send money to a personal mobile money or bank account, and strangers who contact you first by message or social media. A genuine dealer lets you verify them, explains the price, and does not rush you.",
          "If you are unsure, pause and ask questions. Our guide on gold bullion scams in Africa explains the most common tricks and how to check an offer.",
        ],
      },
    ],
    resources: [
      {
        label: "Uganda Mining Cadastre: active mineral dealer and refining licences",
        href: "https://dgsmportal.minerals.go.ug/site/CustomHtml.aspx?PageID=52f595a4-c713-4809-9e33-89e0a2ac6ea5",
      },
      {
        label: "US FTC consumer alert: requests to buy and hand over gold bars",
        href: "https://consumer.ftc.gov/consumer-alerts/2025/07/real-government-agents-arent-asking-you-buy-and-deliver-gold-bars",
      },
    ],
    ctaNote:
      "Ready to start small? Gold Savings lets you buy physical gold by the gram from US$20, with a 24-hour price lock.",
    cta: {
      label: "Start buying gold from $20",
      href: "/gold-savings",
    },
    secondaryCtas: [
      {
        label: "Ask us a question first",
        href: "/contact?subject=Individual%20Gold%20Buying%20Question",
        note: "Plain answers for first-time buyers.",
      },
      {
        label: "WhatsApp us",
        href: "https://wa.me/256704833021?text=Hello%2C%20I%20am%20new%20to%20buying%20gold%20and%20have%20a%20question.",
      },
    ],
  },
];

export function getBuyerGuide(slug: string): BuyerGuide | undefined {
  return buyerGuides.find((guide) => guide.slug === slug);
}
