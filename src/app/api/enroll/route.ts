import { NextResponse } from "next/server";
import { addRecord } from "@/lib/store";
import { pushAlert } from "@/lib/notify";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.course) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  await addRecord("enrollments", {
    ...body,
    status: "new",
    kind: "enrollment",
  });
  await pushAlert("Đăng ký khóa học mới", {
    Tên: String(body.name),
    SĐT: String(body.phone ?? ""),
    Email: String(body.email),
    Khóa: String(body.course),
    "Hình thức": String(body.path ?? "private"),
    "Ghi chú": body.message ? String(body.message) : undefined,
  });
  return NextResponse.json({ ok: true });
}
