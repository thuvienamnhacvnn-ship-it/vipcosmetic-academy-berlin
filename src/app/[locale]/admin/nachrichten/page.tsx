import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { isAuthenticated } from "@/lib/auth";
import { readRecords } from "@/lib/store";
import { AdminShell } from "@/components/admin/shell";
import { NotifyInbox } from "@/components/admin/notify-inbox";

export const dynamic = "force-dynamic";

export default async function AdminNotices({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(await isAuthenticated())) redirect(`/${locale}/login`);
  const t = await getTranslations("admin");
  const items = (await readRecords("notifications")).filter((n) => n.to === "admin" || n.kind === "alert");
  return (
    <AdminShell>
      <h1 className="display text-4xl">{t("notices")}</h1>
      <div className="mt-6">
        <NotifyInbox items={items} />
      </div>
    </AdminShell>
  );
}
