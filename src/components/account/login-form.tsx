"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function StudentLoginForm() {
  const t = useTranslations("account");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    setBusy(false);
    if (!res.ok) {
      setError(true);
      return;
    }
    router.push("/konto");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="email" type="email" required placeholder={t("email")} className="input" />
      <input name="password" type="password" required placeholder={t("password")} className="input" />
      {error ? <p className="text-sm text-danger">{t("bad")}</p> : null}
      <button type="submit" disabled={busy} className="btn btn-gold w-full">
        {t("loginSubmit")}
      </button>
      <p className="text-center text-sm text-muted">
        {t("noAccount")}{" "}
        <Link href="/konto/register" className="text-gold-fg">
          {t("register")}
        </Link>
      </p>
    </form>
  );
}
