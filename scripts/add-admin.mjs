import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const email = process.argv[2];
const password = process.argv[3] ?? crypto.randomBytes(9).toString("base64url");

if (!email) {
  console.error("Usage: node scripts/add-admin.mjs <email> [password]");
  process.exit(1);
}

const prisma = new PrismaClient();
const hashed = await bcrypt.hash(password, 10);

const user = await prisma.adminUser.upsert({
  where: { email },
  update: { password: hashed },
  create: { email, password: hashed },
});

console.log(`Admin access granted for: ${user.email}`);
if (!process.argv[3]) {
  console.log(`Generated password: ${password}`);
  console.log("Share this securely and change it after first login if desired.");
}

await prisma.$disconnect();