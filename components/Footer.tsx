import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import BrandLogo from "./BrandLogo";
import { IconTelegram, IconInstagram, IconPhone, IconHeart, IconArrowUpRight } from "./icons";

export default function Footer({ dict, locale }: { dict: Dict; locale: Locale }) {
  const f = dict.footer;
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "#services", label: dict.nav.services },
    { href: "#team", label: dict.nav.team },
    { href: "#prices", label: dict.nav.prices },
    { href: "#reviews", label: dict.nav.reviews },
    { href: "#faq", label: dict.nav.faq },
  ];

  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href={`/${locale}`} aria-label="MyVet">
              <BrandLogo className="h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm/relaxed text-muted">{f.tagline}</p>
            <div className="mt-5 flex gap-2.5">
              <a
                href={site.telegramChannel}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-accent transition-colors hover:bg-accent hover:text-on-accent"
              >
                <IconTelegram className="h-5 w-5" />
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-accent transition-colors hover:bg-accent hover:text-on-accent"
              >
                <IconInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-ink">
              {f.nav}
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-block py-1 text-sm text-muted transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-ink">
              {f.contacts}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <a href={`tel:${site.phoneHref}`} className="inline-flex items-center gap-2 py-1 transition-colors hover:text-accent">
                  <IconPhone className="h-4 w-4 text-accent" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-block py-1 transition-colors hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li>{dict.contact.addressValue}</li>
              <li>{dict.contact.hoursValue}</li>
            </ul>
          </div>
        </div>

        {/* Legal block: a real, checkable licence number is the strongest trust
            signal a clinic can put on a page — keep it verifiable, not decorative. */}
        <div className="mt-12 border-t border-line pt-6 text-xs/relaxed text-muted">
          <p>
            {site.legalName} · {f.license} № {site.licenseNumber} ({site.licenseRegistry}),{" "}
            {f.taxId} {site.taxId} · {site.licenseSince}
          </p>
          <a
            href={site.licenseImage}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 py-1 font-semibold text-ink transition-colors hover:text-accent"
          >
            {f.viewLicense}
            <IconArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {year} {site.name}. {f.rights}
          </p>
          <p className="inline-flex items-center gap-1.5">
            {f.madeWith}
            <IconHeart className="h-3.5 w-3.5 text-pink-bright" />
          </p>
        </div>
      </div>
    </footer>
  );
}
