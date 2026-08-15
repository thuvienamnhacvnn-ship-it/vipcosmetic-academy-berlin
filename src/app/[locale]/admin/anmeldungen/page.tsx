import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { readRecords } from "@/lib/store";
import { AdminShell } from "@/components/admin/shell";
import { RecordTable } from "@/components/admin/record-table";

export const dynamic = "force-dynamic";

export default async function AdminEnroll({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(await isAuthenticated())) redirect(`/${locale}/login`);
  const items = await readRecords("enrollments");
  return (
    <AdminShell>
      <h1 className="display text-4xl">Anmeldungen</h1>
      <div className="mt-6">
        <RecordTable items={items} endpoint="/api/admin/enrollments" fields={["createdAt", "name", "email", "phone", "course", "path"]} />
      </div>
    </AdminShell>
  );
}
