"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { departments } from "@/data/departments";
import { tloc } from "@/lib/utils";

export function RegisterForm({ locale }: { locale: string }) {
  const t = useTranslations("account");
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/account/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    setBusy(false);
    if (res.status === 409) {
      setError(t("exists"));
      return;
    }
    if (!res.ok) {
      setError(t("err"));
      return;
    }
    router.push("/konto");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="name" required placeholder={t("name")} className="input" />
      <input name="email" type="email" required placeholder={t("email")} className="input" />
      <input name="phone" required placeholder={t("phone")} className="input" />
      <select name="department" required defaultValue="" className="input">
        <option value="" disabled>
          {t("department")}
        </option>
        {departments.map((d) => (
          <option key={d.id} value={d.id}>
            {tloc(d.title, locale)}
          </option>
        ))}
      </select>
      <input name="password" type="password" minLength={6} required placeholder={t("password")} className="input" />
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <button type="submit" disabled={busy} className="btn btn-gold w-full">
        {t("registerSubmit")}
      </button>
      <p className="text-center text-sm text-muted">
        {t("hasAccount")}{" "}
        <Link href="/konto/login" className="text-gold-fg">
          {t("login")}
        </Link>
      </p>
    </form>
  );
}
