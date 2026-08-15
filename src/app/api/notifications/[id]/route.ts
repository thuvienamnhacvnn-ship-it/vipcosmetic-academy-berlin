import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getStudentSession } from "@/lib/student-auth";
import { patchRecord, readRecords } from "@/lib/store";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await isAuthenticated();
  const student = await getStudentSession();
  if (!admin && !student) return NextResponse.json({ ok: false }, { status: 401 });
  const row = (await readRecords("notifications")).find((n) => n.id === id);
  if (!row) return NextResponse.json({ ok: false }, { status: 404 });
  if (!admin && row.to !== student?.id) return NextResponse.json({ ok: false }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const next = await patchRecord("notifications", id, { read: body.read !== false });
  return NextResponse.json({ ok: true, item: next });
}