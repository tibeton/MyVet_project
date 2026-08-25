"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import { Item } from "@astryxdesign/core/Item";
import ShowMore from "./ShowMore";
import Collapsible from "./Collapsible";
import { IconArrowUpRight, IconTag, IconPaw } from "./icons";

// Show a handful by default: ten rows pushed the booking CTA far down the page
// and most visitors only scan the first few.
const VISIBLE = 5;

type Row = Dict["prices"]["items"][number];

function PriceRow({ item, currency }: { item: Row; currency: string }) {
  return (
    <div className="lift group rounded-3xl border border-line bg-surface px-6 py-5">
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
            {/* "по запросу сум" would be nonsense — the currency only belongs
                on rows that carry a number. */}
            {!item.onRequest && (
              <span className="ml-1 text-xs font-medium text-faint">
                {currency}
              </span>
            )}
          </span>
        }
      />
    </div>
  );
}

export default function Prices({ dict }: { dict: Dict }) {
  const p = dict.prices;
  const [expanded, setExpanded] = useState(false);
  const hidden = p.items.length - VISIBLE;

  return (
    <section id="prices" className="section scroll-mt-20">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              kicker={p.kicker}
              title={p.title}
              lead={p.lead}
              icon={<IconTag className="h-4 w-4" />}
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

          {/* Скрытая часть — отдельный блок, а не `slice` внутри той же
              RevealGroup. RevealGroup держит whileInView с `once: true`: к
              моменту раскрытия он уже отработал и больше не оркеструет детей,
              поэтому строки, дописанные в него позже, оставались на
              `opacity: 0` — спойлер открывался пустым. Здесь их видимость
              обеспечивает Collapsible, а не whileInView. */}
          <div>
            <RevealGroup className="space-y-3" stagger={0.07}>
              {p.items.slice(0, VISIBLE).map((item) => (
                <RevealItem key={item.name}>
                  <PriceRow item={item} currency={p.currency} />
                </RevealItem>
              ))}
            </RevealGroup>

            <Collapsible open={expanded} className="space-y-3 pt-3">
              {p.items.slice(VISIBLE).map((item) => (
                <PriceRow key={item.name} item={item} currency={p.currency} />
              ))}
            </Collapsible>
          </div>
        </div>

        {hidden > 0 && (
          <ShowMore
            expanded={expanded}
            hidden={hidden}
            onToggle={() => setExpanded((v) => !v)}
            more={p.showMore}
            less={p.showLess}
            className="mt-6 lg:justify-end"
          />
        )}
      </div>
    </section>
  );
}
