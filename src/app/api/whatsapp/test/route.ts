import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { notifyWhatsApp } from "@/lib/whatsapp";

export async function POST() {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const results = await notifyWhatsApp(
    "VIP Cosmetic Academy\nTin thử — kênh WhatsApp đã kết nối.\nNếu bạn đọc được dòng này, lịch hẹn trên website sẽ về máy bạn.",
  );
  const ok = results.some((r) => r.ok);
  return NextResponse.json({ ok, results }, { status: ok || results.length === 0 ? 200 : 502 });
}