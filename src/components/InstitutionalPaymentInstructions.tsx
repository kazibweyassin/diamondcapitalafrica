import { CheckCircle } from "lucide-react";
import { company } from "@/data/content";
import { getInstitutionalMembershipPayment } from "@/lib/network-membership-config";

export default function InstitutionalPaymentInstructions({
  reference,
  showTierSummary = true,
}: {
  reference?: string;
  showTierSummary?: boolean;
}) {
  const { tier, usdt, wire } = getInstitutionalMembershipPayment();

  return (
    <div className="space-y-6">
      {showTierSummary && (
        <section className="rounded-lg border border-border bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">
            Membership
          </p>
          <h2 className="mt-1 text-xl font-bold text-primary">{tier.name}</h2>
          <p className="mt-2 text-2xl font-bold text-primary">
            ${tier.feeUsd.toLocaleString()}
            <span className="ml-1 text-sm font-medium text-muted">
              / {tier.period}
            </span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{tier.summary}</p>
          <ul className="mt-4 space-y-2">
            {tier.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <CheckCircle
                  size={16}
                  className="mt-0.5 shrink-0 text-gold"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-lg border border-gold/30 bg-gold/5 p-5 sm:p-6">
        <h3 className="text-lg font-bold text-primary">Payment instructions</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {reference
            ? "Complete your membership payment using either option below. Portal credentials are emailed after DCA confirms receipt."
            : "After you submit your application, use your reference number when paying so we can activate your account."}
        </p>

        {reference && (
          <div className="mt-4 rounded border border-border bg-white px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Your application reference
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-primary">
              {reference}
            </p>
            <p className="mt-2 text-xs text-muted">{tier.paymentNote}</p>
          </div>
        )}

        <div className="mt-5 space-y-5">
          <div className="rounded-lg border border-border bg-white p-4">
            <p className="text-sm font-semibold text-primary">
              Option 1 — USDT ({usdt.networkGuide.label})
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                <dt className="text-muted">Amount</dt>
                <dd className="font-semibold text-foreground">
                  {usdt.amount.toLocaleString()} USDT
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                <dt className="text-muted">Network</dt>
                <dd className="font-semibold text-foreground">
                  {usdt.networkGuide.label}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Wallet address</dt>
                <dd className="mt-1 break-all font-mono text-xs text-foreground sm:text-sm">
                  {usdt.wallet}
                </dd>
                <dd className="mt-1 text-xs text-muted">
                  {usdt.networkGuide.addressHint}
                </dd>
              </div>
              {reference && (
                <div>
                  <dt className="text-muted">Payment reference / memo</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold text-primary">
                    {reference}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-4 rounded border border-primary/15 bg-primary/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Binance users
              </p>
              <p className="mt-1 text-xs text-muted">
                On Binance, choose{" "}
                <strong className="text-foreground">
                  {usdt.networkGuide.binanceLabel}
                </strong>{" "}
                as the network — not the label &quot;TRC20&quot; alone.
              </p>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs leading-relaxed text-muted">
                {usdt.networkGuide.binanceSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-muted">
              Send only USDT on {usdt.networkGuide.label}. Wrong-network
              transfers may be unrecoverable.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-white p-4">
            <p className="text-sm font-semibold text-primary">
              Option 2 — Bank wire
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Email{" "}
              <a
                href={`mailto:${wire.email}?subject=Institutional%20Network%20membership%20payment${reference ? `%20%E2%80%94%20${reference}` : ""}`}
                className="font-semibold text-gold-dark underline hover:text-gold"
              >
                {wire.email}
              </a>{" "}
              {reference ? (
                <>
                  with reference <span className="font-mono font-semibold">{reference}</span>{" "}
                </>
              ) : (
                "with your application reference "
              )}
              to receive a proforma invoice and {company.name} bank details.
            </p>
            <p className="mt-3 text-sm text-muted">
              {wire.contactName}:{" "}
              <a
                href={`tel:${company.phoneTel}`}
                className="font-semibold text-foreground hover:text-gold"
              >
                {wire.phone}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}