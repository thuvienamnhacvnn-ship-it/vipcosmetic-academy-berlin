"use client";

import { useState } from "react";

export function SettingsForm({
  initial,
}: {
  initial: { phone: string; email: string; hours: string };
}) {
  const [saved, setSaved] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    setSaved(true);
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg space-y-4">
      <h1 className="display text-4xl">Einstellungen</h1>
      <input name="phone" defaultValue={initial.phone} className="input" />
      <input name="email" defaultValue={initial.email} className="input" />
      <input name="hours" defaultValue={initial.hours} className="input" />
      <button className="btn btn-gold" type="submit">
        Speichern
      </button>
      {saved ? <p className="text-sm text-gold-fg">Gespeichert.</p> : null}
    </form>
  );
}
