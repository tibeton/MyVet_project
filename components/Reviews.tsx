import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { latestReviews } from "@/lib/reviews";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { IconQuote, IconStar, IconHeart, IconArrowUpRight } from "./icons";

// Small Yandex "Я" mark (brand red) used on cards / CTA.
function YandexMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded bg-[#fc3f1d] font-display font-bold leading-none text-white ${className}`}
      aria-hidden="true"
    >
      Я
    </span>
  );
}

// Google "G" mark, matching the flat style of YandexMark above.
function GoogleMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded bg-white font-display font-bold leading-none text-[#4285F4] ring-1 ring-line ${className}`}
      aria-hidden="true"
    >
      G
    </span>
  );
}

export default function Reviews({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const r = dict.reviews;

  // Latest reviews from the shared Yandex-fed source. Duplicated once so the
  // CSS marquee loops seamlessly (translateX -50%).
  const cards = latestReviews(6);
  const loop = [...cards, ...cards];

  // Per-source presentation. Reviews default to Yandex when `source` is unset.
  const sourceOf = (r: { source?: "yandex" | "google" }) => r.source ?? "yandex";
  const urlFor = (src: "yandex" | "google") =>
    src === "google" ? site.googleReviewsUrl || site.yandexReviewsUrl : site.yandexReviewsUrl;
  const badgeFor = (src: "yandex" | "google") =>
    src === "google" ? r.googleBadge : r.ymapsBadge;
  const markFor = (src: "yandex" | "google", cls: string) =>
    src === "google" ? <GoogleMark className={cls} /> : <YandexMark className={cls} />;

  const localeTag =
    locale === "ru" ? "ru-RU" : locale === "uz" ? "uz-UZ" : "en-US";
  const fmtDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(localeTag, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <section id="reviews" className="section scroll-mt-20">
      <div className="shell">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker={r.kicker}
            title={r.title}
            lead={r.lead}
            icon={<IconHeart className="h-4 w-4" />}
          />

          <Reveal delay={0.12}>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4">
                <YandexMark className="h-9 w-9 text-base" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <IconStar className="h-4 w-4 text-pink-bright" />
                    <span className="font-display text-lg font-bold text-ink">
                      {site.yandexRating}
                    </span>
                    <span className="text-sm text-muted">
                      · {site.yandexReviewsCount}
                    </span>
                  </div>
                  <span className="text-xs text-faint">{r.ymapsBadge}</span>
                </div>
              </div>

              {/* Only rendered once real Google figures are filled into
                  lib/site.ts — no placeholder ratings on a live clinic site. */}
              {site.googleRating && site.googleReviewsCount && (
                <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4">
                  <GoogleMark className="h-9 w-9 text-base" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <IconStar className="h-4 w-4 text-pink-bright" />
                      <span className="font-display text-lg font-bold text-ink">
                        {site.googleRating}
                      </span>
                      <span className="text-sm text-muted">
                        · {site.googleReviewsCount}
                      </span>
                    </div>
                    <span className="text-xs text-faint">{r.googleBadge}</span>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed marquee of real reviews. Pauses on hover; each card links
          through to the review on Yandex Maps. */}
      <Reveal delay={0.16}>
        <div className="review-marquee relative mt-7 flex overflow-hidden sm:mt-12 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
          <div className="review-track">
            {loop.map((review, i) => (
              <a
                key={`${review.author}-${i}`}
                href={review.url ?? urlFor(sourceOf(review))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${review.author} — ${badgeFor(sourceOf(review))}`}
                className="lift group mr-5 flex h-full w-[19rem] shrink-0 flex-col rounded-3xl border border-line bg-surface p-7 sm:w-[21rem]"
              >
                <div className="flex items-start justify-between">
                  <IconQuote className="h-9 w-9 text-pink" />
                  <div className="flex gap-0.5 text-pink-bright">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <IconStar
                        key={s}
                        className={`h-4 w-4 ${
                          s < review.rating ? "" : "text-surface-2"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="mt-4 line-clamp-5 flex-1 whitespace-normal text-[0.95rem]/relaxed text-text">
                  {review.text}
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent font-display text-sm font-bold text-on-accent">
                    {review.author.trim()[0]}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-sm font-bold text-ink">
                      {review.author}
                    </span>
                    <span className="block text-xs text-muted">
                      {fmtDate(review.date)}
                    </span>
                  </span>
                </figcaption>

                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                  {markFor(sourceOf(review), "h-4 w-4 text-[10px]")}
                  {badgeFor(sourceOf(review))}
                  <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="shell">
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10">
            <a
              href={site.yandexReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-6 py-3.5 font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <YandexMark className="h-5 w-5 text-xs" />
              {r.ymapsCta}
              <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {site.googleReviewsUrl && (
              <a
                href={site.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-6 py-3.5 font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <GoogleMark className="h-5 w-5 text-xs" />
                {r.googleCta}
                <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
