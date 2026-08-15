import { NextResponse } from "next/server";
import { addRecord } from "@/lib/store";
import { pushAlert } from "@/lib/notify";

const kinds: Record<string, string> = {
  consult: "Tư vấn học nghề",
  visit: "Tham quan campus",
  model: "Làm mẫu",
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.date || !body?.time) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const kind = String(body.kind ?? "consult");
  await addRecord("appointments", { ...body, status: "new", kind });
  await pushAlert("Lịch hẹn mới", {
    Tên: String(body.name),
    SĐT: String(body.phone ?? ""),
    Email: String(body.email),
    Loại: kinds[kind] ?? kind,
    Ngày: String(body.date),
    Giờ: String(body.time),
    "Ghi chú": body.message ? String(body.message) : undefined,
  });
  return NextResponse.json({ ok: true });
}
