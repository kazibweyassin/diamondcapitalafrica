import SupplierApplyForm from "@/components/SupplierApplyForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Apply as Verified Supplier",
  description:
    "Apply free to join the Diamond Capital Africa Institutional Gold Network as a verified gold supplier.",
  path: "/network/apply",
});

export default function SupplierApplyPage() {
  return (
    <>
      <section className="bg-primary py-12 text-white md:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Free to apply
          </p>
          <h1 className="mt-2 text-3xl font-bold">Verified supplier application</h1>
          <p className="mt-3 text-white/80">
            Join the Institutional Gold Network. DCA verifies your license and
            product before supply is published on the Verified Gold Exchange.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <SupplierApplyForm />
      </div>
    </>
  );
}