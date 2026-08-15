import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function FundingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("funding");
  const tc = await getTranslations("cta");

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-5 lg:pt-32">
      <h1 className="display text-5xl">{t("title")}</h1>
      <p className="mt-4 text-lg text-muted">{t("lead")}</p>
      <div className="mt-10 space-y-8">
        {[
          [t("voucherTitle"), t("voucherBody")],
          [t("privateTitle"), t("privateBody")],
          [t("nisvTitle"), t("nisvBody")],
        ].map(([title, body]) => (
          <section key={title} className="frame rounded-sm p-6">
            <h2 className="display text-3xl">{title}</h2>
            <p className="mt-3 text-muted">{body}</p>
          </section>
        ))}
      </div>
      <Link href="/anmeldung" className="btn btn-gold mt-10">
        {tc("apply")}
      </Link>
    </div>
  );
}
