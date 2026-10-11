import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Boxes,
  Factory,
  Leaf,
  MapPinned,
  Network,
  Zap,
} from "lucide-react";
import InvestmentEnquiryForm from "@/components/InvestmentEnquiryForm";
import SectorEnquiryLink from "@/components/SectorEnquiryLink";
import { company } from "@/data/content";

const pageTitle = "Explore Business Opportunities in Uganda | Diamond Capital Africa";
const pageDescription =
  "Explore commercial opportunities in Uganda across agriculture, manufacturing, food processing, energy and regional distribution. Start a practical conversation about market entry.";
const canonicalUrl = "https://invest.diamondcapitalafrica.com/";
const heroImage =
  "https://images.unsplash.com/photo-1763220207281-c4d0febb61a8?auto=format&fit=crop&w=2400&q=85";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: pageTitle,
    description: pageDescription,
    siteName: company.name,
    images: [{ url: heroImage, width: 2400, height: 1600, alt: "Kampala, Uganda at sunset" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [heroImage],
  },
  robots: { index: true, follow: true },
};

const sectors = [
  {
    number: "01",
    title: "Agriculture & agro-processing",
    text: "Explore sourcing, production and processing opportunities across Uganda’s agricultural value chains.",
    icon: Leaf,
  },
  {
    number: "02",
    title: "Manufacturing & industrial equipment",
    text: "Assess local production possibilities and demand for machinery, inputs and technical capability.",
    icon: Factory,
  },
  {
    number: "03",
    title: "Food processing & value addition",
    text: "Consider processing, packaging, cold-chain and quality systems that can serve local and regional buyers.",
    icon: Boxes,
  },
  {
    number: "04",
    title: "Energy & infrastructure",
    text: "Explore the technologies, services and partnerships that support productive businesses and infrastructure.",
    icon: Zap,
  },
  {
    number: "05",
    title: "Logistics & distribution",
    text: "Understand routes to market, distribution models and supply-chain partnerships in Uganda and the region.",
    icon: Network,
  },
];

const marketReasons = [
  {
    title: "Regional trade context",
    text: "Uganda participates in the East African Community. Market access, tariffs, rules of origin, licensing and eligibility depend on the product, sector and applicable agreements.",
  },
  {
    title: "Agricultural value chains",
    text: "A broad agricultural base creates areas to investigate in production, storage, processing, packaging and market linkage.",
  },
  {
    title: "Demand for productive capacity",
    text: "Companies can assess potential demand for manufacturing, food processing, logistics, energy, equipment and specialised business services.",
  },
];

const opportunities = [
  "Establishing local operations or a representative presence",
  "Finding distributors and commercial partners",
  "Evaluating sourcing and processing opportunities",
  "Exploring existing investment projects after verification",
  "Assessing supplier, equipment and technology partnerships",
];

const steps = [
  "Understand your company’s objectives and decision timeline.",
  "Identify relevant sectors and questions to investigate.",
  "Research potential local partners and operating requirements.",
  "Arrange appropriate introductions and agree practical next steps.",
];

const investorJourney = [
  {
    title: "Define the project",
    text: "Clarify your sector, proposed activity, location, operating model, financing and decision timeline.",
  },
  {
    title: "Confirm the right route",
    text: "Check investment-licence requirements and sector-specific rules directly with UIA and the relevant regulators.",
  },
  {
    title: "Establish the business",
    text: "Confirm the appropriate company-registration, tax and ownership steps for your proposed structure with official agencies and qualified advisers.",
  },
  {
    title: "Plan approvals and delivery",
    text: "Identify any applicable environmental, land, work-permit, standards, utility or local approvals before committing to a project timeline.",
  },
];

const investorBasics = [
  {
    title: "Licensing & investor facilitation",
    description: "Uganda Investment Authority (UIA) handles investment licensing and coordinates investor support. Licence requirements and any sector approvals depend on the proposed activity.",
    note: "Confirm eligibility, documents, fees and timelines with the responsible authority before relying on them.",
  },
  {
    title: "Business set-up & approvals",
    description: "A project may involve company registration, tax registration and activity-specific permissions. Land, environmental, work-permit, product-standard or local approvals may also apply.",
    note: "The relevant agencies and order of steps vary by project, location and ownership structure.",
  },
  {
    title: "Opportunity & partner diligence",
    description: "Treat project teasers and introductions as starting points for investigation—not as verified or guaranteed investments.",
    note: "Check ownership, authority to transact, permits, financial assumptions, counterparties and project status independently.",
  },
];

const projectBriefItems = [
  "Your business activity and target sector",
  "Preferred location and operating model",
  "Indicative capital range and decision timeline",
  "The local partners, approvals or research you need to assess",
];

const anchorClass =
  "rounded-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#74b8df] focus-visible:ring-offset-4";

export default function UgandaInvestmentPage() {
  return (
    <div className="investment-landing bg-white text-[#18372e]">
      <header className="relative z-20 border-b border-white/15 bg-[#17382e] text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-14">
          <Link href="#top" aria-label="Diamond Capital Africa — home" className={`flex items-center gap-3 ${anchorClass}`}>
            <Image src="/Logo.png" alt="" width={44} height={44} className="size-11 rounded-sm object-contain" />
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm text-white/80 lg:flex">
            <a className={anchorClass} href="#why-uganda">Why Uganda</a>
            <a className={anchorClass} href="#sectors">Sectors</a>
            <a className={anchorClass} href="#market-entry">Market entry</a>
            <a className={anchorClass} href="#investor-guide">Investor guide</a>
            <a className={anchorClass} href="#about">About</a>
          </nav>
          <a href="#enquiry" className="hidden shrink-0 rounded-sm border border-[#74b8df] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#74b8df] hover:text-[#102c3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:inline-flex">
            Discuss Uganda <ArrowRight className="ml-2" size={16} />
          </a>
          <details className="relative lg:hidden">
            <summary className="cursor-pointer list-none rounded-sm border border-white/30 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74b8df]">Menu</summary>
            <nav aria-label="Mobile navigation" className="absolute right-0 top-12 z-30 flex w-56 flex-col gap-1 rounded-sm border border-[#dce3dc] bg-white p-3 text-sm text-[#18372e] shadow-xl">
              <a className="rounded px-3 py-2 hover:bg-[#eef3f7]" href="#why-uganda">Why Uganda</a>
              <a className="rounded px-3 py-2 hover:bg-[#eef3f7]" href="#sectors">Sectors</a>
              <a className="rounded px-3 py-2 hover:bg-[#eef3f7]" href="#market-entry">Market entry</a>
              <a className="rounded px-3 py-2 hover:bg-[#eef3f7]" href="#investor-guide">Investor guide</a>
              <a className="rounded px-3 py-2 hover:bg-[#eef3f7]" href="#about">About</a>
              <a className="mt-1 rounded bg-[#17382e] px-3 py-2 font-semibold text-white" href="#enquiry">Discuss Uganda</a>
            </nav>
          </details>
        </div>
      </header>

      <main id="top">
        <section className="relative isolate min-h-[680px] overflow-hidden bg-[#1b302a] text-white lg:min-h-[760px]">
          <Image src={heroImage} alt="Kampala, Uganda seen at sunset from Nsambya" fill priority unoptimized sizes="100vw" className="-z-20 object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102c25]/95 via-[#102c25]/75 to-[#102c25]/25" />
          <div className="mx-auto flex min-h-[680px] max-w-[1440px] flex-col justify-center px-5 pb-24 pt-24 sm:px-8 lg:min-h-[760px] lg:px-14 lg:pb-32">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#a6d7f1]"><span className="h-px w-9 bg-[#74b8df]" /> Uganda · East Africa</p>
            <h1 className="max-w-4xl text-4xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[4.5rem]">
              Uganda: Your Gateway to East Africa&apos;s Next Business Opportunities
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Explore commercial opportunities in Uganda across agriculture, manufacturing, food processing, energy and regional distribution. Understand the market, assess potential partners and identify practical next steps for entering Uganda.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#sectors" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[#74b8df] px-6 py-3 text-sm font-semibold text-[#102c3d] transition hover:bg-[#a6d7f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Explore opportunities <ArrowDown size={16} />
              </a>
              <a href="#enquiry" className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/65 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74b8df]">
                Discuss your Uganda plans
              </a>
            </div>
            <p className="mt-6 text-[11px] text-white/55">Kampala city at sunset · Photo by Robin Kutesa / Unsplash</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-[#102c25]/55 backdrop-blur-sm">
            <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-3 px-5 py-5 text-xs text-white/75 sm:grid-cols-3 sm:px-8 lg:px-14">
              <span className="flex items-center gap-2"><MapPinned size={15} className="text-[#9bc9e2]" /> Kampala-based market-entry contact</span>
              <span className="hidden border-l border-white/20 pl-6 sm:block">Independent business facilitation</span>
              <span className="hidden border-l border-white/20 pl-6 sm:block">Practical, sector-focused exploration</span>
            </div>
          </div>
        </section>

        <section id="why-uganda" className="scroll-mt-8 px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">A market to explore</p>
              <h2 className="mt-4 max-w-lg text-3xl font-medium leading-tight tracking-[-0.025em] text-[#18372e] sm:text-4xl">Why put Uganda on your shortlist?</h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#5b6c63] sm:text-base">
                Uganda offers a range of commercial questions for companies considering production, sourcing, distribution or regional partnerships. The right opportunity depends on your sector, model and diligence.
              </p>
            </div>
            <div className="divide-y divide-[#dce2da] border-y border-[#dce2da]">
              {marketReasons.map((item, index) => (
                <article key={item.title} className="grid gap-3 py-6 sm:grid-cols-[48px_1fr] sm:gap-5">
                  <span className="font-serif text-sm text-[#397ba0]">0{index + 1}</span>
                  <div><h3 className="text-lg font-semibold text-[#18372e]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#5b6c63]">{item.text}</p></div>
                </article>
              ))}
              <p className="pb-5 pl-0 text-xs leading-5 text-[#758178] sm:pl-[68px]">Any market access, tariff, licensing or investment eligibility should be confirmed for the relevant product and activity with qualified local advisers.</p>
            </div>
          </div>
        </section>

        <section id="sectors" className="scroll-mt-8 bg-[#eef3f7] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">Sectors to investigate</p><h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.025em] text-[#18372e] sm:text-4xl">Commercial potential across connected industries</h2></div>
              <p className="max-w-md text-sm leading-6 text-[#5b6c63]">Start with a clear business question. We can help you identify what to research and who may be relevant to speak with.</p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sectors.map((sector) => {
                const Icon = sector.icon;
                return <article key={sector.number} className="group flex min-h-[265px] flex-col border border-[#d5e0e8] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-[#74b8df] hover:shadow-[0_18px_40px_-30px_rgba(24,55,46,0.45)] sm:p-7">
                  <div className="flex items-start justify-between"><Icon size={23} strokeWidth={1.5} className="text-[#397ba0]" /><span className="text-xs text-[#a2aaa1]">{sector.number}</span></div>
                  <h3 className="mt-9 text-xl font-semibold tracking-tight text-[#18372e]">{sector.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#5b6c63]">{sector.text}</p>
                  <SectorEnquiryLink sector={sector.title} />
                </article>;
              })}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">Opportunity pathways</p>
              <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-[-0.025em] text-[#18372e] sm:text-4xl">Build a view before making a move</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#5b6c63] sm:text-base">The first step is often a focused conversation about the market, your operating model and the evidence you need to make a decision.</p>
              <a href="#enquiry" className="mt-7 inline-flex items-center gap-2 border-b border-[#74b8df] pb-2 text-sm font-semibold text-[#18372e] hover:text-[#397ba0]">Share what you are exploring <ArrowRight size={15} /></a>
            </div>
            <ul className="space-y-0 border-y border-[#dce2da]">
              {opportunities.map((opportunity, index) => <li key={opportunity} className="grid grid-cols-[40px_1fr] gap-4 border-b border-[#dce2da] py-5 last:border-b-0"><span className="font-serif text-sm text-[#397ba0]">0{index + 1}</span><span className="text-sm leading-6 text-[#40584d]">{opportunity}</span></li>)}
            </ul>
          </div>
        </section>

        <section id="market-entry" className="scroll-mt-8 bg-[#18372e] px-5 py-20 text-white sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a6d7f1]">A considered approach</p><h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">How we help you explore Uganda</h2><p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">Diamond Capital Africa is an independent business facilitation and market-entry contact. We help frame the exploration and coordinate appropriate next steps.</p></div>
            <ol className="mt-12 grid gap-0 border-y border-white/20 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => <li key={step} className="border-b border-white/20 py-6 md:px-6 md:odd:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"><span className="font-serif text-sm text-[#a6d7f1]">STEP 0{index + 1}</span><p className="mt-4 max-w-xs text-base leading-7 text-white/90">{step}</p></li>)}
            </ol>
            <p className="mt-6 max-w-3xl text-xs leading-5 text-white/55">Any introductions are subject to relevance, availability and appropriate due diligence. We are not a government agency, legal adviser, tax adviser or investment adviser, and do not guarantee access, approvals or commercial outcomes.</p>
          </div>
        </section>

        <section id="investor-guide" className="scroll-mt-8 bg-[#eef3f7] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">Investor guide</p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.025em] text-[#18372e] sm:text-4xl">A practical route from idea to operation</h2>
              <p className="mt-5 text-sm leading-7 text-[#5b6c63] sm:text-base">Use this as an early planning checklist. The correct process depends on your activity, ownership, sector and location; confirm current requirements with Uganda’s official agencies and qualified local advisers.</p>
            </div>

            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {investorJourney.map((step, index) => (
                <li key={step.title} className="border border-[#d5e0e8] bg-white p-6 sm:p-7">
                  <span className="text-xs font-semibold tracking-[0.16em] text-[#397ba0]">STEP 0{index + 1}</span>
                  <h3 className="mt-5 text-lg font-semibold text-[#18372e]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5b6c63]">{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-14">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">Investor essentials</p>
                  <h3 className="mt-3 text-2xl font-medium tracking-tight text-[#18372e]">The key things to understand before you commit</h3>
                </div>
                <p className="max-w-lg text-xs leading-5 text-[#758178]">This is a plain-language overview, not an official checklist. Confirm current requirements with the relevant Ugandan authorities and qualified advisers.</p>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {investorBasics.map((item) => (
                  <article key={item.title} className="border border-[#d5e0e8] bg-white p-6 sm:p-7">
                    <h4 className="text-base font-semibold text-[#18372e]">{item.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-[#5b6c63]">{item.description}</p>
                    <p className="mt-4 border-t border-[#e2e9ee] pt-4 text-xs leading-5 text-[#758178]">{item.note}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-8 border-l-2 border-[#74b8df] pl-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-sm font-semibold text-[#18372e]">Arrive with a focused project brief</p>
                <ul className="mt-3 grid gap-2 text-xs leading-5 text-[#5b6c63] sm:grid-cols-2">
                  {projectBriefItems.map((item) => <li key={item}>• {item}</li>)}
                </ul>
                <p className="mt-4 text-[11px] leading-5 text-[#758178]">Overview informed by public information from the Uganda Investment Authority (UIA), including its investment-licensing, One-Stop Centre and investor-resource materials. Checked 11 October 2026; confirm changes with the relevant authority.</p>
              </div>
              <a href="#enquiry" className="inline-flex min-h-11 items-center justify-center gap-2 justify-self-start rounded-sm bg-[#244c3a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#17382e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74b8df] md:justify-self-end">Discuss your project with DCA <ArrowRight size={16} aria-hidden="true" /></a>
            </div>
            <p className="mt-8 text-xs leading-5 text-[#5b6c63]">Diamond Capital Africa is an independent business facilitation contact, not a government agency. We do not issue licences, approve incentives or guarantee project access or outcomes.</p>
          </div>
        </section>

        <section id="about" className="scroll-mt-8 px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 border-b border-[#dce2da] pb-12 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">About Diamond Capital Africa</p><h2 className="mt-4 text-2xl font-medium leading-tight tracking-[-0.02em] text-[#18372e] sm:text-3xl">A Kampala-based contact for practical business exploration</h2></div>
            <p className="max-w-xl text-sm leading-7 text-[#5b6c63]">Diamond Capital Africa is an independent business facilitation and market-entry contact based in Kampala. We help international businesses structure an initial conversation about market opportunities, potential partners and next steps in Uganda.</p>
          </div>
        </section>

        <section id="enquiry" className="scroll-mt-8 bg-[#eef3f7] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">Start a conversation</p>
              <h2 className="mt-4 max-w-lg text-3xl font-medium leading-tight tracking-[-0.025em] text-[#18372e] sm:text-4xl">Considering Uganda for your next business move?</h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#5b6c63] sm:text-base">Tell us what your company is exploring. We will review your enquiry and discuss relevant next steps.</p>
              <div className="mt-9 border-l-2 border-[#74b8df] pl-5 text-sm leading-6 text-[#5b6c63]"><p className="font-semibold text-[#18372e]">Diamond Capital Africa</p><a className="mt-2 inline-block underline decoration-[#74b8df] underline-offset-4 hover:text-[#18372e]" href={`mailto:${company.email}`}>{company.email}</a><p className="mt-1">Kampala, Uganda</p></div>
            </div>
            <InvestmentEnquiryForm />
          </div>
        </section>
      </main>

      <footer className="bg-[#102c25] px-5 py-10 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-7 border-b border-white/15 pb-8 md:flex-row md:items-center md:justify-between">
            <div><p className="text-sm font-semibold tracking-[0.12em]">DIAMOND CAPITAL AFRICA</p><p className="mt-2 text-xs text-white/60">Uganda investment and market-entry information</p></div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/70"><a className="underline-offset-4 hover:text-white hover:underline" href="https://www.diamondcapitalafrica.com/legal/privacy">Privacy policy</a><a className="underline-offset-4 hover:text-white hover:underline" href={`mailto:${company.email}`}>Contact</a><a className="underline-offset-4 hover:text-white hover:underline" href="https://www.diamondcapitalafrica.com/">Main website</a></div>
          </div>
          <p className="pt-6 text-[11px] leading-5 text-white/50">Information is general and for preliminary business exploration only. It is not legal, tax or investment advice. Market conditions and applicable requirements should be independently verified.</p>
          <p className="mt-4 text-[11px] text-white/40">© {new Date().getFullYear()} Diamond Capital Africa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
