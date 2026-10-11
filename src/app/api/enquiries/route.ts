import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonOk, jsonError } from "@/lib/api-response";
import {
  isEmailConfigured,
  sendGeneralEnquiryNotification,
  sendInvestorEnquiryNotification,
} from "@/lib/email";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import {
  investmentRanges,
  investorTypes,
} from "@/data/investment";

const generalEnquirySchema = z.object({
  type: z.literal("general").optional(),
  name: z.string().min(2, "Name is required").max(200),
  email: z.string().email("Valid email is required").max(320),
  phone: z.string().max(50).optional(),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  companyUrl: z.string().max(0).optional().or(z.literal("")),
});

const investorEnquirySchema = z.object({
  type: z.literal("investor"),
  name: z.string().min(2, "Full name is required").max(200),
  organisation: z.string().min(1, "Organisation is required").max(200),
  position: z.string().min(1, "Position is required").max(200),
  email: z.string().email("Valid email is required").max(320),
  country: z.string().min(1, "Country is required").max(100),
  investorType: z.enum(investorTypes as unknown as [string, ...string[]]),
  investmentRange: z.enum(investmentRanges as unknown as [string, ...string[]]),
  website: z.string().max(500).optional(),
  phone: z.string().max(50).optional(),
  message: z.string().max(5000).optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "Consent is required" }),
  companyUrl: z.string().max(0).optional().or(z.literal("")),
});

const ugandaSectors = [
  "Agriculture & agro-processing",
  "Manufacturing & industrial equipment",
  "Food processing & value addition",
  "Energy & infrastructure",
  "Logistics & distribution",
  "Other",
] as const;

const ugandaInvestmentSchema = z.object({
  type: z.literal("uganda_investment"),
  name: z.string().trim().min(2, "Full name is required").max(200),
  companyName: z.string().trim().min(1, "Company name is required").max(200),
  email: z.string().trim().email("Valid business email is required").max(320),
  country: z.string().trim().min(1, "Country is required").max(100),
  sector: z.enum(ugandaSectors),
  investmentRange: z.string().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(20, "Please add a little more detail").max(3000),
  consent: z.boolean().refine((v) => v, { message: "Consent is required" }),
  companyUrl: z.string().max(0).optional().or(z.literal("")),
});

/** Simple in-memory rate limit (best-effort on serverless). */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 8;

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

function generateReference() {
  return `DCA-${Date.now().toString(36).toUpperCase()}`;
}

function sanitise(value: string) {
  return value.replace(/[<>]/g, "").trim();
}

export async function POST(request: Request) {
  if (!rateLimit(`enquiry:${requestIp(request)}`, 6, 60 * 60_000).allowed) return jsonError("Too many enquiries. Try again later.", 429);
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return jsonError("Too many requests. Please try again later.", 429);
    }

    const body = await request.json();

    // Honeypot: silently accept spam without storing
    if (typeof body.companyUrl === "string" && body.companyUrl.length > 0) {
      return jsonOk({ id: generateReference(), createdAt: new Date().toISOString() }, 201);
    }

    if (body?.type === "investor") {
      const parsed = investorEnquirySchema.safeParse(body);
      if (!parsed.success) {
        return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
      }

      const data = parsed.data;
      const name = sanitise(data.name);
      const email = sanitise(data.email).toLowerCase();
      const organisation = sanitise(data.organisation);
      const position = sanitise(data.position);
      const country = sanitise(data.country);
      const website = data.website ? sanitise(data.website) : "";
      const phone = data.phone ? sanitise(data.phone) : "";
      const message = data.message ? sanitise(data.message) : "";

      const structuredMessage = [
        "INVESTOR ENQUIRY — Confidential Memorandum Request",
        "",
        `Organisation: ${organisation}`,
        `Position: ${position}`,
        `Country: ${country}`,
        `Investor type: ${data.investorType}`,
        `Indicative investment range: ${data.investmentRange}`,
        website ? `Website / LinkedIn: ${website}` : null,
        phone ? `Phone / WhatsApp: ${phone}` : null,
        "",
        "Message:",
        message || "(none)",
        "",
        "Consent: yes (preliminary discussion only; not an offer of securities)",
      ]
        .filter((line) => line !== null)
        .join("\n");

      const enquiry = await prisma.enquiry.create({
        data: {
          reference: generateReference(),
          name,
          email,
          phone: phone || null,
          subject: "Investor: Confidential Memorandum Request",
          message: structuredMessage,
        },
      });

      if (isEmailConfigured()) {
        try {
          await sendInvestorEnquiryNotification({
            reference: enquiry.reference,
            name,
            email,
            organisation,
            position,
            country,
            investorType: data.investorType,
            investmentRange: data.investmentRange,
            website: website || undefined,
            phone: phone || undefined,
            message: message || undefined,
          });
        } catch {
          // Enquiry is stored; email failure should not block the user
        }
      }

      return jsonOk(
        {
          id: enquiry.reference,
          createdAt: enquiry.createdAt.toISOString(),
        },
        201
      );
    }

    if (body?.type === "uganda_investment") {
      const parsed = ugandaInvestmentSchema.safeParse(body);
      if (!parsed.success) {
        return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
      }

      const data = parsed.data;
      const name = sanitise(data.name);
      const companyName = sanitise(data.companyName);
      const email = sanitise(data.email).toLowerCase();
      const country = sanitise(data.country);
      const sector = sanitise(data.sector);
      const investmentRange = sanitise(data.investmentRange ?? "") || "Not provided";
      const message = sanitise(data.message);
      const subject = `Uganda investment enquiry — ${sector}`;
      const structuredMessage = [
        `Company: ${companyName}`,
        `Country: ${country}`,
        `Industry / sector: ${sector}`,
        `Estimated investment range: ${investmentRange}`,
        "",
        "What the company is exploring:",
        message,
        "",
        "Contact consent: yes",
      ].join("\n");

      const enquiry = await prisma.enquiry.create({
        data: {
          reference: generateReference(),
          name,
          email,
          subject,
          message: structuredMessage,
        },
      });

      if (isEmailConfigured()) {
        try {
          await sendGeneralEnquiryNotification({
            reference: enquiry.reference,
            name,
            email,
            subject,
            message: structuredMessage,
          });
        } catch {
          // The enquiry stays stored for admin review if email is temporarily unavailable.
        }
      }

      return jsonOk(
        { id: enquiry.reference, createdAt: enquiry.createdAt.toISOString() },
        201
      );
    }

    const parsed = generalEnquirySchema.safeParse({
      ...body,
      type: body?.type === "general" ? "general" : undefined,
    });

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
    }

    const data = parsed.data;
    const enquiry = await prisma.enquiry.create({
      data: {
        reference: generateReference(),
        name: sanitise(data.name),
        email: sanitise(data.email).toLowerCase(),
        phone: data.phone ? sanitise(data.phone) : null,
        subject: sanitise(data.subject),
        message: sanitise(data.message),
      },
    });

    if (isEmailConfigured()) {
      try {
        await sendGeneralEnquiryNotification({
          reference: enquiry.reference,
          name: enquiry.name,
          email: enquiry.email,
          subject: enquiry.subject,
          message: enquiry.message,
        });
      } catch {
        // The enquiry is stored for admin review even if email delivery fails.
      }
    }

    return jsonOk(
      {
        id: enquiry.reference,
        createdAt: enquiry.createdAt.toISOString(),
      },
      201
    );
  } catch {
    return jsonError("Failed to submit enquiry", 500);
  }
}

export async function GET() {
  try {
    await requireAdmin();
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return jsonOk(enquiries);
  } catch {
    return jsonError("Unauthorized", 401);
  }
}
