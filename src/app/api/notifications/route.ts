import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getStudentSession } from "@/lib/student-auth";
import { notifyStudent } from "@/lib/notify";
import { readRecords } from "@/lib/store";

export async function GET() {
  const admin = await isAuthenticated();
  const student = await getStudentSession();
  if (!admin && !student) return NextResponse.json({ ok: false }, { status: 401 });
  const all = await readRecords("notifications");
  const items = admin
    ? all.filter((n) => n.to === "admin" || n.kind === "alert")
    : all.filter((n) => n.to === student?.id);
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body?.studentId || !body?.title || !body?.body) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const row = await notifyStudent(String(body.studentId), String(body.title), String(body.body));
  return NextResponse.json({ ok: true, item: row });
}