import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { readRecords } from "@/lib/store";
import { AdminShell } from "@/components/admin/shell";
import { RecordTable } from "@/components/admin/record-table";

export const dynamic = "force-dynamic";

export default async function AdminShop({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(await isAuthenticated())) redirect(`/${locale}/login`);
  const items = (await readRecords("orders")).map((row) => ({
    ...row,
    items: Array.isArray(row.items)
      ? (row.items as { title?: string; qty?: number }[])
          .map((i) => `${i.title}×${i.qty}`)
          .join(", ")
      : "",
  }));
  return (
    <AdminShell>
      <h1 className="display text-4xl">Shop</h1>
      <div className="mt-6">
        <RecordTable
          items={items}
          endpoint="/api/admin/orders"
          fields={["createdAt", "name", "email", "phone", "total", "items"]}
        />
      </div>
    </AdminShell>
  );
}
