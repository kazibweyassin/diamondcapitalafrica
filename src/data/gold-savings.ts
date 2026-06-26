import type { FaqItem } from "./faqs";

export const goldSavings = {
  minDepositUsd: 20,
  minRedemptionGrams: 5,
  purity: "99.99%",
  waitlistSubject: "Gold Savings Waitlist",
};

export const goldSavingsSteps = [
  {
    step: 1,
    title: "Open your account",
    description:
      "Register with your name, phone, and email. Complete ID verification (KYC) before your first deposit.",
  },
  {
    step: 2,
    title: "Deposit from $20",
    description:
      "Add funds via mobile money (MTN or Airtel), bank transfer, or card when online payments launch. No fixed monthly amount required.",
  },
  {
    step: 3,
    title: "Balance credited in grams",
    description:
      "Your deposit is converted to 99.99% fine gold at our published spot price (US$/g). Track your gram balance in your account.",
  },
  {
    step: 4,
    title: "Redeem when ready",
    description:
      "Collect physical gold at our Kampala or Arua centres when you reach the minimum redemption threshold, or sell back at our published buy-back rate.",
  },
];

export const goldSavingsBenefits = [
  "Own physical gold — not shares, not paper promises",
  "Start from $20; top up anytime",
  "Assay-verified 99.99% purity through our licensed refinery",
  "Transparent pricing tied to live spot rates",
  "Redeem in person at Kampala or Arua collection centres",
];

export const goldSavingsDisclaimers = [
  "Gold savings is a physical bullion accumulation service, not a securities investment or deposit account.",
  "Gold prices can rise or fall. Past performance does not guarantee future results.",
  "Spreads, fees, and redemption minimums apply and will be published in the programme terms.",
  "Account opening requires identity verification under our AML policy.",
];

export const goldSavingsFaqs: FaqItem[] = [
  {
    question: "Is this buying shares in a mining company?",
    answer:
      "No. Diamond Capital Africa Gold Savings lets you accumulate grams of physical 99.99% fine gold. You are saving in bullion we assay and vault — not buying equity or mining shares.",
  },
  {
    question: "What is the minimum deposit?",
    answer:
      "The programme is designed to start from $20 (or equivalent in UGX). You can top up at any time; there is no required monthly contribution.",
  },
  {
    question: "How is my gold priced?",
    answer:
      "Deposits are credited in grams at our published DCA spot price (US$ per gram), aligned with international gold markets. Live rates are shown on our homepage and gold savings calculator.",
  },
  {
    question: "When can I collect physical gold?",
    answer:
      "Once your balance reaches the published minimum redemption weight (initially 5 grams), you can arrange collection at our Kampala head office or Arua collection centre with valid ID.",
  },
  {
    question: "Is my gold insured and verified?",
    answer:
      "Gold held under the programme is managed through our licensed refinery operations with fire assay verification on refined material. Full custody and insurance terms will be set out in the account agreement.",
  },
  {
    question: "How do I join before accounts launch?",
    answer:
      "Submit the waitlist form on this page or contact investors@diamondcapitalafrica.com. We will notify you when account opening goes live.",
  },
];