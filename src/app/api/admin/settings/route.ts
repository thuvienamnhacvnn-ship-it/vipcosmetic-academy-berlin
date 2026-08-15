import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readSettings, writeSettings } from "@/lib/store";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json(await readSettings());
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json();
  return NextResponse.json(await writeSettings(body));
}
