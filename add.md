ADD A SMART INVESTMENT OPPORTUNITY POP-UP

Create a responsive investment-opportunity modal for new website visitors.

The modal must promote Diamond Capital Africa’s proposed precious-metals investment project without implying that the refinery already exists or that investment returns are guaranteed.

DISPLAY RULES

Show the modal when either of these conditions is met:

1. The visitor has remained on the website for 10 seconds
2. The visitor has scrolled at least 40% of the current page

Whichever condition happens first should trigger the modal.

Do not display the modal:

- Immediately when the page loads
- More than once during the same session
- If the visitor dismissed it within the last 30 days
- On the investment-opportunity page
- On privacy, legal or contact-form success pages
- While another modal or mobile navigation menu is open

Use localStorage or the website’s existing cookie-preference system to remember dismissal.

Suggested localStorage key:

dca_investment_popup_dismissed

Store the dismissal date and suppress the pop-up for 30 days.

POP-UP CONTENT

Eyebrow:

STRATEGIC INVESTMENT OPPORTUNITY

Headline:

Help Build East Africa’s Integrated Precious Metals Platform

Description:

Diamond Capital Africa is seeking strategic investors and operating partners to support the development of a proposed modern gold refinery, assay laboratory and responsible-sourcing infrastructure.

Investment highlights:

- Preliminary capital requirement: USD 4 million
- Planned initial capacity: 50 kg per month
- Planned expansion capacity: Up to 150 kg per month
- Development and commissioning target: 9–12 months

Add a small label below the highlights:

All figures are preliminary planning assumptions and remain subject to independent due diligence.

PRIMARY BUTTON

Text:

Explore the Opportunity

Link:

/investors/investment-opportunity

SECONDARY BUTTON

Text:

Download Investment Overview

Link:

/investors/diamond-capital-africa-investment-overview-2026.pdf

The download button should use the HTML download attribute where supported.

TERTIARY TEXT LINK

Text:

Not now

This closes the modal and stores the dismissal date.

LEGAL NOTICE

Add the following notice in smaller text:

This communication is provided solely for preliminary discussion. It does not constitute an offer of securities, investment advice, a financing commitment or a guarantee of returns.

DESIGN REQUIREMENTS

Use the existing Diamond Capital Africa design system.

The desktop version should:

- Appear as a centred modal
- Have a maximum width of approximately 620px
- Use a dark overlay behind the modal
- Include a visible close button
- Use refined corporate styling
- Include subtle gold or premium metallic accents
- Avoid excessive animation
- Use a short fade-and-rise entrance animation
- Lock background scrolling while open

The mobile version should:

- Appear as a bottom sheet
- Use nearly the full screen width
- Keep the buttons large and touch-friendly
- Allow vertical scrolling when content exceeds the screen height
- Keep the close button clearly visible

ACCESSIBILITY

Include:

- role="dialog"
- aria-modal="true"
- aria-labelledby
- aria-describedby
- Keyboard focus trapping
- Escape-key closing
- Focus returned to the previously active element after closing
- Visible focus states
- Accessible close-button label
- Respect for prefers-reduced-motion

ANALYTICS

Track the following events using the website’s existing analytics system:

investment_popup_viewed

investment_popup_dismissed

investment_popup_opportunity_clicked

investment_popup_download_clicked

Include the page path where the event occurred.

Do not track the modal as viewed until it becomes visible to the visitor.

CONVERSION IMPROVEMENT

When the visitor clicks “Explore the Opportunity,” close the modal and navigate to:

/investors/investment-opportunity

When the visitor downloads the overview, allow the download and keep the modal open unless the existing user-experience pattern suggests otherwise.

Do not request the visitor’s email directly inside this first pop-up.

The purpose of the pop-up is to create awareness and direct interested visitors to the dedicated investor page. Investor details should be collected through the complete investor enquiry form on that page.

TESTING

Confirm that:

- The modal appears only after the configured trigger
- It does not appearre repeatedly
- Dismissal is remembered for 30 days
- It works on desktop and mobile
- Keyboard navigation works
- Escape closes it
- The PDF download works
- The investor-page link works
- It is not displayed on excluded pages
- No hydration or rendering errors are introduced
- The production build passes