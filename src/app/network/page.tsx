import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Users, Workflow } from "lucide-react";
import { company } from "@/data/content";
import { images } from "@/data/images";
import { institutionalMembership, networkPillars } from "@/data/network";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Institutional Gold Network",
  description:
    "Sign up or sign in as a buyer or a supplier. Diamond Capital Africa buys verified gold and sells it to institutional buyers. Supplier identities are not published.",
  path: "/network",
  image: images.pageHero.operations,
  keywords: [
    "sell gold Uganda",
    "buy gold from Uganda dealer",
    "licensed gold dealer Kampala",
    "institutional gold buyer",
    "supplier sign in",
    "buyer sign in",
  ],
});

const pillarIcons = [ShieldCheck, Users, Workflow];

const actionButton =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded px-5 py-2.5 text-center text-sm font-semibold transition";

export default function NetworkPage() {
  return (
    <>
      <section className="relative bg-primary">
        <Image
          src={images.pageHero.operations}
          alt="Diamond Capital Africa Institutional Gold Network"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/92 to-primary/70" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gold sm:text-sm sm:tracking-wider">
            Licensed dealer
          </p>
          <h1 className="max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
            We buy the gold. We sell the gold.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            {company.name} verifies metal, purchases it, and sells it to
            institutional buyers. This is not an exchange. Buyers are not
            introduced to suppliers.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-lg bg-white p-5 text-primary shadow-lg md:p-6">
              <h2 className="text-xl font-bold">Buyers</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {institutionalMembership.summary} Sign up to request access.
                Sign in after DCA emails your password.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/network/access"
                  className={`${actionButton} bg-gold text-primary hover:bg-gold-light`}
                >
                  Sign up
                </Link>
                <Link
                  href="/network/login"
                  className={`${actionButton} border border-primary/25 text-primary hover:border-gold hover:text-gold-dark`}
                >
                  Sign in
                </Link>
              </div>
            </article>

            <article className="rounded-lg bg-white p-5 text-primary shadow-lg md:p-6">
              <h2 className="text-xl font-bold">Suppliers</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Sign up to offer gold to DCA. We verify your license and the
                metal, then email a password. Your company is not shown to
                buyers.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/network/apply"
                  className={`${actionButton} bg-gold text-primary hover:bg-gold-light`}
                >
                  Sign up
                </Link>
                <Link
                  href="/network/supplier/login"
                  className={`${actionButton} border border-primary/25 text-primary hover:border-gold hover:text-gold-dark`}
                >
                  Sign in
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
        <section>
          <h2 className="mb-5 text-xl font-bold text-primary md:mb-6 md:text-2xl">
            How it works
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
      </div>
    </>
  );
}
