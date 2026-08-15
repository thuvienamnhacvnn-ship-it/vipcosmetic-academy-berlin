import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (await isAuthenticated()) redirect(`/${locale}/admin`);
  return (
    <div className="px-4 pb-24 pt-5 lg:pt-32">
      <LoginForm />
    </div>
  );
}
