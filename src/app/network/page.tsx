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
      <section className="relative h-72 bg-primary md:h-96">
        <Image
          src={images.pageHero.operations}
          alt="Diamond Capital Africa Institutional Gold Network"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
            Verified Institutional Gold Transaction Network
          </p>
          <h1 className="max-w-3xl text-3xl font-bold text-white md:text-4xl">
            Institutional Gold Network
          </h1>
          <p className="mt-3 max-w-2xl text-white/85">
            {company.name} verifies supply, grants institutional access, and
            coordinates quotes through our Verified Gold Exchange — not an open
            marketplace.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/network/access"
              className="rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light"
            >
              Request institutional access
            </Link>
            <Link
              href="/network/apply"
              className="rounded border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Apply as verified supplier
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-primary">
            How the Network works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {networkPillars.map((pillar, i) => {
              const Icon = pillarIcons[i] ?? ShieldCheck;
              return (
                <div
                  key={pillar.title}
                  className="rounded-lg border border-border bg-white p-6 shadow-sm"
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

        <section className="mb-16 rounded-lg bg-section-alt p-8 md:p-10">
          <h2 className="mb-6 text-2xl font-bold text-primary">
            Verification levels
          </h2>
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted">
            Only Level 3 and above appears in the institutional buyer portal.
            DCA assigns levels after KYC, license checks, and product inspection.
          </p>
          <ul className="space-y-3">
            {verificationLevels.map((item) => (
              <li
                key={item.level}
                className="flex items-center gap-3 rounded border border-border bg-white px-4 py-3 text-sm"
              >
                <span className="font-mono text-xs font-bold text-gold-dark">
                  L{item.level}
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-primary">Process</h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {networkSteps.map((step) => (
              <li
                key={step.step}
                className="rounded-lg border border-border bg-white p-5 shadow-sm"
              >
                <p className="text-2xl font-bold text-gold">{step.step}</p>
                <p className="mt-1 font-semibold text-primary">{step.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-primary p-8 text-white">
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
          <div className="rounded-lg border border-border bg-white p-8 shadow-sm">
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