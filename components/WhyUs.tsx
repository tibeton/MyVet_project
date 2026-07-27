import type { Dict } from "@/lib/i18n";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import { IconShield, IconHeart, IconClock, IconStethoscope, IconPin } from "./icons";

// IconPin stands in for the pet-taxi point that replaced the lab.
const ICONS = [IconStethoscope, IconPin, IconHeart, IconClock, IconShield];

export default function WhyUs({ dict }: { dict: Dict }) {
  const w = dict.why;
  // pt-0: sits white-on-white against Services, so that boundary is halved.
  return (
    <section id="why" className="section scroll-mt-20 pt-0">
      <div className="shell">
        {/* Padding matches the Stats banner so the two full-width cards read as
            the same kind of block. Change both together. */}
        <div className="overflow-hidden rounded-[2.2rem] border border-line bg-surface-2 px-6 py-12 sm:px-12 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {/* Statement */}
            <div>
              <Reveal>
                <span className="kicker">{w.kicker}</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink">
                  {w.title}
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-4 max-w-md text-base/relaxed text-muted sm:text-lg/relaxed">
                  {w.lead}
                </p>
              </Reveal>
            </div>

            {/* Points */}
            <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
              {w.points.map((p, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <RevealItem key={p.title}>
                    <div className="lift h-full rounded-3xl border border-line bg-surface p-6">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-pink-soft text-pink-bright">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold text-ink">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm/relaxed text-muted">{p.desc}</p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>

          {/* Numbers used to be a separate accent band below. Merged in here so
              the claims and the evidence for them sit in one block instead of
              two competing "trust us" sections. */}
          <RevealGroup
            className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-10 sm:mt-12 sm:gap-8 sm:pt-12 lg:grid-cols-4"
            stagger={0.06}
          >
            {dict.stats.items.map((item) => (
              <RevealItem key={item.label}>
                <p className="font-display text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold leading-none text-accent">
                  {item.value}
                </p>
                <p className="mt-2 text-sm/snug text-muted">{item.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
