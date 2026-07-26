import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { latestReviews } from "@/lib/reviews";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { IconQuote, IconStar, IconHeart, IconArrowUpRight } from "./icons";

// Small Yandex "Я" mark (brand red) used on the reviews CTA.
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
        <SectionHeading
          kicker={r.kicker}
          title={r.title}
          lead={r.lead}
          icon={<IconHeart className="h-4 w-4" />}
        />
      </div>

      {/* Full-bleed marquee of real reviews. Pauses on hover. The cards are
          plain articles, not links — the single CTA below is the one route out
          to Yandex, so every card doesn't need its own. */}
      <Reveal delay={0.16}>
        <div className="review-marquee relative mt-7 flex overflow-hidden sm:mt-12 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
          <div className="review-track">
            {loop.map((review, i) => (
              <article
                key={`${review.author}-${i}`}
                className="mr-5 flex h-full w-[19rem] shrink-0 flex-col rounded-3xl border border-line bg-surface p-7 sm:w-[21rem]"
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
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Rating and "all reviews" merged into one control: the score is the
          reason to click through, so splitting them made the badge inert and
          the button unsubstantiated. */}
      <div className="shell">
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <a
              href={site.yandexReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              // Stacks on phones: side by side, the score and a 27-character
              // label fight for ~335px and both wrap mid-value.
              className="lift group inline-flex flex-col items-center gap-3 rounded-[1.75rem] border border-line bg-surface p-3 transition-colors hover:border-accent sm:flex-row sm:gap-5 sm:rounded-full sm:py-2.5 sm:pl-3 sm:pr-6"
            >
              <span className="flex items-center gap-2.5 whitespace-nowrap rounded-full bg-bg-2 py-2 pl-2.5 pr-4">
                <YandexMark className="h-7 w-7 text-sm" />
                <span className="flex items-baseline gap-1.5">
                  <span className="font-display text-lg font-bold leading-none text-ink">
                    {site.yandexRating}
                  </span>
                  <span className="flex gap-0.5 text-pink-bright">
                    <IconStar className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-none text-muted">
                    · {site.yandexReviewsCount}
                  </span>
                </span>
              </span>

              <span className="flex items-center gap-2 px-2 pb-1 font-semibold text-ink transition-colors group-hover:text-accent sm:px-0 sm:pb-0">
                <span className="text-sm sm:text-base">{r.ymapsCta}</span>
                <IconArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>

            {/* No score shown for Google: we don't have a verified rating for
                it, and a button is honest without one. */}
            <a
              href={site.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lift group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-3.5 font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <GoogleMark className="h-7 w-7 text-sm" />
              <span className="text-sm sm:text-base">{r.googleCta}</span>
              <IconArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
