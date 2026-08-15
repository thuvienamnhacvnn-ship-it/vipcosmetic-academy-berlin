"use client";

import { useRouter } from "next/navigation";
import type { StoredRecord } from "@/lib/store";

export function RecordTable({
  items,
  endpoint,
  fields,
}: {
  items: StoredRecord[];
  endpoint: string;
  fields: string[];
}) {
  const router = useRouter();

  async function setStatus(id: string, status: string) {
    await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    router.refresh();
  }

  if (items.length === 0) {
    return <p className="text-sm text-muted">Noch keine Einträge.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-[0.65rem] uppercase tracking-[0.14em] text-muted">
          <tr>
            {fields.map((f) => (
              <th key={f} className="py-2 pr-4">
                {f}
              </th>
            ))}
            <th className="py-2">status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr key={row.id} className="border-t border-border">
              {fields.map((f) => (
                <td key={f} className="py-3 pr-4 align-top">
                  {String(row[f] ?? "—")}
                </td>
              ))}
              <td className="py-3">
                <select
                  defaultValue={String(row.status ?? "new")}
                  className="input !py-1"
                  onChange={(e) => setStatus(row.id, e.target.value)}
                >
                  <option value="new">new</option>
                  <option value="review">review</option>
                  <option value="accepted">accepted</option>
                  <option value="done">done</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
