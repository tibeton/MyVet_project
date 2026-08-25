import { getDict, isLocale, type Locale } from "@/lib/i18n";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import ClinicGallery from "@/components/ClinicGallery";
import Hotel from "@/components/Hotel";
import Team from "@/components/Team";
import Process from "@/components/Process";
import Prices from "@/components/Prices";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "ru";
  const dict = getDict(safe);

  return (
    <>
      <Header dict={dict} locale={safe} />
      <main>
        <Hero dict={dict} />
        <Marquee dict={dict} />
        <Services dict={dict} />
        <WhyUs dict={dict} />
        <Team dict={dict} />
        <ClinicGallery dict={dict} />
        <Hotel dict={dict} />
        <Process dict={dict} />
        <Prices dict={dict} />
        <Reviews dict={dict} locale={safe} />
        <FAQ dict={dict} />
        <Contact dict={dict} locale={safe} />
      </main>
      <Footer dict={dict} locale={safe} />
    </>
  );
}
