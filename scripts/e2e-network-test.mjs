const BASE = process.env.BASE_URL ?? "https://www.diamondcapitalafrica.com";
const ts = Date.now();

async function req(path, method = "GET", body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 200) };
  }
  return { status: res.status, json };
}

const results = [];

// 1. Supplier apply
const supplier = await req("/api/network/suppliers", "POST", {
  companyName: `E2E Mining ${ts}`,
  contactName: "Test Supplier",
  email: `e2e-supplier-${ts}@example.com`,
  phone: "+256700000099",
  location: "Kampala",
  productType: "Raw gold / doré",
  volumeRange: "1–10 kg",
});
results.push({ step: "Supplier apply", ...supplier });

// 2. Institutional apply
const buyer = await req("/api/network/institutional", "POST", {
  companyName: `E2E Importer ${ts}`,
  contactName: "Test Buyer",
  email: `e2e-buyer-${ts}@example.com`,
  buyerType: "Refinery / importer",
});
results.push({ step: "Institutional apply", ...buyer });

// 3. Supply list (public)
const supply = await req("/api/network/supply");
results.push({ step: "Supply list", ...supply });

// 4. Portal without auth
const portal = await req("/api/network/institutional/me");
results.push({ step: "Portal me (no auth)", ...portal });

// 5. Quote without auth (should fail)
const quote = await req("/api/network/enquiries", "POST", {
  supplyId: "fake-id",
  message: "Test quote request message here",
});
results.push({ step: "Quote (no auth)", ...quote });

// 6. Admin without auth
const admin = await req("/api/network/admin");
results.push({ step: "Admin (no auth)", ...admin });

console.log(JSON.stringify(results, null, 2));