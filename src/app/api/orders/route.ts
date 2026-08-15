import { NextResponse } from "next/server";
import { addRecord } from "@/lib/store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !Array.isArray(body.items) || !body.items.length) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  await addRecord("orders", { ...body, status: "new", kind: "shop" });
  return NextResponse.json({ ok: true });
}
