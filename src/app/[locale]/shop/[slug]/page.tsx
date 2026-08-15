import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { productBySlug, products } from "@/data/products";
import { formatEuro, tloc } from "@/lib/utils";
import { AddButton } from "@/components/shop/cart";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = productBySlug(slug);
  if (!p) notFound();
  const t = await getTranslations("shop");

  return (
    <article className="mx-auto grid max-w-5xl gap-10 px-5 pb-24 pt-5 lg:pt-32 md:grid-cols-2">
      <img src={p.image} alt="" className="aspect-[4/3] w-full object-cover" />
      <div>
        <Link href="/shop" className="text-[0.68rem] uppercase tracking-[0.18em] text-gold-fg">
          ← {t("title")}
        </Link>
        <p className="mt-6 text-[0.65rem] uppercase tracking-[0.22em] text-gold-fg">
          {t(p.category)}
        </p>
        <h1 className="display mt-2 text-4xl md:text-5xl">{tloc(p.title, locale)}</h1>
        <p className="mt-4 text-muted">{tloc(p.description, locale)}</p>
        <p className="mt-6 text-xl">
          {formatEuro(p.price, locale)}
          <span className="ml-2 text-sm text-muted">/ {tloc(p.unit, locale)}</span>
        </p>
        <div className="mt-8">
          <AddButton id={p.id} />
        </div>
      </div>
    </article>
  );
}
