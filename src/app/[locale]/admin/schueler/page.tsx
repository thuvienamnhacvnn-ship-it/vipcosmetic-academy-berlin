import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { readRecords } from "@/lib/store";
import { publicStudent } from "@/lib/student-auth";
import { AdminShell } from "@/components/admin/shell";
import { StudentAdmin } from "@/components/admin/student-admin";

export const dynamic = "force-dynamic";

export default async function AdminStudents({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(await isAuthenticated())) redirect(`/${locale}/login`);
  const items = await readRecords("students");
  return (
    <AdminShell>
      <StudentAdmin items={items.map(publicStudent)} locale={locale} />
    </AdminShell>
  );
}
