import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { courseBySlug, publishedCourses } from "@/data/courses";
import { deptImage } from "@/data/media";
import { formatEuro, tloc } from "@/lib/utils";

export function generateStaticParams() {
  return publishedCourses().map((c) => ({ slug: c.slug }));
}

export default async function CourseDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const course = courseBySlug(slug);
  if (!course) notFound();
  const t = await getTranslations("courses");
  const tc = await getTranslations("cta");

  return (
    <article className="lg:pt-20">
      <div className="relative h-[46vh] min-h-[320px] overflow-hidden">
        <img src={deptImage(course.department)} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <div className="absolute bottom-8 left-0 right-0 mx-auto max-w-3xl px-5 text-white">
          <Link href="/kurse" className="text-[0.68rem] uppercase tracking-[0.18em] text-gold">
            ← {t("back")}
          </Link>
          <p className="mt-4 text-[0.68rem] uppercase tracking-[0.22em] text-gold">{course.department}</p>
          <h1 className="display mt-2 text-5xl md:text-6xl">{tloc(course.title, locale)}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-lg text-muted">{tloc(course.summary, locale)}</p>
      <div className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-3">
        <Meta label={t("duration")} value={tloc(course.duration, locale)} />
        <Meta label={t("level")} value={tloc(course.level, locale)} />
        <Meta
          label={t("from")}
          value={course.priceFrom ? formatEuro(course.priceFrom, locale) : "—"}
        />
      </div>
      <p className="mt-8 leading-relaxed text-muted">{tloc(course.description, locale)}</p>
      <h2 className="display mt-10 text-3xl">{t("modules")}</h2>
      <ul className="mt-4 space-y-2">
        {course.modules.map((m) => (
          <li key={m.de} className="border-l border-gold-fg pl-3 text-sm">
            {tloc(m, locale)}
          </li>
        ))}
      </ul>
      <h2 className="display mt-10 text-3xl">{t("outcomes")}</h2>
      <ul className="mt-4 space-y-2 text-sm text-muted">
        {course.outcomes.map((m) => (
          <li key={m.de}>— {tloc(m, locale)}</li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">
        {t("funding")}: {course.funding.join(" · ")}
      </p>
      <Link href={`/anmeldung?course=${course.slug}`} className="btn btn-gold mt-10">
        {tc("apply")}
      </Link>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">{label}</div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  );
}
