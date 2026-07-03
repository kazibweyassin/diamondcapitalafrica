# Diamond Capital Africa — Institutional Gold Network

Strategy document for the **DCA Institutional Gold Network** and **Verified Gold Exchange** — built as a new layer on top of the existing `goldcapital` site, codebase, and Vercel deployment.

---

## Built on top of this site

This is **not** a separate app. It extends what already exists:

| Existing (stays) | New layer (added on top) |
|------------------|--------------------------|
| Corporate site — About, Services, Operations, Sustainability | `/network` — Institutional Gold Network landing |
| Gold Savings, contact enquiries, live market prices | `/network/apply` — supplier membership application |
| Admin dashboard, Prisma DB, `www.diamondcapitalafrica.com` | `/network/portal` — gated institutional buyer access |
| Licensed dealer brand, refinery, export services | Admin extended — verification, supply, deal coordination |

Same Next.js app · same database · same admin login · same DCA license and trust position.

---

## Brand positioning

| Use this | Not this |
|----------|----------|
| **Diamond Capital Africa Institutional Gold Network** | Marketplace |
| **DCA Verified Gold Exchange** | Open trading platform |
| Verified institutional transaction network | Classifieds / listings site |
| Transaction coordination | Peer-to-peer exchange |
| DCA as verifier and structurer | Broker or WhatsApp facilitator |

### How the two names work together

- **Institutional Gold Network** — membership layer: who is verified, who gets access
- **Verified Gold Exchange** — transaction layer: quotes, assay-backed supply, deals structured through DCA

### Strategic positioning (one line)

> *Diamond Capital Africa is an institutional verification and transaction coordination network for gold supply chains across Africa and global markets.*

Public-facing line:

> *Diamond Capital Africa operates an Institutional Gold Network and Verified Gold Exchange for licensed supply and institutional buyers across East and Central Africa.*

---

## Core principle

This is not a marketplace.

It is a:

> **Verified Institutional Gold Transaction Network**

DCA does not “list gold.” DCA **verifies, structures, and facilitates institutional commodity transactions** between vetted parties.

**Trust is the product.**

The gold market is not primarily a supply problem. It is a **trust and verification problem**. DCA becomes valuable because it provides:

- Verified supply
- Verified buyers
- Verified process
- Verified settlement structure

---

## Platform structure

### Participants

**1. Sellers (supply side)**

- Mines, cooperatives, licensed traders
- Must pass KYC + origin screening
- Listing is **free**
- Only verified supply is visible to buyers

**2. Buyers (demand side)**

- Refineries, importers, institutional traders
- Pay for access to verified supply
- Must pass KYC before viewing full listings

**3. Financial partners (future layer)**

- Banks, SBLC providers, escrow agents, logistics firms
- Provide instruments and transaction guarantees
- Revenue: commission / arrangement fees on structured deals

**4. DCA (transaction coordinator)**

Not just a broker. DCA acts as:

- Verifier
- Compliance gatekeeper
- Deal structurer
- Execution coordinator

---

## Who pays (refined model)

Revenue is distributed across the **transaction lifecycle** — not only buyers or only sellers.

| Party | Contribution model | Why |
|-------|-------------------|-----|
| **Sellers** | Free verification + optional success fee on closed deals | Needed for supply; upfront fees kill the network |
| **Buyers** | Membership + transaction facilitation fees | Pay for verified access and deal flow |
| **Financial partners** | Commission / arrangement fees | SBLC, escrow, trade finance structuring |
| **DCA** | Earns across execution lifecycle | Verification + facilitation + structuring + refinery/export margin |

**Launch priority:** buyers pay first (institutional membership). Sellers apply free. Transaction fees and partner revenue scale as deals close.

---

## Verification system (core differentiator)

Every supply entry must pass a structured due diligence pipeline.

### Seller verification levels

| Level | Requirement |
|-------|-------------|
| **Level 1** | Identity + business registration verified |
| **Level 2** | Mining or trade license verified |
| **Level 3** | Physical product verified (photo/video + inspection) |
| **Level 4** | Assay completed by approved facility |
| **Level 5** | Full chain of custody validated |

**Rule:** Only **Level 3+** supply appears in the institutional buyer portal.

Buyers see the trust level before engaging. This is the Network’s primary differentiator vs informal channels.

---

## How the system works

```
Seller applies (free)
        ↓
KYC + compliance screening (DCA)
        ↓
Verification levels assigned (1–5)
        ↓
Approved verified supply published on Exchange
        ↓
Buyer applies for institutional membership (paid)
        ↓
Buyer KYC approved → portal access granted
        ↓
Buyer requests quote on verified supply
        ↓
DCA structures transaction
        ↓
Finance + logistics + assay coordinated
        ↓
Settlement executed (via DCA licensed chain)
```

---

## Critical rules

**DCA does NOT:**

- Allow unverified parties to contact each other directly
- Facilitate deals without a verified origin chain
- Accept undocumented or non-compliant gold
- Present itself as an open marketplace or unlicensed exchange

**DCA may** act as principal trader only when explicitly structured that way under existing license — default role is **facilitator and coordinator**.

---

## Monetization model

### Phase 1 — Launch (manual, minimal code)

- Institutional buyer membership (annual or monthly, invoiced manually)
- Transaction facilitation fees on closed deals
- Verification service fees for advanced due diligence (optional)
- No Stripe required for first 5–10 institutional buyers

Example membership tiers:

- **Network Standard** — view Level 3+ supply, request quotes ($500–2,000/year)
- **Network Institutional** — priority quotes, assay packs, dedicated contact ($5,000+/year)

### Phase 2 — Scale

- Automated subscriptions (Stripe)
- **Per-transaction commission** (primary revenue driver at scale)
- Finance arrangement fees (SBLC / escrow structuring)
- Logistics coordination fees
- Optional seller success fee after deal closes

### Phase 3 — Institutional layer

- Trade finance desk partnerships
- Refinery onboarding fees
- Custody / storage fees
- API access for large importers

---

## Why this model works

| Industry problem | DCA Network answer |
|------------------|-------------------|
| Unverified supply | Multi-level verification pipeline |
| Unverified buyers | KYC + paid membership gate |
| No settlement structure | DCA coordinates assay, finance, logistics |
| WhatsApp / informal deals | Tracked quotes, audit trail, OECD alignment |
| Regulatory exposure | DCA remains licensed facilitator — not open P2P |

---

## Key additions (institutional-grade)

1. **Financial partners layer** — SBLC, escrow, trade finance ecosystem (Phase 2+)
2. **Transaction-based revenue** — income scales with deals, not only subscriptions
3. **Verification scoring (Levels 1–5)** — buyers see trust level before engaging
4. **DCA as transaction manager** — not broker, not marketplace; infrastructure and coordination layer

---

## What you already have (build on this)

| Existing piece | Reuse for the Network |
|----------------|----------------------|
| `prisma/schema.prisma` — Enquiry, GoldDeposit, AdminUser | Network members, verified supply, institutional accounts |
| `src/app/api/enquiries/route.ts` | Structured quote requests on verified supply |
| `src/app/contact/page.tsx` | Supplier application UX pattern |
| `src/components/AdminDashboard.tsx` | Verification dashboard, member approval, deal enquiries |
| `src/lib/gold-deposits.ts` | Reference IDs, status workflows |
| `src/components/MarketPrices.tsx` | LBMA / DCA spot context in buyer portal |
| Vercel Blob (gold deposit proofs) | Assay document uploads |

---

## Proposed product — MVP v1

No payments in code yet. Manual institutional onboarding.

### Supplier side (free)

- Apply: license ID, location, volume range, product type (doré, concentrate, bars)
- Status: `pending` → verification levels assigned → `verified` or `rejected`
- Level 3+ supply listed on Verified Gold Exchange (no public contact details)

### Institutional buyer side (paid, manual at first)

- Register → DCA KYC → membership activated after payment
- Portal shows Level 3+ verified supply with trust level badge
- Request quote → `ExchangeEnquiry` tracked in admin
- DCA structures: assay, pricing, finance, export

### Public site (on existing domain)

- **`/network`** — Institutional Gold Network landing
- Subline: *Licensed verified supply. Institutional access. DCA-facilitated exchange.*
- CTA: “Apply as verified supplier” (free) · “Request institutional access” (paid)

---

## Technical roadmap (on top of existing app)

### PR 1 — Data model and admin

New Prisma models in `prisma/schema.prisma`:

- `NetworkMember` — supplier company, license, KYC status, `verificationLevel` (1–5)
- `VerifiedSupply` — member, volume, purity, level, assay ref, status
- `InstitutionalAccount` — buyer company, membership tier, KYC status, expiry
- `ExchangeEnquiry` — buyer + supply + message + deal status

Extend `src/components/AdminDashboard.tsx`: verification levels, supply approval, institutional access.

### PR 2 — Supplier application

- `src/app/network/apply/page.tsx` — public form
- API route → `NetworkMember` pending
- Email notification to DCA

### PR 3 — Institutional portal (gated)

- `src/app/network/portal/` — login required, `InstitutionalAccount.status === active`
- Browse Level 3+ supply, request quote
- Manual membership activation in admin

### PR 4 — Payments

- Stripe for institutional tiers
- Webhook → `InstitutionalAccount.membershipExpiresAt`

### PR 5 — Trust and finance layer

- Assay document upload (Vercel Blob)
- Verification level badges on supply cards
- OECD audit log per enquiry
- Financial partner referral fields (Phase 2)

---

## Messaging

**To institutional buyers:**

> “You pay for membership in the Diamond Capital Africa Institutional Gold Network — access to multi-level verified supply, assay documentation, and structured transaction coordination through a licensed Kampala counterparty. Not random offers on WhatsApp.”

**To verified suppliers:**

> “Network membership is free to apply. DCA assigns verification levels before your supply appears on our Verified Gold Exchange. We connect you to paying institutional buyers through a structured process.”

**To regulators and partners:**

> “This is not an unlicensed exchange. Diamond Capital Africa remains the licensed facilitator. The Network is a verified membership layer; the Exchange is where quotes and deals are structured and coordinated under our existing license.”

**To financial partners (future):**

> “DCA brings verified supply and verified buyers. You provide SBLC, escrow, or trade finance — we structure the transaction and coordinate execution.”

---

## Language guide (sitewide)

| Avoid | Use instead |
|-------|-------------|
| Marketplace | Institutional Gold Network |
| Broker | Transaction coordinator |
| Listings site | Verified Gold Exchange |
| Seller listing | Verified supply |
| Buyer subscription | Institutional membership |
| Platform | Network / Exchange |
| List gold | Verify and structure transactions |

---

## Risk controls

| Risk | Mitigation |
|------|------------|
| Fake sellers | Multi-level verification (Levels 1–5) |
| Fake buyers | KYC + membership gate |
| Regulatory issues | DCA facilitates under licensed structure; legal review before launch |
| Reputation risk | Strict approval; only Level 3+ in portal |
| Fraud / direct bypass | No unverified introductions; all quotes through DCA |
| Liquidity | Seed supply from existing miner network before charging buyers |
| Cannibalization | Network feeds refinery/export; keep VIP direct channel for top clients |

---

## Recommended next step

**MVP v1** — no payments in code:

1. Seller application form
2. Admin verification dashboard (with levels 1–5)
3. Verified supply database
4. Institutional buyer access (manual approval)
5. Public `/network` landing on existing site

Validate willingness to pay with first 5–10 institutional buyers before Stripe.

---

## Implementation checklist

- [ ] Add `NetworkMember`, `VerifiedSupply`, `InstitutionalAccount`, `ExchangeEnquiry` to `prisma/schema.prisma`
- [ ] Add `verificationLevel` (1–5) to member and supply models
- [ ] Extend AdminDashboard — verification pipeline, level assignment, supply approval
- [ ] Build `/network/apply` supplier form and API route
- [ ] Build gated `/network/portal` — Level 3+ supply only, quote requests
- [ ] Add `/network` landing page on existing site
- [ ] Stripe institutional memberships (after manual validation)
- [ ] Financial partners layer (Phase 2)

---

## Future deliverables (when ready)

- Pitch deck for investors or finance partners
- Full database schema and API specification
- UI flow / product screens for Network portal

---

*Diamond Capital Africa — Institutional Gold Network strategy — July 2026*