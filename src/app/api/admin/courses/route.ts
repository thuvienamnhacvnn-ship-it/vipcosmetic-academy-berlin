import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { addRecord, patchRecord, readRecords, removeRecord } from "@/lib/store";
import { courses } from "@/data/courses";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const overrides = await readRecords("courseOverrides");
  return NextResponse.json({ catalog: courses, overrides });
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json();
  const row = await addRecord("courseOverrides", { ...body, kind: "override" });
  return NextResponse.json({ item: row });
}

export async function PATCH(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json();
  const row = await patchRecord("courseOverrides", body.id, body);
  return NextResponse.json({ item: row });
}

export async function DELETE(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) await removeRecord("courseOverrides", id);
  return NextResponse.json({ ok: true });
}
