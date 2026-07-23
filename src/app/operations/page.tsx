import Image from "next/image";
import { operations } from "@/data/content";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import OperationsSections from "@/components/OperationsSections";
import NationalCoverage from "@/components/NationalCoverage";

export const metadata = pageMetadata({
  title: "Operations | Processing Platform & Collection Centres",
  description:
    "Diamond Capital Africa operations: collection centres in Kampala and Arua, proposed gold refinery and assay laboratory under development, and responsible supply-chain coordination.",
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
            From collection centres to a proposed modern processing platform and
            international export coordination.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
        <OperationsSections operations={operations} />
        <NationalCoverage />
      </div>
    </>
  );
}