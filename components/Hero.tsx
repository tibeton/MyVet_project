/* eslint-disable @next/next/no-img-element */
import type { Dict } from "@/lib/i18n";
import Reveal from "./Reveal";
import PetCard from "./PetCard";
import HeroPets from "./HeroPets";
import { PetProvider } from "./PetContext";
import { IconArrowUpRight } from "./icons";

export default function Hero({ dict }: { dict: Dict }) {
  const h = dict.hero;

  const ctas = (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center xl:justify-start">
      <a
        href="#contact"
        className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-7 py-4 font-semibold text-on-accent transition-colors hover:bg-accent-bright"
      >
        {h.primary}
        <IconArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      <a
        href="#services"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-7 py-4 font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
      >
        {h.secondary}
      </a>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-grid pt-28 pb-12 md:pt-36 md:pb-16 xl:pb-0">
      {/* Soft ambient blobs */}
      <div className="blob -left-28 top-4 h-72 w-72 bg-accent-soft" />
      <div
        className="blob right-[-7rem] top-32 h-96 w-96 bg-pink-soft"
        style={{ animationDelay: "-5s" }}
      />

      <div className="shell relative">
        <PetProvider>
        <div className="flex flex-col items-center gap-10 md:gap-12 xl:grid xl:grid-cols-[0.8fr_1.05fr_0.9fr] xl:items-center xl:gap-10">
          {/* Left — heading (+ desktop CTAs) */}
          <div className="order-1 max-w-xl text-center xl:text-left">
            <Reveal delay={0.06}>
              {/* Heading rendered as artwork; keep the <h1> + alt for SEO/a11y. */}
              <h1>
                <img
                  src="/header.svg"
                  alt={`${h.titleA} ${h.titleHighlight} ${h.titleB}`}
                  className="mx-auto w-full max-w-[20rem] sm:max-w-[24rem] xl:mx-0 xl:max-w-[30rem]"
                />
              </h1>
            </Reveal>

            <Reveal delay={0.16} className="mt-8 hidden xl:block">
              {ctas}
            </Reveal>
          </div>

          {/* Mobile / tablet — CTAs right under the heading, visible on open */}
          <Reveal delay={0.1} className="order-2 w-full max-w-md xl:hidden">
            {ctas}
          </Reveal>

          {/* Center — switchable pet video */}
          <Reveal delay={0.1} className="order-3 w-full">
            <HeroPets dict={dict} />
          </Reveal>

          {/* Right — health card */}
          <Reveal delay={0.16} className="order-4 flex w-full justify-center xl:justify-end">
            <PetCard dict={dict} />
          </Reveal>
        </div>
        </PetProvider>
      </div>
    </section>
  );
}
