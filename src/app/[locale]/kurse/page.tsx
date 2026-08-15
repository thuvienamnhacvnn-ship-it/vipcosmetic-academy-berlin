import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { publishedCourses } from "@/data/courses";
import { departments } from "@/data/departments";
import { deptImage } from "@/data/media";
import { formatEuro, tloc } from "@/lib/utils";

export default async function CoursesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ dept?: string }>;
}) {
  const { locale } = await params;
  const { dept } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("courses");
  const list = publishedCourses().filter((c) => !dept || c.department === dept);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-32 md:px-8">
      <h1 className="display text-5xl md:text-7xl">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-muted">{t("lead")}</p>
      <div className="mt-8 flex flex-wrap gap-2">
        <Link href="/kurse" className={`btn ${!dept ? "btn-gold" : "btn-ghost"}`}>
          {t("all")}
        </Link>
        {departments.map((d) => (
          <Link
            key={d.id}
            href={`/kurse?dept=${d.id}`}
            className={`btn ${dept === d.id ? "btn-gold" : "btn-ghost"}`}
          >
            {tloc(d.title, locale)}
          </Link>
        ))}
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <Link key={c.id} href={`/kurse/${c.slug}`} className="group">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={deptImage(c.department)}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-gold-fg">{c.department}</div>
            <h2 className="display mt-1 text-3xl">{tloc(c.title, locale)}</h2>
            <p className="mt-2 text-sm text-muted">{tloc(c.summary, locale)}</p>
            <div className="mt-3 flex justify-between text-xs uppercase tracking-[0.14em] text-muted">
              <span>{tloc(c.duration, locale)}</span>
              {c.priceFrom ? (
                <span>
                  {t("from")} {formatEuro(c.priceFrom, locale)}
                </span>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
