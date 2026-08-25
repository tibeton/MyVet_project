import { NextResponse } from "next/server";

export const runtime = "nodejs";

type OrderPayload = {
  name?: string;
  phone?: string;
  pet?: string;
  service?: string;
  message?: string;
  locale?: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * The pet and service fields arrive as free text in whichever of the three site
 * languages the visitor used, so these maps match keywords in ru / uz / en.
 * First hit wins — order matters where keywords overlap.
 */
const PET_EMOJI: [RegExp, string][] = [
  [/кот|кош|кис|mushuk|\bcat\b|kitten/i, "🐱"],
  [/собак|пёс|пес\b|щен|kuchuk|\bit\b|\bdog\b|puppy/i, "🐶"],
  [/попуг|птиц|to'?ti|qush|parrot|bird/i, "🦜"],
  [/хомяк|морск\w* свинк|hamster|guinea/i, "🐹"],
  [/кролик|заяц|quyon|rabbit|bunny/i, "🐰"],
  [/черепах|toshbaqa|turtle|tortoise/i, "🐢"],
  [/рыб|baliq|fish/i, "🐟"],
  [/змея|ящер|игуан|ilon|snake|lizard|reptile/i, "🐍"],
  [/хорёк|хорек|ferret/i, "🦦"],
  [/ёж|еж\b|hedgehog/i, "🦔"],
  [/лошад|конь|\bot\b|horse/i, "🐴"],
];

const SERVICE_EMOJI: [RegExp, string][] = [
  [/вакцин|vaksin|vaccin/i, "💉"],
  [/хирург|jarroh|surgery/i, "🏥"],
  [/диагност|узи|рентген|анализ|diagnostika|utt|rentgen|tahlil|diagnostic|ultrasound|x-ray|test/i, "🔬"],
  [/груминг|gruming|grooming/i, "✂️"],
  [/стационар|statsionar|inpatient/i, "🛏"],
  [/гостиниц|mehmonxona|hotel/i, "🏨"],
  [/такси|taksi|taxi/i, "🚕"],
  [/чек-?ап|chek-?ap|check-?up/i, "📋"],
  [/на дом|uyga|home visit/i, "🏠"],
  [/терап|приём|прием|консульт|terapiya|qabul|therapy|consult/i, "🩺"],
  [/друго|boshqa|other/i, "📝"],
];

const LOCALE_LABEL: Record<string, string> = {
  ru: "🇷🇺 русский",
  uz: "🇺🇿 o‘zbekcha",
  en: "🇬🇧 English",
};

function pick(map: [RegExp, string][], value: string, fallback: string) {
  return map.find(([re]) => re.test(value))?.[1] ?? fallback;
}

function tashkentTime() {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Asia/Tashkent",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export async function POST(req: Request) {
  let body: OrderPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").toString().trim().slice(0, 120);
  const phone = (body.phone || "").toString().trim().slice(0, 40);
  const pet = (body.pet || "").toString().trim().slice(0, 120);
  const service = (body.service || "").toString().trim().slice(0, 120);
  const message = (body.message || "").toString().trim().slice(0, 2000);
  const locale = (body.locale || "ru").toString().slice(0, 5);

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and phone are required" },
      { status: 422 }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // If Telegram isn't configured yet, don't fail the UX — log and accept.
  if (!token || !chatId) {
    console.warn(
      "[order] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set — request received but not delivered:",
      { name, phone, pet, service, locale }
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const text =
    `🐾 <b>НОВАЯ ЗАЯВКА</b> — MyVet\n` +
    `\n` +
    `👤 <b>${escapeHtml(name)}</b>\n` +
    `📞 ${escapeHtml(phone)}\n` +
    (pet ? `${pick(PET_EMOJI, pet, "🐾")} <b>Питомец:</b> ${escapeHtml(pet)}\n` : "") +
    (service
      ? `${pick(SERVICE_EMOJI, service, "🩺")} <b>Услуга:</b> ${escapeHtml(service)}\n`
      : "") +
    (message
      ? `\n💬 <b>Комментарий</b>\n<blockquote>${escapeHtml(message)}</blockquote>\n`
      : "") +
    `\n<i>🕘 ${tashkentTime()}  ·  🌐 ${LOCALE_LABEL[locale] ?? escapeHtml(locale)}</i>`;

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    if (!tgRes.ok) {
      const detail = await tgRes.text();
      console.error("[order] Telegram API error:", detail);
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[order] Telegram request failed:", err);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }
}
