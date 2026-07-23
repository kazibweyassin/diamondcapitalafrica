import type { FaqItem } from "./faqs";

export const goldSavings = {
  minDepositUsd: 20,
  minRedemptionGrams: 20,
  purity: "Assay-verified fine gold",
  priceLockHours: 24,
  paymentMethod: "usdt" as const,
};

export const goldSavingsSteps = [
  {
    step: 1,
    title: "Enter your amount",
    description:
      "Choose how much you want to save in USD (from $20). See the exact grams of fine gold you will receive at today's spot price.",
  },
  {
    step: 2,
    title: "Get USDT instructions",
    description:
      "Receive a unique reference, wallet address, and exact USDT amount. Your quoted gold price is locked for 24 hours.",
  },
  {
    step: 3,
    title: "Pay & submit proof",
    description:
      "Send USDT on the stated network, then submit your transaction hash and optional payment screenshot for verification.",
  },
  {
    step: 4,
    title: "Gold credited",
    description:
      "Once verified, your gram balance is credited. Redeem physical gold at Kampala or Arua when you reach the minimum threshold.",
  },
];

export const goldSavingsBenefits = [
  "Own physical gold, not shares or paper promises",
  "Start from $20 via USDT",
  "Assay-verified fine gold with documented purity",
  "Transparent pricing tied to live spot rates",
  "Redeem in person at Kampala or Arua collection centres",
];

export const goldSavingsDisclaimers = [
  "Gold savings is a physical bullion accumulation service, not a securities investment or deposit account.",
  "Gold prices can rise or fall. Past performance does not guarantee future results.",
  "Send only USDT on the network shown in your payment instructions. Wrong-network transfers may be unrecoverable.",
  "Spreads, fees, and redemption minimums apply and will be published in the programme terms.",
  "Identity verification may be required before redemption.",
];

export const goldSavingsFaqs: FaqItem[] = [
  {
    question: "Is this buying shares in a mining company?",
    answer:
      "No. Diamond Capital Africa Gold Savings lets you accumulate grams of physical assay-verified fine gold. You are saving in bullion we document and vault, not buying equity or mining shares.",
  },
  {
    question: "What is the minimum deposit?",
    answer:
      "The programme starts from $20 USDT. You can deposit more at any time; there is no required monthly contribution.",
  },
  {
    question: "How do I pay?",
    answer:
      "After entering your amount, the site generates USDT payment instructions: wallet address, network (TRC20), exact USDT amount, and a unique reference number. Send USDT only on the stated network.",
  },
  {
    question: "How do I submit proof of payment?",
    answer:
      "After sending USDT, return to your deposit flow and submit the on-chain transaction hash. You can also upload a screenshot or WhatsApp it to our team with your reference number.",
  },
  {
    question: "How is my gold priced?",
    answer:
      "Your grams are quoted at our published DCA spot price (US$ per gram) when you generate payment instructions. The quote is locked for 24 hours.",
  },
  {
    question: "When can I collect physical gold?",
    answer:
      "Once your balance reaches the published minimum redemption weight (20 grams), you can arrange collection at our Kampala head office or Arua collection centre with valid ID.",
  },
];