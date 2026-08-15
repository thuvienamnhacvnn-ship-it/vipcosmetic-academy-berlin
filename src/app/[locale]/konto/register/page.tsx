import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getStudentSession } from "@/lib/student-auth";
import { RegisterForm } from "@/components/account/register-form";

export const dynamic = "force-dynamic";

export default async function StudentRegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (await getStudentSession()) redirect(`/${locale}/konto`);
  const t = await getTranslations("account");
  return (
    <div className="mx-auto max-w-md px-5 pb-24 pt-32">
      <h1 className="display text-4xl">{t("register")}</h1>
      <p className="mt-3 text-sm text-muted">{t("registerLead")}</p>
      <div className="mt-8">
        <RegisterForm locale={locale} />
      </div>
    </div>
  );
}
