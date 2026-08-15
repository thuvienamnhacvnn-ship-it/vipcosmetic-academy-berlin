import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getStudentSession } from "@/lib/student-auth";
import { StudentLoginForm } from "@/components/account/login-form";

export const dynamic = "force-dynamic";

export default async function StudentLoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (await getStudentSession()) redirect(`/${locale}/konto`);
  const t = await getTranslations("account");
  return (
    <div className="mx-auto max-w-md px-5 pb-24 pt-32">
      <h1 className="display text-4xl">{t("login")}</h1>
      <p className="mt-3 text-sm text-muted">{t("loginLead")}</p>
      <div className="mt-8">
        <StudentLoginForm />
      </div>
    </div>
  );
}
