# Cursor Prompt — Update Diamond Capital Africa Investment Opportunity Page

Update the existing **Diamond Capital Africa Investment Opportunity** page:

`/investors/investment-opportunity`

Current public page:
`https://www.diamondcapitalafrica.com/investors/investment-opportunity`

## Objective

Improve the page so a serious investor can clearly understand:

1. What Diamond Capital Africa is building.
2. Why the company is raising approximately **USD 4 million**.
3. What a USD 1 million investment could represent.
4. How investor ownership could be structured.
5. How investors may potentially receive distributions in:

   * Cash
   * Refined physical gold
   * A combination of cash and gold
6. How the investor participates in the long-term upside of the refinery.
7. That all figures shown are illustrative and subject to final valuation, due diligence, legal documentation, regulatory requirements and negotiated investment agreements.

Do **not** present any return as guaranteed.

Do not redesign the entire website. Maintain the existing Diamond Capital Africa branding, typography, spacing, responsive layout and premium institutional look.

---

# 1. ADD A NEW SECTION: "HOW INVESTORS PARTICIPATE"

Add this section after the main investment overview / capital requirement section and before detailed financial projections.

Use a strong headline such as:

## More Than a Financial Investment

Supporting copy:

Diamond Capital Africa is exploring investment structures designed to give qualified investors exposure to both the economic growth of the refinery platform and the underlying precious-metals ecosystem.

Depending on the final investment structure, investors may participate through equity ownership, preferred economic rights, strategic partnership arrangements, or a combination of these.

Qualified investors may also have the option to receive eligible investment distributions in cash, refined physical gold, or a combination of both.

Add three premium cards:

### Equity Participation

Investors may acquire an ownership interest in the refinery project or designated investment vehicle, allowing them to participate in the long-term growth and value creation of the business.

### Gold-Linked Distributions

Where permitted under the final investment agreement, eligible distributions may be settled in refined physical gold rather than cash.

The amount of gold delivered would be calculated using an agreed international gold-price benchmark at the applicable settlement date.

### Hybrid Structure

Investors may potentially combine equity participation with cash and/or gold-linked distributions, subject to the negotiated investment structure.

Add a small disclaimer below:

> Investment structures will be individually negotiated with qualified investors. Nothing presented on this page constitutes a guaranteed return, public offer, prospectus, or commitment to deliver a fixed quantity of gold.

---

# 2. ADD A SECTION: "WHAT COULD A USD 1 MILLION INVESTMENT LOOK LIKE?"

This should be one of the strongest sections on the page.

Use a clean visual investment breakdown.

Use the following illustrative assumptions:

* Target capital raise: **USD 4,000,000**
* Illustrative pre-money valuation: **USD 8,000,000**
* Illustrative post-money valuation: **USD 12,000,000**
* Example investment: **USD 1,000,000**

Calculate:

`Investor ownership = Investment / Post-money valuation`

Therefore:

`1,000,000 / 12,000,000 = 8.33%`

Show:

### USD 1M Illustrative Investment

**Capital invested**
USD 1,000,000

**Illustrative project ownership**
8.33%

**Illustrative post-money valuation**
USD 12,000,000

**Potential distribution options**
Cash / Refined Gold / Hybrid

Add this important explanation:

> A USD 1 million investment does not automatically represent 25% ownership simply because the total capital requirement is USD 4 million. Equity ownership is determined by the agreed company or project valuation at the time of investment.

Also show:

If the full USD 4 million round were raised at an USD 8 million pre-money valuation:

* New investors collectively: **33.33%**
* Existing shareholders / project sponsors: **66.67%**

Calculate these values programmatically rather than hard-coding them wherever practical.

---

# 3. ADD AN INTERACTIVE INVESTMENT CALCULATOR

Create a polished calculator component titled:

## Explore an Illustrative Investment

Allow the user to change:

### Investment Amount

Slider or number input.

Suggested range:

USD 250,000 – USD 4,000,000

Default:

USD 1,000,000

### Pre-Money Valuation

Default:
USD 8,000,000

Allow it to be adjustable if appropriate.

Calculate dynamically:

`Post Money Valuation = Pre Money Valuation + Total Round`

For the current model, total round = USD 4,000,000.

Then calculate:

`Ownership % = Individual Investment / Post Money Valuation × 100`

For a USD 1M investment at USD 8M pre-money and USD 4M total round:

Ownership = **8.33%**

Display calculations clearly.

Do not imply that the calculator constitutes an offer.

Label calculations:

**Illustrative only**

---

# 4. ADD "POTENTIAL GOLD-LINKED DISTRIBUTIONS"

Create a section explaining the gold concept clearly.

Headline:

## The Option to Receive Value in Gold

Suggested copy:

Gold is not only the commodity processed by the proposed refinery — it may also form part of the investor settlement structure.

Subject to profitability, board approval, applicable laws, regulatory requirements and the final investment agreement, qualified investors may be able to elect to receive eligible investment distributions:

* In cash
* In refined physical gold
* Or through a combination of both

The financial value of the approved distribution would first be determined in the applicable currency.

Where the investor elects physical gold, the corresponding weight of gold would then be calculated using the agreed international benchmark price at the settlement date.

---

# 5. ADD A GOLD DISTRIBUTION CALCULATOR

Create an interactive example.

Inputs:

### Investment Amount

Default: USD 1,000,000

### Illustrative Distribution Rate

Allow:
3%
5%
8%
10%
12%

Default:
8%

Do not call this a "guaranteed return".

Call it:

**Illustrative annual distribution rate**

Calculate:

`Distribution Value = Investment × Distribution Rate`

Example:

USD 1,000,000 × 8% = USD 80,000

Then calculate gold equivalent:

`Gold Weight = Distribution Value / Gold Price Per Gram`

If the project already has a gold-price utility/API, use it.

If not, create the architecture so the gold price can later come from an API.

For now, either:

1. Use the existing gold spot-price source in the project, if one exists.

OR

2. Allow the gold price to be manually configured from a single constants/config file.

Clearly show:

**Example**

Investment:
USD 1,000,000

Illustrative annual distribution:
8%

Distribution value:
USD 80,000

Gold price:
Dynamic / configured spot benchmark

Gold equivalent:
Calculate dynamically in grams and kilograms.

Example format:

`567 g`

or

`0.567 kg`

Do not permanently hard-code 567g because gold prices change.

Add:

> The quantity of gold shown is illustrative and changes with the applicable gold price. Any actual gold settlement would be determined using the benchmark and pricing mechanism contained in the final investment agreement.

---

# 6. ADD AN ILLUSTRATIVE DISTRIBUTION RAMP

We do not want to imply that investors start receiving large distributions immediately while the refinery is under development.

Create a section:

## Illustrative Distribution Profile

Use the existing project financial model.

Display something like:

| Year   | Project Stage               | Illustrative Distribution |
| ------ | --------------------------- | ------------------------- |
| Year 1 | Development & Commissioning | 0%                        |
| Year 2 | Early Commercial Operations | Up to 3%                  |
| Year 3 | Scale-Up                    | Up to 8%                  |
| Year 4 | Growth                      | Up to 10%                 |
| Year 5 | Established Operations      | Up to 10%                 |

Important:

Use wording such as:

* "Illustrative"
* "Potential"
* "Up to"
* "Subject to distributable profits"

Never state these as guaranteed payments.

Add:

> The above profile is an illustration of how distributions could potentially increase as operations mature. Actual distributions would depend on profitability, working-capital requirements, debt obligations, board approval, applicable laws and the investor's final agreement.

---

# 7. CONNECT THIS TO THE EXISTING FINANCIAL PROJECTIONS

The existing page currently uses approximately these base-case EBITDA projections:

* Year 1: **-USD 50,000**
* Year 2: **USD 300,000**
* Year 3: **USD 900,000**
* Year 4: **USD 1,560,000**
* Year 5: **USD 2,140,000**

Keep the existing model if these numbers are already in the code.

Do not duplicate data manually if there is already a source of truth.

Where possible create one financial-data object and reuse it in:

* Projection chart
* Investment illustrations
* Distribution examples
* Calculator

Add contextual explanation:

> The proposed distribution structure is intentionally designed to align investor returns with the growth of the underlying business rather than placing excessive cash-flow pressure on the refinery during construction and early operations.

---

# 8. ADD "INVESTOR STRUCTURES"

Create three cards.

## Growth Investor

Best suited to investors primarily seeking long-term capital appreciation.

Possible structure:

* Higher equity participation
* Lower preferred distributions
* Long-term refinery value appreciation
* Potential exit through secondary sale, strategic acquisition, founder/company buyback, or other agreed mechanism

Do not specify a guaranteed ownership percentage.

---

## Gold Income Investor

Best suited to investors seeking periodic exposure to physical gold.

Possible structure:

* Equity participation
* Preferred distribution rights
* Ability to elect approved distributions in refined gold
* Gold quantity calculated using an agreed settlement benchmark

---

## Strategic Investor

Best suited to:

* Mining groups
* Gold traders
* Refineries
* Family offices
* Commodity trading groups
* Institutional investors

Potential benefits may include negotiated:

* Equity
* Board or observer rights
* Strategic supply arrangements
* Refining access
* Offtake arrangements
* Gold-linked distributions

All subject to final agreements.

---

# 9. ADD A STRONG EXAMPLE CALL-OUT

Create a visually prominent panel.

Headline:

## Example: USD 1 Million Investment

Copy:

An investor committing USD 1 million may potentially participate in the ownership and long-term growth of the refinery while also receiving approved investment distributions.

Using an illustrative USD 8 million pre-money valuation and USD 4 million capital raise, a USD 1 million investment would represent approximately **8.33% ownership**.

If, in a future profitable year, the investor were approved for an 8% distribution, this would represent:

**USD 80,000**

The investor could potentially elect to receive that approved value:

**USD 80,000 cash**

OR

**USD 80,000 equivalent in refined gold**

OR

**A combination of cash and gold**

The actual gold quantity would depend on the agreed benchmark price at settlement.

Highlight this sentence:

> Participate in the ownership of gold infrastructure — and potentially receive your distributions in gold itself.

---

# 10. UPDATE THE MAIN HERO / INTRODUCTION

Do not make the hero overly promotional.

Keep it institutional.

Suggested subheading:

> A proposed integrated gold refining, assay and precious-metals platform connecting responsible African supply with international markets.

Add a short secondary line:

> Qualified investors may explore equity, strategic and gold-linked participation structures.

Do not write:

"Guaranteed gold returns"

Do not write:

"Earn X% guaranteed"

Do not write:

"Invest $1M and receive X kg of gold"

---

# 11. ADD A "WHY GOLD-LINKED DISTRIBUTIONS?" SECTION

Use 3–4 benefits.

### Physical Asset Exposure

Investors who prefer precious metals may elect to receive eligible distributions in an asset they already understand and value.

### Flexible Settlement

Approved distributions may potentially be settled in cash, gold, or a combination.

### Direct Connection to the Business

The settlement asset is directly related to the refinery's core industry.

### Long-Term Participation

Gold-linked distributions can complement the investor's equity exposure to the growth of the underlying refinery platform.

Keep the wording sophisticated and credible.

---

# 12. UPDATE INVESTOR PROTECTION / RISK SECTION

Make sure the page clearly communicates:

* Returns are not guaranteed.
* Financial projections are forward-looking estimates.
* Gold prices fluctuate.
* Equity values can increase or decrease.
* Refinery construction and commissioning involve execution risk.
* Distributions depend on available distributable profits.
* Gold settlement is subject to legal, regulatory, tax, AML/KYC and export requirements.
* All investment terms are subject to negotiation and definitive agreements.
* Information on the page is for discussion and preliminary evaluation only.

Do not make unsupported legal claims.

---

# 13. ADD CALL TO ACTION

Near the end:

## Discuss an Investment Structure

Copy:

We welcome discussions with qualified investors, family offices, strategic partners, precious-metals companies and institutions interested in participating in the development of the platform.

Potential investment structures can be tailored around the investor's objectives, including equity participation, strategic rights and eligible distributions in cash or refined gold.

CTA button:

**Request Investment Memorandum**

Secondary CTA:

**Discuss an Investment Structure**

Use existing contact mechanisms already in the project.

---

# 14. DESIGN REQUIREMENTS

Maintain the existing site's visual identity.

The new sections should feel:

* Institutional
* Premium
* Serious
* Investment-grade
* Modern
* Minimal
* Not like a crypto scheme
* Not like a high-yield investment website

Avoid excessive gold gradients, coins, money graphics or flashy investment imagery.

Use restrained gold accents only if they already exist in the Diamond Capital Africa design system.

Prioritize:

* Strong typography
* Large figures
* Data cards
* Clean charts
* Subtle borders
* Plenty of whitespace
* Responsive mobile layout

---

# 15. TECHNICAL REQUIREMENTS

Before editing:

1. Inspect the existing page and components.
2. Reuse existing components and design tokens wherever possible.
3. Identify where the financial assumptions currently live.
4. Create reusable constants/data structures rather than repeating numbers.
5. Keep calculations in utility functions.
6. Format USD numbers correctly.
7. Format percentages correctly.
8. Format gold weights:

   * Below 1,000g → grams
   * 1,000g+ → kilograms
9. Ensure calculations are responsive to input changes.
10. Avoid hydration errors if using Next.js.
11. Keep accessibility in mind.
12. Ensure mobile layout remains clean.
13. Run lint/type-check/build after changes.
14. Fix any errors caused by the implementation.

---

# 16. FINANCIAL CALCULATION FUNCTIONS

Create reusable functions for calculations such as:

```ts
calculatePostMoneyValuation(preMoney, roundSize)

calculateInvestorOwnership(investmentAmount, postMoneyValuation)

calculateDistributionValue(investmentAmount, distributionRate)

calculateGoldEquivalent(distributionValue, goldPricePerGram)
```

Example:

```ts
const preMoney = 8_000_000
const roundSize = 4_000_000
const investment = 1_000_000

const postMoney = preMoney + roundSize
// $12,000,000

const ownership = investment / postMoney
// 8.3333%
```

Do not unnecessarily duplicate these calculations throughout components.

---

# 17. IMPORTANT CONTENT PRINCIPLE

The page must communicate this idea clearly:

**The investment is not simply a promise to exchange money for gold.**

The investor is financing and potentially acquiring an economic interest in a real precious-metals infrastructure business.

Gold is an optional method through which approved investment distributions may potentially be settled.

The final page should leave the investor thinking:

> "I can participate in the growth of a gold refinery and, if the agreed structure permits, receive part of my investment distributions in physical gold."

That is the core proposition.

---

# 18. FINAL REVIEW

After making the changes:

* Review the entire page for repetition.
* Remove conflicting old language.
* Check that no section implies guaranteed returns.
* Make sure USD 1M investment examples calculate correctly.
* Make sure a USD 8M pre-money + USD 4M raise = USD 12M post-money.
* Confirm USD 1M / USD 12M = approximately 8.33%.
* Confirm total new investor ownership on the USD 4M raise = approximately 33.33%.
* Confirm existing shareholder ownership after the round = approximately 66.67%.
* Ensure gold-equivalent calculations use the current/configured price rather than a hard-coded weight.
* Preserve all important existing information about the refinery, assay lab, sourcing, security, projected capacity and financial model.
* Improve the investment story rather than replacing the entire page.
