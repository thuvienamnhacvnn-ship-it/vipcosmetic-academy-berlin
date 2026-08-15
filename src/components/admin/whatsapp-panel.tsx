"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/data/site";

type Item = {
  id: string;
  name: string;
  phone: string;
  method: string;
  active: boolean;
  lastError: string;
  lastSentAt: string;
  hasKey: boolean;
};

export function WhatsappPanel({ items }: { items: Item[] }) {
  const router = useRouter();
  const [phone, setPhone] = useState(site.phone);
  const [apiKey, setApiKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function register(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Admin", phone, method: "callmebot", apiKey }),
    });
    setBusy(false);
    setMsg(res.ok ? "Đã lưu số. Bấm «Gửi tin thử»." : "Không lưu được. Kiểm tra số và mã API.");
    if (res.ok) {
      setApiKey("");
      router.refresh();
    }
  }

  async function test() {
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/whatsapp/test", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    setMsg(data.ok ? "Đã gửi tin thử. Kiểm tra WhatsApp trên điện thoại." : "Gửi thử thất bại — xem lỗi bên dưới hoặc kích hoạt CallMeBot.");
    router.refresh();
  }

  async function toggle(id: string, active: boolean) {
    await fetch("/api/whatsapp", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active }),
    });
    router.refresh();
  }

  async function remove(id: string) {
    await fetch("/api/whatsapp", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="display text-4xl">WhatsApp</h1>
        <p className="mt-3 text-sm text-muted">
          Đăng ký số của bạn một lần. Sau đó mỗi lịch hẹn, đăng ký khóa, học viên mới và tin liên hệ
          trên website sẽ báo thẳng vào WhatsApp.
        </p>
      </div>

      <ol className="space-y-3 text-sm text-muted">
        <li>1. Mở WhatsApp, lưu số <span className="text-foreground">+34 644 21 98 18</span> (CallMeBot).</li>
        <li>
          2. Nhắn đúng câu:{" "}
          <span className="text-foreground">I allow callmebot to send me messages</span>
        </li>
        <li>3. Bot trả về mã API. Dán mã vào form dưới, cùng số {site.phone}.</li>
        <li>4. Bấm lưu, rồi «Gửi tin thử».</li>
      </ol>

      <form onSubmit={register} className="space-y-3">
        <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Số WhatsApp" required />
        <input className="input" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Mã API CallMeBot" required />
        <div className="flex flex-wrap gap-2">
          <button type="submit" disabled={busy} className="btn btn-gold">
            Đăng ký nhận tin
          </button>
          <button type="button" disabled={busy || items.length === 0} onClick={test} className="btn btn-ghost">
            Gửi tin thử
          </button>
        </div>
      </form>
      {msg ? <p className="text-sm text-gold-fg">{msg}</p> : null}

      <ul className="divide-y divide-border">
        {items.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
            <div>
              <p>+{item.phone}</p>
              <p className="text-xs text-muted">
                {item.method}
                {item.lastSentAt ? ` · gửi ${item.lastSentAt.slice(0, 16).replace("T", " ")}` : ""}
                {item.lastError ? ` · lỗi: ${item.lastError}` : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn btn-ghost !px-3 !py-2" onClick={() => toggle(item.id, !item.active)}>
                {item.active ? "Tạm tắt" : "Bật"}
              </button>
              <button type="button" className="btn btn-ghost !px-3 !py-2" onClick={() => remove(item.id)}>
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
