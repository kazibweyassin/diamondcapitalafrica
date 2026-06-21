import Image from "next/image";
import { operations } from "@/data/content";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { MapPin, Gauge } from "lucide-react";

export const metadata = pageMetadata({
  title: "Operations",
  description:
    "Kampala refinery, nationwide collection centres, and fully traceable mine-to-market supply chain operations.",
  path: "/operations",
  image: images.pageHero.operations,
});

export default function OperationsPage() {
  return (
    <>
      <section className="relative h-72 bg-primary md:h-96">
        <Image
          src={images.pageHero.operations}
          alt="Refined gold bars from Diamond Capital Africa operations"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Our Operations
          </h1>
          <p className="mt-2 max-w-xl text-white/80">
            From mine-site collection to Kampala refining and global export.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {operations.map((op, index) => (
          <section
            key={op.id}
            id={op.id}
            className={`mb-16 grid items-center gap-8 lg:grid-cols-2 ${
              index > 0 ? "pt-16 border-t border-border" : ""
            }`}
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <h2 className="mb-2 text-2xl font-bold text-primary">
                {op.title}
              </h2>
              <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted">
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-gold" />
                  {op.location}
                </span>
                <span className="flex items-center gap-1">
                  <Gauge size={14} className="text-gold" />
                  {op.capacity}
                </span>
              </div>
              <p className="leading-relaxed text-muted">{op.description}</p>
            </div>
            <div
              className={`relative h-64 overflow-hidden rounded-lg shadow-lg lg:h-72 ${
                index % 2 === 1 ? "lg:order-1" : ""
              }`}
            >
              <Image
                src={op.image}
                alt={op.imageAlt ?? op.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </section>
        ))}

        <section className="rounded-lg bg-primary p-8 text-white md:p-12">
          <h2 className="mb-4 text-2xl font-bold">National Coverage</h2>
          <p className="mb-8 max-w-2xl text-white/80">
            Our eight collection centres ensure miners across Uganda have access
            to fair, transparent gold buying, reducing informal trade and
            strengthening the formal economy.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              "Kampala",
              "Mbarara",
              "Fort Portal",
              "Jinja",
              "Gulu",
              "Mbale",
              "Arua",
              "Moroto",
            ].map((city) => (
              <div
                key={city}
                className="rounded border border-white/20 px-4 py-3 text-center text-sm font-medium"
              >
                {city}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}