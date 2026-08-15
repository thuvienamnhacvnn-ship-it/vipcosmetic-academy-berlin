"use client";

import { useRouter } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const items = [
  { href: "/admin", key: "dash" },
  { href: "/admin/whatsapp", key: "whatsapp" },
  { href: "/admin/nachrichten", key: "notices" },
  { href: "/admin/kurse", key: "courses" },
  { href: "/admin/anmeldungen", key: "enrollments" },
  { href: "/admin/termine", key: "bookings" },
  { href: "/admin/shop", key: "shop" },
  { href: "/admin/anfragen", key: "inquiries" },
  { href: "/admin/schueler", key: "students" },
  { href: "/admin/einstellungen", key: "settings" },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("admin");
  const path = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 pt-5 lg:pt-5 lg:pt-32 lg:grid-cols-[220px_1fr]">
      <aside className="frame h-fit rounded-sm p-4">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-fg">Admin</p>
        <nav className="mt-4 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded px-3 py-2 text-sm ${
                path === item.href ? "bg-surface-2 text-gold-fg" : "text-muted hover:text-foreground"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <button type="button" onClick={logout} className="btn btn-ghost mt-6 w-full">
          {t("logout")}
        </button>
      </aside>
      <section>{children}</section>
    </div>
  );
}
