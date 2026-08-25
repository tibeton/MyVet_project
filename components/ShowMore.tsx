"use client";

import { IconPlus } from "./icons";

// Раскрывающая кнопка для длинных списков (прайс, FAQ).
//
// Сама она ничего не двигает. Раньше здесь был якорь прокрутки: список рос над
// кнопкой, кнопка уезжала вниз вместе с новыми строками, и на экране не
// менялось ничего — жест читался как «кнопка не работает». Якорь это чинил, но
// мгновенным `scrollBy` на пол-экрана, то есть рывком.
//
// Теперь видимость обеспечивает не прокрутка, а анимация: скрытая часть
// разворачивается по высоте за ~0.45s прямо на глазах, и кнопка съезжает вниз
// плавно вместе с ней. Если будете возвращать сюда скролл — он подерётся с
// анимацией высоты, которая идёт в тот же момент.
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
  return (
    <div className={`flex justify-center ${className}`}>
      <button
        type="button"
        onClick={onToggle}
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
