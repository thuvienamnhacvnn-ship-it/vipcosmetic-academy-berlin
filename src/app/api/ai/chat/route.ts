import { NextResponse } from "next/server";
import { counsel } from "@/lib/ai";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const question = String(body?.message ?? "").trim();
  const locale = String(body?.locale ?? "de");
  if (!question) return NextResponse.json({ reply: "" }, { status: 400 });
  const reply = await counsel(question, locale);
  return NextResponse.json({ reply });
}
