import { defineRouting } from "next-intl/routing";

export const locales = ["de", "vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export const localeLabels: Record<Locale, { native: string }> = {
  de: { native: "Deutsch" },
  vi: { native: "Tiếng Việt" },
  en: { native: "English" },
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
