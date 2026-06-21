export interface IndustryNewsSeed {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  category: "announcement" | "presentation";
  type: string;
  size: string;
  date: string;
  day: string;
  month: string;
  sourceUrl: string;
  sourceName: string;
}

export const industryNews: IndustryNewsSeed[] = [
  {
    slug: "bouk-starts-domestic-gold-purchase-programme",
    title: "Bank of Uganda begins domestic gold purchase programme",
    summary:
      "Uganda's central bank has started buying gold from domestic producers under a three-year pilot to diversify foreign reserves and strengthen traceability.",
    body: [
      "The Bank of Uganda confirmed it made its first gold purchase on 17 April 2026 under a domestic gold purchase programme first announced two years ago.",
      "The pilot aims to build and diversify Uganda's foreign exchange reserves by purchasing and processing domestically mined gold, strengthening reserve adequacy and reducing risks associated with conventional reserve instruments.",
      "BoU joins other African central banks, including Kenya and the Democratic Republic of Congo, that have moved to diversify reserves by buying gold as Uganda emerges as a major regional gold processor and trader.",
      "Source: Reuters, via CNBC Africa.",
    ],
    category: "announcement",
    type: "article",
    size: "",
    date: "Apr 21 2026",
    day: "21",
    month: "Apr",
    sourceUrl:
      "https://www.cnbcafrica.com/2026/ugandas-central-bank-starts-domestic-gold-purchase-programme/",
    sourceName: "CNBC Africa",
  },
  {
    slug: "uganda-gold-exports-outpace-coffee-2025",
    title: "Uganda's gold exports outpace coffee again in 2025, rising 76%",
    summary:
      "Gold exports reached $5.8 billion over the past 12 months, confirming gold as Uganda's leading export ahead of coffee at $2.4 billion.",
    body: [
      "Uganda's gold exports rose 75.8% to $5.8 billion over the past 12 months, driven mainly by higher global prices in 2025.",
      "Over the first 10 months of 2025, Uganda exported 8.4 million 60-kilogram bags of coffee worth $2.4 billion, its highest revenue on record, but gold retained its position as the country's top export earner.",
      "Gold prices climbed more than 60% in 2025, reinforcing Uganda's role as a regional hub for processing and re-exporting gold mined in neighbouring countries.",
      "Adam Mugume, executive director for research at the Bank of Uganda, noted that attractive gold prices have incentivised new entrants into the business, generating significant export volumes.",
      "Source: Ecofin Agency.",
    ],
    category: "announcement",
    type: "article",
    size: "",
    date: "Jan 21 2026",
    day: "21",
    month: "Jan",
    sourceUrl:
      "https://www.ecofinagency.com/news-industry/2101-52138-uganda-s-gold-exports-outpace-coffee-again-in-2025-rising-76",
    sourceName: "Ecofin Agency",
  },
  {
    slug: "uganda-gold-exports-6-4-billion-2025",
    title: "Uganda's gold exports jump to $6.4 billion, net trade gain at $200 million",
    summary:
      "Gold exports have surged fivefold since 2019, but after accounting for gold imports the net benefit to Uganda's economy is about $200 million.",
    body: [
      "Uganda's gold exports have surged from $1.26 billion in 2019 to $6.4 billion in 2025, making gold the country's largest export commodity.",
      "Speaking at the Stanbic Economic Forum 2026, Bank of Uganda Deputy Governor Prof. Augustus Nuwagaba said gold now generates approximately $6.4 billion annually, compared with $2.4 billion from coffee.",
      "Despite the headline figures, Uganda imports significant volumes of raw gold, refines it, and re-exports it. After deducting imports, the net trade balance for gold is only about $200 million.",
      "The central bank is preparing a gold purchase programme with a traceability system to track gold from mining areas including Busia, Kasanda, and Karamoja.",
      "Source: Business Insider Africa.",
    ],
    category: "presentation",
    type: "article",
    size: "",
    date: "Feb 13 2026",
    day: "13",
    month: "Feb",
    sourceUrl:
      "https://africa.businessinsider.com/local/markets/ugandas-gold-exports-jump-to-dollar64-billion-in-2025-but-net-trade-gain-stands-at/jd93frc",
    sourceName: "Business Insider Africa",
  },
  {
    slug: "wagagai-refinery-pilot-gold-scheme",
    title: "Wagagai refinery anchors Uganda's pilot domestic gold buying scheme",
    summary:
      "Government is piloting a Domestic Gold Purchase Programme as the $200 million Wagagai mining and refining project begins formal operations in Busia.",
    body: [
      "Uganda's energy minister Ruth Nankabirwa said government is piloting its Domestic Gold Purchase Programme to tap into the country's mineral resources, speaking at the commissioning of the Wagagai Gold Mining Project in Busia District.",
      "President Museveni described the over $200 million investment as a transformative milestone that will end wasteful export of raw minerals and usher Uganda into a new era of value addition.",
      "The refinery covers 9.224 square kilometres with reserves supporting 20 years of continuous production. At full capacity, the mine will produce about 1.2 tonnes of refined gold per year at 99.99% purity.",
      "Bank of Uganda has established a policy framework to guide gold purchases, with a procurement process underway to identify qualified suppliers for the pilot programme.",
      "Source: Daily Monitor.",
    ],
    category: "announcement",
    type: "article",
    size: "",
    date: "Aug 16 2025",
    day: "16",
    month: "Aug",
    sourceUrl:
      "https://www.monitor.co.ug/uganda/news/national/china-backed-wagagai-refinery-anchors-uganda-s-pilot-gold-buying-scheme-5158270",
    sourceName: "Daily Monitor",
  },
  {
    slug: "uganda-gold-traceability-licensing-rules",
    title: "Uganda tightens gold trading rules amid traceability push",
    summary:
      "Authorities now restrict gold trading to licensed entities and require export permits for imported gold, as Kampala strengthens oversight of regional flows.",
    body: [
      "In response to allegations of illicit trade involving gold mined in neighbouring countries, Ugandan authorities have introduced new measures to tighten oversight of the sector.",
      "Gold trading is now restricted to entities holding a trading licence, a mining permit, or a refining licence. For imported gold, Kampala requires export permits issued by authorities in the country of origin.",
      "The measures come as Uganda's first industrial gold mine, a $250 million Chinese-backed project with an integrated refinery, adds to the country's processing capacity.",
      "Sector analysts note that the effectiveness of these traceability measures will be closely watched as Uganda consolidates its position as a regional refining hub.",
      "Source: New Vision.",
    ],
    category: "presentation",
    type: "article",
    size: "",
    date: "Jan 21 2026",
    day: "21",
    month: "Jan",
    sourceUrl:
      "https://www.newvision.co.ug/category/business/gold-buyers-to-undergo-biometric-registration-NV_233820_06202026",
    sourceName: "New Vision",
  },
];