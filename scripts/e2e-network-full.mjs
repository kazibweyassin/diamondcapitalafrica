import fs from "fs";
import path from "path";

const BASE = process.env.BASE_URL ?? "https://www.diamondcapitalafrica.com";
const ts = Date.now();

function loadEnv() {
  const envPath = path.resolve(import.meta.dirname, "../.env");
  if (!fs.existsSync(envPath)) return {};
  const vars = {};
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) vars[m[1].trim()] = m[2].trim().replace(/^"|"$/g, "");
  }
  return vars;
}

const env = loadEnv();
const adminEmail = process.env.ADMIN_EMAIL ?? env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD ?? env.ADMIN_PASSWORD;

let cookie = "";

async function req(path, method = "GET", body) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (cookie) headers.Cookie = cookie;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const setCookie = res.headers.getSetCookie?.() ?? [];
  if (setCookie.length) {
    cookie = setCookie.map((c) => c.split(";")[0]).join("; ");
  }

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 300) };
  }
  return { status: res.status, ok: res.ok, json };
}

const log = [];
function record(name, result, expect) {
  const pass = expect(result);
  log.push({ name, pass, status: result.status, detail: result.json });
  console.log(`${pass ? "PASS" : "FAIL"} ${name} (${result.status})`);
  return pass;
}

const supplierEmail = `e2e-supplier-${ts}@example.com`;
const buyerEmail = `e2e-buyer-${ts}@example.com`;
const portalPassword = `Test${ts.toString(36)}!`;

// --- Public flow ---
const supApply = await req("/api/network/suppliers", "POST", {
  companyName: `E2E Mining ${ts}`,
  contactName: "Test Supplier",
  email: supplierEmail,
  phone: "+256700000099",
  location: "Kampala",
  productType: "Raw gold / doré",
  volumeRange: "1–10 kg",
});
record("1. Supplier application", supApply, (r) => r.status === 201 && r.json.success);

const buyApply = await req("/api/network/institutional", "POST", {
  companyName: `E2E Importer ${ts}`,
  contactName: "Test Buyer",
  email: buyerEmail,
  buyerType: "Refinery / importer",
});
record("2. Institutional application", buyApply, (r) => r.status === 201 && r.json.success);

record(
  "3. Portal blocked without login",
  await req("/api/network/institutional/me"),
  (r) => r.status === 401
);

if (!adminEmail || !adminPassword) {
  console.log("\nSKIP admin steps — no ADMIN_EMAIL/ADMIN_PASSWORD in .env");
  console.log(JSON.stringify(log, null, 2));
  process.exit(0);
}

// --- Admin flow ---
cookie = "";
const adminLogin = await req("/api/auth/login", "POST", {
  email: adminEmail,
  password: adminPassword,
});
record("4. Admin login", adminLogin, (r) => r.status === 200 && r.json.success);

const adminData = await req("/api/network/admin");
record("5. Admin network data", adminData, (r) => r.status === 200 && r.json.success);

const supplier = adminData.json.data?.suppliers?.find(
  (s) => s.email === supplierEmail
);
const buyer = adminData.json.data?.institutional?.find(
  (b) => b.email === buyerEmail
);

if (!supplier || !buyer) {
  console.log("FAIL could not find test records in admin");
  process.exit(1);
}

const verifySupplier = await req(
  `/api/network/admin/suppliers/${supplier.id}`,
  "PATCH",
  { status: "verified", verificationLevel: 3 }
);
record("6. Verify supplier", verifySupplier, (r) => r.status === 200);

const createSupply = await req("/api/network/admin/supply", "POST", {
  memberId: supplier.id,
  title: `E2E Test Supply ${ts}`,
  productType: "Raw gold / doré",
  purity: "99.5%+",
  volumeEstimate: "5 kg",
  location: "Kampala, Uganda",
  verificationLevel: 3,
  summary: "E2E test listing",
  status: "published",
});
record(
  "7. Create & publish supply",
  createSupply,
  (r) => r.status === 201 && r.json.success
);

const supplyId = createSupply.json.data?.id;

const activateBuyer = await req(
  `/api/network/admin/institutional/${buyer.id}`,
  "PATCH",
  { status: "active", setPassword: portalPassword }
);
record("8. Activate buyer + password", activateBuyer, (r) => r.status === 200);

// --- Buyer portal flow ---
cookie = "";
const buyerLogin = await req("/api/network/institutional/login", "POST", {
  email: buyerEmail,
  password: portalPassword,
});
record("9. Buyer portal login", buyerLogin, (r) => r.status === 200 && r.json.success);

const buyerMe = await req("/api/network/institutional/me");
record("10. Buyer session", buyerMe, (r) => r.status === 200 && r.json.success);

const supplyList = await req("/api/network/supply");
const hasSupply =
  supplyList.json.data?.supply?.length > 0 &&
  supplyList.json.data?.authenticated === true;
record(
  "11. Supply visible in portal",
  supplyList,
  (r) => r.status === 200 && hasSupply
);

const quote = await req("/api/network/enquiries", "POST", {
  supplyId,
  message: "E2E test quote request for 5kg doré, CIF Dubai please.",
});
record(
  "12. Submit quote request",
  quote,
  (r) => r.status === 201 && r.json.success
);

// Verify enquiry in admin
cookie = "";
await req("/api/auth/login", "POST", { email: adminEmail, password: adminPassword });
const adminAfter = await req("/api/network/admin");
const hasEnquiry = adminAfter.json.data?.enquiries?.some((e) =>
  e.email === buyerEmail
);
record(
  "13. Quote appears in admin",
  adminAfter,
  (r) => r.status === 200 && hasEnquiry
);

const failed = log.filter((l) => !l.pass).length;
console.log(`\n--- ${log.length - failed}/${log.length} passed ---`);
if (failed) process.exit(1);