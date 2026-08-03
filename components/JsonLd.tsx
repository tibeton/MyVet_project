import { site } from "@/lib/site";

// Structured data for local search / rich results.
// VeterinaryCare is a LocalBusiness subtype — gives Google the clinic's
// name, contacts, 24/7 hours, geo link, socials and aggregate rating.
// No aggregateRating: the 5.0/210 and 4.3/114 scores belong to Yandex and
// Google, and Google's structured-data policy does not allow marking up
// third-party ratings as your own. The visible chips link to the sources.
export default function JsonLd() {
  const base = "https://myvet.uz";

  const data = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": `${base}/#clinic`,
    name: site.name,
    url: base,
    image: `${base}/og.jpg`,
    logo: `${base}/Logo_vertical.svg`,
    telephone: site.phoneHref,
    email: site.email,
    priceRange: "$$",
    currenciesAccepted: "UZS",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.addressStreet,
      addressLocality: "Tashkent",
      addressRegion: "Tashkent",
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: { "@type": "City", name: "Tashkent" },
    hasMap: site.mapLink,
    // Клиника работает круглосуточно, без выходных.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [site.telegramChannel, site.instagram, site.mapLink].filter(Boolean),
    // Агрегированный рейтинг показывается на странице (бейдж + отзывы).
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
