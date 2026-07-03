import InstitutionalAccessForm from "@/components/InstitutionalAccessForm";
import InstitutionalPaymentInstructions from "@/components/InstitutionalPaymentInstructions";
import { institutionalMembership } from "@/data/network";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request Institutional Access",
  description:
    "Request membership to the Diamond Capital Africa Institutional Gold Network and Verified Gold Exchange.",
  path: "/network/access",
});

export default function InstitutionalAccessPage() {
  return (
    <>
      <section className="bg-primary py-12 text-white md:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Institutional membership
          </p>
          <h1 className="mt-2 text-3xl font-bold">Request network access</h1>
          <p className="mt-3 text-white/80">
            {institutionalMembership.name} — ${institutionalMembership.feeUsd.toLocaleString()}{" "}
            per year for Level 3+ verified supply and structured quote requests
            coordinated by DCA.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <div className="mb-10">
          <InstitutionalPaymentInstructions />
        </div>
        <InstitutionalAccessForm />
      </div>
    </>
  );
}