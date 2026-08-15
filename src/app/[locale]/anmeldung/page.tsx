import { getTranslations, setRequestLocale } from "next-intl/server";
import { ApplyForm } from "@/components/forms/apply-form";

export default async function ApplyPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ course?: string }>;
}) {
  const { locale } = await params;
  const { course } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("apply");

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 pb-24 pt-32 lg:grid-cols-2">
      <div>
        <h1 className="display text-5xl">{t("title")}</h1>
        <p className="mt-4 text-muted">{t("lead")}</p>
      </div>
      <ApplyForm locale={locale} preset={course} />
    </div>
  );
}
