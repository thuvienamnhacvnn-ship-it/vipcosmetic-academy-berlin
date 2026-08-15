import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import deMessages from "../../messages/de.json";

type Messages = typeof deMessages;

function deepMerge<T>(base: T, override: unknown): T {
  if (
    typeof base !== "object" ||
    base === null ||
    typeof override !== "object" ||
    override === null ||
    Array.isArray(base) ||
    Array.isArray(override)
  ) {
    return (override ?? base) as T;
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
    out[key] = deepMerge((base as Record<string, unknown>)[key], value);
  }
  return out as T;
}

async function loadMessages(locale: string): Promise<Messages> {
  if (locale === routing.defaultLocale) return deMessages;
  try {
    const mod = (await import(`../../messages/${locale}.json`)).default;
    return deepMerge(deMessages, mod);
  } catch {
    return deMessages;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return {
    locale,
    messages: await loadMessages(locale),
    timeZone: "Europe/Berlin",
    now: new Date(),
  };
});
