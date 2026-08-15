import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { publishedCourses } from "@/data/courses";
import { readRecords } from "@/lib/store";
import { AdminShell } from "@/components/admin/shell";
import { CourseAdmin } from "@/components/admin/course-admin";

export const dynamic = "force-dynamic";

export default async function AdminCourses({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(await isAuthenticated())) redirect(`/${locale}/login`);
  const extras = await readRecords("courseOverrides");
  return (
    <AdminShell>
      <CourseAdmin catalog={publishedCourses()} extras={extras} />
    </AdminShell>
  );
}
