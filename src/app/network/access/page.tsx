import InstitutionalAccessForm from "@/components/InstitutionalAccessForm";
import NetworkAccountLinks from "@/components/NetworkAccountLinks";
import { institutionalMembership } from "@/data/network";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Buy Gold from DCA",
  description:
    "Request access to buy gold from Diamond Capital Africa. No membership fee.",
  path: "/network/access",
});

export default function InstitutionalAccessPage() {
  return (
    <>
      <section className="bg-primary py-12 text-white md:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            {institutionalMembership.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold">Buyer sign up</h1>
          <p className="mt-3 text-white/80">
            {institutionalMembership.summary} Already approved? Use Buyer sign
            in. DCA emails a password after approval.
          </p>
          <div className="mt-6">
            <NetworkAccountLinks current="/network/access" />
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <InstitutionalAccessForm />
      </div>
    </>
  );
}