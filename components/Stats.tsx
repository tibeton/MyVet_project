"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
} from "motion/react";
import type { Dict } from "@/lib/i18n";

// Animated count-up that preserves any non-digit prefix/suffix and separators
// (e.g. "30 000+", "24/7", "12").
function StatValue({ value, play }: { value: string; play: boolean }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : initialFrom(value));

  useEffect(() => {
    if (!play || reduce) {
      setDisplay(value);
      return;
    }
    const target = digitsOf(value);
    if (target === null) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(formatLike(value, Math.round(v))),
    });
    return () => controls.stop();
  }, [play, value, reduce]);

  return <>{display}</>;
}

function digitsOf(s: string): number | null {
  const m = s.replace(/\s/g, "").match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}
function formatLike(template: string, n: number): string {
  const grouped = n.toLocaleString("ru-RU").replace(/,/g, " ");
  return template.replace(/[\d\s]*\d/, grouped);
}
function initialFrom(value: string): string {
  return digitsOf(value) === null ? value : formatLike(value, 0);
}

export default function Stats({ dict }: { dict: Dict }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const items = dict.stats.items;

  // pt-0: sits white-on-white against WhyUs, so that boundary is halved.
  return (
    <section className="section pt-0">
      <div className="shell">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.2rem] bg-accent px-6 py-12 text-on-accent sm:px-12 sm:py-16"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(closest-side, rgba(255,179,193,0.45), transparent 70%)",
              backgroundPosition: "85% -20%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "55% 120%",
            }}
          />
          <div className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.label}>
                <p className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-none text-on-accent">
                  <StatValue value={item.value} play={inView} />
                </p>
                <p className="mt-2 text-sm/snug text-on-accent/80">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
