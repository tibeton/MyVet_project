/* eslint-disable @next/next/no-img-element */
import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { RevealGroup, RevealItem } from "./Reveal";
import { IconPaw, IconPin } from "./icons";

// Photos of the actual clinic. Tiles with no file yet render a branded
// placeholder rather than a stock photo — a borrowed interior shown as "our
// clinic" is a promise the visitor checks in person and finds broken.
// Fill site.clinicPhotos (same order as dict.clinic.items) to replace them.
export default function ClinicGallery({ dict }: { dict: Dict }) {
  const c = dict.clinic;

  return (
    <section id="clinic" className="section scroll-mt-20">
      <div className="shell">
        <SectionHeading
          kicker={c.kicker}
          title={c.title}
          lead={c.lead}
          icon={<IconPin className="h-4 w-4" />}
        />

        <RevealGroup
          className="mt-7 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {c.items.map((caption, i) => {
            const src = site.clinicPhotos[i] ?? "";
            return (
              <RevealItem key={caption}>
                <figure className="lift group h-full overflow-hidden rounded-3xl border border-line bg-surface">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-2">
                    {src ? (
                      <img
                        src={src}
                        alt={caption}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center">
                        <span className="flex flex-col items-center gap-2 text-center">
                          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                            <IconPaw className="h-6 w-6" />
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
                            {c.placeholder}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                  <figcaption className="px-5 py-4 font-display text-sm font-bold text-ink">
                    {caption}
                  </figcaption>
                </figure>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
