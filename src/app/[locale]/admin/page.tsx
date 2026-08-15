import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { isAuthenticated } from "@/lib/auth";
import { readRecords } from "@/lib/store";
import { publishedCourses } from "@/data/courses";
import { AdminShell } from "@/components/admin/shell";

export const dynamic = "force-dynamic";

export default async function AdminHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(await isAuthenticated())) redirect(`/${locale}/login`);
  const t = await getTranslations("admin");
  const [enrollments, inquiries, students, appointments, notices] = await Promise.all([
    readRecords("enrollments"),
    readRecords("inquiries"),
    readRecords("students"),
    readRecords("appointments"),
    readRecords("notifications"),
  ]);
  const unread = notices.filter((n) => (n.to === "admin" || n.kind === "alert") && !n.read).length;

  const tiles = [
    [t("bookings"), appointments.length],
    [t("enrollments"), enrollments.length],
    [t("students"), students.length],
    [t("notices"), unread],
    [t("inquiries"), inquiries.length],
    [t("courses"), publishedCourses().length],
  ];

  return (
    <AdminShell>
      <h1 className="display text-4xl">{t("dash")}</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map(([label, n]) => (
          <div key={String(label)} className="frame rounded-sm p-5">
            <div className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">{label}</div>
            <div className="display mt-2 text-4xl text-gold-fg">{n}</div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
