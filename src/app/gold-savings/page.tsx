import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Gem } from "lucide-react";
import GoldSavingsDepositWizard from "@/components/GoldSavingsDepositWizard";
import JsonLd from "@/components/JsonLd";
import { company } from "@/data/content";
import {
  goldSavings,
  goldSavingsBenefits,
  goldSavingsDisclaimers,
  goldSavingsFaqs,
  goldSavingsSteps,
} from "@/data/gold-savings";
import { images } from "@/data/images";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gold Savings | Save in Physical Gold from $20",
  description:
    "Save in assay-verified 99.99% physical gold from $20 with Diamond Capital Africa. Pay via USDT, submit proof, and accumulate real bullion — not mining shares.",
  path: "/gold-savings",
  image: images.about.goldNuggets,
});

export default function GoldSavingsPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(goldSavingsFaqs)} />
      <section className="relative h-72 bg-primary md:h-96">
        <Image
          src={images.about.goldNuggets}
          alt="Gold savings — physical bullion"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
            Physical gold · Pay with USDT
          </p>
          <h1 className="max-w-3xl text-3xl font-bold text-white md:text-4xl">
            Save in gold from ${goldSavings.minDepositUsd}
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Enter your amount, get USDT payment instructions, and accumulate
            99.99% fine gold through {company.name}&apos;s licensed refinery.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-primary">
              Why gold savings — not mining shares
            </h2>
            <p className="mb-6 leading-relaxed text-muted">
              {company.name} is a licensed gold dealer and refinery. Our savings
              programme lets you accumulate <strong>physical gold</strong> at
              transparent spot prices — backed by assay verification and vault
              operations we already run every day. This is bullion accumulation,
              not equity in a mining project.
            </p>
            <ul className="space-y-3">
              {goldSavingsBenefits.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted"
                >
                  <CheckCircle
                    size={16}
                    className="mt-0.5 shrink-0 text-gold"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about-gold"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark transition hover:text-gold"
            >
              Why gold holds value
              <ArrowRight size={16} />
            </Link>
          </div>
          <GoldSavingsDepositWizard />
        </div>

        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-primary">How it works</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {goldSavingsSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-lg border border-border bg-section-alt p-6"
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-gold">
                  {item.step}
                </div>
                <h3 className="mb-2 font-semibold text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="rounded-lg bg-primary p-6 text-white md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Gem className="text-gold" size={28} />
              <h2 className="text-xl font-bold">Redemption</h2>
            </div>
            <p className="mb-4 max-w-2xl text-sm leading-relaxed text-white/80">
              When your balance reaches{" "}
              <strong className="text-white">
                {goldSavings.minRedemptionGrams} grams
              </strong>{" "}
              or more, arrange collection at our Kampala head office or Arua
              collection centre. Bring valid ID. Alternatively, sell back to us at
              our published buy-back rate.
            </p>
            <Link
              href="/operations#centres"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition hover:text-gold-light"
            >
              View collection centres
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-primary">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {goldSavingsFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-border bg-white px-6 py-4"
              >
                <summary className="cursor-pointer list-none font-semibold text-primary marker:hidden [&::-webkit-details-marker]:hidden">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-lg border border-dashed border-border bg-section-alt p-6 md:p-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
            Important information
          </h2>
          <ul className="space-y-2">
            {goldSavingsDisclaimers.map((item) => (
              <li key={item} className="text-xs leading-relaxed text-muted">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}