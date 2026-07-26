import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  icon,
}: {
  kicker: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  icon?: ReactNode;
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <span className={`kicker ${center ? "justify-center" : ""}`}>
          {icon}
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-3 font-display sm:mt-4 text-[clamp(1.9rem,4vw,3.1rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p className="mt-3 text-base/relaxed sm:mt-4 text-muted sm:text-lg/relaxed">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
