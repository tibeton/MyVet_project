import type { Dict } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import { RevealGroup, RevealItem } from "./Reveal";
import { IconQuote, IconStar, IconHeart } from "./icons";

export default function Reviews({ dict }: { dict: Dict }) {
  const r = dict.reviews;
  return (
    <section id="reviews" className="section scroll-mt-20">
      <div className="shell">
        <SectionHeading
          kicker={r.kicker}
          title={r.title}
          lead={r.lead}
          icon={<IconHeart className="h-4 w-4" />}
        />

        <RevealGroup
          className="mt-12 grid gap-5 lg:grid-cols-3"
          stagger={0.1}
        >
          {r.items.map((item) => (
            <RevealItem key={item.name}>
              <figure className="lift flex h-full flex-col rounded-3xl border border-line bg-surface p-7">
                <IconQuote className="h-9 w-9 text-pink" />
                <div className="mt-3 flex gap-0.5 text-pink-bright">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[0.95rem]/relaxed text-text">
                  {item.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent font-display text-sm font-bold text-on-accent">
                    {item.name[0]}
                  </span>
                  <span>
                    <span className="block font-display text-sm font-bold text-ink">
                      {item.name}
                    </span>
                    <span className="block text-xs text-muted">{item.meta}</span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
