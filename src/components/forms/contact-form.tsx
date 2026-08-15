"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact");
  const ta = useTranslations("apply");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
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
      <textarea name="message" required rows={5} placeholder={ta("message")} className="input" />
      <button type="submit" disabled={busy} className="btn btn-gold">
        {t("submit")}
      </button>
    </form>
  );
}
