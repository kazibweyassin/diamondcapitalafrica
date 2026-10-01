import SupplierApplyForm from "@/components/SupplierApplyForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Offer Gold to DCA",
  description:
    "Offer gold to Diamond Capital Africa. We verify the license and the metal, then purchase. Your name is not shown to buyers.",
  path: "/network/apply",
});

export default function SupplierApplyPage() {
  return (
    <>
      <section className="bg-primary py-12 text-white md:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Sell to Diamond Capital Africa
          </p>
          <h1 className="mt-2 text-3xl font-bold">Offer gold to DCA</h1>
          <p className="mt-3 text-white/80">
            We verify your license and the metal, then make a purchase offer.
            Buyers are not shown your company name, site, or contacts. For
            same-day settlement, use a Kampala or Arua collection centre.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <SupplierApplyForm />
      </div>
    </>
  );
}