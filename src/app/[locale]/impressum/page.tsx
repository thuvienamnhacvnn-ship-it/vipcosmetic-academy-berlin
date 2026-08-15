import { site } from "@/data/site";

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-5 lg:pt-32 text-sm leading-relaxed text-muted">
      <h1 className="display text-4xl text-foreground">Impressum</h1>
      <p className="mt-6">
        {site.name}
        <br />
        {site.address.street}
        <br />
        {site.address.zip} {site.address.city}
      </p>
      <p className="mt-4">
        Tel: {site.phone}
        <br />
        E-Mail: {site.email}
      </p>
      <p className="mt-6">
        Inhaltlich verantwortlich gemäß § 18 Abs. 2 MStV: VIP Cosmetic Academy.
      </p>
    </div>
  );
}
