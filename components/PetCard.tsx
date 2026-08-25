"use client";

import type { Dict } from "@/lib/i18n";
import { IconPaw, IconClock, IconWeight, IconShield, IconSyringe, IconScan } from "./icons";
import { usePet } from "./PetContext";

// Floating "pet health card" shown in the hero — a calm nod to the
// dashboard panels in the reference designs, themed for a vet clinic.
// Its data follows the pet selected in the hero switcher (dog / cat).
export default function PetCard({ dict }: { dict: Dict }) {
  const c = dict.hero.card;
  const { pet } = usePet();
  const p = c.pets[pet];

  const vitals = [
    { icon: IconWeight, label: c.weight, value: p.weightValue, accent: "accent" as const },
    { icon: IconSyringe, label: c.vaccination, value: p.vaccinationValue, accent: "pink" as const },
    { icon: IconShield, label: c.antiparasitic, value: p.antiparasiticValue, accent: "accent" as const },
    { icon: IconScan, label: c.passport, value: p.passportValue, accent: "pink" as const },
  ];

  return (
    <div className="bob relative w-full max-w-sm">
      <div className="rounded-3xl border border-line bg-surface/90 p-5 shadow-[0_40px_90px_-40px_var(--glow)] backdrop-blur-xl sm:p-6">
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
              {p.petName}
            </p>
            <p className="truncate text-xs text-muted">{p.petMeta}</p>
          </div>
        </div>

        {/* Greyed-out preview of the feature, with a "coming soon" stamp on top */}
        <div className="relative mt-5">
          <div className="pointer-events-none grayscale select-none opacity-45">
            <div className="grid grid-cols-2 gap-3">
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

            <div className="mt-3 flex items-center justify-between rounded-2xl bg-accent px-4 py-3 text-on-accent">
              <span className="text-xs/relaxed opacity-90">{c.nextVisit}</span>
              <span className="font-display text-sm font-bold">{p.nextVisitValue}</span>
            </div>
          </div>

          {/* Stamp */}
          <div className="absolute inset-0 grid place-items-center">
            <span className="-rotate-3 inline-flex items-center gap-2 rounded-2xl border-2 border-dashed border-accent bg-surface px-4 py-2.5 shadow-[0_20px_45px_-20px_var(--glow)]">
              <IconClock className="h-4 w-4 text-accent" />
              <span className="font-display text-sm font-bold uppercase tracking-wide text-accent">
                {c.comingSoon}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
