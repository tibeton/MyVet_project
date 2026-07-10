/* eslint-disable @next/next/no-img-element */
import type { Dict } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import { RevealGroup, RevealItem } from "./Reveal";
import { IconPaw, IconStethoscope } from "./icons";

// Photos by member index (parallel to dict.team.members order).
const PHOTOS = ["/team/ulugbek.jpg", "/team/nargiza.jpg"];

export default function Team({ dict }: { dict: Dict }) {
  const t = dict.team;
  return (
    <section id="team" className="section scroll-mt-20 bg-bg-2">
      <div className="shell">
        <SectionHeading
          kicker={t.kicker}
          title={t.title}
          lead={t.lead}
          icon={<IconStethoscope className="h-4 w-4" />}
        />

        <RevealGroup
          className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2"
          stagger={0.12}
        >
          {t.members.map((m, i) => (
            <RevealItem key={m.name}>
              <article className="lift group h-full overflow-hidden rounded-3xl border border-line bg-surface">
                {/* Photo */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-2">
                  <img
                    src={PHOTOS[i]}
                    alt={m.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/25 text-white backdrop-blur">
                    <IconPaw className="h-5 w-5" />
                  </span>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">{m.role}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
