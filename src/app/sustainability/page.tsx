import Image from "next/image";
import { company, esgCards } from "@/data/content";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Responsible Gold Sourcing Uganda",
  description:
    "ESG and responsible gold sourcing in Uganda and East Africa: traceability, environmental care, and community investment at Diamond Capital Africa.",
  path: "/sustainability",
  image: images.pageHero.sustainability,
});

export default function SustainabilityPage() {
  return (
    <>
      <section className="relative h-72 bg-primary md:h-96">
        <Image
          src={images.pageHero.sustainability}
          alt="Sustainable forestry and environmental stewardship"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Sustainability
          </h1>
          <p className="mt-2 max-w-xl text-white/80">
            Responsible sourcing, environmental care, and community empowerment
            at the heart of everything we do.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <p className="mb-12 max-w-3xl text-lg leading-relaxed text-muted">
          Sustainability is not a separate initiative at {company.name}; it
          is embedded in our business model. From the moment gold enters our
          supply chain to the moment it reaches international buyers, we ensure
          full traceability, fair compensation, and minimal environmental impact.
        </p>

        {esgCards.map((card, index) => (
          <section
            key={card.title}
            id={
              index === 0
                ? "sourcing"
                : index === 1
                  ? "environment"
                  : "community"
            }
            className={`mb-16 grid items-center gap-8 lg:grid-cols-2 ${
              index > 0 ? "pt-16 border-t border-border" : ""
            }`}
          >
            <div
              className={`relative h-72 overflow-hidden rounded-lg shadow-lg lg:h-96 ${
                index % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                {card.title}
              </h2>
              <p className="mb-6 leading-relaxed text-muted">
                {card.description}
              </p>
              {index === 0 && (
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Zero tolerance for conflict or illicit gold</li>
                  <li>• Blockchain-enabled chain-of-custody tracking</li>
                  <li>• OECD Due Diligence Guidance compliance</li>
                  <li>• Regular third-party supply chain audits</li>
                </ul>
              )}
              {index === 1 && (
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Closed-loop water systems in proposed plant design</li>
                  <li>• Energy-efficient equipment targets (preliminary)</li>
                  <li>• Responsible chemical handling procedures</li>
                  <li>• Environmental review as part of project due diligence</li>
                </ul>
              )}
              {index === 2 && (
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Safety awareness at collection centres</li>
                  <li>• Transparent pricing for mining partners</li>
                  <li>• Community engagement in operating regions</li>
                  <li>• Skills development where programmes are active</li>
                </ul>
              )}
            </div>
          </section>
        ))}

        <section className="rounded-lg bg-section-alt p-8 md:p-12">
          <h2 className="mb-6 text-2xl font-bold text-primary">
            2025 Sustainability Highlights
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "OECD", label: "Due diligence alignment goal" },
              { value: "2", label: "Collection centres (Kampala & Arua)" },
              { value: "Planned", label: "Modern closed-loop processing design" },
              { value: "Zero", label: "Tolerance for conflict gold" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-gold-dark">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}