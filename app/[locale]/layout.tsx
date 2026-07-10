import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope, Onest } from "next/font/google";
import { getDict, isLocale, locales, type Locale } from "@/lib/i18n";
import Preloader from "@/components/Preloader";
import JsonLd from "@/components/JsonLd";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-onest",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "ru";
  const dict = getDict(safe);
  return {
    metadataBase: new URL("https://myvet.uz"),
    title: dict.meta.title,
    description: dict.meta.description,
    icons: { icon: "/favicon.svg" },
    alternates: {
      canonical: `/${safe}`,
      languages: {
        ru: "/ru",
        uz: "/uz",
        en: "/en",
        "x-default": "/ru",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${safe}`,
      siteName: "MyVet",
      type: "website",
      locale: safe === "ru" ? "ru_RU" : safe === "uz" ? "uz_UZ" : "en_US",
      alternateLocale: ["ru_RU", "uz_UZ", "en_US"],
      images: [
        { url: "/og.jpg", width: 1200, height: 630, alt: dict.meta.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/og.jpg"],
    },
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
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body className={`${manrope.variable} ${onest.variable}`}>
        <JsonLd />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
