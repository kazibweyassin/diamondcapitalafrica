import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { images } from "@/data/images";
import { networkPillars } from "@/data/network";

export default function NetworkPromo() {
  return (
    <section className="bg-primary py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-xl bg-primary-dark shadow-xl lg:grid lg:grid-cols-2">
          <div className="relative min-h-48 sm:min-h-56 lg:min-h-full">
            <Image
              src={images.pageHero.operations}
              alt="Institutional Gold Network"
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-transparent lg:from-primary-dark/80 lg:to-transparent" />
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold sm:text-sm">
              <ShieldCheck size={16} />
              Verified Gold Exchange
            </p>
            <h2 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl md:text-3xl">
              Institutional Gold Network
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-white/80 sm:mb-8 sm:text-base">
              Suppliers apply free. Institutional buyers request access to
              Level 3+ verified supply and structured quotes — coordinated by
              Diamond Capital Africa, not peer-to-peer trading.
            </p>

            <ul className="mb-6 space-y-3 sm:mb-8">
              {networkPillars.map((pillar) => (
                <li
                  key={pillar.title}
                  className="border-l-2 border-gold pl-3 text-sm text-white/85"
                >
                  <span className="font-semibold text-white">
                    {pillar.title}
                  </span>
                  {" — "}
                  {pillar.description}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/network"
                className="inline-flex min-h-11 items-center gap-2 rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light"
              >
                Explore the Network
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/network/access"
                className="inline-flex min-h-11 items-center gap-2 rounded border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Request access
              </Link>
              <Link
                href="/network/apply"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-gold transition hover:text-gold-light"
              >
                Apply as supplier
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}