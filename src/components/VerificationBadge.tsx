import { verificationLabel } from "@/lib/network";

export default function VerificationBadge({ level }: { level: number }) {
  const tone =
    level >= 5
      ? "bg-primary text-white"
      : level >= 4
        ? "bg-gold text-primary"
        : level >= 3
          ? "bg-gold/15 text-gold-dark border border-gold/30"
          : "bg-section-alt text-muted border border-border";

  return (
    <span
      className={`inline-flex rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${tone}`}
    >
      {verificationLabel(level)}
    </span>
  );
}