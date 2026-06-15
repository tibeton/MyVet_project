"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconDog, IconCat } from "./icons";

type Pet = "dog" | "cat";

export default function HeroPets() {
  const [pet, setPet] = useState<Pet>("dog");

  const toggles: { id: Pet; Icon: typeof IconDog; label: string }[] = [
    { id: "dog", Icon: IconDog, label: "Собака" },
    { id: "cat", Icon: IconCat, label: "Кошка" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[23rem] xl:max-w-[27rem]">
      {/* Soft halo — only behind the mobile plate */}
      <div className="absolute -inset-4 -z-10 rounded-[2.6rem] bg-accent-soft blur-2xl xl:hidden" />

      {/* Mobile: framed plate. Desktop: no frame, video softly fades into the white background. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.2rem] border border-line bg-surface-2 shadow-[0_50px_90px_-45px_var(--glow)] xl:rounded-none xl:border-0 xl:bg-transparent xl:shadow-none xl:[-webkit-mask-image:radial-gradient(70%_70%_at_50%_44%,#000_56%,transparent_100%)] xl:[mask-image:radial-gradient(70%_70%_at_50%_44%,#000_56%,transparent_100%)]">
        <AnimatePresence mode="wait">
          <motion.video
            key={pet}
            src={`/${pet}.mp4`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* gentle bottom fade for legibility — mobile plate only */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(45,49,146,0.18)] to-transparent xl:hidden" />
      </div>

      {/* Dog / Cat toggle */}
      <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-surface p-1.5 shadow-[0_24px_50px_-24px_var(--glow)]">
        {toggles.map(({ id, Icon, label }) => {
          const active = pet === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setPet(id)}
              aria-pressed={active}
              aria-label={label}
              className={`grid h-12 w-12 place-items-center rounded-full transition-colors duration-300 ${
                active
                  ? "bg-accent text-on-accent"
                  : "text-faint hover:bg-bg-2 hover:text-accent"
              }`}
            >
              <Icon className="h-6 w-6" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
