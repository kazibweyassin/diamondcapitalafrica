You are working inside the Diamond Capital Africa website repository.

First inspect the full project structure, package.json, routing system, styling system, existing components, forms, analytics implementation and current Investors pages before making changes.

Do not replace the existing design system. Reuse the current typography, colours, navigation, buttons, cards, spacing and responsive layout.

PROJECT CONTEXT


The company is seeking strategic investors to establish a new DCA-led gold refinery, assay laboratory and integrated precious-metals processing platform.

The website must not imply that the proposed refinery already exists, is already owned by DCA, or is currently producing gold.

The public document to upload is:

Diamond_Capital_Africa_Investment_Overview_2026.pdf

Rename it inside the project to:

diamond-capital-africa-investment-overview-2026.pdf

Do not publicly upload the editable Word document.

The complete confidential investment memorandum must not be placed in the public folder. It should only be supplied manually after investor verification, NDA and preliminary KYC.

==================================================
TASK 1: AUDIT AND CORRECT CONFLICTING WEBSITE CLAIMS
==================================================

Search the entire codebase for statements including:

- “our refinery”
- “DCA refinery”
- “Nakasero refinery”
- “licensed refinery”
- “we refine”
- “gold refined”
- “LBMA bars produced”
- “218 kg”
- “61 kg”
- “99.99% gold bars”
- “340 employees”
- “2,400+ miners”
- “12 export markets”
- “flagship refinery”
- “closed-loop refinery”
- “35% emissions reduction”
- any statement saying DCA currently owns or operates a refinery

Do not automatically retain these statements.

Where documentary proof has not been supplied, remove or rewrite them using accurate development-stage wording.

Use wording such as:

“Diamond Capital Africa is developing an integrated precious-metals processing platform through strategic partnerships.”

“DCA is seeking investment to establish a modern gold refinery and assay laboratory.”

“DCA works with mining, refining, logistics and international trading stakeholders while developing its own processing infrastructure.”

Do not describe partners’ facilities, production, licences, employees or exports as assets or achievements belonging to DCA.

Add “proposed”, “planned”, “target”, “preliminary” or “subject to due diligence” wherever appropriate.

==================================================
TASK 2: ADD THE PUBLIC PDF
==================================================

Place the public PDF at:

/public/investors/diamond-capital-africa-investment-overview-2026.pdf

Confirm that the PDF is accessible at:

/investors/diamond-capital-africa-investment-overview-2026.pdf

Use the PDF only as the public Investment Overview.

Do not expose the full confidential memorandum.

==================================================
TASK 3: CREATE A DEDICATED INVESTMENT PAGE
==================================================

Create the following route:

/investors/investment-opportunity

Use the website’s existing routing conventions.

Page title:

Strategic Investment Opportunity | Diamond Capital Africa

Meta description:

Explore Diamond Capital Africa’s proposed integrated precious-metals platform, including a planned gold refinery, assay laboratory, responsible-sourcing infrastructure and regional mining partnerships.

Open Graph title:

Building East Africa’s Integrated Precious Metals Platform

Open Graph description:

Diamond Capital Africa is seeking strategic investment to develop a modern gold refinery, assay laboratory and responsible precious-metals processing platform.

Use an appropriate existing company or project image for social sharing.

==================================================
TASK 4: BUILD THE INVESTMENT LANDING PAGE
==================================================

Build a polished, institutional-quality landing page with the following sections.

SECTION 1: HERO

Eyebrow:

STRATEGIC INVESTMENT OPPORTUNITY

Headline:

Building East Africa’s Integrated Precious Metals Platform

Supporting copy:

Diamond Capital Africa is seeking strategic investment to establish a modern gold refinery, assay laboratory and responsible-sourcing platform serving verified participants across East and Central Africa.

Add two primary actions:

1. Read Investment Overview
2. Download PDF

“Read Investment Overview” should scroll to or open the embedded PDF viewer.

“Download PDF” should download:

/investors/diamond-capital-africa-investment-overview-2026.pdf

Add a secondary action:

Request Confidential Memorandum

This should scroll to the investor enquiry form.

Add the following disclaimer directly under the buttons:

This opportunity remains at the development and capital-formation stage. All capacities, costs, projections and timelines are preliminary and subject to independent due diligence.

SECTION 2: INVESTMENT AT A GLANCE

Create four responsive cards:

Card 1:
USD 4 Million
Preliminary capital requirement

Card 2:
50 kg/month
Planned initial processing capacity

Card 3:
Up to 150 kg/month
Planned expansion capacity

Card 4:
9–12 months
Indicative development and commissioning pathway

Every card must include a small label saying:

Preliminary planning assumption

SECTION 3: THE OPPORTUNITY

Heading:

A Regional Precious-Metals Infrastructure Opportunity

Text:

Diamond Capital Africa intends to connect verified upstream production with institutional-grade assaying, refining, secure logistics, responsible-sourcing controls and approved international markets.

The project is expected to include:

- A new gold refinery
- A modern assay laboratory
- Secure receiving and vault infrastructure
- Responsible-sourcing and chain-of-custody systems
- Approved supplier and mining partnerships
- Secure export and international distribution coordination

SECTION 4: WHY THE PROJECT IS NEEDED

Create cards or columns covering:

Processing gap:
Many regional suppliers rely on third-party processing facilities, reducing control over timing, assay, costs and settlement.

Traceability demand:
Institutional counterparties increasingly require documented origin, beneficial ownership, sanctions screening and chain-of-custody.

Working-capital constraints:
Smaller operators frequently lack the capital required to mechanise, process inventory and meet export requirements.

Value capture:
Local assaying and processing can create service revenue and improve control over quality, recovery and settlement.

SECTION 5: PROPOSED REVENUE MODEL

Show the proposed revenue streams:

- Assay and laboratory fees
- Toll-refining fees
- Melting, casting and stamping services
- Secure storage and inventory services
- Logistics and export-preparation fees
- Controlled trading and distribution margins
- Participation in approved mining partnerships

Clearly label this section:

Proposed revenue streams subject to licensing, commercial agreements and due diligence.

SECTION 6: USE OF FUNDS

Create a clean breakdown using cards, a chart or progress bars:

- Site, design, permits and construction — 25.0%
- Refinery, assay and security equipment — 36.3%
- Working capital and bullion buffer — 22.5%
- Upstream partnership and pilot capital — 5.0%
- Compliance, advisers, insurance and contingency — 11.2%

Add:

The final capital budget will be determined through engineering design, vendor quotations, legal review, permitting and investor-approved financial modelling.

SECTION 7: PROJECTED DEVELOPMENT ROADMAP

Create a visual timeline:

Phase 1:
Project validation and due diligence

Phase 2:
Site selection, engineering and permits

Phase 3:
Financial close and procurement

Phase 4:
Construction and equipment installation

Phase 5:
Testing, commissioning and pilot operations

Phase 6:
Commercial ramp-up and expansion review

Avoid saying construction has started unless the repository contains verified evidence.

SECTION 8: INVESTOR PROTECTION

Include:

- Dedicated project vehicle or SPV
- Milestone-based capital deployment
- Dual-authorisation controls
- Approved budgets and procurement procedures
- Asset registers and insurance
- Investor reporting
- Independent legal, technical and financial due diligence
- Responsible-sourcing, KYC, AML and sanctions controls

SECTION 9: PDF READER

Heading:

Read the Investment Overview

Embed the PDF on desktop using a responsive object or iframe.

PDF source:

/investors/diamond-capital-africa-investment-overview-2026.pdf

Requirements:

- Minimum desktop viewer height of approximately 750px
- Full width within the content container
- Proper title attribute
- Lazy loading where supported
- Border and background matching the website
- Mobile-friendly fallback

On small screens, do not force users to navigate a tiny embedded viewer.

Instead display:

- A document preview card
- “Open PDF” button
- “Download PDF” button

Open PDF in a new browser tab for reading.

The download button must use the HTML download attribute where supported.

Track both events:

- investment_overview_opened
- investment_overview_downloaded

Reuse the site’s existing analytics system.

SECTION 10: INVESTOR ENQUIRY FORM

Heading:

Request the Confidential Investment Memorandum

Supporting copy:

The complete confidential memorandum is available to qualified investors and strategic partners following preliminary screening, NDA and KYC.

Required fields:

- Full name
- Organisation
- Position or role
- Business email
- Country
- Investor type
- Indicative investment range

Optional fields:

- Company website or LinkedIn profile
- Telephone or WhatsApp
- Message

Investor type options:

- Individual accredited or professional investor
- Family office
- Private equity or investment fund
- Strategic operating partner
- Trade-finance provider
- Development-finance institution
- Mining or refining company
- Other

Investment range options:

- USD 100,000–250,000
- USD 250,000–500,000
- USD 500,000–1 million
- USD 1–2 million
- USD 2 million+
- Prefer to discuss privately

Add a required checkbox:

“I consent to Diamond Capital Africa contacting me regarding this enquiry. I understand that this page is for preliminary discussion and does not constitute an offer of securities or a guarantee of returns.”

Add a link to the existing Privacy Policy.

Use the website’s existing contact-form API, database and email service.

Do not introduce a new paid service if the repository already has a working form system.

Validate all fields on both the client and server.

Add:

- spam honeypot
- rate limiting if supported
- email validation
- sanitisation
- accessible error messages
- loading state
- success state
- failure state

After successful submission, show:

“Thank you for your interest. Our team will review your information and contact you regarding the NDA, preliminary KYC and access to the confidential memorandum.”

Send an internal notification using the existing company contact email configuration.

Do not attach or automatically send the confidential memorandum.

Track:

investor_enquiry_submitted

SECTION 11: LEGAL DISCLAIMER

Add a clearly visible disclaimer at the bottom:

“This page and the accompanying Investment Overview are provided solely for preliminary discussion with qualified investors and strategic partners. They do not constitute an offer to sell securities, a solicitation to invest, investment advice, a financing commitment or a guarantee of returns. All project, financial, operational, legal, technical and ESG information remains subject to independent verification, due diligence and definitive agreements.”

==================================================
TASK 5: UPDATE NAVIGATION
==================================================

Within the existing Investors menu, add:

Investment Opportunity

Link it to:

/investors/investment-opportunity

Do not create a second competing Investors menu.

Add a footer link under the existing Investors heading:

Investment Opportunity

==================================================
TASK 6: ADD A HOMEPAGE INVESTMENT SECTION
==================================================

Add a homepage section after the main company introduction and before news, reports or events.

Eyebrow:

STRATEGIC CAPITAL

Heading:

Help Build East Africa’s Integrated Precious Metals Platform

Text:

Diamond Capital Africa is seeking strategic partners to support the development of a proposed modern refinery, assay laboratory and responsible-sourcing infrastructure.

Buttons:

Explore the Opportunity
Download Overview

Explore the Opportunity links to:

/investors/investment-opportunity

Download Overview links to:

/investors/diamond-capital-africa-investment-overview-2026.pdf

The section must be responsive and visually consistent with the existing site.

==================================================
TASK 7: ADD AN INVESTOR RESOURCE CARD
==================================================

On the main Investors page, add a featured resource card:

Title:

Diamond Capital Africa Investment Overview 2026

Description:

A public overview of the proposed integrated precious-metals processing platform, preliminary capital requirement, project components, financial projections, governance framework and investor engagement process.

Metadata:

PDF · 10 pages · July 2026

Buttons:

Read Online
Download PDF
Request Confidential Memorandum

==================================================
TASK 8: ACCESSIBILITY AND PERFORMANCE
==================================================

Ensure:

- Semantic HTML
- Correct heading order
- Keyboard-accessible controls
- Visible focus states
- Accessible labels
- Adequate colour contrast
- Responsive design
- No layout shifts
- Optimised images
- PDF viewer is lazy-loaded
- Buttons have descriptive labels
- Forms work correctly on mobile
- No duplicated navigation
- No console errors
- No broken links

==================================================
TASK 9: FINAL TESTING
==================================================

Test:

- Desktop
- Tablet
- Mobile
- Chrome
- Firefox
- Safari-compatible behaviour
- All download links
- PDF inline viewing
- Investor form validation
- Form success and failure
- Analytics events
- Navigation
- Footer links
- SEO metadata
- Open Graph metadata
- Existing pages for regressions

Run the project’s existing:

- formatter
- linter
- type checker
- unit tests
- production build

Fix all errors introduced by this work.

==================================================
TASK 10: FINAL RESPONSE
==================================================

After completing the implementation, report:

1. Files created
2. Files modified
3. Routes added
4. Claims removed or rewritten
5. Form submission destination
6. Analytics events added
7. Environment variables required
8. Any items requiring manual configuration
9. Confirmation that the production build passes

Do not invent licences, production numbers, facilities, employees, partners, customers, export markets or regulatory approvals.
