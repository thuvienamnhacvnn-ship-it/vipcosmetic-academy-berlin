import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/data/site";
import { media } from "@/data/media";
import { AcademyStudio } from "@/components/academy/studio";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tc = await getTranslations("cta");

  const values =
    locale === "vi"
      ? [
          ["Đổi mới", "Giáo trình bám thị trường tiệm Berlin."],
          ["Chất lượng", "Chuẩn nghề là mặc định, không phải tuỳ chọn."],
          ["Kinh nghiệm", "Hơn 15 năm đào tạo chuyên sâu."],
          ["Dịch vụ", "Tư vấn trước khi ghi danh, kèm sau khi ra nghề."],
          ["Đáng tin", "Giấy tờ rõ, lịch rõ, chứng chỉ rõ."],
          ["Linh hoạt", "Tự túc hoặc Bildungsgutschein."],
        ]
      : [
          ["Innovation", "Lehrgänge, die Berliner Studios wirklich brauchen."],
          ["Qualität", "Studio-Standard ist die Norm, nicht die Ausnahme."],
          ["Erfahrung", "Über 15 Jahre Intensivausbildung."],
          ["Service", "Beratung vor der Anmeldung, Begleitung danach."],
          ["Zuverlässigkeit", "Klare Termine, anerkannte Zertifikate."],
          ["Flexibilität", "Privat oder mit Bildungsgutschein."],
        ];

  return (
    <div className="pb-24">
      <section className="relative min-h-[68svh] overflow-hidden">
        <img src="/media/academy/01-class.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20" />
        <div className="relative mx-auto flex min-h-[68svh] max-w-[1400px] flex-col justify-end px-5 pb-14 pt-32 md:px-8">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-gold">{site.name}</p>
          <h1 className="display mt-3 text-5xl text-white md:text-7xl">{t("title")}</h1>
          <p className="mt-4 max-w-xl text-base text-white/75 md:text-lg">{t("lead")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-8">
        <p className="max-w-3xl leading-relaxed text-muted">{t("body")}</p>
      </section>

      <AcademyStudio
        locale={locale}
        videos={media.academyVideos}
        photos={media.academyPhotos}
        videoTitle={t("videoKicker")}
        videoLead={t("videoTitle")}
        photoTitle={t("photoKicker")}
        photoLead={t("photoTitle")}
      />

      <section className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="display text-3xl md:text-4xl">{t("valuesTitle")}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(([title, body]) => (
            <div key={title} className="border-t border-gold-fg/40 pt-4">
              <h3 className="display text-2xl">{title}</h3>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-sm text-muted">
          {site.address.line1}, {site.address.zip} {site.address.city}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/anmeldung" className="btn btn-gold">
            {tc("apply")}
          </Link>
          <Link href="/termin" className="btn btn-ghost">
            {tc("book")}
          </Link>
        </div>
      </section>
    </div>
  );
}
