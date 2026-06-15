import type { Dict } from "@/lib/i18n";
import Reveal from "./Reveal";
import PetCard from "./PetCard";
import HeroPets from "./HeroPets";
import { IconArrowUpRight, IconPaw } from "./icons";

export default function Hero({ dict }: { dict: Dict }) {
  const h = dict.hero;

  const ctas = (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center xl:justify-start">
      <a
        href="#contact"
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-on-accent transition-colors hover:bg-accent-bright"
      >
        {h.primary}
        <IconArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      <a
        href="#services"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-7 py-4 font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
      >
        {h.secondary}
      </a>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-grid pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Soft ambient blobs */}
      <div className="blob -left-28 top-4 h-72 w-72 bg-accent-soft" />
      <div
        className="blob right-[-7rem] top-32 h-96 w-96 bg-pink-soft"
        style={{ animationDelay: "-5s" }}
      />

      {/* Slightly tighter left padding pulls the heading further to the edge */}
      <div className="relative mx-auto w-full max-w-[90rem] pl-[clamp(1rem,3vw,2.5rem)] pr-[clamp(1.25rem,4vw,4rem)]">
        <div className="flex flex-col items-center gap-10 md:gap-12 xl:grid xl:grid-cols-[0.8fr_1.05fr_0.9fr] xl:items-center xl:gap-10">
          {/* Left — heading (+ desktop CTAs) */}
          <div className="order-1 max-w-xl text-center xl:text-left">
            <Reveal>
              <span className="kicker justify-center xl:justify-start">
                <IconPaw className="h-4 w-4" />
                {h.kicker}
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-4 font-display text-[clamp(1.3rem,5.4vw,1.6rem)] font-extrabold uppercase leading-[1.08] tracking-[-0.02em] text-ink xl:text-[clamp(1.65rem,2.2vw,2.35rem)] xl:leading-[1.05]">
                {h.titleA}{" "}
                <span className="text-gradient">{h.titleHighlight}</span>{" "}
                {h.titleB}
              </h1>
            </Reveal>

            <Reveal delay={0.16} className="mt-8 hidden xl:block">
              {ctas}
            </Reveal>
          </div>

          {/* Center — switchable pet video */}
          <Reveal delay={0.1} className="order-2 w-full">
            <HeroPets />
          </Reveal>

          {/* Right — health card */}
          <Reveal delay={0.16} className="order-3 flex w-full justify-center xl:justify-end">
            <PetCard dict={dict} />
          </Reveal>

          {/* Mobile / tablet — CTAs below the health card */}
          <Reveal delay={0.1} className="order-4 w-full max-w-md xl:hidden">
            {ctas}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
