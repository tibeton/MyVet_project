/* eslint-disable @next/next/no-img-element */
import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { latestReviews } from "@/lib/reviews";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { IconQuote, IconStar, IconArrowUpRight } from "./icons";

// Real platform logos from /public. The Google PNG was cropped to its glyph —
// the original had ~2/3 transparent padding, so at a shared box size the "G"
// rendered far smaller than the Yandex mark (and CSS scaling inside a clipped
// box just showed empty space).
function PlatformMark({ src, className = "" }: { src: string; className?: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`shrink-0 rounded-full object-contain ${className}`}
    />
  );
}

const YandexMark = (p: { className?: string }) => (
  <PlatformMark src="/yandexlogo.png" {...p} />
);
const GoogleMark = (p: { className?: string }) => (
  <PlatformMark src="/googlelogo.png" {...p} />
);

// Кнопка перехода на площадку. Раньше здесь висели оценка и число отзывов —
// цифры, вбитые руками в site.ts. Они устаревают молча: отзывы копятся, а на
// сайте остаётся старый счётчик, и это ровно тот случай, когда «социальное
// доказательство» начинает работать против. Теперь кнопка обещает только то,
// что действительно произойдёт по клику, а актуальные цифры посетитель видит
// на самой площадке.
function ReviewsCta({
  href,
  mark,
  label,
}: {
  href: string;
  mark: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="lift group flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-surface py-2.5 pl-2.5 pr-4 transition-colors hover:border-accent"
    >
      {mark}
      <span className="text-sm font-semibold leading-none text-ink">
        {label}
      </span>
      <IconArrowUpRight className="h-3.5 w-3.5 shrink-0 text-faint transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
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
          icon={<IconStar className="h-4 w-4" />}
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

      {/* По одной кнопке на площадку. */}
      <div className="shell">
        <Reveal delay={0.1}>
          {/* Grid, not flex: подписи разной длины, и кнопки по содержимому
              выходили разной ширины. w-fit держит пару по центру, колонки
              берут ширину более длинной. На узких экранах — в столбик, иначе
              две подписи не помещаются в строку. */}
          <div className="mx-auto mt-8 grid w-fit grid-cols-1 gap-2.5 sm:mt-10 sm:grid-cols-2 sm:gap-3">
            <ReviewsCta
              href={site.yandexReviewsUrl}
              mark={<YandexMark className="h-6 w-6" />}
              label={r.ymapsCta}
            />
            <ReviewsCta
              href={site.googleReviewsUrl}
              mark={<GoogleMark className="h-6 w-6" />}
              label={r.googleCta}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
