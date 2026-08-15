import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { patchRecord, readRecords, removeRecord } from "@/lib/store";
import { notifyWhatsApp, publicRecipient, saveRecipient } from "@/lib/whatsapp";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const items = (await readRecords("whatsapp")).map(publicRecipient);
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body?.phone) return NextResponse.json({ ok: false, error: "phone" }, { status: 400 });
  try {
    const row = await saveRecipient({
      name: body.name,
      phone: String(body.phone),
      method: body.method,
      apiKey: body.apiKey,
      webhook: body.webhook,
    });
    return NextResponse.json({ ok: true, item: publicRecipient(row) });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "fail" }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false }, { status: 400 });
  const patch: Record<string, unknown> = {};
  if (typeof body.active === "boolean") patch.active = body.active;
  if (body.apiKey != null) patch.apiKey = String(body.apiKey);
  if (body.webhook != null) patch.webhook = String(body.webhook);
  if (body.phone) patch.phone = String(body.phone).replace(/[^\d]/g, "");
  const row = await patchRecord("whatsapp", String(body.id), patch);
  return NextResponse.json({ ok: Boolean(row) });
}

export async function DELETE(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false }, { status: 400 });
  await removeRecord("whatsapp", String(body.id));
  return NextResponse.json({ ok: true });
}