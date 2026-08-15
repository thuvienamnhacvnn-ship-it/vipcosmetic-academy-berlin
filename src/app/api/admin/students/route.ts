import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { addRecord, patchRecord, readRecords } from "@/lib/store";
import { publicStudent } from "@/lib/student-auth";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ items: (await readRecords("students")).map(publicStudent) });
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json();
  const row = await addRecord("students", {
    name: body.name,
    email: body.email ?? "",
    phone: body.phone ?? "",
    department: body.department ?? "",
    course: body.course ?? "",
    status: body.status ?? "active",
    source: "admin",
  });
  return NextResponse.json({ item: publicStudent(row) });
}

export async function PATCH(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false }, { status: 400 });
  const allowed = ["status", "department", "course", "notes", "name", "phone", "email"];
  const patch: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] != null) patch[key] = body[key];
  }
  const row = await patchRecord("students", String(body.id), patch);
  return NextResponse.json({ ok: Boolean(row), item: row ? publicStudent(row) : null });
}
