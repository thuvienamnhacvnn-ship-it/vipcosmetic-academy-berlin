import { addRecord } from "@/lib/store";
import { notifyWhatsApp } from "@/lib/whatsapp";

export async function pushAlert(title: string, details: Record<string, string | undefined>) {
  const lines = Object.entries(details)
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `${k}: ${v}`);
  const body = lines.join("\n");
  await addRecord("notifications", {
    title,
    body,
    to: "admin",
    kind: "alert",
    read: false,
  });
  const text = [`VIP Cosmetic Academy`, title, "", ...lines].join("\n");
  try {
    await notifyWhatsApp(text);
  } catch {
    /* inbox still stored */
  }
}

export async function notifyStudent(studentId: string, title: string, body: string) {
  return addRecord("notifications", {
    title,
    body,
    to: studentId,
    kind: "internal",
    read: false,
  });
}
