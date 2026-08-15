import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { products } from "@/data/products";
import { formatEuro, tloc } from "@/lib/utils";
import { AddButton, Cart } from "@/components/shop/cart";

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ cat?: string }>;
}) {
  const { locale } = await params;
  const { cat } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("shop");
  const list = products.filter((p) => !cat || p.category === cat);

  return (
    <div className="mx-auto grid max-w-[1400px] gap-12 px-5 pb-24 pt-32 lg:grid-cols-[1fr_320px] md:px-8">
      <div>
        <h1 className="display text-5xl md:text-7xl">{t("title")}</h1>
        <p className="mt-3 max-w-xl text-muted">{t("lead")}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Link href="/shop" className={`btn ${!cat ? "btn-gold" : "btn-ghost"}`}>
            {t("all")}
          </Link>
          <Link href="/shop?cat=lashes" className={`btn ${cat === "lashes" ? "btn-gold" : "btn-ghost"}`}>
            {t("lashes")}
          </Link>
          <Link href="/shop?cat=nails" className={`btn ${cat === "nails" ? "btn-gold" : "btn-ghost"}`}>
            {t("nails")}
          </Link>
          <Link href="/shop?cat=skin" className={`btn ${cat === "skin" ? "btn-gold" : "btn-ghost"}`}>
            {t("skin")}
          </Link>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {list.map((p) => (
            <article key={p.id} className="group">
              <Link href={`/shop/${p.slug}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-3 text-[0.62rem] uppercase tracking-[0.22em] text-gold-fg">
                  {t(p.category)}
                </p>
                <h2 className="display mt-1 text-2xl">{tloc(p.title, locale)}</h2>
                <p className="mt-1 text-sm text-muted">{tloc(p.summary, locale)}</p>
              </Link>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm">
                  {formatEuro(p.price, locale)}
                  <span className="ml-1 text-muted">/ {tloc(p.unit, locale)}</span>
                </span>
                <AddButton id={p.id} />
              </div>
            </article>
          ))}
        </div>
      </div>
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <Cart locale={locale} />
      </aside>
    </div>
  );
}
