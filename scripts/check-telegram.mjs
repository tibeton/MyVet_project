#!/usr/bin/env node
// Verifies TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID from .env.local by calling
// getMe and sending one test message — the same call app/api/order/route.ts makes.
// Run: npm run check:telegram

import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bundle = path.join(root, "certs", "system-roots.pem");

// Node 26 on this machine cannot verify api.telegram.org with its built-in CA
// store; re-exec once with the exported macOS roots. See package.json trust:system.
if (!process.env.NODE_EXTRA_CA_CERTS && existsSync(bundle)) {
  const r = spawnSync(process.execPath, [fileURLToPath(import.meta.url)], {
    stdio: "inherit",
    env: { ...process.env, NODE_EXTRA_CA_CERTS: bundle },
  });
  process.exit(r.status ?? 1);
}

const envPath = path.join(root, ".env.local");
if (!existsSync(envPath)) {
  console.error("✗ .env.local not found. Copy .env.example to .env.local first.");
  process.exit(1);
}
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
if (!token || !chatId) {
  console.error(
    `✗ Missing in .env.local: ${!token ? "TELEGRAM_BOT_TOKEN " : ""}${!chatId ? "TELEGRAM_CHAT_ID" : ""}`
  );
  process.exit(1);
}

const call = async (method, body) => {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  return { ok: res.ok, json: await res.json().catch(() => null) };
};

const me = await call("getMe");
if (!me.ok) {
  console.error("✗ Token rejected by Telegram:", me.json?.description ?? me.json);
  process.exit(1);
}
console.log(`✓ Token valid — bot @${me.json.result.username}`);

const sent = await call("sendMessage", {
  chat_id: chatId,
  text: "<b>🐾 MyVet</b>\nТестовое сообщение: связь с сайтом работает.",
  parse_mode: "HTML",
});
if (!sent.ok) {
  console.error(`✗ Cannot send to chat ${chatId}:`, sent.json?.description ?? sent.json);
  console.error(
    "  Personal chat: press Start in the bot first. Group: add the bot and keep the leading minus in the id."
  );
  process.exit(1);
}
console.log(`✓ Test message delivered to chat ${chatId}`);
