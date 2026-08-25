/* eslint-disable @next/next/no-img-element */
import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import { IconHouse, IconSun, IconStethoscope, IconBowl, IconTelegram } from "./icons";

// Order matches dict.hotel.points.
const ICONS = [
  IconHouse,       // Отдельный номер
  IconSun,         // Свет и климат
  IconStethoscope, // Врач рядом
  IconBowl,        // Свои вещи
];

// Зоогостиница живёт отдельным блоком, а не плиткой в списке услуг: это
// единственная услуга, которую выбирают глазами — по номеру, а не по описанию.
// Поэтому фото идут во всю ширину, а не сбоку от текста.
// Цены здесь нет: она зависит от номера и питомца, так что единственный CTA
// ведёт в Telegram, а не в форму записи.
export default function Hotel({ dict }: { dict: Dict }) {
  const h = dict.hotel;

  return (
    <section id="hotel" className="section scroll-mt-20 bg-bg-2">
      <div className="shell">
        <SectionHeading
          kicker={h.kicker}
          title={h.title}
          lead={h.lead}
          icon={<IconHouse className="h-4 w-4" />}
        />

        {/* Снимки настоящие и вертикальные. На узких экранах три портрета
            подряд дали бы ~1400px скролла, поэтому там это карусель с
            подглядывающей следующей карточкой; с sm — обычная сетка. */}
        <RevealGroup
          className="mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:mt-12 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0"
          stagger={0.09}
        >
          {site.hotelPhotos.map((src, i) => {
            // Видимых подписей нет — строка остаётся описанием для alt.
            const alt = h.captions[i] ?? "";
            return (
              <RevealItem
                key={src}
                className="w-[76%] shrink-0 snap-start sm:w-auto"
              >
                <div className="lift group relative aspect-[3/4] overflow-hidden rounded-3xl border border-line bg-surface-2">
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <RevealGroup
          className="mt-4 grid gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.07}
        >
          {h.points.map((p, i) => {
            const Icon = ICONS[i] ?? IconHouse;
            return (
              <RevealItem key={p.title}>
                <div className="lift h-full rounded-3xl border border-line bg-surface p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm/relaxed text-muted">{p.desc}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.12}>
          <div className="mt-4 rounded-3xl border border-line bg-surface p-6 sm:mt-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-8">
            <p className="max-w-xl text-sm/relaxed text-muted">{h.note}</p>
            <a
              href={site.telegramContact}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-6 py-3.5 font-semibold text-on-accent transition-colors hover:bg-accent-bright sm:mt-0"
            >
              <IconTelegram className="h-4 w-4" />
              {h.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
