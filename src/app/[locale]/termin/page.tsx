import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookForm } from "@/components/forms/book-form";
import { site } from "@/data/site";

export default async function TerminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("book");

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 pb-24 pt-5 lg:pt-32 lg:grid-cols-2">
      <div>
        <h1 className="display text-5xl">{t("title")}</h1>
        <p className="mt-4 text-muted">{t("lead")}</p>
        <p className="mt-6 text-sm text-muted">
          {site.address.street}
          <br />
          {site.phone}
        </p>
      </div>
      <BookForm />
    </div>
  );
}
