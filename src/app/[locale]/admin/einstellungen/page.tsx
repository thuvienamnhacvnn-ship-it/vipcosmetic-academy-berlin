import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { readSettings } from "@/lib/store";
import { site } from "@/data/site";
import { AdminShell } from "@/components/admin/shell";
import { SettingsForm } from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettings({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(await isAuthenticated())) redirect(`/${locale}/login`);
  const saved = await readSettings();
  return (
    <AdminShell>
      <SettingsForm
        initial={{
          phone: String(saved.phone ?? site.phone),
          email: String(saved.email ?? site.email),
          hours: String(saved.hours ?? site.hours.de),
        }}
      />
    </AdminShell>
  );
}
