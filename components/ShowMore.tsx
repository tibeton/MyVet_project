"use client";

import { useLayoutEffect, useRef } from "react";
import { IconPlus } from "./icons";

// Раскрывающая кнопка для длинных списков (прайс, FAQ).
//
// Главное здесь — не внешний вид, а якорь прокрутки. Кнопка стоит под списком,
// то есть её нажимают, когда она у нижнего края экрана. Новые строки
// вставляются НАД ней и уезжают за пределы вьюпорта вместе с самой кнопкой —
// на экране не меняется ничего, и жест читается как «кнопка не работает».
// Поэтому после раскрытия мы сдвигаем прокрутку ровно на столько, на сколько
// уехала кнопка: она остаётся под курсором, а появившиеся строки занимают
// место прямо над ней, то есть в поле зрения.
export default function ShowMore({
  expanded,
  hidden,
  onToggle,
  more,
  less,
  className = "",
}: {
  expanded: boolean;
  hidden: number;
  onToggle: () => void;
  more: string;
  less: string;
  className?: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const anchor = useRef<number | null>(null);

  useLayoutEffect(() => {
    const before = anchor.current;
    anchor.current = null;
    if (before === null || !btnRef.current) return;
    const delta = btnRef.current.getBoundingClientRect().top - before;
    if (delta) window.scrollBy(0, delta);
  }, [expanded]);

  return (
    <div className={`flex justify-center ${className}`}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => {
          anchor.current = btnRef.current?.getBoundingClientRect().top ?? null;
          onToggle();
        }}
        aria-expanded={expanded}
        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
      >
        {expanded ? less : `${more} (${hidden})`}
        <IconPlus
          className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-45" : ""}`}
        />
      </button>
    </div>
  );
}
