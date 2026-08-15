"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { departments } from "@/data/departments";
import { tloc } from "@/lib/utils";
import type { StoredRecord } from "@/lib/store";

const statuses = ["new", "active", "paused", "finished"] as const;

const statusLabel: Record<string, string> = {
  new: "Mới",
  active: "Đang học",
  paused: "Tạm dừng",
  finished: "Ra nghề",
};

export function StudentAdmin({ items, locale }: { items: StoredRecord[]; locale: string }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("nails");
  const [noticeFor, setNoticeFor] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const list = useMemo(
    () => items.filter((s) => filter === "all" || s.department === filter),
    [items, filter],
  );

  async function add(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, department, status: "active" }),
    });
    setName("");
    setPhone("");
    router.refresh();
  }

  async function setStatus(id: string, status: string) {
    await fetch("/api/admin/students", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    router.refresh();
  }

  async function sendNotice(e: React.FormEvent) {
    e.preventDefault();
    if (!noticeFor) return;
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: noticeFor, title, body }),
    });
    setNoticeFor(null);
    setTitle("");
    setBody("");
    router.refresh();
  }

  function deptName(id: unknown) {
    const d = departments.find((x) => x.id === id);
    return d ? tloc(d.title, locale) : String(id ?? "—");
  }

  return (
    <div>
      <h1 className="display text-4xl">Học viên</h1>
      <form onSubmit={add} className="mt-6 grid gap-3 sm:grid-cols-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Họ tên" className="input" required />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Điện thoại" className="input" />
        <select value={department} onChange={(e) => setDepartment(e.target.value)} className="input">
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {tloc(d.title, locale)}
            </option>
          ))}
        </select>
        <button className="btn btn-gold" type="submit">
          Thêm học viên
        </button>
      </form>

      <div className="mt-8 flex flex-wrap gap-2">
        <button type="button" className={`btn ${filter === "all" ? "btn-gold" : "btn-ghost"}`} onClick={() => setFilter("all")}>
          Tất cả
        </button>
        {departments.map((d) => (
          <button
            key={d.id}
            type="button"
            className={`btn ${filter === d.id ? "btn-gold" : "btn-ghost"}`}
            onClick={() => setFilter(d.id)}
          >
            {tloc(d.title, locale)}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-[0.65rem] uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="py-2 pr-3">Tên</th>
              <th className="py-2 pr-3">Ngành</th>
              <th className="py-2 pr-3">SĐT / Email</th>
              <th className="py-2 pr-3">Trạng thái</th>
              <th className="py-2">Thông báo</th>
            </tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="py-3 pr-3">{String(s.name)}</td>
                <td className="py-3 pr-3">{deptName(s.department)}</td>
                <td className="py-3 pr-3 text-muted">
                  {String(s.phone ?? "")}
                  {s.email ? <span className="block text-xs">{String(s.email)}</span> : null}
                </td>
                <td className="py-3 pr-3">
                  <select
                    className="input !py-1"
                    value={String(s.status ?? "new")}
                    onChange={(e) => setStatus(s.id, e.target.value)}
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>
                        {statusLabel[st]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3">
                  <button type="button" className="text-gold-fg" onClick={() => setNoticeFor(s.id)}>
                    Gửi nội bộ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 ? <p className="mt-4 text-sm text-muted">Chưa có học viên ở nhóm này.</p> : null}
      </div>

      {noticeFor ? (
        <form onSubmit={sendNotice} className="frame mt-8 max-w-lg space-y-3 rounded-sm p-5">
          <p className="text-[0.68rem] uppercase tracking-[0.16em] text-gold-fg">Thông báo nội bộ</p>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề" required />
          <textarea className="input" rows={4} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Nội dung gửi học viên" required />
          <div className="flex gap-2">
            <button className="btn btn-gold" type="submit">
              Gửi
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => setNoticeFor(null)}>
              Hủy
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
