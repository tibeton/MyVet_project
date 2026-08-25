import type { Dict } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import { RevealGroup, RevealItem } from "./Reveal";
import {
  IconStethoscope,
  IconScalpel,
  IconSyringe,
  IconScan,
  IconScissors,
  IconBed,
  IconHouse,
  IconCar,
  IconClipboard,
  IconArrowUpRight,
  IconPaw,
} from "./icons";

// One icon per service, in the order of dict.services.items. This used to be a
// short list cycled with `i % ICONS.length`, which silently mismatched as soon
// as services were added or removed — grooming ended up with a tooth, the
// inpatient ward with scissors and the pet taxi with a scalpel.
const ICONS = [
  IconStethoscope, // Терапия и приём
  IconScalpel,     // Хирургия
  IconSyringe,     // Вакцинация и профилактика
  IconScan,        // Диагностика
  IconScissors,    // Груминг и уход
  IconBed,         // Стационар
  IconHouse,       // Зоогостиница
  IconCar,         // Зоотакси
  IconClipboard,   // Чек-ап
];

export default function Services({ dict }: { dict: Dict }) {
  const s = dict.services;
  return (
    <section id="services" className="section scroll-mt-20">
      <div className="shell">
        <SectionHeading
          kicker={s.kicker}
          title={s.title}
          lead={s.lead}
          icon={<IconPaw className="h-4 w-4" />}
        />

        <RevealGroup
          className="mt-7 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {s.items.map((item, i) => {
            const Icon = ICONS[i] ?? IconPaw;
            return (
              <RevealItem key={item.num}>
                <article className="lift group flex h-full flex-col rounded-3xl border border-line bg-surface p-7">
                  <div className="flex items-start justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-on-accent">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="font-display text-sm font-bold text-faint">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-2.5 text-sm/relaxed text-muted">{item.desc}</p>

                  {/* mt-auto: описания у услуг разной длины, и без этого
                      теги вставали на разной высоте — в ряду из трёх карточек
                      низ содержимого «плясал». Теперь теги всегда прижаты к
                      низу карточки, pt-5 держит минимальный отступ от текста. */}
                  <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                    {item.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-bg-2 px-3 py-1 text-xs font-medium text-ink"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Same clamp as .section padding: кнопка отбивается от сетки услуг
            ровно на один шаг секции, то есть остаётся частью этого блока, а
            не повисает между секциями. */}
        <div className="mt-[clamp(2.25rem,4.5vw,4.25rem)] flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-6 py-3.5 font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {dict.cta.book}
            <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
