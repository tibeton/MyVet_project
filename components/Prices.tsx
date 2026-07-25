import type { Dict } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import { Item } from "@astryxdesign/core/Item";
import { IconArrowUpRight, IconFlask, IconPaw } from "./icons";

export default function Prices({ dict }: { dict: Dict }) {
  const p = dict.prices;
  return (
    <section id="prices" className="section scroll-mt-20 bg-bg-2">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              kicker={p.kicker}
              title={p.title}
              lead={p.lead}
              icon={<IconFlask className="h-4 w-4" />}
            />
            <Reveal delay={0.16}>
              <div className="mt-7 rounded-3xl border border-line bg-surface p-6">
                <p className="text-sm/relaxed text-muted">{p.note}</p>
                <a
                  href="#contact"
                  className="group mt-5 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-6 py-3.5 font-semibold text-on-accent transition-colors hover:bg-accent-bright"
                >
                  {dict.cta.book}
                  <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="space-y-3" stagger={0.07}>
            {p.items.map((item) => (
              <RevealItem key={item.name}>
                <div className="lift group rounded-2xl border border-line bg-surface px-6 py-5">
                  <Item
                    density="compact"
                    startContent={
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-on-accent">
                        <IconPaw className="h-5 w-5" />
                      </span>
                    }
                    label={
                      <span className="font-display text-base font-semibold text-ink sm:text-lg">
                        {item.name}
                      </span>
                    }
                    endContent={
                      <span className="shrink-0 text-right font-display text-base font-bold text-accent sm:text-lg">
                        {item.price}
                        <span className="ml-1 text-xs font-medium text-faint">
                          {p.currency}
                        </span>
                      </span>
                    }
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
