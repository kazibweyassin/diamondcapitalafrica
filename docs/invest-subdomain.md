# Landing subdomains

The project supports two focused landing subdomains:

- `invest.diamondcapitalafrica.com/` rewrites to `/invest` for Uganda business market-entry enquiries.
- `business.diamondcapitalafrica.com/` rewrites to `/business` for fixed-fee company registration enquiries.

`src/proxy.ts` rewrites page requests for these hostnames to their matching routes; API requests, Next.js internals and requests for files with extensions bypass the rewrite. Requests for the apex and `www` domains continue through the existing routes.

## Vercel and DNS setup

1. In the Vercel project that deploys this repository, add both `invest.diamondcapitalafrica.com` and `business.diamondcapitalafrica.com` under **Settings → Domains**. Keep the existing apex and `www` domains on the same project.
2. At the DNS provider for `diamondcapitalafrica.com`, add the records Vercel displays for the new domains. They are commonly `CNAME` records with names/hosts `invest` and `business` and target `cname.vercel-dns.com`; use the exact targets shown by the Vercel domain screen if they differ.
3. Wait for Vercel to report the domains as configured and for HTTPS certificate provisioning to complete. Verify `https://invest.diamondcapitalafrica.com/`, `https://business.diamondcapitalafrica.com/`, `https://www.diamondcapitalafrica.com/` and `https://diamondcapitalafrica.com/` separately. The code change alone does not make either subdomain live.

No new environment variables are required for routing. Enquiries are stored in the existing PostgreSQL `Enquiry` table. To send email notifications as well, configure the existing server-only SMTP variables `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and optionally `SMTP_FROM` and `INVESTOR_NOTIFICATION_EMAIL` in the Vercel project. If SMTP is unavailable, the API still stores the enquiry for review in the existing admin dashboard.

## Content verification

The landing page uses no market statistics, featured projects, promised returns, tariffs or incentive claims. Its general East African Community context and every product-specific market-access, tariff, licensing or eligibility question should still be confirmed by a qualified adviser for the particular company and product. Potential partners, projects and introductions must be screened before they are presented as verified.

Hero photography: Robin Kutesa, “City skyline bathed in warm sunset light,” Kampala, via Unsplash: https://unsplash.com/photos/city-skyline-bathed-in-warm-sunset-light-Q3ymlvOJGFs
