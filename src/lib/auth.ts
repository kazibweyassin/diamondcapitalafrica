import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "dca_admin_session";
const INSTITUTIONAL_COOKIE = "dca_institutional_session";
const GOLD_CUSTOMER_COOKIE = "dca_gold_customer_session";
const SUPPLIER_COOKIE = "dca_supplier_session";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function createSession(email: string) {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { email: string; role: string };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createInstitutionalSession(accountId: string, email: string) {
  const token = await new SignJWT({ accountId, email, role: "institutional" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(INSTITUTIONAL_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function destroyInstitutionalSession() {
  const cookieStore = await cookies();
  cookieStore.delete(INSTITUTIONAL_COOKIE);
}

export async function getInstitutionalSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(INSTITUTIONAL_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { accountId: string; email: string; role: string };
  } catch {
    return null;
  }
}

export async function requireInstitutional() {
  const session = await getInstitutionalSession();
  if (!session || session.role !== "institutional") {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function createGoldCustomerSession(customerId: string, email: string) {
  const token = await new SignJWT({ customerId, email, role: "gold_customer" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
  const cookieStore = await cookies();
  cookieStore.set(GOLD_CUSTOMER_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroyGoldCustomerSession() {
  (await cookies()).delete(GOLD_CUSTOMER_COOKIE);
}

export async function getGoldCustomerSession() {
  const token = (await cookies()).get(GOLD_CUSTOMER_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== "gold_customer" || typeof payload.customerId !== "string") return null;
    return payload as { customerId: string; email: string; role: "gold_customer" };
  } catch {
    return null;
  }
}

export async function requireGoldCustomer() {
  const session = await getGoldCustomerSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function createSupplierSession(memberId: string, email: string) {
  const token = await new SignJWT({ memberId, email, role: "supplier" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(SUPPLIER_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function destroySupplierSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SUPPLIER_COOKIE);
}

export async function getSupplierSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SUPPLIER_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== "supplier" || typeof payload.memberId !== "string") {
      return null;
    }
    return payload as { memberId: string; email: string; role: "supplier" };
  } catch {
    return null;
  }
}

export async function requireSupplier() {
  const session = await getSupplierSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}
