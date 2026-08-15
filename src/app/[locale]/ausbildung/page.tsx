import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { departments } from "@/data/departments";
import { coursesByDepartment } from "@/data/courses";
import { deptImage } from "@/data/media";
import { tloc } from "@/lib/utils";

export default async function TrainingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-5 lg:pt-32 md:px-8">
      <h1 className="display text-5xl md:text-7xl">{t("deptsTitle")}</h1>
      <p className="mt-3 max-w-2xl text-muted">{t("deptsLead")}</p>
      <div className="mt-12 space-y-16">
        {departments.map((d) => {
          const list = coursesByDepartment(d.id);
          return (
            <section key={d.id} id={d.id} className="scroll-mt-28">
              <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={deptImage(d.id)} alt="" className="h-full w-full object-cover" />
                </div>
                <div>
              <h2 className="display text-4xl">{tloc(d.title, locale)}</h2>
              <p className="mt-3 max-w-3xl text-muted">{tloc(d.body, locale)}</p>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {list.map((c) => (
                  <Link key={c.id} href={`/kurse/${c.slug}`} className="frame rounded-sm px-5 py-4">
                    <div className="display text-2xl">{tloc(c.title, locale)}</div>
                    <p className="mt-1 text-sm text-muted">{tloc(c.summary, locale)}</p>
                  </Link>
                ))}
              </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
