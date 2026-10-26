# Prompt for Claude Code — DCA Buyer Qualification Portal

Copy everything below into Claude Code as your project brief.

---

## Project overview

Build a secure buyer onboarding portal for **Diamond Capital Africa Limited**, a licensed gold trading and export company. The portal replaces a manual, email-based buyer qualification process with a self-serve web flow: prospective gold buyers register, submit KYC information and documents, and — once an admin marks them as having passed initial screening — pay an onboarding fee to advance to transaction discussions.

This will be added to the existing marketing site at `diamondcapitalafrica.com` (currently a Next.js/TypeScript site hosted on Vercel) as a new authenticated section, e.g. `diamondcapitalafrica.com/buyers`.

**Critical design principle:** the fee must never be requested before a buyer has been manually screened. This is a fraud-prevention and credibility requirement — the flow below reflects that ordering. Do not add any UI path that skips the sequence.

---

## Tech stack

- **Framework:** Next.js (App Router), TypeScript — consistent with existing site
- **Auth:** NextAuth.js (email/password or magic link) — restrict registration to business email domains (block common free providers: gmail.com, yahoo.com, outlook.com, hotmail.com, icloud.com — configurable blocklist)
- **Database:** Postgres via Supabase (or Vercel Postgres) — pick one and justify briefly in your plan
- **File storage:** Supabase Storage or Cloudflare R2 — private buckets only, signed URLs with short expiry for admin document access. Never public buckets.
- **Payments:** Flutterwave (primary) — Stripe/PayPal are not reliably usable for a Ugandan gold-trading merchant, so don't default to them. Structure the payment integration behind an interface so Paystack could be swapped in later.
- **Email notifications:** Resend or similar, for status-change emails (registered → pending → qualified/not qualified) and fee-invoice emails
- **Hosting:** Vercel (matches existing site)

---

## User-facing flow

### 1. Landing / pre-screen (no login required)
- Short explainer of the buyer onboarding process (mirrors the Buyer Qualification Pack)
- A pre-screen mini-form (no account needed): company name, business email, country, buyer role (End Buyer / Refinery / Mandate / Broker-Intermediary)
- Server-side validation: reject free-mail domains at this stage with a clear message ("Please register using your company email address")
- On pass → prompt to create an account. On fail → polite decline message, no dead end (offer a contact email for edge cases)

### 2. Registration / login
- Email + password or magic link, company domain required
- Email verification required before proceeding
- Basic rate-limiting / bot protection on registration (hCaptcha or similar)

### 3. Buyer dashboard (post-login)
Shows a single onboarding case with a status badge: `Draft → Submitted → Under Review → Pending (more info needed) → Qualified` or `Not Qualified`.

### 4. Multi-step onboarding form
Reuse the fields from the existing Buyer Registration & Transaction Qualification Pack:
- **Step 1 — Company details:** legal name, trading name, country of incorporation, registration number, registered address, website, UBO(s), authorized signatory
- **Step 2 — Transaction requirements:** gold product, required fineness/assay standard, quantity (per transaction / per month), desired destination, preferred refinery, payment currency, payment mechanism, buyer role, expected first transaction value
- **Step 3 — Financial capacity:** source of funds, funding bank, estimated transaction capacity, proposed payment instrument, proof of funds (yes/no/to be provided), bank contact
- **Step 4 — Document upload:** Certificate of Incorporation, Memorandum & Articles, company profile, director/signatory ID, UBO ID, board resolution/mandate, business/refinery licence, proof of address, any additional docs. Accept PDF/JPG/PNG, max size per file (e.g. 10MB), virus-scan on upload if feasible (e.g. via a scanning API), show upload progress and allow re-upload before final submit.
- **Step 5 — Declaration:** checkbox confirming accuracy of information (equivalent to the signature block), typed full name as e-signature, timestamp + IP logged

On final submit: status → `Submitted`, buyer sees a confirmation screen, admin gets notified.

### 5. Fee payment (gated)
- This screen/step is **only unlocked once an admin has manually changed the buyer's status to "Cleared for fee"** (a distinct internal status, separate from Qualified — see admin section). It must not be reachable by URL manipulation before that status is set — enforce server-side, not just hidden in the UI.
- Buyer role determines fee tier automatically from Step 2 answers:
  - Tier A (End Buyer / Refinery, verified institutional status confirmed by admin): fee waived, skip to confirmation
  - Tier B (Mandate / Broker-Intermediary, or unverified): USD 250 fee, pay via Flutterwave
- After payment, buyer receives an emailed receipt/invoice referencing the specific service (per the existing pack's fee-conditions language), generated server-side — never let the buyer or a webhook determine the invoice content unchecked.
- Display the same anti-fraud notice used in the pack: DCA will never request payment to unverified or changed bank details, and all payment instructions come only from the in-app payment flow.

### 6. Post-payment / post-clearance
- Status updates to `Qualified`, `Pending`, or `Not Qualified` by admin
- Buyer sees final status and, if Qualified, a message that DCA will follow up to progress to FCO/SPA discussions

---

## Admin dashboard (internal, separate auth role)

- List of all buyer cases with: company name, buyer role, tier, status, submitted date, days since last activity
- Filters: status, tier, country, date range
- Case detail view: all submitted form data, document viewer (signed URLs, view-only, watermarked if possible), internal notes field, audit log of status changes (who changed what, when)
- Manual status controls: `Under Review → Pending (with reason/requested info) → Cleared for fee → Qualified / Not Qualified`
- A dedicated "Cleared for fee" action is required before a buyer can see the payment step — this is the manual gate mentioned above. There is no automatic path from `Submitted` to fee payment.
- SLA indicator: flag any case with no admin action in 5 business days (matches the internal process already agreed)
- Export case data to CSV/PDF for compliance record-keeping
- Role-based access: at minimum an "admin" role (full access) and a "reviewer" role (can review/comment but not clear for fee) if more than one person will use this

---

## Data model (starting point — adjust as needed)

```
buyers
  id, email, company_name, domain, created_at, auth_user_id

buyer_cases
  id, buyer_id, status, tier (A/B), cleared_for_fee (bool),
  cleared_for_fee_by, cleared_for_fee_at, submitted_at, updated_at

case_form_data
  id, case_id, step, json_payload  -- or normalized columns per your judgment

documents
  id, case_id, doc_type, storage_path, uploaded_at, file_size, mime_type

payments
  id, case_id, amount, currency, provider, provider_ref, status, paid_at

status_history
  id, case_id, from_status, to_status, changed_by, changed_at, note

admin_users
  id, email, role (admin/reviewer)
```

---

## Security requirements (non-negotiable)

- All document storage private by default; access only via short-lived signed URLs generated server-side after auth + authorization check
- All fee-gating logic enforced server-side (API routes / server actions), never trust client state
- Encrypt sensitive fields (UBO IDs, passport numbers) at rest if your DB provider doesn't already encrypt at rest
- Full audit log of who viewed/downloaded which documents and when
- Document retention policy: flag documents for deletion after a configurable period following rejection or deal completion (build the mechanism; the actual retention period is a policy decision for DCA to set)
- HTTPS everywhere (default on Vercel), secure cookies, CSRF protection on forms
- Rate-limit login and registration endpoints
- No buyer-facing page should ever reveal another buyer's data via ID enumeration — check authorization on every case-scoped route

---

## Deliverables to ask Claude Code to produce

1. A short technical plan (confirm DB choice, storage choice, auth approach) before writing code
2. Database schema/migrations
3. Registration + email-domain-blocklist logic
4. Multi-step onboarding form with save-as-draft
5. Document upload with private storage + signed URL retrieval
6. Flutterwave integration for the fee step, with the manual "cleared for fee" gate enforced server-side
7. Admin dashboard with case list, detail view, status controls, audit log
8. Email notifications for status changes
9. Basic automated tests for: the fee-gating logic (cannot be bypassed by URL/API manipulation) and the free-mail-domain rejection logic
10. A short README covering environment variables needed and deployment steps to the existing Vercel project

---

## Explicitly out of scope for this build

- Actual legal/contract generation (FCO/SPA) — that remains a manual, human-reviewed process
- Any automatic approval of buyers — all Qualified/Not Qualified decisions are human calls, the system only manages workflow and gating
