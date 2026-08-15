import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { departments } from "@/data/departments";
import { publishedCourses } from "@/data/courses";
import { site } from "@/data/site";
import { media, deptImage } from "@/data/media";
import { tloc } from "@/lib/utils";
import { Banner } from "@/components/home/banner";

const PRIMARY = ["lashes", "nails", "skin", "feet", "pmu", "makeup"] as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("cta");
  const featured = publishedCourses().filter((c) => c.featured).slice(0, 4);
  const primary = departments.filter((d) => (PRIMARY as readonly string[]).includes(d.id));
  const more = departments.filter((d) => !(PRIMARY as readonly string[]).includes(d.id));

  return (
    <>
      <Banner slides={media.banner}>
        <div className="app-hero-mob flex h-full min-h-[inherit] flex-col items-center justify-center px-6 text-center">
          <img
            src="/logo/vip-mark.png"
            alt="VIP Cosmetic Academy"
            className="h-24 w-auto drop-shadow-[0_12px_32px_rgba(0,0,0,0.55)]"
          />
          <div className="mt-8 flex w-full max-w-[16rem] flex-col gap-3">
            <Link href="/anmeldung" className="btn btn-gold w-full">
              {tc("apply")}
            </Link>
            <Link href="/termin" className="btn w-full border border-white/35 text-white">
              {tc("book")}
            </Link>
          </div>
        </div>
        <div className="app-hero-desk mx-auto hidden min-h-[100svh] max-w-[1400px] items-end justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <div className="w-full max-w-xl text-white md:text-right">
            <img
              src="/logo/vip-mark.png"
              alt=""
              className="mb-8 h-20 w-auto drop-shadow-[0_10px_28px_rgba(0,0,0,0.45)] md:ml-auto md:h-28"
            />
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.32em] text-gold">{t("kicker")}</p>
            <h1 className="display mt-4 text-[2.8rem] leading-[0.94] md:text-[5rem]">{t("title")}</h1>
            <p className="mt-5 text-base text-white/75 md:ml-auto md:max-w-md md:text-lg">{t("lead")}</p>
            <div className="mt-8 flex flex-wrap gap-3 md:justify-end">
              <Link href="/anmeldung" className="btn btn-gold">
                {tc("apply")}
              </Link>
              <Link href="/termin" className="btn border border-white/30 text-white hover:border-gold">
                {tc("book")}
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/20 pt-6 md:ml-auto md:max-w-md">
              {[
                ["15+", t("statsYears")],
                [String(publishedCourses().length), t("statsCourses")],
                ["DEKRA", "AZAV · NiSV"],
              ].map(([n, l]) => (
                <div key={String(n)}>
                  <div className="display text-2xl text-gold md:text-3xl">{n}</div>
                  <div className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-white/55">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Banner>

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="display max-w-xl text-4xl md:text-6xl">{t("deptsTitle")}</h2>
          <p className="max-w-md text-sm text-muted md:text-right">{t("deptsLead")}</p>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {primary.map((d, i) => (
            <Link key={d.id} href={`/ausbildung#${d.id}`} className="group relative min-h-[300px] overflow-hidden">
              <img
                src={deptImage(d.id)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="relative flex h-full min-h-[300px] flex-col justify-end p-6 text-white">
                <span className="text-[0.62rem] uppercase tracking-[0.28em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-1 text-3xl">{tloc(d.title, locale)}</h3>
                <p className="mt-2 text-sm text-white/70">{tloc(d.teaser, locale)}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 grid gap-px border-y border-border sm:grid-cols-2 lg:grid-cols-4">
          {more.map((d) => (
            <Link
              key={d.id}
              href={`/ausbildung#${d.id}`}
              className="px-4 py-5 transition hover:bg-surface"
            >
              <div className="text-[0.62rem] uppercase tracking-[0.22em] text-gold-fg">{d.id}</div>
              <div className="display mt-1 text-2xl">{tloc(d.title, locale)}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="display text-4xl md:text-6xl">{t("featuredTitle")}</h2>
          <Link href="/kurse" className="hidden text-[0.68rem] uppercase tracking-[0.2em] text-gold-fg md:inline">
            {tc("viewCourses")} →
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {featured.map((c) => (
            <Link key={c.id} href={`/kurse/${c.slug}`} className="group">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={deptImage(c.department)}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-4 text-[0.62rem] uppercase tracking-[0.24em] text-gold-fg">{c.department}</p>
              <h3 className="display mt-1 text-3xl">{tloc(c.title, locale)}</h3>
              <p className="mt-2 text-sm text-muted">{tloc(c.summary, locale)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-8">
        <h2 className="display text-4xl md:text-5xl">{t("videoTitle")}</h2>
        <p className="mt-3 max-w-xl text-muted">{t("videoLead")}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {media.videos.map((v) => (
            <figure key={v.src}>
              <video
                className="aspect-video w-full object-cover"
                poster={v.poster}
                controls
                playsInline
                preload="metadata"
                muted
              >
                <source src={v.src} type="video/mp4" />
              </video>
              <figcaption className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-gold-fg">
                {tloc(v.label, locale)}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="min-h-[380px]">
          <img src={media.atelier} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 md:px-16">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-gold-fg">{site.name}</p>
          <h2 className="display mt-3 whitespace-pre-line text-4xl md:text-5xl">{t("whyTitle")}</h2>
          <div className="mt-8 space-y-7">
            {[
              [t("why1t"), t("why1")],
              [t("why2t"), t("why2")],
              [t("why3t"), t("why3")],
            ].map(([title, body]) => (
              <div key={title}>
                <h3 className="display text-2xl">{title}</h3>
                <p className="mt-1 text-sm text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="display text-4xl md:text-6xl">{t("ctaTitle")}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">{t("ctaLead")}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/anmeldung" className="btn btn-gold">
            {tc("apply")}
          </Link>
          <Link href="/termin" className="btn btn-ghost">
            {tc("book")}
          </Link>
        </div>
      </section>
    </>
  );
}
