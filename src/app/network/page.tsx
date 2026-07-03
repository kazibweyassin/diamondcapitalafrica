import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, Workflow } from "lucide-react";
import { company } from "@/data/content";
import { images } from "@/data/images";
import { networkPillars, networkSteps, verificationLevels } from "@/data/network";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Institutional Gold Network",
  description:
    "Diamond Capital Africa Institutional Gold Network and Verified Gold Exchange — verified supply, institutional buyer access, and DCA-facilitated transaction coordination.",
  path: "/network",
  image: images.pageHero.operations,
  keywords: [
    "institutional gold network",
    "verified gold exchange",
    "gold supplier Uganda",
    "institutional gold buyer",
  ],
});

const pillarIcons = [ShieldCheck, Users, Workflow];

export default function NetworkPage() {
  return (
    <>
      <section className="relative bg-primary">
        <div className="relative min-h-[26rem] md:min-h-96">
          <Image
            src={images.pageHero.operations}
            alt="Diamond Capital Africa Institutional Gold Network"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
          <div className="relative mx-auto flex min-h-[26rem] max-w-7xl flex-col justify-center px-4 py-10 md:min-h-96 lg:px-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gold sm:text-sm sm:tracking-wider">
              <span className="sm:hidden">Verified Gold Exchange</span>
              <span className="hidden sm:inline">
                Verified Institutional Gold Transaction Network
              </span>
            </p>
            <h1 className="max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              Institutional Gold Network
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
              {company.name} verifies supply, grants institutional access, and
              coordinates quotes through our Verified Gold Exchange — not an open
              marketplace.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/network/access"
                className="inline-flex min-h-11 items-center justify-center rounded bg-gold px-5 py-2.5 text-center text-sm font-semibold text-primary transition hover:bg-gold-light sm:w-auto"
              >
                Request institutional access
              </Link>
              <Link
                href="/network/apply"
                className="inline-flex min-h-11 items-center justify-center rounded border border-white/40 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                Apply as verified supplier
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-16">
        <section className="mb-10 md:mb-16">
          <h2 className="mb-5 text-xl font-bold text-primary md:mb-8 md:text-2xl">
            How the Network works
          </h2>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {networkPillars.map((pillar, i) => {
              const Icon = pillarIcons[i] ?? ShieldCheck;
              return (
                <div
                  key={pillar.title}
                  className="rounded-lg border border-border bg-white p-4 shadow-sm md:p-6"
                >
                  <Icon className="mb-3 text-gold" size={28} />
                  <h3 className="mb-2 font-bold text-primary">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-10 rounded-lg bg-section-alt p-5 md:mb-16 md:p-10">
          <h2 className="mb-3 text-xl font-bold text-primary md:mb-6 md:text-2xl">
            Verification levels
          </h2>
          <p className="mb-4 max-w-3xl text-sm leading-relaxed text-muted md:mb-6">
            Only Level 3 and above appears in the institutional buyer portal.
            DCA assigns levels after KYC, license checks, and product inspection.
          </p>
          <ul className="space-y-2 md:space-y-3">
            {verificationLevels.map((item) => (
              <li
                key={item.level}
                className="flex items-center gap-2.5 rounded border border-border bg-white px-3 py-2 text-sm md:gap-3 md:px-4 md:py-3"
              >
                <span className="font-mono text-xs font-bold text-gold-dark">
                  L{item.level}
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 md:mb-16">
          <h2 className="mb-4 text-xl font-bold text-primary md:mb-6 md:text-2xl">
            Process
          </h2>

          {/* Mobile: compact vertical timeline */}
          <ol className="md:hidden">
            {networkSteps.map((step, index) => (
              <li key={step.step} className="relative flex gap-3 pb-3 last:pb-0">
                {index < networkSteps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-4 top-8 w-px bg-border"
                  />
                )}
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-primary">
                  {step.step}
                </span>
                <div className="min-w-0 pb-1">
                  <p className="text-sm font-semibold text-primary">{step.label}</p>
                  <p className="text-xs leading-snug text-muted">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Tablet/desktop: step cards */}
          <ol className="hidden gap-3 sm:grid-cols-2 md:grid lg:grid-cols-5 lg:gap-4">
            {networkSteps.map((step) => (
              <li
                key={step.step}
                className="rounded-lg border border-border bg-white p-4 shadow-sm lg:p-5"
              >
                <p className="text-xl font-bold text-gold lg:text-2xl">{step.step}</p>
                <p className="mt-1 text-sm font-semibold text-primary lg:text-base">
                  {step.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-primary p-5 text-white md:p-8">
            <h2 className="text-xl font-bold">For institutional buyers</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Pay for membership to access Level 3+ verified supply, assay
              documentation, and structured quote requests through DCA.
            </p>
            <Link
              href="/network/access"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold transition hover:text-gold-light"
            >
              Request access <ArrowRight size={14} />
            </Link>
          </div>
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-primary">For verified suppliers</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Apply free. DCA verifies your license and product before supply
              appears on the Verified Gold Exchange.
            </p>
            <Link
              href="/network/apply"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
            >
              Apply now <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <p className="mt-12 text-center text-sm text-muted">
          Active members{" "}
          <Link href="/network/login" className="font-semibold text-gold-dark underline">
            sign in to the portal
          </Link>
          .
        </p>
      </div>
    </>
  );
}