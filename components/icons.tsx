import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function IconArrowUpRight(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function IconArrowRight(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconPaw(p: P) {
  return (
    <svg {...base} {...p}>
      <ellipse cx="12" cy="15.5" rx="4.2" ry="3.4" />
      <circle cx="6.5" cy="11" r="1.7" />
      <circle cx="17.5" cy="11" r="1.7" />
      <circle cx="9.2" cy="7.3" r="1.6" />
      <circle cx="14.8" cy="7.3" r="1.6" />
    </svg>
  );
}

export function IconStethoscope(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M5 3v5a4 4 0 0 0 8 0V3" />
      <path d="M9 16a5 5 0 0 0 10 0v-2" />
      <circle cx="19" cy="11" r="2.2" />
    </svg>
  );
}

export function IconScalpel(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M4 20 14 10l6-6-1 6-9 9z" />
      <path d="M4 20l4-1" />
    </svg>
  );
}

export function IconSyringe(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="m17 3 4 4M19 5l-9 9-4 1-1-1 1-4 9-9zM14 8l2 2M11 11l2 2" />
      <path d="m6 14-3 3" />
    </svg>
  );
}

export function IconScan(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2" />
      <path d="M7 12c1.4-2 3.6-2 5 0s3.6 2 5 0" />
    </svg>
  );
}

export function IconScissors(p: P) {
  return (
    <svg {...base} {...p}>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <path d="M8.2 7.5 20 18M8.2 16.5 20 6" />
    </svg>
  );
}

export function IconShield(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3 5 6v5c0 4.4 3 8 7 10 4-2 7-5.6 7-10V6l-7-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconFlask(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M9 3h6M10 3v6l-4.5 8A2 2 0 0 0 7.3 20h9.4a2 2 0 0 0 1.8-3L14 9V3" />
      <path d="M8 14h8" />
    </svg>
  );
}

export function IconHeart(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 20s-7-4.4-9.2-8.5C1.3 8.7 2.6 5.5 5.8 5.5c1.9 0 3.1 1 4.2 2.4 1.1-1.4 2.3-2.4 4.2-2.4 3.2 0 4.5 3.2 3 6-2.2 4.1-9.2 8.5-9.2 8.5z" />
    </svg>
  );
}

export function IconClock(p: P) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function IconPhone(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M6 3h3l1.5 4.5L8 9a12 12 0 0 0 7 7l1.5-2.5L21 15v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z" />
    </svg>
  );
}

export function IconPin(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconMail(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function IconTelegram(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M21 4 3 11l5 2 2 6 3-4 5 4 3-15z" />
      <path d="m8 13 8-5-5 7" />
    </svg>
  );
}

export function IconInstagram(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconStar(p: P) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...p}>
      <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19l1-5.8-4.3-4.1 5.9-.9L12 3z" />
    </svg>
  );
}

export function IconPlus(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconQuote(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M9.6 6C6.5 7.3 4.8 9.9 4.8 13.3V18h5.3v-5.3H7.7c0-1.7.8-3 2.6-3.8L9.6 6zm9 0c-3.1 1.3-4.8 3.9-4.8 7.3V18h5.3v-5.3h-2.4c0-1.7.8-3 2.6-3.8L18.6 6z" />
    </svg>
  );
}

export function IconWeight(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M5 8h14l1.5 12H3.5L5 8z" />
      <path d="M9 8a3 3 0 1 1 6 0" />
    </svg>
  );
}

export function IconDog(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M7.5 5.2 5 4l.4 4.4" />
      <path d="M16.5 5.2 19 4l-.4 4.4" />
      <path d="M5.4 8.4C5.4 6.6 8.3 6 12 6s6.6.6 6.6 2.4c0 1.9-.6 3-1.7 4.3C15.4 14.8 14 17.5 12 17.5s-3.4-2.7-4.9-4.8C6 11.4 5.4 10.3 5.4 8.4Z" />
      <path d="M9.6 10.6h.01M14.4 10.6h.01" />
      <path d="M12 13.6v1.2" />
      <circle cx="12" cy="12.7" r="1" />
    </svg>
  );
}

export function IconCat(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M5 9V4.4l3.4 2.2" />
      <path d="M19 9V4.4l-3.4 2.2" />
      <path d="M5 9.4C5 13.4 8.1 17 12 17s7-3.6 7-7.6" />
      <path d="M9.4 11h.01M14.6 11h.01" />
      <path d="M12 12.8v1.1M11 12.8h2" />
      <path d="M4.6 12.4 7.2 13M19.4 12.4 16.8 13" />
    </svg>
  );
}

// Зоотакси — своя машина для перевозки питомцев.
export function IconCar(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M5 17h14M4.5 17v-4.2l1.7-4.1A2 2 0 0 1 8.05 7.4h7.9a2 2 0 0 1 1.85 1.3l1.7 4.1V17" />
      <path d="M4.5 12.8h15" />
      <circle cx="7.8" cy="17" r="1.7" />
      <circle cx="16.2" cy="17" r="1.7" />
    </svg>
  );
}

// Зоогостиница — передержка на время поездки.
export function IconHouse(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M4 10.6 12 4.5l8 6.1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8.4z" />
      <path d="M9.6 20v-5.2h4.8V20" />
    </svg>
  );
}

// Стационар — круглосуточное наблюдение под присмотром врача.
export function IconBed(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M3.5 19v-8.5M3.5 15h17M20.5 19v-4a2.5 2.5 0 0 0-2.5-2.5H3.5" />
      <circle cx="7.6" cy="9.4" r="2.1" />
    </svg>
  );
}

// Чек-ап — комплексная проверка здоровья по списку.
export function IconClipboard(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M9 4.6H7.4a1.6 1.6 0 0 0-1.6 1.6v12.2a1.6 1.6 0 0 0 1.6 1.6h9.2a1.6 1.6 0 0 0 1.6-1.6V6.2a1.6 1.6 0 0 0-1.6-1.6H15" />
      <rect x="9" y="3" width="6" height="3.2" rx="1" />
      <path d="m9.4 12.4 1.8 1.8 3.4-3.6" />
    </svg>
  );
}

// Прайс-лист — ценник, а не лабораторная колба.
export function IconTag(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M11.6 3.6H19a1.4 1.4 0 0 1 1.4 1.4v7.4a1.4 1.4 0 0 1-.41.99l-7.6 7.6a1.4 1.4 0 0 1-1.98 0l-7.4-7.4a1.4 1.4 0 0 1 0-1.98l7.6-7.6a1.4 1.4 0 0 1 .99-.41z" />
      <circle cx="16.2" cy="7.8" r="1.4" />
    </svg>
  );
}

// Зоогостиница — дневной свет и климат в номере.
export function IconSun(p: P) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.6v2.2M12 19.2v2.2M4.35 4.35l1.56 1.56M18.09 18.09l1.56 1.56M2.6 12h2.2M19.2 12h2.2M4.35 19.65l1.56-1.56M18.09 5.91l1.56-1.56" />
    </svg>
  );
}

// Зоогостиница — свои миски, корм и вещи остаются с питомцем.
export function IconBowl(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M3.4 11.4h17.2a8.6 8.6 0 0 1-8.6 8.2 8.6 8.6 0 0 1-8.6-8.2z" />
      <path d="M8.2 8.4c0-1.6 1.7-1.6 1.7-3.2M12 8.4c0-1.6 1.7-1.6 1.7-3.2M15.8 8.4c0-1.6 1.7-1.6 1.7-3.2" />
    </svg>
  );
}
