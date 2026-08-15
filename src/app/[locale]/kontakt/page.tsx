import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/forms/contact-form";
import { site } from "@/data/site";
import { tloc } from "@/lib/utils";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 pb-24 pt-5 lg:pt-32 lg:grid-cols-2">
      <div>
        <h1 className="display text-5xl">{t("title")}</h1>
        <p className="mt-4 text-muted">{t("lead")}</p>
        <div className="mt-8 space-y-3 text-sm">
          <p>
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
          </p>
          <p>
            <a href={site.phoneHref} className="text-gold-fg">
              {site.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>
            {t("hours")}: {tloc(site.hours, locale)}
          </p>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
