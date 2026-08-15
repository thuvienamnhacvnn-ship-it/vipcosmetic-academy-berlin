import { NextResponse } from "next/server";
import { findStudentByEmail, STUDENT_COOKIE, studentToken, verifyPassword } from "@/lib/student-auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");
  const row = await findStudentByEmail(email);
  if (!row || !row.passwordHash || !verifyPassword(password, String(row.passwordHash))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(STUDENT_COOKIE, studentToken(row.id), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}