"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { company } from "@/data/content";
import { goldSavings } from "@/data/gold-savings";
import { marketPrices as fallbackPrices } from "@/data/content";
import type { MarketQuote } from "@/types";
import WhatsAppIcon from "./WhatsAppIcon";

type Step = "amount" | "details" | "payment" | "proof" | "done";

interface PaymentInfo {
  method: string;
  network: string;
  wallet: string;
  amountUsdt: string;
  reference: string;
  priceLockedUntil: string;
}

interface DepositRecord {
  reference: string;
  email: string;
  amountUsd: string;
  gramsQuoted: string;
  spotPricePerG: string;
  priceLockedUntil: string;
  status: string;
}

function parseSpotPerGram(quotes: MarketQuote[]) {
  const spotQuote = quotes.find((q) => q.label.includes("DCA Spot"));
  if (!spotQuote) return null;
  const value = Number(spotQuote.value.replace(/,/g, ""));
  return Number.isFinite(value) && value > 0 ? value : null;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs font-medium text-muted transition hover:border-gold hover:text-gold-dark"
      aria-label={`Copy ${label}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function GoldSavingsDepositWizard() {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState(String(goldSavings.minDepositUsd));
  const [spotPerGram, setSpotPerGram] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [payment, setPayment] = useState<PaymentInfo | null>(null);
  const [deposit, setDeposit] = useState<DepositRecord | null>(null);

  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [detailErrors, setDetailErrors] = useState<Record<string, string>>({});

  const [proof, setProof] = useState({ txHash: "" });
  const [proofFile, setProofFile] = useState<File | null>(null);

  useEffect(() => {
    async function load() {
      setPriceLoading(true);
      try {
        const res = await fetch("/api/market");
        const json = await res.json();
        if (json.success) {
          const spot = parseSpotPerGram(json.data.quotes);
          if (spot) {
            setSpotPerGram(spot);
            return;
          }
        }
      } catch {
        // fallback
      }
      setSpotPerGram(parseSpotPerGram(fallbackPrices));
    }
    load().finally(() => setPriceLoading(false));
  }, []);

  const amountUsd = Number(amount);
  const validAmount =
    Number.isFinite(amountUsd) && amountUsd >= goldSavings.minDepositUsd;

  const grams = useMemo(() => {
    if (!validAmount || !spotPerGram) return null;
    return amountUsd / spotPerGram;
  }, [amountUsd, spotPerGram, validAmount]);

  function validateDetails() {
    const next: Record<string, string> = {};
    if (!details.name.trim()) next.name = "Name is required";
    if (!details.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
      next.email = "Enter a valid email";
    }
    if (!details.phone.trim()) next.phone = "Phone is required";
    setDetailErrors(next);
    return Object.keys(next).length === 0;
  }

  async function createDeposit() {
    if (!validateDetails()) return;

    setSubmitting(true);
    setServerError("");

    try {
      const res = await fetch("/api/gold-deposits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...details,
          amountUsd,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        setServerError(json.error ?? "Failed to create deposit");
        return;
      }

      setDeposit(json.data.deposit);
      setPayment(json.data.payment);
      setStep("payment");
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitProof(e: React.FormEvent) {
    e.preventDefault();
    if (!deposit || !proof.txHash.trim()) {
      setServerError("Transaction hash is required");
      return;
    }

    setSubmitting(true);
    setServerError("");

    try {
      const formData = new FormData();
      formData.append("email", deposit.email);
      formData.append("txHash", proof.txHash.trim());
      if (proofFile) formData.append("proof", proofFile);

      const res = await fetch(
        `/api/gold-deposits/${deposit.reference}/proof`,
        { method: "POST", body: formData }
      );

      const json = await res.json();

      if (!json.success) {
        setServerError(json.error ?? "Failed to submit proof");
        return;
      }

      setDeposit(json.data);
      setStep("done");
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const lockExpiry = payment
    ? new Date(payment.priceLockedUntil).toLocaleString("en-UG", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

  return (
    <div className="rounded-lg border border-border bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex flex-wrap gap-2">
        {(["amount", "details", "payment", "proof"] as const).map((s, i) => {
          const labels = ["Amount", "Details", "Pay USDT", "Proof"];
          const active = step === s || (step === "done" && s === "proof");
          const done =
            (step === "details" && i < 1) ||
            (step === "payment" && i < 2) ||
            (step === "proof" && i < 3) ||
            step === "done";

          return (
            <span
              key={s}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                active
                  ? "bg-primary text-white"
                  : done
                    ? "bg-gold/20 text-gold-dark"
                    : "bg-section-alt text-muted"
              }`}
            >
              {i + 1}. {labels[i]}
            </span>
          );
        })}
      </div>

      {serverError && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverError}
        </p>
      )}

      {step === "amount" && (
        <>
          <h3 className="mb-1 text-lg font-bold text-primary">
            How much do you want to save?
          </h3>
          <p className="mb-6 text-sm text-muted">
            Enter your deposit in USD. We convert it to grams of assay-verified fine
            gold at today&apos;s spot price.
          </p>

          <label htmlFor="deposit-amount" className="mb-1 block text-sm font-medium">
            Deposit amount (USD)
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">
              $
            </span>
            <input
              id="deposit-amount"
              type="number"
              min={goldSavings.minDepositUsd}
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded border border-border py-3 pl-8 pr-4 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          {!validAmount && amount !== "" && (
            <p className="mt-2 text-xs text-red-500">
              Minimum deposit is ${goldSavings.minDepositUsd}.
            </p>
          )}

          <div className="mt-6 rounded-lg bg-section-alt p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              You will receive
            </p>
            <p className="mt-1 text-3xl font-bold text-primary">
              {priceLoading || !grams ? "..." : `${grams.toFixed(4)} g`}
            </p>
            <p className="mt-2 text-xs text-muted">
              {spotPerGram
                ? `At $${spotPerGram.toFixed(2)}/g · assay-verified fine gold`
                : "Loading spot price…"}
            </p>
          </div>

          <button
            type="button"
            disabled={!validAmount || priceLoading}
            onClick={() => setStep("details")}
            className="mt-6 w-full rounded bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light disabled:opacity-60"
          >
            Continue
          </button>
        </>
      )}

      {step === "details" && (
        <>
          <h3 className="mb-1 text-lg font-bold text-primary">Your details</h3>
          <p className="mb-6 text-sm text-muted">
            Depositing ${amountUsd.toFixed(2)} for{" "}
            {grams ? `${grams.toFixed(4)} g` : "..."} of gold.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="dep-name" className="mb-1 block text-sm font-medium">
                Full name
              </label>
              <input
                id="dep-name"
                type="text"
                value={details.name}
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                className="w-full rounded border border-border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
              />
              {detailErrors.name && (
                <p className="mt-1 text-xs text-red-500">{detailErrors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="dep-email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <input
                id="dep-email"
                type="email"
                value={details.email}
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                className="w-full rounded border border-border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
              />
              {detailErrors.email && (
                <p className="mt-1 text-xs text-red-500">{detailErrors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="dep-phone" className="mb-1 block text-sm font-medium">
                Phone / WhatsApp
              </label>
              <input
                id="dep-phone"
                type="tel"
                value={details.phone}
                onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                className="w-full rounded border border-border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
              />
              {detailErrors.phone && (
                <p className="mt-1 text-xs text-red-500">{detailErrors.phone}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep("amount")}
              className="rounded border border-border px-4 py-3 text-sm font-medium transition hover:bg-section-alt"
            >
              Back
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={createDeposit}
              className="flex flex-1 items-center justify-center gap-2 rounded bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light disabled:opacity-60"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              Generate payment instructions
            </button>
          </div>
        </>
      )}

      {step === "payment" && payment && deposit && (
        <>
          <h3 className="mb-1 text-lg font-bold text-primary">
            USDT payment instructions
          </h3>
          <p className="mb-4 text-sm text-muted">
            Send exactly{" "}
            <strong className="text-foreground">{payment.amountUsdt} USDT</strong>{" "}
            on the <strong className="text-foreground">{payment.network}</strong>{" "}
            network. Price locked until {lockExpiry}.
          </p>

          <div className="space-y-4 rounded-lg border border-gold/40 bg-section-alt p-4 text-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Reference
                </p>
                <p className="font-mono font-bold text-primary">
                  {payment.reference}
                </p>
              </div>
              <CopyButton text={payment.reference} label="reference" />
            </div>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Wallet address ({payment.network})
                </p>
                <p className="break-all font-mono text-foreground">
                  {payment.wallet}
                </p>
              </div>
              <CopyButton text={payment.wallet} label="wallet" />
            </div>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Amount
                </p>
                <p className="font-bold text-primary">
                  {payment.amountUsdt} USDT
                </p>
              </div>
              <CopyButton text={payment.amountUsdt} label="amount" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Gold credited (on verification)
              </p>
              <p className="font-bold text-primary">
                {Number(deposit.gramsQuoted).toFixed(4)} g · assay-verified
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-amber-700">
            Send only USDT on {payment.network}. Transfers on the wrong network
            may be unrecoverable. Include reference {payment.reference} in the
            memo/note if your wallet supports it.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep("proof")}
              className="flex-1 rounded bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light"
            >
              I have paid. Submit proof
            </button>
            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded border border-border px-6 py-3 text-sm font-semibold text-primary transition hover:bg-section-alt"
            >
              <WhatsAppIcon className="size-4 text-[#25D366]" />
              Need help?
            </a>
          </div>
        </>
      )}

      {step === "proof" && deposit && (
        <form onSubmit={submitProof}>
          <h3 className="mb-1 text-lg font-bold text-primary">
            Submit proof of payment
          </h3>
          <p className="mb-6 text-sm text-muted">
            Reference{" "}
            <strong className="text-foreground">{deposit.reference}</strong>.
            We verify within one business day.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="tx-hash" className="mb-1 block text-sm font-medium">
                USDT transaction hash (required)
              </label>
              <input
                id="tx-hash"
                type="text"
                value={proof.txHash}
                onChange={(e) => setProof({ txHash: e.target.value })}
                placeholder="Paste your on-chain transaction ID"
                className="w-full rounded border border-border px-4 py-3 font-mono text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </div>
            <div>
              <label htmlFor="proof-file" className="mb-1 block text-sm font-medium">
                Screenshot or receipt (optional)
              </label>
              <input
                id="proof-file"
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
                className="w-full text-sm text-muted file:mr-3 file:rounded file:border-0 file:bg-section-alt file:px-3 file:py-2 file:text-sm file:font-medium"
              />
              <p className="mt-1 text-xs text-muted">
                Or WhatsApp your screenshot to {company.phone} with your
                reference number.
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {payment && (
              <button
                type="button"
                onClick={() => setStep("payment")}
                className="rounded border border-border px-4 py-3 text-sm font-medium transition hover:bg-section-alt"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="flex flex-1 items-center justify-center gap-2 rounded bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light disabled:opacity-60"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              Submit proof
            </button>
          </div>
        </form>
      )}

      {step === "done" && deposit && (
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
            <Check size={28} />
          </div>
          <h3 className="text-lg font-bold text-primary">Proof received</h3>
          <p className="mt-2 text-sm text-muted">
            Reference{" "}
            <strong className="text-foreground">{deposit.reference}</strong>.
            Our team will verify your USDT payment and credit{" "}
            <strong className="text-foreground">
              {Number(deposit.gramsQuoted).toFixed(4)} g
            </strong>{" "}
            to your gold savings balance within one business day.
          </p>
          <p className="mt-4 text-sm text-muted">
            Questions?{" "}
            <a
              href={`mailto:${company.investorsEmail}`}
              className="font-semibold text-gold-dark underline hover:text-gold"
            >
              {company.investorsEmail}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}