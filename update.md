Here is a comprehensive, ready-to-copy technical product blueprint and system prompt for your software development team. This document strips out mobile apps completely and focuses entirely on a highly secure, responsive web-based B2B marketplace.
You can hand this directly to your tech lead or use it to brief an engineering agency to begin building immediately.
------------------------------
## Technical Product Blueprint: B2B Gold Marketplace & Digital Escrow Platform
Client Entity: Diamond Capital Africa (DCA)
System Architecture: Responsive Web Application (Desktop-first for Buyers, Mobile-Responsive for Regional Sellers)
## 1. System Overview & Core Objectives
The objective is to replace DCA’s traditional static website framework with a transaction-heavy, real-time B2B aggregation platform. The platform acts as a digital escrow, clearinghouse, and marketplace connecting verified regional precious metal sellers (aggregators, cooperatives) with institutional buyers (refineries, trading houses). DCA acts as the trusted, physical verification bottleneck (Assay/Spectrometry) and automated escrow administrator.
------------------------------
## 2. Core Modules & User Interfaces
The single web application must dynamically serve three user groups based on secure role-based access control (RBAC):
## A. The Institutional Buyer Portal (Desktop-Optimized Web)

* Live Order Book Dashboard: Real-time stream of available raw gold lots listed by verified sellers.
* Automated Bidding Engine: Web-based interface to place competitive bids calculated as a percentage premium or discount relative to the live LBMA (London Bullion Market Association) spot price.
* Escrow Vault Management: Integrated digital ledger displaying locked corporate wire funds, active transaction holds, and historical procurement ledgers.

## B. The Regional Seller Portal (Mobile-Responsive Web)

* Zero-App Friction: Must load instantly on low-end Android mobile browsers over cellular data networks.
* Lot Listing Module: Structured step-by-step form to input:
* Estimated total raw weight (grams/kilograms).
   * Estimated purity percentage (based on field density testing).
   * Current physical location (integrated GPS/coordinates check).
   * Image/document attachments (photos of raw material, local transport permits).
* Payout Status Tracker: Real-time visibility into assay processing milestones and automated disbursement clearings.

## C. The DCA Hub Administrative Terminal (Internal Desktop Web)

* Verification Intake Queue: Dashboard mapping incoming physical lots arriving at DCA Kampala or Arua processing facilities.
* Assay Integration Interface: Secure input panel for DCA metallurgists to enter definitive fire assay/spectrometer purity results.
* Smart-Escrow Release Trigger: A dual-authorization security protocol that automatically updates order valuation, calculates platform commissions, and triggers financial disbursement upon assay submission.

------------------------------
## 3. End-to-End Core Functional Flow

[Seller Logs Lot on Mobile Web] ➔ [Buyers Place Live Bids] ➔ [Seller Accepts Bid]
                                                                     │
[DCA Enters Final Assay Purity] 🔀 [Automated Fiat Payout Disbursed] ◄┘


   1. Listing Initiation: A verified seller authenticates via mobile web and generates a unique lot passport.
   2. Competitive Bidding: Verified buyers review the lot and enter live, time-restricted bids.
   3. The Escrow Lock: Upon bid acceptance, the buyer’s pre-funded digital platform balance or verified bank line-of-credit is locked by the backend engine. The lot status moves to “In-Transit to DCA Hub”.
   4. Physical Verification: The physical material is safely transported to a DCA facility. The internal team runs the assay.
   5. Automated Execution: The metallurgist saves the assay results into the system. The platform’s math engine instantly updates the net payout based on exact pure gold content, automatically strips out DCA's service fees, and simultaneously executes a split-wire payout to the seller and a transfer of inventory to the buyer.

------------------------------
## 4. Production-Ready Tech Stack Specifications
Your engineering team must strictly adhere to the following architecture to ensure sub-millisecond data syncs and maximum cybersecurity:

| Layer | Recommended Technology | Technical Rationale |
|---|---|---|
| Front-End Framework | Next.js (React) with Tailwind CSS | Single codebase. Delivers highly responsive, rapid-loading interfaces optimized for both mobile phone browsers and multi-monitor desktop setups. |
| Back-End Runtime | Node.js (TypeScript / NestJS) | Strict compilation typing prevents database numerical rounding errors. Efficiently handles high volumes of concurrent asynchronous requests. |
| Real-Time Data Layer | WebSockets (Socket.io) | Drives the live bidding engine. Pushes real-time spot updates and competitive bids instantly to all connected screens without manual page refreshes. |
| Primary Database | PostgreSQL | Strict ACID compliance guarantees financial records are permanently and cleanly written without database corruption risks if an internet connection drops mid-trade. |
| Audit Ledger | Amazon QLDB or Supabase Log Tables | Cryptographically append-only architecture. Ensures compliance audit history cannot be altered or overwritten by external hackers or database admins. |
| Payment Gateways | Flutterwave API / Regional Bank Webhooks | Automates direct local currency mobile money payouts (MTN MoMo, Airtel Money) and cross-border bank wires. |
| Edge Security | Cloudflare Enterprise | Web Application Firewall (WAF) and active DDoS mitigation to protect high-value trading data and avoid platform downtime. |

------------------------------
## 5. Monetization Logic (Built-In Software Rules)
The platform software must automatically calculate, log, and extract the following revenue lines on every cleared trade:

* The Marketplace Take-Rate: A customizable percentage commission (e.g., 0.5% to 1.5%) split between or applied to the counter-parties automatically upon escrow completion.
* Assay Automation Fee: A flat, software-invoiced laboratory processing fee charged to the seller's final invoice.
* Micro-Custody Vault Fee: A daily recurring storage counter tracked by the software if a buyer elects to hold physical gold within DCA's physical vaults post-purchase.

------------------------------
To help your development team move directly into building the Minimum Viable Product (MVP), would you like me to map out:

   1. The exact data model tables (Sellers, Buyers, Lots, Bids, Transactions) for your lead backend developer?
   2. A detailed step-by-step security protocol for how the digital escrow checks and locks incoming international bank wires?

   If Codex (or a similar advanced AI agent / development platform) is building this web application for you, it needs highly structured, unambiguous, machine-readable specifications to generate clean, bug-free code.
Here is the exact technical prompt schema and database model you should feed into the AI builder to lay the foundation for your new platform.
------------------------------
## 🛠️ AI Code-Generation System Prompt

You are a Principal Software Engineer specializing in FinTech and secure B2B marketplaces. Build a secure, responsive, single-page Web Application using Next.js (React), Tailwind CSS, Node.js (NestJS/TypeScript), and a PostgreSQL database. 

The application must serve three distinct roles via strict Role-Based Access Control (RBAC): 'Buyer', 'Seller', and 'DCA_Admin'. Do not build a mobile app; the interface must be fully fluid and responsive on mobile web browsers for Sellers and desktop browsers for Buyers.

Implement the following core database schema exactly, ensuring strict foreign key constraints and ACID compliance for financial records:

------------------------------
## 🗄️ Core Database Architecture (Schema Blueprint)

-- 1. ENUMS FOR STRICT STATE MANAGEMENTCREATE TYPE user_role AS ENUM ('Buyer', 'Seller', 'DCA_Admin');CREATE TYPE lot_status AS ENUM ('Draft', 'Live_Bidding', 'Accepted_Escrow_Locked', 'In_Transit', 'Processing_Assay', 'Completed', 'Cancelled');CREATE TYPE payment_status AS ENUM ('Pending', 'Escrow_Locked', 'Disbursed', 'Refunded', 'Failed');
-- 2. USERS TABLECREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL, -- Crucial for East African Mobile Money mapping
    kyc_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- 3. GOLD LOTS TABLE (Sellers list here)CREATE TABLE gold_lots (
    lot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES users(user_id) ON DELETE RESTRICT,
    estimated_weight_g NUMERIC(10, 3) NOT NULL, -- Purity calculated in grams
    estimated_purity_pct NUMERIC(5, 2) NOT NULL,
    gps_latitude NUMERIC(9, 6),
    gps_longitude NUMERIC(9, 6),
    status lot_status DEFAULT 'Draft',
    final_weight_g NUMERIC(10, 3), -- Filled post-assay by DCA_Admin
    final_purity_pct NUMERIC(5, 2),  -- Filled post-assay by DCA_Admin
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- 4. BIDDING ENGINE TABLECREATE TABLE bids (
    bid_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lot_id UUID REFERENCES gold_lots(lot_id) ON DELETE CASCADE,
    buyer_id UUID REFERENCES users(user_id) ON DELETE RESTRICT,
    premium_discount_pct NUMERIC(4, 2) NOT NULL, -- e.g., -2.50 for Spot minus 2.5%
    is_winning_bid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- 5. ESCROW & TRANSACTION TRANSACTIONS TABLECREATE TABLE escrow_transactions (
    transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lot_id UUID REFERENCES gold_lots(lot_id) ON DELETE RESTRICT,
    buyer_id UUID REFERENCES users(user_id) ON DELETE RESTRICT,
    seller_id UUID REFERENCES users(user_id) ON DELETE RESTRICT,
    locked_amount_usd NUMERIC(12, 2) NOT NULL,
    marketplace_fee_usd NUMERIC(10, 2) NOT NULL, -- DCA's take-rate cut
    assay_fee_usd NUMERIC(10, 2) NOT NULL,       -- DCA's flat lab fee
    final_payout_usd NUMERIC(12, 2) NOT NULL,    -- Net amount sent to seller
    payment_state payment_status DEFAULT 'Pending',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

------------------------------
## 🚀 Core API Endpoints for the Builder to Generate
Instruct Codex to spin up these 5 critical secure endpoints immediately:

   1. POST /api/v1/lots/create — (Seller Only) Generates a new raw gold listing with location metrics and photos.
   2. GET /api/v1/lots/active — (Buyer Only) Feeds the live web dashboard via WebSockets to stream incoming lots.
   3. POST /api/v1/bids/place — (Buyer Only) Submits a real-time percentage bid based on live spot price. Validates that the buyer has pre-funded escrow limits.
   4. POST /api/v1/lots/accept-bid — (Seller Only) Closes the bidding window, flags the winning bid, and triggers the backend code to transition escrow state to Accepted_Escrow_Locked.
   5. POST /api/v1/admin/execute-assay — (DCA Admin Only) Submits final laboratory data, automatically triggers the ledger payout math, and unlocks the API webhooks for Flutterwave mobile money/wire disbursement.

