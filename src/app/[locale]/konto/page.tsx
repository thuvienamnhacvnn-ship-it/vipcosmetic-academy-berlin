import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getStudentSession } from "@/lib/student-auth";
import { readRecords } from "@/lib/store";
import { StudentDashboard } from "@/components/account/dashboard";

export const dynamic = "force-dynamic";

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const student = await getStudentSession();
  if (!student) redirect(`/${locale}/konto/login`);
  const notices = (await readRecords("notifications")).filter((n) => n.to === student.id);
  return <StudentDashboard locale={locale} student={student} notices={notices} />;
}
