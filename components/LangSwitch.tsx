"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

export default function LangSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function pathFor(target: Locale) {
    const segments = pathname.split("/");
    if (segments.length > 1) segments[1] = target;
    const next = segments.join("/");
    return next || `/${target}`;
  }

  return (
    <div className="flex items-center rounded-full border border-line bg-surface/70 p-0.5 backdrop-blur">
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathFor(l)}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
              active ? "bg-accent text-on-accent" : "text-muted hover:text-ink"
            }`}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
