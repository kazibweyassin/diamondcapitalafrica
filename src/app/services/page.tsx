import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/content";
import { images } from "@/data/images";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative h-64 bg-primary md:h-80">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Our Services
          </h1>
          <p className="mt-2 max-w-xl text-white/80">
            End-to-end gold solutions from buying and refining to assay testing
            and international export.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`grid items-center gap-12 py-12 ${
              index > 0 ? "border-t border-border" : ""
            } ${index % 2 === 1 ? "lg:grid-cols-2" : "lg:grid-cols-2"}`}
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                {service.title}
              </h2>
              <p className="mb-6 leading-relaxed text-muted">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle size={18} className="shrink-0 text-gold" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`relative h-64 overflow-hidden rounded-lg shadow-lg lg:h-80 ${
                index % 2 === 1 ? "lg:order-1" : ""
              }`}
            >
              <Image
                src={
                  index === 0
                    ? images.services.buying
                    : index === 1
                      ? images.services.refining
                      : index === 2
                        ? images.services.assay
                        : images.services.export
                }
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </section>
        ))}

        <section className="mt-12 rounded-lg bg-section-alt p-8 text-center md:p-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Ready to work with us?
          </h2>
          <p className="mb-6 text-muted">
            Get a live gold price quote or schedule a refinery visit today.
          </p>
          <Link
            href="/contact?subject=Gold%20Buying%20Enquiry"
            className="inline-flex items-center gap-2 rounded bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light"
          >
            Contact us
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </>
  );
}