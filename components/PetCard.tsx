import type { Dict } from "@/lib/i18n";
import { IconHeart, IconPaw, IconClock, IconWeight, IconShield } from "./icons";

// Floating "pet health card" shown in the hero — a calm nod to the
// dashboard panels in the reference designs, themed for a vet clinic.
export default function PetCard({ dict }: { dict: Dict }) {
  const c = dict.hero.card;

  const vitals = [
    { icon: IconHeart, label: c.heartRate, value: c.heartRateValue, accent: "pink" as const },
    { icon: IconClock, label: c.temp, value: c.tempValue, accent: "accent" as const },
    { icon: IconWeight, label: c.weight, value: c.weightValue, accent: "accent" as const },
    { icon: IconShield, label: c.status, value: c.statusValue, accent: "pink" as const },
  ];

  return (
    <div className="bob relative w-full max-w-sm">
      <div className="rounded-[28px] border border-line bg-surface/90 p-5 shadow-[0_40px_90px_-40px_var(--glow)] backdrop-blur-xl sm:p-6">
        {/* Header row */}
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-on-accent">
            <IconPaw className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-faint">
              {c.label}
            </p>
            <p className="truncate font-display text-lg font-bold text-ink">
              {c.petName}
            </p>
            <p className="truncate text-xs text-muted">{c.petMeta}</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-pink-soft px-2.5 py-1 text-xs font-semibold text-ink">
            <span className="pulse-dot h-2 w-2 rounded-full bg-pink-bright" />
            online
          </span>
        </div>

        {/* Vitals grid */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {vitals.map((v) => (
            <div
              key={v.label}
              className="rounded-2xl border border-line bg-bg-2/60 p-3.5"
            >
              <div
                className={`grid h-8 w-8 place-items-center rounded-lg ${
                  v.accent === "pink"
                    ? "bg-pink-soft text-pink-bright"
                    : "bg-accent-soft text-accent"
                }`}
              >
                <v.icon className="h-4.5 w-4.5" />
              </div>
              <p className="mt-2.5 text-[0.7rem] uppercase tracking-wide text-faint">
                {v.label}
              </p>
              <p className="font-display text-base font-bold text-ink">
                {v.value}
              </p>
            </div>
          ))}
        </div>

        {/* Next visit footer */}
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-accent px-4 py-3 text-on-accent">
          <span className="text-xs/relaxed opacity-90">{c.nextVisit}</span>
          <span className="font-display text-sm font-bold">{c.nextVisitValue}</span>
        </div>
      </div>
    </div>
  );
}
