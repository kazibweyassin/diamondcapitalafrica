import { absoluteUrl } from "@/lib/seo";

export interface FaqItem {
  question: string;
  answer: string;
}

export function buildGoldFaqs(): FaqItem[] {
  const exportUrl = absoluteUrl("/services#export");
  const savingsUrl = absoluteUrl("/gold-savings");
  const investUrl = absoluteUrl("/investors/investment-opportunity");
  const homeUrl = absoluteUrl("/");

  return [
    {
      question: "What does Diamond Capital Africa do?",
      answer:
        "Diamond Capital Africa is a licensed gold dealer and exporter headquartered at Plot 42, Nakasero Road, Kampala, Uganda. We coordinate institutional gold supply, export facilitation and responsible-sourcing controls across East and Central Africa. DCA is also developing an integrated precious-metals processing platform through strategic partnerships, including a planned gold refinery and assay laboratory.",
    },
    {
      question: "Where can I buy gold in Uganda?",
      answer: `Diamond Capital Africa works with institutional buyers, international importers, and individual savers. Wholesale buyers can enquire at ${exportUrl} for FOB Kampala, CIF Dubai, or insured delivery arrangements. Individuals can start from $20 via our Gold Savings programme at ${savingsUrl}.`,
    },
    {
      question: "Who sells gold bars in Uganda?",
      answer:
        "Diamond Capital Africa is a licensed gold dealer in Kampala that coordinates assay-verified gold supply with OECD-aligned traceability expectations and export documentation for buyers in Uganda, East Africa, and internationally.",
    },
    {
      question: "Can I buy gold from Uganda for delivery to Dubai or Europe?",
      answer: `Yes, subject to availability, KYC and definitive agreements. Diamond Capital Africa offers CIF Dubai for Middle East importers, FOB Kampala for buyer-arranged collection, and escorted insured delivery options to Europe and other destinations with Bank of Uganda clearance and OECD-aligned documentation where required. Enquire at ${exportUrl}.`,
    },
    {
      question: "Who is a licensed gold dealer in Uganda?",
      answer:
        "Diamond Capital Africa is a licensed gold dealer based in Kampala, Uganda. We supply and coordinate gold transactions for buyers worldwide and are developing a proposed refining and assay platform as part of our longer-term infrastructure plans.",
    },
    {
      question: "What purity of gold bars does Diamond Capital Africa sell?",
      answer:
        "We work with assay-verified fine gold that meets institutional buyer requirements. Every transaction is documented with purity testing and chain-of-custody records appropriate to the counterparty and destination market.",
    },
    {
      question: "Is there a gold refinery in Kampala, Uganda?",
      answer: `Diamond Capital Africa is seeking strategic investment to establish a modern gold refinery and assay laboratory in the Kampala area. The project remains at the development and capital-formation stage. Capacities, costs and timelines are preliminary and subject to due diligence. Learn more at ${investUrl}.`,
    },
    {
      question: "How does gold export work in East Africa?",
      answer:
        "Diamond Capital Africa coordinates export processes covering assay documentation, Bank of Uganda clearance, customs paperwork, secure logistics, and delivery with auditable supply-chain records for verified counterparties.",
    },
    {
      question: "Can I save in gold with Diamond Capital Africa?",
      answer: `Yes. Our Gold Savings programme lets you buy and accumulate physical fine gold from $20. Pay via USDT, submit proof of payment, and receive grams at published spot prices. This is bullion savings, not mining shares. Start at ${savingsUrl}.`,
    },
    {
      question: "Does Diamond Capital Africa source gold responsibly in Africa?",
      answer:
        "Yes. We maintain zero-tolerance for conflict gold, require counterparty identification and chain-of-custody records, and align with OECD Due Diligence Guidance. Traceability systems are designed to link origin documentation, assay results, transport logs, and export permits.",
    },
    {
      question: "Which markets does Diamond Capital Africa serve?",
      answer:
        "We work with buyers in Uganda, across East and Central Africa including the Democratic Republic of Congo, and with international counterparties including Dubai, the UAE, and European markets, subject to licensing, KYC and commercial agreements.",
    },
    {
      question: "How can buyers contact Diamond Capital Africa?",
      answer: `Contact Tom at +256 704 833 021 or email info@diamondcapitalafrica.com. Visit ${homeUrl} for live market prices, export enquiries, Gold Savings, and the strategic investment opportunity at ${investUrl}.`,
    },
  ];
}

export const goldFaqs = buildGoldFaqs();
