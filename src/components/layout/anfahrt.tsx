import { getTranslations } from "next-intl/server";
import { site, directionsUrl, mapEmbedUrl } from "@/data/site";

/**
 * Khối "đường đến chỗ chúng tôi", đặt ngay trên footer ở MỌI trang.
 *
 * Cố ý KHÔNG nằm trong <Footer>: footer để `hidden lg:block` cho bản mobile app
 * shell, mà khách quét mã QR ngoài đường thì gần như luôn dùng điện thoại —
 * nhét vào footer là đúng nhóm người cần nhất lại không thấy gì.
 *
 * Bản đồ dùng OpenStreetMap chứ không phải Google Maps: nhúng Google Maps là
 * nạp tài nguyên của Google và đặt cookie ngay khi trang mở, ở Đức thì phải có
 * lớp hỏi đồng ý mới hợp lệ. OSM không theo dõi người xem nên không cần lớp đó.
 * Nút "Route planen" vẫn mở Google Maps — nhưng chỉ khi người dùng tự bấm.
 */
export async function Anfahrt() {
  const t = await getTranslations("anfahrt");

  return (
    <section id="anfahrt" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <figure className="lg:col-span-7">
            <img
              src="/media/anfahrt-haus.webp"
              alt={t("photoAlt")}
              width={1400}
              height={1204}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-border object-cover"
            />
            <figcaption className="mt-3 text-xs text-muted">{t("photoCaption")}</figcaption>
          </figure>

          <div className="lg:col-span-5">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.32em] text-gold-fg">
              {t("kicker")}
            </p>
            <h2 className="display mt-3 text-3xl md:text-4xl">{t("title")}</h2>

            <p className="mt-5 text-sm leading-relaxed text-muted">
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
            </p>
            <p className="mt-3 text-sm text-muted">{t("tram")}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              {/* Không khai điểm xuất phát: Maps tự lấy vị trí người dùng đang đứng. */}
              <a
                className="btn btn-gold"
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("route")}
              </a>
              <a className="btn border border-border" href={site.phoneHref}>
                {t("call")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-border">
          <iframe
            src={mapEmbedUrl}
            title={t("mapTitle")}
            loading="lazy"
            className="block h-[300px] w-full border-0 md:h-[380px]"
          />
        </div>
      </div>
    </section>
  );
}
