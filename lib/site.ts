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
  telegram: "https://t.me/myvet_uz",
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
} as const;
