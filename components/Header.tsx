"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import BrandLogo from "./BrandLogo";
import LangSwitch from "./LangSwitch";
import { IconArrowUpRight, IconPhone } from "./icons";

export default function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "#services", label: dict.nav.services },
    { href: "#process", label: dict.nav.process },
    { href: "#prices", label: dict.nav.prices },
    { href: "#reviews", label: dict.nav.reviews },
    { href: "#faq", label: dict.nav.faq },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={false}
        animate={{
          // 94%, not 80%: iOS Safari drops backdrop-blur mid-scroll, and at 80%
          // the hero CTA showed straight through the bar as if it sat on top.
          backgroundColor: scrolled
            ? "color-mix(in srgb, #ffffff 94%, transparent)"
            : "color-mix(in srgb, #ffffff 0%, transparent)",
          borderColor: scrolled ? "rgba(45, 49, 146, 0.12)" : "rgba(45, 49, 146, 0)",
        }}
        transition={{ duration: 0.4 }}
        className="border-b backdrop-blur-xl"
        style={{
          borderBottomWidth: 1,
          // Own compositing layer, so iOS repaints the bar with the page
          // instead of lagging a frame behind during momentum scroll.
          transform: "translateZ(0)",
          willChange: "background-color",
          // No-op unless viewport-fit=cover; keeps the bar under the status
          // area rather than leaving a strip of page showing above it.
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="shell flex h-[72px] items-center justify-between md:h-[92px]">
          {/* This is a one-page site, so the logo already links to the page
              we're on — a plain <Link> looked like a dead tap. Scroll to top
              instead (and close the mobile menu), keeping the href so
              middle-click / open-in-new-tab still work. */}
          <Link
            href={`/${locale}`}
            aria-label="MyVet"
            className="shrink-0"
            onClick={(e) => {
              setOpen(false);
              if (window.location.pathname.replace(/\/$/, "") === `/${locale}`) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <BrandLogo variant="mark" className="h-12 w-auto md:h-16" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative whitespace-nowrap text-sm font-medium text-text transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-pink-bright transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Full number from xl up; below that a tap-to-call button, so a
                24/7 clinic is never more than one tap away on a phone. */}
            <a
              href={`tel:${site.phoneHref}`}
              className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-ink xl:inline-flex"
            >
              <IconPhone className="h-4 w-4 text-accent" />
              {site.phoneDisplay}
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              aria-label={`${dict.cta.call} ${site.phoneDisplay}`}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface/70 text-accent backdrop-blur transition-colors hover:border-accent hover:bg-accent hover:text-on-accent xl:hidden"
            >
              <IconPhone className="h-5 w-5" />
            </a>
            <LangSwitch locale={locale} />
            <a
              href="#contact"
              className="group hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-bright sm:inline-flex"
            >
              {dict.cta.book}
              <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Burger */}
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface/70 backdrop-blur lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-ink transition-all duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="shell lg:hidden"
          >
            <div className="mt-2 overflow-hidden rounded-3xl border border-line bg-surface/95 p-5 shadow-[0_30px_60px_-30px_var(--glow)] backdrop-blur-xl">
              <nav className="flex flex-col">
                {[...links, { href: "#contact", label: dict.nav.contact }].map(
                  (l, i) => (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.05 }}
                      className="border-b border-line py-3.5 font-display text-lg font-semibold text-ink last:border-0"
                    >
                      {l.label}
                    </motion.a>
                  )
                )}
              </nav>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-4 py-3.5 font-semibold text-on-accent"
              >
                {dict.cta.book}
                <IconArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
