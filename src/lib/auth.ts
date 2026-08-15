import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "vca_admin";

function secret() {
  return process.env.ADMIN_SECRET ?? "vip-cosmetic-academy";
}

export function adminEnabled() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function sessionToken() {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return createHmac("sha256", secret()).update(password).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function passwordMatches(candidate: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return safeEqual(candidate, password);
}

export async function isAuthenticated() {
  if (!adminEnabled()) return false;
  const store = await cookies();
  const value = store.get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  return safeEqual(value, sessionToken());
}
