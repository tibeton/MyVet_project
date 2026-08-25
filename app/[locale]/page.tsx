import { getDict, isLocale, type Locale } from "@/lib/i18n";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Hotel from "@/components/Hotel";
import Prices from "@/components/Prices";
import Team from "@/components/Team";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Порядок секций и их фоны связаны жёстче, чем кажется.
//
// Воронка: что делаем → как выглядит услуга, которую выбирают глазами →
// сколько стоит → кто мы → что о нас говорят → что осталось спросить → запись.
//
// Фоны обязаны чередоваться белый / bg-bg-2. Два соседних блока одного цвета
// сливаются в один — тогда второму нужен `pt-0`, и граница всё равно читается
// хуже. При нечётном числе секций одного стыка одного цвета не избежать,
// поэтому НЕ добавляйте сюда секцию, не пересчитав всю цепочку:
//
//   services (бел.) · hotel (тон.) · prices (бел.) · team (тон.) ·
//   reviews (бел.) · faq (тон.) · contact (бел.)
//
// ClinicGallery временно не в цепочке: все четыре плитки — плейсхолдеры «Фото
// скоро», а десятая секция ломала чередование. Компонент и словарь на месте:
// когда придут фото клиники, вернуть строкой <ClinicGallery dict={dict} /> и
// поменять фон соседей так, чтобы чередование сохранилось.
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
        <Hotel dict={dict} />
        <Prices dict={dict} />
        <Team dict={dict} />
        <Reviews dict={dict} locale={safe} />
        <FAQ dict={dict} />
        <Contact dict={dict} locale={safe} />
      </main>
      <Footer dict={dict} locale={safe} />
    </>
  );
}
