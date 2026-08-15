import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/data/site";
import { BrandMark } from "@/components/brand/logo";

export async function Footer() {
  const t = await getTranslations("nav");
  const tf = await getTranslations("footer");
  const tl = await getTranslations("legal");

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandMark size="md" />
          <p className="mt-4 max-w-sm text-sm text-muted">{tf("tag")}</p>
          <p className="mt-3 text-sm text-muted">
            {site.address.line1}
            <br />
            {site.address.line2}, {site.address.zip} {site.address.city}
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <Link className="block hover:text-gold-fg" href="/shop">{t("shop")}</Link>
          <Link className="block hover:text-gold-fg" href="/kurse">{t("courses")}</Link>
          <Link className="block hover:text-gold-fg" href="/ausbildung">{t("training")}</Link>
          <Link className="block hover:text-gold-fg" href="/foerderung">{t("funding")}</Link>
          <Link className="block hover:text-gold-fg" href="/anmeldung">{t("apply")}</Link>
          <Link className="block hover:text-gold-fg" href="/termin">{t("book")}</Link>
        </div>
        <div className="space-y-2 text-sm">
          <a className="block hover:text-gold-fg" href={site.phoneHref}>{site.phone}</a>
          <a className="block hover:text-gold-fg" href={`mailto:${site.email}`}>{site.email}</a>
          <Link className="block hover:text-gold-fg" href="/impressum">{tl("imprint")}</Link>
          <Link className="block hover:text-gold-fg" href="/datenschutz">{tl("privacy")}</Link>
          <Link className="block hover:text-gold-fg" href="/login">{t("admin")}</Link>
        </div>
      </div>
      <div className="hairline" />
      <p className="py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. {tf("rights")}
      </p>
    </footer>
  );
}
