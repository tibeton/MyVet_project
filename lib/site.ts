// ─────────────────────────────────────────────
// MyVet — site-wide constants
// Замените плейсхолдеры на реальные данные клиента.
// ─────────────────────────────────────────────

export const site = {
  name: "MyVet",
  phoneDisplay: "+998 99 442 50 80",
  phoneHref: "+998994425080",
  emergencyDisplay: "+998 99 067 07 90",
  emergencyHref: "+998990670790",
  email: "info@myvet.uz",
  // Two different Telegram destinations — pick by context:
  //   telegramContact — a way to reach us (Contact section "or reach us directly")
  //   telegramChannel — our public channel (footer socials, JSON-LD sameAs)
  telegramContact: "https://t.me/ContactMyVet",
  telegramChannel: "https://t.me/myvetuz",
  instagram: "https://instagram.com/myvet.uz",
  whatsappHref: "+998994425080",
  addressShort: "Tashkent, Uzbekistan",
  addressStreet: "улица Чигил, 32А",
  geo: { lat: 41.298463, lng: 69.338361 },
  // Яндекс.Карты — карточка клиники myvet_uz (oid 93506518218).
  // Виджет открывает организацию по её ID; клик по адресу ведёт на карточку.
  mapEmbed: "https://yandex.ru/map-widget/v1/?ol=biz&oid=93506518218&z=16",
  mapLink: "https://yandex.uz/maps/org/myvet_uz/93506518218/",
  yearFounded: 2014,

  // ── Яндекс.Карты · отзывы ─────────────────────────────
  // Карточка клиники: https://yandex.uz/maps/org/myvet_uz/93506518218
  // (yandex.ru редиректит на .uz — организация в Узбекистане).
  // Клик по карточкам отзывов и кнопка «Все отзывы» ведут на вкладку отзывов.
  yandexReviewsUrl: "https://yandex.uz/maps/org/myvet_uz/93506518218/reviews/",
  // Рейтинг и число отзывов для бейджа (обновляйте вручную по карточке).
  yandexRating: "5.0",
  yandexReviewsCount: "210",

  // ── Google · отзывы ───────────────────────────────────
  // Панель отзывов организации в поиске Google. Сессионные параметры
  // (ved / sa / biw / bih / dpr / sca_esv) убраны — остались только q и si.
  // Если ссылка когда-нибудь перестанет открывать отзывы, замените на
  // карточку в Картах: https://maps.app.goo.gl/g9NYSJKZgjrqb2cx6
  googleReviewsUrl:
    "https://www.google.com/search?q=MyVet.uz+Sharhlar&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_xbZEBSLehUtragcnfYkCRdOtmB-3XyTFoYcTczFaXii_EqFGAcSO05G2t9uKTdRX9OjDDhbZsFVa6FfxZEkKd6UwYue",
} as const;
