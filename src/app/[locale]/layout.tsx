import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SocialRail } from "@/components/layout/social-rail";
import { TabBar } from "@/components/layout/tab-bar";
import { CounselWidget } from "@/components/ai/counsel";
import { themeInitScript } from "@/components/theme-toggle";
import { site } from "@/data/site";
import "../globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0a08" },
    { media: "(prefers-color-scheme: light)", color: "#f7f1e8" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brand" });
  return {
    metadataBase: new URL("https://vip-cosmetic-academy.de"),
    title: { default: `${site.name} — ${t("slogan")}`, template: `%s · ${site.name}` },
    description: t("slogan"),
    icons: { icon: [{ url: "/logo/vip-logo.png" }] },
    appleWebApp: { capable: true, title: site.name, statusBarStyle: "black-translucent" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${outfit.variable} ${cormorant.variable} dark h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header locale={locale} />
          <SocialRail />
          <main id="main" className="flex-1 pb-[5.75rem] lg:pb-0">
            {children}
          </main>
          <Footer />
          <TabBar locale={locale} />
          <CounselWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
