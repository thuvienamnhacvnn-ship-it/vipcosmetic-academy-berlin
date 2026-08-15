import { NextResponse } from "next/server";
import { addRecord } from "@/lib/store";
import { pushAlert } from "@/lib/notify";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  await addRecord("inquiries", { ...body, status: "new", kind: "inquiry" });
  await pushAlert("Tin nhắn liên hệ", {
    Tên: String(body.name),
    Email: String(body.email),
    SĐT: body.phone ? String(body.phone) : undefined,
    "Nội dung": String(body.message),
  });
  return NextResponse.json({ ok: true });
}
