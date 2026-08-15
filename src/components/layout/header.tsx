"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, User, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandMark } from "@/components/brand/logo";
import { localeLabels, type Locale } from "@/i18n/routing";
import { site } from "@/data/site";

const links = [
  { href: "/kurse", key: "courses" },
  { href: "/ausbildung", key: "training" },
  { href: "/shop", key: "shop" },
  { href: "/termin", key: "book" },
  { href: "/foerderung", key: "funding" },
  { href: "/ueber-uns", key: "about" },
  { href: "/kontakt", key: "contact" },
] as const;

export function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const tc = useTranslations("cta");
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const admin = path.startsWith("/admin") || path.startsWith("/login");

  return (
    <header
      className={`${
        admin ? "block" : "hidden lg:block"
      } fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/25 backdrop-blur-md dark:border-white/10`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between gap-3 px-5 md:px-8">
        <Link href="/" aria-label="VIP Cosmetic Academy" className="shrink-0">
          <BrandMark size="sm" light />
        </Link>
        <nav
          className={`hidden min-w-0 items-center lg:flex ${
            locale === "vi" ? "gap-3 xl:gap-4" : "gap-5 xl:gap-6"
          }`}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`shrink-0 whitespace-nowrap text-[0.68rem] font-medium uppercase ${
                locale === "vi" ? "tracking-[0.06em]" : "tracking-[0.2em]"
              } ${path.startsWith(l.href) ? "text-gold" : "text-white/75 hover:text-white"}`}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden whitespace-nowrap text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white/80 hover:text-gold 2xl:inline"
          >
            {site.phone}
          </a>
          <div className="hidden gap-1 md:flex">
            {(Object.keys(localeLabels) as Locale[]).map((l) => (
              <Link
                key={l}
                href={path}
                locale={l}
                className={`px-1.5 text-[0.65rem] uppercase tracking-wider ${
                  locale === l ? "text-gold" : "text-white/60"
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
          <ThemeToggle />
          <Link href="/konto" className="hidden text-white/80 hover:text-gold sm:inline-flex" aria-label={t("account")}>
            <User className="h-5 w-5" />
          </Link>
          <Link href="/anmeldung" className="btn btn-gold hidden sm:inline-flex">
            {tc("apply")}
          </Link>
          <button type="button" className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-black/70 px-4 py-4 lg:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block py-2 text-sm text-white" onClick={() => setOpen(false)}>
              {t(l.key)}
            </Link>
          ))}
          <Link href="/konto" className="block py-2 text-sm text-white" onClick={() => setOpen(false)}>
            {t("account")}
          </Link>
          <Link href="/anmeldung" className="btn btn-gold mt-3 w-full" onClick={() => setOpen(false)}>
            {tc("apply")}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
