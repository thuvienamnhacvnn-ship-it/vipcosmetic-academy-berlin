import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { readRecords } from "@/lib/store";
import { publicRecipient } from "@/lib/whatsapp";
import { AdminShell } from "@/components/admin/shell";
import { WhatsappPanel } from "@/components/admin/whatsapp-panel";

export const dynamic = "force-dynamic";

export default async function AdminWhatsapp({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(await isAuthenticated())) redirect(`/${locale}/login`);
  const items = (await readRecords("whatsapp")).map(publicRecipient);
  return (
    <AdminShell>
      <WhatsappPanel items={items} />
    </AdminShell>
  );
}
