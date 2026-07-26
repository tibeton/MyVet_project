"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dict } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import { IconPlus } from "./icons";

export default function FAQ({ dict }: { dict: Dict }) {
  const f = dict.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section scroll-mt-20 bg-bg-2">
      <div className="shell">
        <SectionHeading kicker={f.kicker} title={f.title} lead={f.lead} />

        <div className="mt-7 max-w-3xl space-y-3 sm:mt-12">
          {f.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-ink sm:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-accent transition-all duration-300 ${
                      open ? "rotate-45 bg-accent text-on-accent" : ""
                    }`}
                  >
                    <IconPlus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-6 pb-5 text-sm/relaxed text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
