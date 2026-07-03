import nodemailer from "nodemailer";
import { company } from "@/data/content";
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
    `${company.contactName} — ${company.name}`,
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
    <p>${company.contactName} — ${company.name}<br />
    <a href="mailto:${company.email}">${company.email}</a> · ${company.phone}</p>
  `;

  await sendEmail({
    to,
    subject: `Your ${company.name} Institutional Gold Network access`,
    text,
    html,
  });
}