import type { Dict } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import { RevealGroup, RevealItem } from "./Reveal";
import { IconPaw, IconStethoscope } from "./icons";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const GRADIENTS = [
  "linear-gradient(135deg, #4B5CC4, #2D3192)",
  "linear-gradient(135deg, #FFB3C1, #4B5CC4)",
  "linear-gradient(135deg, #5a6cdd, #FF97AB)",
];

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
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {t.members.map((m, i) => (
            <RevealItem key={m.name}>
              <article className="lift group h-full overflow-hidden rounded-3xl border border-line bg-surface">
                {/* Avatar panel */}
                <div
                  className="relative flex h-48 items-center justify-center"
                  style={{ backgroundImage: GRADIENTS[i % GRADIENTS.length] }}
                >
                  <span className="font-display text-5xl font-extrabold text-white/95">
                    {initials(m.name)}
                  </span>
                  <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur">
                    <IconPaw className="h-5 w-5" />
                  </span>
                  <div
                    className="pointer-events-none absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 80% 120%, rgba(255,255,255,0.6), transparent 55%)",
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">{m.role}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-bg-2 px-3 py-1 text-xs font-medium text-muted">
                    {m.exp}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
