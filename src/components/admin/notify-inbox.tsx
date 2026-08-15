"use client";

import { useRouter } from "next/navigation";
import type { StoredRecord } from "@/lib/store";

export function NotifyInbox({ items }: { items: StoredRecord[] }) {
  const router = useRouter();

  async function mark(id: string) {
    await fetch(`/api/notifications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    router.refresh();
  }

  if (!items.length) return <p className="text-sm text-muted">Chưa có thông báo.</p>;

  return (
    <ul className="divide-y divide-border">
      {items.map((n) => (
        <li key={n.id} className="py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`text-sm ${n.read ? "text-muted" : "text-foreground"}`}>{String(n.title)}</p>
              <pre className="mt-1 whitespace-pre-wrap font-sans text-xs text-muted">{String(n.body ?? "")}</pre>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                {String(n.createdAt).slice(0, 16).replace("T", " ")}
              </p>
            </div>
            {!n.read ? (
              <button type="button" className="btn btn-ghost !px-3 !py-2" onClick={() => mark(n.id)}>
                Đã đọc
              </button>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
