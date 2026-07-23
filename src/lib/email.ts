import nodemailer from "nodemailer";
import { company } from "@/data/content";
import { getInstitutionalMembershipPayment } from "@/lib/network-membership-config";
import { siteUrl } from "@/lib/seo";

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
  const { tier, usdt, wire } = getInstitutionalMembershipPayment();

  const text = [
    `Dear ${contactName},`,
    "",
    `Thank you for applying to the ${company.name} Institutional Gold Network.`,
    "",
    `Reference: ${reference}`,
    `Company: ${companyName}`,
    `Membership: ${tier.name}: $${tier.feeUsd.toLocaleString()} / ${tier.period}`,
    "",
    "Payment instructions:",
    "",
    `Option 1: USDT (${usdt.networkGuide.label})`,
    `Amount: ${usdt.amount.toLocaleString()} USDT`,
    `Wallet: ${usdt.wallet}`,
    `Reference / memo: ${reference}`,
    `Binance: choose network ${usdt.networkGuide.binanceLabel}`,
    "",
    "Option 2: Bank wire",
    `Email ${wire.email} with reference ${reference} for a proforma invoice and bank details.`,
    "",
    "Portal credentials are emailed after DCA confirms your payment.",
    `Payment details: ${accessUrl}`,
    "",
    `${company.contactName}: ${company.name}`,
    company.investorsEmail,
    company.phone,
  ].join("\n");

  const html = `
    <p>Dear ${contactName},</p>
    <p>Thank you for applying to the <strong>${company.name} Institutional Gold Network</strong>.</p>
    <p><strong>Reference:</strong> ${reference}<br />
    <strong>Company:</strong> ${companyName}<br />
    <strong>Membership:</strong> ${tier.name}: $${tier.feeUsd.toLocaleString()} / ${tier.period}</p>
    <p><strong>Option 1: USDT (${usdt.networkGuide.label})</strong></p>
    <ul>
      <li><strong>Amount:</strong> ${usdt.amount.toLocaleString()} USDT</li>
      <li><strong>Network:</strong> ${usdt.networkGuide.label}</li>
      <li><strong>Wallet:</strong> <code>${usdt.wallet}</code></li>
      <li><strong>Reference / memo:</strong> <code>${reference}</code></li>
      <li><strong>Binance:</strong> select network <strong>${usdt.networkGuide.binanceLabel}</strong></li>
    </ul>
    <p><strong>Option 2: Bank wire</strong><br />
    Email <a href="mailto:${wire.email}">${wire.email}</a> with reference <code>${reference}</code> for a proforma invoice and bank details.</p>
    <p>Portal credentials are emailed after DCA confirms your payment.<br />
    <a href="${accessUrl}">View payment instructions online</a></p>
    <p>${company.contactName}: ${company.name}<br />
    <a href="mailto:${company.investorsEmail}">${company.investorsEmail}</a> · ${company.phone}</p>
  `;

  await sendEmail({
    to,
    subject: `${company.name} Institutional Network: payment instructions (${reference})`,
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
    <p><strong>New investor enquiry</strong> (${reference})</p>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Organisation:</strong> ${organisation}</li>
      <li><strong>Position:</strong> ${position}</li>
      <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
      <li><strong>Country:</strong> ${country}</li>
      <li><strong>Investor type:</strong> ${investorType}</li>
      <li><strong>Indicative range:</strong> ${investmentRange}</li>
      ${website ? `<li><strong>Website / LinkedIn:</strong> ${website}</li>` : ""}
      ${phone ? `<li><strong>Phone / WhatsApp:</strong> ${phone}</li>` : ""}
    </ul>
    <p><strong>Message</strong></p>
    <p>${message ? message.replace(/\n/g, "<br />") : "(none)"}</p>
    <p><em>Do not auto-send the confidential memorandum. Complete screening, NDA and preliminary KYC first.</em></p>
  `;

  await sendEmail({
    to,
    subject: `[Investor] Confidential memorandum request — ${reference}`,
    text,
    html,
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
    <a href="mailto:${company.email}">${company.email}</a> · ${company.phone}</p>
  `;

  await sendEmail({
    to,
    subject: `Your ${company.name} Institutional Gold Network access`,
    text,
    html,
  });
}