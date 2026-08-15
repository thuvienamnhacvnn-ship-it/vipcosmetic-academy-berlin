import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { readRecords, type StoredRecord } from "@/lib/store";

export const STUDENT_COOKIE = "vca_student";

function secret() {
  return process.env.ADMIN_SECRET ?? "vip-cosmetic-academy";
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = String(stored).split(":");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 64);
  const left = Buffer.from(hash, "hex");
  if (left.length !== next.length) return false;
  return timingSafeEqual(left, next);
}

export function studentToken(id: string) {
  return `${id}.${createHmac("sha256", secret()).update(`student:${id}`).digest("hex")}`;
}

function parseCookie(value?: string) {
  if (!value) return null;
  const dot = value.indexOf(".");
  if (dot < 1) return null;
  const id = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expected = createHmac("sha256", secret()).update(`student:${id}`).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return id;
}

export function publicStudent(row: StoredRecord) {
  const { passwordHash: _hidden, ...rest } = row;
  return rest;
}

export async function findStudentByEmail(email: string) {
  const needle = email.trim().toLowerCase();
  const rows = await readRecords("students");
  return rows.find((r) => String(r.email ?? "").trim().toLowerCase() === needle) ?? null;
}

export async function getStudentSession() {
  const store = await cookies();
  const id = parseCookie(store.get(STUDENT_COOKIE)?.value);
  if (!id) return null;
  const rows = await readRecords("students");
  const row = rows.find((r) => r.id === id);
  if (!row) return null;
  return publicStudent(row);
}
