"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Разворачивающаяся часть списка (скрытые цены, скрытые вопросы).
//
// `overflow: hidden` стоит прямо на анимируемом элементе — без него содержимое
// вылезает за пределы схлопывающейся высоты и раскрытие выглядит рывком.
// Отступ сверху тоже внутри: если повесить его снаружи (например `space-y` на
// родителе), схлопнутый блок продолжит занимать эти пиксели.
export default function Collapsible({
  open,
  children,
  className = "",
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          style={{ overflow: "hidden" }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <div className={className}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
