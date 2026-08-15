"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function BookForm() {
  const t = useTranslations("book");
  const ta = useTranslations("apply");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    setBusy(false);
    if (res.ok) setOk(true);
  }

  if (ok) return <p className="frame rounded-sm p-6 text-sm">{t("ok")}</p>;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="name" required placeholder={ta("name")} className="input" />
      <input name="email" type="email" required placeholder={ta("email")} className="input" />
      <input name="phone" required placeholder={ta("phone")} className="input" />
      <select name="kind" className="input" defaultValue="consult">
        <option value="consult">{t("kindConsult")}</option>
        <option value="visit">{t("kindVisit")}</option>
        <option value="model">{t("kindModel")}</option>
      </select>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="date" type="date" required className="input" />
        <input name="time" type="time" required className="input" />
      </div>
      <textarea name="message" rows={3} placeholder={ta("message")} className="input" />
      <button type="submit" disabled={busy} className="btn btn-gold">
        {t("submit")}
      </button>
    </form>
  );
}
