"use client";

import { useState, type FormEvent } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import {
  IconPhone,
  IconMail,
  IconPin,
  IconClock,
  IconTelegram,
  IconInstagram,
  IconArrowUpRight,
  IconShield,
} from "./icons";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const c = dict.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean }>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();

    const nextErrors = { name: !name, phone: !phone || phone.replace(/\D/g, "").length < 7 };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          pet: data.get("pet"),
          service: data.get("service"),
          message: data.get("message"),
          locale,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const contactRows = [
    { icon: IconPhone, label: dict.cta.call, value: site.phoneDisplay, href: `tel:${site.phoneHref}` },
    { icon: IconShield, label: c.emergency, value: site.emergencyDisplay, href: `tel:${site.emergencyHref}`, note: c.emergencyNote },
    { icon: IconMail, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
    { icon: IconPin, label: c.address, value: c.addressValue, href: site.mapLink },
    { icon: IconClock, label: c.hours, value: c.hoursValue },
  ];

  const fieldClass =
    "w-full rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent";

  return (
    <section id="contact" className="section scroll-mt-20">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Form card */}
          <Reveal className="rounded-[2rem] border border-line bg-surface-2 p-6 sm:p-9">
            <span className="kicker">{c.kicker}</span>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-extrabold leading-[1.07] tracking-[-0.02em] text-ink">
              {c.title}
            </h2>
            <p className="mt-3 max-w-md text-sm/relaxed text-muted sm:text-base/relaxed">
              {c.lead}
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-7 space-y-3.5">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink">
                    {c.name}
                  </label>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={`${fieldClass} ${errors.name ? "border-pink-bright" : ""}`}
                    onChange={() => errors.name && setErrors((p) => ({ ...p, name: false }))}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-pink-bright">{c.required}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink">
                    {c.phone}
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+998 __ ___ __ __"
                    className={`${fieldClass} ${errors.phone ? "border-pink-bright" : ""}`}
                    onChange={() => errors.phone && setErrors((p) => ({ ...p, phone: false }))}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-pink-bright">{c.invalidPhone}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink">
                    {c.pet}
                  </label>
                  <input
                    name="pet"
                    type="text"
                    placeholder={c.petPlaceholder}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink">
                    {c.service}
                  </label>
                  <select name="service" defaultValue={c.serviceOptions[0]} className={fieldClass}>
                    {c.serviceOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">
                  {c.message}
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder={c.messagePlaceholder}
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-on-accent transition-colors hover:bg-accent-bright disabled:opacity-70 sm:w-auto"
              >
                {status === "sending" ? c.sending : c.submit}
                {status !== "sending" && (
                  <IconArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
              </button>

              {status === "success" && (
                <p className="rounded-2xl bg-accent-soft px-4 py-3 text-sm font-medium text-accent">
                  {c.success}
                </p>
              )}
              {status === "error" && (
                <p className="rounded-2xl bg-pink-soft px-4 py-3 text-sm font-medium text-ink">
                  {c.error}
                </p>
              )}
            </form>
          </Reveal>

          {/* Info + map */}
          <Reveal delay={0.1} className="flex flex-col gap-5">
            <div className="rounded-[2rem] border border-line bg-surface p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
                {c.or}
              </p>
              <ul className="mt-4 space-y-1">
                {contactRows.map((row) => {
                  const inner = (
                    <span className="flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-bg-2">
                      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                        <row.icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-muted">{row.label}</span>
                        <span className="block font-display text-sm font-bold text-ink">
                          {row.value}
                        </span>
                        {row.note && (
                          <span className="block text-xs text-faint">{row.note}</span>
                        )}
                      </span>
                    </span>
                  );
                  return (
                    <li key={row.label}>
                      {row.href ? (
                        <a href={row.href} target={row.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex gap-2.5 px-3">
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-accent transition-colors hover:bg-accent hover:text-on-accent"
                >
                  <IconTelegram className="h-5 w-5" />
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-accent transition-colors hover:bg-accent hover:text-on-accent"
                >
                  <IconInstagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-line bg-surface">
              <iframe
                src={site.mapEmbed}
                title="MyVet — map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full grayscale-[0.2]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
