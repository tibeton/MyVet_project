"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

const LABELS: Record<Locale, string> = {
  ru: "Русский",
  uz: "O‘zbekcha",
  en: "English",
};

export default function LangSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function pathFor(target: Locale) {
    const segments = pathname.split("/");
    if (segments.length > 1) segments[1] = target;
    const next = segments.join("/");
    return next || `/${target}`;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink backdrop-blur transition-colors hover:border-accent"
      >
        {locale}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-3 w-3 text-muted transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown — a small hover-bridge padding keeps it open while the
          cursor travels from the trigger to the menu. */}
      <div
        className={`absolute right-0 top-full z-50 pt-2 transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        role="menu"
      >
        <div className="min-w-[9.5rem] overflow-hidden rounded-2xl border border-line bg-surface/95 p-1.5 shadow-[0_24px_50px_-24px_var(--glow)] backdrop-blur-xl">
          {locales.map((l) => {
            const active = l === locale;
            return (
              <Link
                key={l}
                href={pathFor(l)}
                role="menuitem"
                aria-current={active ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-accent text-on-accent"
                    : "text-text hover:bg-bg-2 hover:text-ink"
                }`}
              >
                <span>{LABELS[l]}</span>
                <span
                  className={`text-xs font-semibold uppercase ${
                    active ? "text-on-accent/80" : "text-faint"
                  }`}
                >
                  {l}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
