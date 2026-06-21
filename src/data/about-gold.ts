import { images } from "./images";

export const aboutGoldIntro =
  "Gold is unique. It is a scarce and beautiful metal with a rich cultural history, known as a store of wealth in times of uncertainty and the foundation on which nations have built monetary reserves. One of the few metals that combine aesthetic, physical and chemical properties, gold is exceptionally malleable and ductile, conductive, and does not corrode or tarnish. Its versatility makes it ideal for jewellery, investment, and an expanding range of industrial and technological applications.";

export const goldValuePillars = [
  {
    id: "scarcity",
    title: "Scarcity",
    summary: "Gold's scarcity makes it one of the most valuable metals in the world.",
    facts: [
      "Gold makes up only 0.003 parts per million of the Earth's crust.",
      "It is rarer to find a one-ounce nugget of gold than a five-carat diamond.",
      "All the gold ever mined would fit into a crate of roughly 22 cubic metres.",
    ],
    images: [images.aboutGold.scarcity],
  },
  {
    id: "stability",
    title: "Stability",
    summary:
      "Gold is a store of value. Considered a safe haven, gold is used to protect and enhance wealth over the long term.",
    facts: [
      "Its price often moves counter-cyclically, helping reduce portfolio volatility during macro-economic and geopolitical uncertainty.",
      "Diverse sources of demand, from jewellery and investment to central banks and technology, give gold resilience across market conditions.",
      "Over the long term, gold's return has consistently outpaced inflation, tracking global economic growth.",
    ],
    images: [images.aboutGold.stability],
  },
  {
    id: "symbolism",
    title: "Symbolism",
    summary:
      "Gold's ancient origins and cultural significance link our collective history with the present.",
    facts: [
      "Around 187,200 tonnes of gold has been mined since the beginning of civilisation.",
      "Roughly half of all gold mined today is made into jewellery, still the single largest use.",
      "Gold conducts heat rapidly, reaching body temperature quickly, which is one reason it has been valued for adornment for millennia.",
    ],
    images: [images.aboutGold.symbolism],
  },
  {
    id: "sustainability",
    title: "Sustainability",
    summary:
      "Responsibly sourced gold can reduce exposure to climate-related and supply-chain risks.",
    facts: [
      "Gold has no downstream emissions from use, which can lower the carbon intensity of a diversified portfolio.",
      "Formal, traceable supply chains, like those we operate across East Africa, strengthen community livelihoods and regulatory compliance.",
      "Gold's value is less likely to be eroded by carbon pricing, offering insulation as economies decarbonise.",
    ],
    images: [images.aboutGold.sustainability],
  },
  {
    id: "versatility",
    title: "Versatility",
    summary:
      "Gold's unique properties, including malleability, conductivity, and biocompatibility, make it invaluable across industries.",
    facts: [
      "One ounce of gold can be drawn into a wire stretching 80 km, or hammered into a sheet so thin that 200,000 layers would stand only 2.5 cm high.",
      "As an efficient conductor, gold is used in almost all electronic devices for rapid, accurate data transmission.",
      "Gold is non-toxic and inert, supporting its growing use in medical diagnostics, therapies, and nanotechnology.",
    ],
    images: [images.aboutGold.versatility],
  },
] as const;

export const aboutGoldSource = {
  label: "World Gold Council: About Gold",
  href: "https://www.gold.org/about-gold/gold-facts",
};