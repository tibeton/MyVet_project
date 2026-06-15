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
    `<b>🐾 Новая запись — MyVet</b>\n\n` +
    `<b>Имя:</b> ${escapeHtml(name)}\n` +
    `<b>Телефон:</b> ${escapeHtml(phone)}\n` +
    (pet ? `<b>Питомец:</b> ${escapeHtml(pet)}\n` : "") +
    (service ? `<b>Услуга:</b> ${escapeHtml(service)}\n` : "") +
    (message ? `<b>Комментарий:</b> ${escapeHtml(message)}\n` : "") +
    `<b>Язык сайта:</b> ${escapeHtml(locale)}`;

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
