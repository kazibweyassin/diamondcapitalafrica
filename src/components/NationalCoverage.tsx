import { collectionCentres } from "@/data/content";

export default function NationalCoverage() {
  return (
    <section className="rounded-lg bg-primary p-6 text-white sm:p-8 md:p-12">
      <h2 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">
        National Coverage
      </h2>
      <p className="mb-6 max-w-2xl text-sm text-white/80 sm:mb-8 sm:text-base">
        Our collection centres in Kampala and Arua ensure miners have access to
        fair, transparent gold buying, reducing informal trade and strengthening
        the formal economy.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:max-w-md sm:gap-4">
        {collectionCentres.map((city) => (
          <div
            key={city}
            className="rounded border border-white/20 px-3 py-2.5 text-center text-sm font-medium sm:px-4 sm:py-3"
          >
            {city}
          </div>
        ))}
      </div>
    </section>
  );
}