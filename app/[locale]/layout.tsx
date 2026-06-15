import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope, Onest } from "next/font/google";
import { getDict, isLocale, locales, type Locale } from "@/lib/i18n";

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
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      locale: safe === "ru" ? "ru_RU" : safe === "uz" ? "uz_UZ" : "en_US",
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
      <body className={`${manrope.variable} ${onest.variable}`}>{children}</body>
    </html>
  );
}
