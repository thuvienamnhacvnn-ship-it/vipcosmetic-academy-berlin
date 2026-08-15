"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Course } from "@/data/types";
import type { StoredRecord } from "@/lib/store";

export function CourseAdmin({ catalog, extras }: { catalog: Course[]; extras: StoredRecord[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [dept, setDept] = useState("nails");

  async function add(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titleDe: title,
        department: dept,
        published: true,
      }),
    });
    setTitle("");
    router.refresh();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/courses?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <h1 className="display text-4xl">Kurse</h1>
      <form onSubmit={add} className="mt-6 flex flex-wrap gap-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Neuer Kurstitel" className="input max-w-sm" required />
        <select value={dept} onChange={(e) => setDept(e.target.value)} className="input max-w-[10rem]">
          <option value="lashes">lashes</option>
          <option value="nails">nails</option>
          <option value="skin">skin</option>
          <option value="feet">feet</option>
          <option value="pmu">pmu</option>
          <option value="makeup">makeup</option>
          <option value="nisv">nisv</option>
        </select>
        <button className="btn btn-gold" type="submit">
          Anlegen
        </button>
      </form>

      <h2 className="mt-10 text-[0.7rem] uppercase tracking-[0.16em] text-muted">Katalog</h2>
      <ul className="mt-3 divide-y divide-border">
        {catalog.map((c) => (
          <li key={c.id} className="flex justify-between py-3 text-sm">
            <span>{c.title.de}</span>
            <span className="text-muted">{c.department}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-[0.7rem] uppercase tracking-[0.16em] text-muted">Zusätzlich angelegt</h2>
      <ul className="mt-3 divide-y divide-border">
        {extras.map((c) => (
          <li key={c.id} className="flex items-center justify-between py-3 text-sm">
            <span>{String(c.titleDe ?? c.id)}</span>
            <button type="button" className="text-danger" onClick={() => remove(c.id)}>
              Löschen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
