"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { publishedCourses } from "@/data/courses";
import { tloc } from "@/lib/utils";

export function ApplyForm({ locale, preset }: { locale: string; preset?: string }) {
  const t = useTranslations("apply");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErr(false);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    setBusy(false);
    if (!res.ok) {
      setErr(true);
      return;
    }
    setOk(true);
    e.currentTarget.reset();
  }

  if (ok) return <p className="frame rounded-sm p-6 text-sm">{t("ok")}</p>;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="name" required placeholder={t("name")} className="input" />
      <input name="email" type="email" required placeholder={t("email")} className="input" />
      <input name="phone" required placeholder={t("phone")} className="input" />
      <select name="course" defaultValue={preset ?? ""} className="input" required>
        <option value="" disabled>
          {t("course")}
        </option>
        {publishedCourses().map((c) => (
          <option key={c.slug} value={c.slug}>
            {tloc(c.title, locale)}
          </option>
        ))}
      </select>
      <select name="path" className="input" defaultValue="private">
        <option value="private">{t("pathPrivate")}</option>
        <option value="bildungsgutschein">{t("pathVoucher")}</option>
      </select>
      <textarea name="message" rows={4} placeholder={t("message")} className="input" />
      {err ? <p className="text-sm text-danger">{t("err")}</p> : null}
      <button type="submit" disabled={busy} className="btn btn-gold">
        {t("submit")}
      </button>
    </form>
  );
}
