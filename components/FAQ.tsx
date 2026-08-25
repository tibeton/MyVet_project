"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dict } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import ShowMore from "./ShowMore";
import Collapsible from "./Collapsible";
import { IconPlus } from "./icons";

// Столько вопросов видно до раскрытия. Семь аккордеонов подряд читались как
// стена и отодвигали форму записи; первых пяти хватает на типовой сценарий.
const VISIBLE = 5;

function Question({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-ink sm:text-lg">
          {q}
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
            // overflow: hidden прямо на анимируемом элементе, иначе текст
            // вылезает за пределы схлопывающейся высоты и раскрытие выглядит
            // рывком.
            style={{ overflow: "hidden" }}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Текст догоняет высоту с задержкой на раскрытии и уходит первым
                на закрытии — так движение читается как одно, а не как две
                одновременные анимации. */}
            <motion.p
              className="px-6 pb-5 text-sm/relaxed text-muted"
              initial={{ opacity: 0, y: -6 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.3, delay: 0.08 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ({ dict }: { dict: Dict }) {
  const f = dict.faq;
  // null, а не 0: раскрытый первый вопрос сбивает скан списка — глаз читает
  // его как единственный, а остальные как хвост.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const hidden = f.items.length - VISIBLE;

  function toggle() {
    setExpanded((v) => {
      // Свернуть с раскрытым вопросом из скрытой части — значит оставить
      // openIndex указывать в никуда: следующий клик по видимому вопросу
      // выглядел бы как «ничего не открылось».
      if (v && openIndex !== null && openIndex >= VISIBLE) setOpenIndex(null);
      return !v;
    });
  }

  return (
    <section id="faq" className="section scroll-mt-20 bg-bg-2">
      <div className="shell">
        <SectionHeading kicker={f.kicker} title={f.title} lead={f.lead} />

        <div className="mt-7 max-w-3xl sm:mt-12">
          <div className="space-y-3">
            {f.items.slice(0, VISIBLE).map((item, i) => (
              <Question
                key={item.q}
                q={item.q}
                a={item.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

          {/* Скрытая часть разворачивается по высоте, а не появляется разом:
              иначе список прыгает на пол-экрана. Отступ внутри Collapsible —
              снаружи он остался бы висеть у схлопнутого блока. */}
          <Collapsible open={expanded} className="space-y-3 pt-3">
            {f.items.slice(VISIBLE).map((item, k) => {
              const i = VISIBLE + k;
              return (
                <Question
                  key={item.q}
                  q={item.q}
                  a={item.a}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              );
            })}
          </Collapsible>
        </div>

        {hidden > 0 && (
          <ShowMore
            expanded={expanded}
            hidden={hidden}
            onToggle={toggle}
            more={f.showMore}
            less={f.showLess}
            className="mt-6 max-w-3xl"
          />
        )}
      </div>
    </section>
  );
}
