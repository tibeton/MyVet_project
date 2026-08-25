import type { Dict } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import { RevealGroup, RevealItem } from "./Reveal";
import { IconClock } from "./icons";

export default function Process({ dict }: { dict: Dict }) {
  const p = dict.process;
  // No pt-0: the tinted Hotel section above already draws a colour edge here.
  return (
    <section id="process" className="section scroll-mt-20">
      <div className="shell">
        <SectionHeading
          kicker={p.kicker}
          title={p.title}
          lead={p.lead}
          icon={<IconClock className="h-4 w-4" />}
        />

        <RevealGroup
          className="relative mt-7 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {p.steps.map((step, i) => (
            <RevealItem key={step.num}>
              <div className="relative h-full rounded-3xl border border-line bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent font-display text-base font-bold text-on-accent">
                    {step.num}
                  </span>
                  {i < p.steps.length - 1 && (
                    <span className="hidden h-px flex-1 bg-line lg:block" />
                  )}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm/relaxed text-muted">{step.desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
