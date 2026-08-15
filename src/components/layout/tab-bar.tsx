"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  BookOpen,
  GraduationCap,
  Home,
  LayoutGrid,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { localeLabels, type Locale } from "@/i18n/routing";
import { site } from "@/data/site";

function openCounsel() {
  window.dispatchEvent(new Event("vca-counsel"));
}

export function TabBar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const tc = useTranslations("cta");
  const path = usePathname();
  const [more, setMore] = useState(false);

  if (path.startsWith("/admin") || path.startsWith("/login")) return null;

  const side = [
    { href: "/", key: "home", icon: Home, match: (p: string) => p === "/" },
    { href: "/kurse", key: "courses", icon: BookOpen, match: (p: string) => p.startsWith("/kurse") },
    { href: "/shop", key: "shop", icon: ShoppingBag, match: (p: string) => p.startsWith("/shop") },
  ] as const;

  const extra = [
    { href: "/ausbildung", key: "training", icon: GraduationCap },
    { href: "/termin", key: "book" },
    { href: "/ueber-uns", key: "about" },
    { href: "/kontakt", key: "contact" },
    { href: "/foerderung", key: "funding" },
    { href: "/konto", key: "account", icon: User },
  ] as const;

  return (
    <>
      <nav
        className="app-tabs fixed inset-x-0 bottom-0 z-50 hidden border-t border-gold/30 bg-[#0c0a08]/95 px-2 pt-2 backdrop-blur-xl"
        style={{ paddingBottom: "max(0.55rem, env(safe-area-inset-bottom))" }}
        aria-label="App menu"
      >
        <div className="mx-auto grid max-w-lg grid-cols-5 items-end">
          {side.slice(0, 2).map((item) => {
            const Icon = item.icon;
            const on = item.match(path);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 pb-1 text-[0.58rem] uppercase tracking-[0.08em] ${
                  on ? "text-gold" : "text-white/55"
                }`}
              >
                <Icon className="h-5 w-5" />
                {t(item.key)}
              </Link>
            );
          })}

          <Link href="/anmeldung" className="relative flex flex-col items-center pb-1">
            <span className="absolute -top-7 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-[0_10px_28px_-8px_rgba(203,169,117,0.9)] ring-4 ring-espresso">
              <Sparkles className="h-6 w-6" />
            </span>
            <span className="mt-8 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-gold">
              {t("apply")}
            </span>
          </Link>

          {side.slice(2).map((item) => {
            const Icon = item.icon;
            const on = item.match(path);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 pb-1 text-[0.58rem] uppercase tracking-[0.08em] ${
                  on ? "text-gold" : "text-white/55"
                }`}
              >
                <Icon className="h-5 w-5" />
                {t(item.key)}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setMore(true)}
            className={`flex flex-col items-center gap-1 pb-1 text-[0.58rem] uppercase tracking-[0.08em] ${
              more ? "text-gold" : "text-white/55"
            }`}
          >
            <LayoutGrid className="h-5 w-5" />
            {t("more")}
          </button>
        </div>
      </nav>

      {more ? (
        <div className="app-tabs-sheet fixed inset-0 z-[60]">
          <button type="button" className="absolute inset-0 bg-black/65" aria-label="Close" onClick={() => setMore(false)} />
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-gold/25 bg-espresso px-5 pt-4 text-white"
            style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/25" />
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">{t("more")}</p>
              <button type="button" onClick={() => setMore(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {extra.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMore(false)}
                  className="rounded-2xl bg-white/5 px-3 py-4 text-center text-[0.72rem] uppercase tracking-[0.1em] text-white/85"
                >
                  {t(item.key)}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMore(false);
                  openCounsel();
                }}
                className="rounded-2xl bg-white/5 px-3 py-4 text-center text-[0.72rem] uppercase tracking-[0.1em] text-white/85"
              >
                <MessageCircle className="mx-auto mb-1 h-4 w-4 text-gold" />
                {tc("consult")}
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div className="flex gap-2">
                {(Object.keys(localeLabels) as Locale[]).map((l) => (
                  <Link
                    key={l}
                    href={path}
                    locale={l}
                    onClick={() => setMore(false)}
                    className={`px-2 text-[0.7rem] uppercase ${locale === l ? "text-gold" : "text-white/50"}`}
                  >
                    {l}
                  </Link>
                ))}
              </div>
              <ThemeToggle />
            </div>
            <a href={site.whatsapp} className="mt-3 block text-center text-[0.68rem] uppercase tracking-[0.16em] text-gold">
              WhatsApp {site.phone}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
