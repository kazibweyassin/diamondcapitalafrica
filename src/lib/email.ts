import nodemailer from "nodemailer";
import { company } from "@/data/content";
import { getInstitutionalMembershipPayment } from "@/lib/network-membership-config";
import { siteUrl } from "@/lib/seo";
import { escapeHtml } from "@/lib/html";

function smtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
}

function createTransport() {
  const port = Number(process.env.SMTP_PORT ?? 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export function isEmailConfigured() {
  return smtpConfigured();
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  if (!smtpConfigured()) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS."
    );
  }

  const from =
    process.env.SMTP_FROM ?? `${company.name} <${process.env.SMTP_USER}>`;

  await createTransport().sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}

export async function sendInstitutionalApplicationEmail({
  to,
  contactName,
  companyName,
  reference,
}: {
  to: string;
  contactName: string;
  companyName: string;
  reference: string;
}) {
  const accessUrl = `${siteUrl}/network/access`;
  const { tier } = getInstitutionalMembershipPayment();

  const text = [
    `Dear ${contactName},`,
    "",
    `Thank you for applying to the ${company.name} Institutional Gold Network.`,
    "",
    `Reference: ${reference}`,
    `Company: ${companyName}`,
    `Membership: ${tier.name}. There is no membership fee.`,
    "",
    "DCA will review the application. Portal credentials are emailed after approval.",
    `Application page: ${accessUrl}`,
    "",
    `${company.contactName}: ${company.name}`,
    company.investorsEmail,
    company.phone,
    `Alt (if primary offline): ${company.phoneAlt}`,
  ].join("\n");

  const html = `
    <p>Dear ${contactName},</p>
    <p>Thank you for applying to the <strong>${company.name} Institutional Gold Network</strong>.</p>
    <p><strong>Reference:</strong> ${reference}<br />
    <strong>Company:</strong> ${companyName}<br />
    <strong>Membership:</strong> ${tier.name}. There is no membership fee.</p>
    <p>DCA will review the application. Portal credentials are emailed after approval.<br />
    <a href="${accessUrl}">View your application page</a></p>
    <p>${company.contactName}: ${company.name}<br />
    <a href="mailto:${company.investorsEmail}">${company.investorsEmail}</a> · ${company.phone} · Alt: ${company.phoneAlt}</p>
  `;

  await sendEmail({
    to,
    subject: `${company.name} Institutional Network: application received (${reference})`,
    text,
    html,
  });
}

export async function sendInvestorEnquiryNotification({
  reference,
  name,
  email,
  organisation,
  position,
  country,
  investorType,
  investmentRange,
  website,
  phone,
  message,
}: {
  reference: string;
  name: string;
  email: string;
  organisation: string;
  position: string;
  country: string;
  investorType: string;
  investmentRange: string;
  website?: string;
  phone?: string;
  message?: string;
}) {
  const safe = {
    reference: escapeHtml(reference), name: escapeHtml(name), email: escapeHtml(email),
    organisation: escapeHtml(organisation), position: escapeHtml(position), country: escapeHtml(country),
    investorType: escapeHtml(investorType), investmentRange: escapeHtml(investmentRange),
    website: website ? escapeHtml(website) : "", phone: phone ? escapeHtml(phone) : "",
    message: message ? escapeHtml(message).replace(/\n/g, "<br />") : "(none)",
  };
  const to =
    process.env.INVESTOR_NOTIFICATION_EMAIL ??
    company.investorsEmail ??
    company.email;

  const text = [
    `New investor enquiry (${reference})`,
    "",
    `Name: ${name}`,
    `Organisation: ${organisation}`,
    `Position: ${position}`,
    `Email: ${email}`,
    `Country: ${country}`,
    `Investor type: ${investorType}`,
    `Indicative range: ${investmentRange}`,
    website ? `Website / LinkedIn: ${website}` : null,
    phone ? `Phone / WhatsApp: ${phone}` : null,
    "",
    "Message:",
    message || "(none)",
    "",
    "Do not auto-send the confidential memorandum. Complete screening, NDA and preliminary KYC first.",
  ]
    .filter((line) => line !== null)
    .join("\n");

  const html = `
    <p><strong>New investor enquiry</strong> (${safe.reference})</p>
    <ul>
      <li><strong>Name:</strong> ${safe.name}</li>
      <li><strong>Organisation:</strong> ${safe.organisation}</li>
      <li><strong>Position:</strong> ${safe.position}</li>
      <li><strong>Email:</strong> ${safe.email}</li>
      <li><strong>Country:</strong> ${safe.country}</li>
      <li><strong>Investor type:</strong> ${safe.investorType}</li>
      <li><strong>Indicative range:</strong> ${safe.investmentRange}</li>
      ${website ? `<li><strong>Website / LinkedIn:</strong> ${safe.website}</li>` : ""}
      ${phone ? `<li><strong>Phone / WhatsApp:</strong> ${safe.phone}</li>` : ""}
    </ul>
    <p><strong>Message</strong></p>
    <p>${safe.message}</p>
    <p><em>Do not auto-send the confidential memorandum. Complete screening, NDA and preliminary KYC first.</em></p>
  `;

  await sendEmail({
    to,
    subject: `[Investor] Confidential memorandum request — ${reference}`,
    text,
    html,
  });
}

export async function sendGoldSavingsConfirmation({ to, name, subject, lines }: { to: string; name: string; subject: string; lines: string[] }) {
  const text = [`Dear ${name},`, "", ...lines, "", `Gold Savings dashboard: ${siteUrl}/gold-savings`, "", company.name].join("\n");
  const htmlLines = lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
  await sendEmail({
    to,
    subject,
    text,
    html: `<p>Dear ${escapeHtml(name)},</p>${htmlLines}<p><a href="${siteUrl}/gold-savings">Open your Gold Savings dashboard</a></p><p>${escapeHtml(company.name)}</p>`,
  });
}

export async function sendSupplierPortalEmail({
  to,
  contactName,
  companyName,
  reference,
  password,
}: {
  to: string;
  contactName: string;
  companyName: string;
  reference: string;
  password: string;
}) {
  const loginUrl = `${siteUrl}/network/supplier/login`;
  const text = [
    `Dear ${contactName},`,
    "",
    `${company.name} has opened a supplier portal for ${companyName}.`,
    "",
    `Reference: ${reference}`,
    `Sign in: ${loginUrl}`,
    `Email: ${to}`,
    `Temporary password: ${password}`,
    "",
    "Use it to offer a lot to Diamond Capital Africa. Buyers are not shown your company, site, or documents.",
    "",
    `${company.contactName}: ${company.name}`,
    company.email,
    company.phone,
  ].join("\n");

  await sendEmail({
    to,
    subject: `${company.name} supplier portal`,
    text,
    html: `<p>Dear ${escapeHtml(contactName)},</p><p>${escapeHtml(company.name)} has opened a supplier portal for ${escapeHtml(companyName)}.</p><p>Reference: ${escapeHtml(reference)}<br/>Email: ${escapeHtml(to)}<br/>Temporary password: ${escapeHtml(password)}</p><p><a href="${loginUrl}">Sign in and offer a lot</a></p><p>Buyers are not shown your company, site, or documents.</p>`,
  });
}

export async function sendInstitutionalCredentialsEmail({
  to,
  contactName,
  companyName,
  reference,
  password,
}: {
  to: string;
  contactName: string;
  companyName: string;
  reference: string;
  password: string;
}) {
  const loginUrl = `${siteUrl}/network/login`;

  const text = [
    `Dear ${contactName},`,
    "",
    `Your institutional membership for the ${company.name} Institutional Gold Network has been activated.`,
    "",
    `Reference: ${reference}`,
    `Company: ${companyName}`,
    "",
    "Portal sign-in:",
    `URL: ${loginUrl}`,
    `Email: ${to}`,
    `Temporary password: ${password}`,
    "",
    "Sign in to browse Level 3+ verified supply and submit structured quote requests through the Verified Gold Exchange.",
    "",
    "Keep this password confidential. Contact us if you need it reset.",
    "",
    `${company.contactName}: ${company.name}`,
    company.email,
    company.phone,
    `Alt (if primary offline): ${company.phoneAlt}`,
  ].join("\n");

  const html = `
    <p>Dear ${contactName},</p>
    <p>Your institutional membership for the <strong>${company.name} Institutional Gold Network</strong> has been activated.</p>
    <p><strong>Reference:</strong> ${reference}<br />
    <strong>Company:</strong> ${companyName}</p>
    <p><strong>Portal sign-in</strong></p>
    <ul>
      <li><strong>URL:</strong> <a href="${loginUrl}">${loginUrl}</a></li>
      <li><strong>Email:</strong> ${to}</li>
      <li><strong>Temporary password:</strong> <code>${password}</code></li>
    </ul>
    <p>Sign in to browse Level 3+ verified supply and submit structured quote requests through the Verified Gold Exchange.</p>
    <p>Keep this password confidential. Contact us if you need it reset.</p>
    <p>${company.contactName}: ${company.name}<br />
    <a href="mailto:${company.email}">${company.email}</a> · ${company.phone} · Alt: ${company.phoneAlt}</p>
  `;

  await sendEmail({
    to,
    subject: `Your ${company.name} Institutional Gold Network access`,
    text,
    html,
  });
}
