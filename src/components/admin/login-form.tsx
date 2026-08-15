"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { BrandMark } from "@/components/brand/logo";

export function LoginForm() {
  const t = useTranslations("admin");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!res.ok) {
      setError(true);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="frame mx-auto mt-10 max-w-sm rounded-sm p-8">
      <BrandMark size="md" className="mx-auto" />
      <h1 className="display mt-6 text-center text-3xl">{t("login")}</h1>
      <label className="mt-6 block text-[0.68rem] uppercase tracking-[0.16em] text-muted">
        {t("password")}
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input mt-2"
        autoComplete="current-password"
        required
      />
      {error ? <p className="mt-3 text-sm text-danger">{t("bad")}</p> : null}
      <button type="submit" disabled={busy} className="btn btn-gold mt-6 w-full">
        {t("enter")}
      </button>
    </form>
  );
}
