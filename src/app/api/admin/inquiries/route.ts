import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { patchRecord, readRecords } from "@/lib/store";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ items: await readRecords("inquiries") });
}

export async function PATCH(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json();
  const row = await patchRecord("inquiries", body.id, { status: body.status });
  return NextResponse.json({ item: row });
}
