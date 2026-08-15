import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DIR = path.join(process.cwd(), "data-store");

export type StoreName =
  | "enrollments"
  | "inquiries"
  | "students"
  | "courseOverrides"
  | "settings"
  | "appointments"
  | "orders"
  | "whatsapp"
  | "notifications";

export type StoredRecord = {
  id: string;
  createdAt: string;
  status?: string;
  [key: string]: unknown;
};

async function fileOf(name: StoreName) {
  await mkdir(DIR, { recursive: true });
  return path.join(DIR, `${name}.json`);
}

export async function readRecords(name: StoreName): Promise<StoredRecord[]> {
  try {
    const raw = await readFile(await fileOf(name), "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function writeRecords(name: StoreName, records: StoredRecord[]) {
  await writeFile(await fileOf(name), JSON.stringify(records, null, 2), "utf8");
}

export async function addRecord(name: StoreName, record: Omit<StoredRecord, "id" | "createdAt"> & Partial<StoredRecord>) {
  const rows = await readRecords(name);
  const next: StoredRecord = {
    ...record,
    id: record.id ?? crypto.randomUUID(),
    createdAt: record.createdAt ?? new Date().toISOString(),
  };
  rows.unshift(next);
  await writeRecords(name, rows);
  return next;
}

export async function patchRecord(name: StoreName, id: string, patch: Partial<StoredRecord>) {
  const rows = await readRecords(name);
  const idx = rows.findIndex((r) => r.id === id);
  if (idx < 0) return null;
  rows[idx] = { ...rows[idx], ...patch, id };
  await writeRecords(name, rows);
  return rows[idx];
}

export async function removeRecord(name: StoreName, id: string) {
  const rows = await readRecords(name);
  await writeRecords(name, rows.filter((r) => r.id !== id));
}

export async function readSettings(): Promise<Record<string, unknown>> {
  const rows = await readRecords("settings");
  return (rows[0] as Record<string, unknown>) ?? {};
}

export async function writeSettings(patch: Record<string, unknown>) {
  const current = await readSettings();
  const next = { ...current, ...patch, id: "site", createdAt: current.createdAt ?? new Date().toISOString() };
  await writeRecords("settings", [next as StoredRecord]);
  return next;
}
