import { site } from "@/data/site";
import { addRecord, patchRecord, readRecords, type StoredRecord } from "@/lib/store";

export function digitsPhone(input: string) {
  return String(input ?? "").replace(/[^\d]/g, "");
}

function envPhone() {
  return digitsPhone(process.env.WHATSAPP_PHONE ?? site.phoneHref);
}

export type WaMethod = "callmebot" | "cloud" | "webhook";

export function publicRecipient(row: StoredRecord) {
  return {
    id: row.id,
    createdAt: row.createdAt,
    name: String(row.name ?? ""),
    phone: String(row.phone ?? ""),
    method: String(row.method ?? "callmebot"),
    active: row.active !== false,
    lastError: row.lastError ? String(row.lastError) : "",
    lastSentAt: row.lastSentAt ? String(row.lastSentAt) : "",
    hasKey: Boolean(row.apiKey || row.webhook),
  };
}

async function sendCallMeBot(phone: string, apiKey: string, text: string) {
  const url = new URL("https://api.callmebot.com/whatsapp.php");
  url.searchParams.set("phone", digitsPhone(phone));
  url.searchParams.set("text", text);
  url.searchParams.set("apikey", apiKey);
  const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
  const body = await res.text();
  if (!res.ok || /error|invalid|denied/i.test(body)) {
    throw new Error(body.slice(0, 180) || `CallMeBot ${res.status}`);
  }
}

async function sendCloud(phone: string, text: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) throw new Error("Thiếu WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID");
  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: digitsPhone(phone),
      type: "text",
      text: { preview_url: false, body: text },
    }),
    signal: AbortSignal.timeout(12000),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
  if (!res.ok) throw new Error(data.error?.message ?? `Cloud API ${res.status}`);
}

async function sendWebhook(url: string, text: string, extra: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, ...extra }),
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error(`Webhook ${res.status}`);
}

async function deliverOne(row: StoredRecord, text: string) {
  const method = String(row.method ?? "callmebot") as WaMethod;
  const phone = String(row.phone ?? envPhone());
  if (method === "webhook") {
    await sendWebhook(String(row.webhook ?? ""), text, { phone, source: "vip-cosmetic-academy" });
    return;
  }
  if (method === "cloud") {
    await sendCloud(phone, text);
    return;
  }
  await sendCallMeBot(phone, String(row.apiKey ?? ""), text);
}

export async function notifyWhatsApp(text: string) {
  const saved = (await readRecords("whatsapp")).filter((r) => r.active !== false);
  const targets: StoredRecord[] = saved.length
    ? saved
    : process.env.WHATSAPP_CALLMEBOT_KEY || process.env.WHATSAPP_TOKEN || process.env.WHATSAPP_WEBHOOK_URL
      ? [
          {
            id: "env",
            createdAt: new Date().toISOString(),
            phone: envPhone(),
            method: process.env.WHATSAPP_WEBHOOK_URL
              ? "webhook"
              : process.env.WHATSAPP_TOKEN
                ? "cloud"
                : "callmebot",
            apiKey: process.env.WHATSAPP_CALLMEBOT_KEY ?? "",
            webhook: process.env.WHATSAPP_WEBHOOK_URL ?? "",
            active: true,
          },
        ]
      : [];

  const results: { id: string; ok: boolean; error?: string }[] = [];
  for (const row of targets) {
    try {
      await deliverOne(row, text);
      results.push({ id: row.id, ok: true });
      if (row.id !== "env") {
        await patchRecord("whatsapp", row.id, { lastError: "", lastSentAt: new Date().toISOString() });
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : "send failed";
      results.push({ id: row.id, ok: false, error });
      if (row.id !== "env") {
        await patchRecord("whatsapp", row.id, { lastError: error });
      }
    }
  }
  return results;
}

export async function saveRecipient(input: {
  name?: string;
  phone: string;
  method?: WaMethod;
  apiKey?: string;
  webhook?: string;
}) {
  const phone = digitsPhone(input.phone);
  if (phone.length < 8) throw new Error("Số WhatsApp không hợp lệ");
  return addRecord("whatsapp", {
    name: input.name ?? "Admin",
    phone,
    method: input.method ?? "callmebot",
    apiKey: input.apiKey ?? "",
    webhook: input.webhook ?? "",
    active: true,
  });
}
