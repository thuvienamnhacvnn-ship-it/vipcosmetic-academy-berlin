import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const items = [1, 2, 3, 4].map((n) => ({
    q: t(`q${n}` as "q1"),
    a: t(`a${n}` as "a1"),
  }));

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <h1 className="display text-5xl">{t("title")}</h1>
      <div className="mt-10 space-y-6">
        {items.map((item) => (
          <div key={item.q} className="border-t border-border pt-5">
            <h2 className="display text-2xl">{item.q}</h2>
            <p className="mt-2 text-muted">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
