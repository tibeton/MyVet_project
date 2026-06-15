import type { Dict } from "@/lib/i18n";
import { IconPaw } from "./icons";

export default function Marquee({ dict }: { dict: Dict }) {
  const items = dict.marquee;
  const row = [...items, ...items];

  return (
    <div className="border-y border-line bg-surface-2/60 py-5">
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track">
          {row.map((word, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 font-display text-lg font-semibold text-ink sm:text-xl">
                {word}
              </span>
              <IconPaw className="h-4 w-4 shrink-0 text-pink-bright" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
