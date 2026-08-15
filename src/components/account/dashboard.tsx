"use client";

import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { departments } from "@/data/departments";
import { tloc } from "@/lib/utils";
import type { StoredRecord } from "@/lib/store";

const statusLabel: Record<string, string> = {
  new: "Mới",
  active: "Đang học",
  paused: "Tạm dừng",
  finished: "Ra nghề",
};

export function StudentDashboard({
  locale,
  student,
  notices,
}: {
  locale: string;
  student: StoredRecord;
  notices: StoredRecord[];
}) {
  const t = useTranslations("account");
  const tc = useTranslations("cta");
  const router = useRouter();
  const dept = departments.find((d) => d.id === student.department);

  async function logout() {
    await fetch("/api/account/logout", { method: "POST" });
    router.push("/konto/login");
    router.refresh();
  }

  async function mark(id: string) {
    await fetch(`/api/notifications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-5 pb-24 pt-5 lg:pt-5 lg:pt-32">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-gold-fg">{t("title")}</p>
          <h1 className="display mt-2 text-4xl">{String(student.name)}</h1>
          <p className="mt-2 text-sm text-muted">
            {dept ? tloc(dept.title, locale) : String(student.department ?? "")} ·{" "}
            {statusLabel[String(student.status ?? "new")] ?? student.status}
          </p>
        </div>
        <button type="button" className="btn btn-ghost" onClick={logout}>
          {t("logout")}
        </button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2">
        <Link href="/anmeldung" className="btn btn-gold">
          {tc("apply")}
        </Link>
        <Link href="/termin" className="btn btn-ghost">
          {tc("book")}
        </Link>
      </section>

      <section>
        <h2 className="display text-3xl">{t("notices")}</h2>
        {notices.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{t("noNotices")}</p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {notices.map((n) => (
              <li key={n.id} className="py-4">
                <p className={n.read ? "text-muted" : ""}>{String(n.title)}</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-muted">{String(n.body ?? "")}</p>
                {!n.read ? (
                  <button type="button" className="mt-2 text-xs text-gold-fg" onClick={() => mark(n.id)}>
                    {t("markRead")}
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
