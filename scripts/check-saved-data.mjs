import fs from "fs";
import path from "path";

const envPath = path.resolve(import.meta.dirname, "../.env");
const env = Object.fromEntries(
  fs
    .readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")];
    })
);

let cookie = "";
const login = await fetch("https://www.diamondcapitalafrica.com/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
  }),
});
cookie = (login.headers.getSetCookie?.() ?? [])
  .map((c) => c.split(";")[0])
  .join("; ");

const res = await fetch("https://www.diamondcapitalafrica.com/api/network/admin", {
  headers: { Cookie: cookie },
});
const { data } = await res.json();

console.log("Database records (production):");
console.log(`  Supplier applications: ${data.suppliers.length}`);
console.log(`  Institutional accounts:  ${data.institutional.length}`);
console.log(`  Verified supply:       ${data.supply.length}`);
console.log(`  Quote requests:        ${data.enquiries.length}`);
console.log("");
console.log("Recent entries:");
for (const s of data.suppliers.slice(0, 3)) {
  console.log(`  SUP ${s.reference} | ${s.companyName} | ${s.status} | L${s.verificationLevel}`);
}
for (const b of data.institutional.slice(0, 3)) {
  console.log(`  INS ${b.reference} | ${b.companyName} | ${b.status}`);
}