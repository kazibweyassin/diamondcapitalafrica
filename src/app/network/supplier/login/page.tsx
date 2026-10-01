import SupplierLoginForm from "@/components/SupplierLoginForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Supplier Portal Sign In",
  description:
    "Verified suppliers sign in to offer a gold lot to Diamond Capital Africa. Buyer identities are not shown.",
  path: "/network/supplier/login",
});

export default function SupplierLoginPage() {
  return (
    <>
      <section className="bg-primary py-12 text-white md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Sell to Diamond Capital Africa
          </p>
          <h1 className="mt-2 text-3xl font-bold">Supplier portal</h1>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <SupplierLoginForm />
      </div>
    </>
  );
}
