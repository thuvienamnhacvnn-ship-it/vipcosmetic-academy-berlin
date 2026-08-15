import { NextResponse } from "next/server";
import { addRecord } from "@/lib/store";
import { findStudentByEmail, hashPassword, STUDENT_COOKIE, studentToken } from "@/lib/student-auth";
import { pushAlert } from "@/lib/notify";
import { departments } from "@/data/departments";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const phone = String(body?.phone ?? "").trim();
  const password = String(body?.password ?? "");
  const department = String(body?.department ?? "");
  const allowed = new Set<string>(departments.map((d) => d.id));
  if (!name || !email || !phone || password.length < 6 || !allowed.has(department)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  if (await findStudentByEmail(email)) {
    return NextResponse.json({ ok: false, error: "exists" }, { status: 409 });
  }
  const row = await addRecord("students", {
    name,
    email,
    phone,
    department,
    passwordHash: hashPassword(password),
    status: "new",
    source: "register",
  });
  await pushAlert("Học viên đăng ký tài khoản", {
    Tên: name,
    SĐT: phone,
    Email: email,
    Ngành: department,
  });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(STUDENT_COOKIE, studentToken(row.id), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}