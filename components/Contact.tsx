"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import { Button } from "@astryxdesign/core/Button";
import { TextInput } from "@astryxdesign/core/TextInput";
import { TextArea } from "@astryxdesign/core/TextArea";
import { Selector } from "@astryxdesign/core/Selector";
import { InputGroup, InputGroupText } from "@astryxdesign/core/InputGroup";
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
  const [errors, setErrors] = useState<{
    name?: boolean;
    phone?: boolean;
    pet?: boolean;
  }>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pet, setPet] = useState("");
  const [service, setService] = useState(c.serviceOptions[0]);
  const [message, setMessage] = useState("");

  // Astryx TextInput exposes neither inputMode nor autoComplete, so set them on
  // the underlying <input> — without inputMode phones show a full keyboard.
  const phoneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const input = phoneRef.current?.querySelector("input");
    if (!input) return;
    input.setAttribute("inputmode", "numeric");
    input.setAttribute("autocomplete", "tel-national");
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedPet = pet.trim();
    const trimmedMessage = message.trim();

    const nextErrors = {
      name: !trimmedName,
      // National part only — the +998 country code is a fixed prefix addon.
      phone: trimmedPhone.replace(/\D/g, "").length !== 9,
      pet: !trimmedPet,
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          phone: `+998 ${trimmedPhone}`,
          pet: trimmedPet,
          service,
          message: trimmedMessage,
          locale,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setName("");
      setPhone("");
      setPet("");
      setService(c.serviceOptions[0]);
      setMessage("");
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
                <TextInput
                  label={c.name}
                  value={name}
                  onChange={(v) => {
                    setName(v);
                    if (errors.name) setErrors((p) => ({ ...p, name: false }));
                  }}
                  status={errors.name ? { type: "error", message: c.required } : undefined}
                />
                <div ref={phoneRef}>
                  <InputGroup
                    label={c.phone}
                    status={errors.phone ? { type: "error", message: c.invalidPhone } : undefined}
                  >
                    <InputGroupText>+998</InputGroupText>
                  <TextInput
                    label={c.phone}
                    isLabelHidden
                    type="text"
                    value={phone}
                    onChange={(v) => {
                      // Digits only, formatted as "XX XXX XX XX" (9 digits max).
                      let raw = v.replace(/\D/g, "");
                      // Pasting a full number ("+998 99 442 50 80" or "8 99…")
                      // would otherwise be truncated into nonsense.
                      if (raw.length > 9 && raw.startsWith("998")) raw = raw.slice(3);
                      if (raw.length > 9 && raw.startsWith("8")) raw = raw.slice(1);
                      const d = raw.slice(0, 9);
                      const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)];
                      setPhone(parts.filter(Boolean).join(" "));
                      if (errors.phone) setErrors((p) => ({ ...p, phone: false }));
                    }}
                    placeholder="__ ___ __ __"
                    />
                  </InputGroup>
                </div>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <TextInput
                  label={c.pet}
                  value={pet}
                  onChange={(v) => {
                    setPet(v);
                    if (errors.pet) setErrors((p) => ({ ...p, pet: false }));
                  }}
                  placeholder={c.petPlaceholder}
                  status={errors.pet ? { type: "error", message: c.required } : undefined}
                />
                <Selector
                  label={c.service}
                  value={service}
                  onChange={(v) => v && setService(v)}
                  options={c.serviceOptions}
                />
              </div>

              <TextArea
                label={c.message}
                value={message}
                onChange={setMessage}
                rows={3}
                placeholder={c.messagePlaceholder}
              />

              <Button
                type="submit"
                label={status === "sending" ? c.sending : c.submit}
                variant="primary"
                size="lg"
                isLoading={status === "sending"}
                width="100%"
                endContent={<IconArrowUpRight className="h-5 w-5" />}
              />

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
