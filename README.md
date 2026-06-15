# MyVet — ветеринарная клиника (Ташкент)

Трёхъязычный (RU / UZ / EN) лендинг ветеринарной клиники на **Next.js 16 + Tailwind v4 + Motion**.
Светлая, спокойная тема в фирменной палитре, плавные анимации, заявки уходят в Telegram.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000  → редирект на /ru
```

Сборка прод-версии:

```bash
npm run build && npm start
```

## Языки

`/ru` (по умолчанию), `/uz`, `/en`. Весь контент — в `lib/i18n.ts`.

## Заявки в Telegram

Форма записи отправляет заявку через `app/api/order/route.ts`.
Скопируйте `.env.example` → `.env.local` и заполните:

```
TELEGRAM_BOT_TOKEN=...   # от @BotFather
TELEGRAM_CHAT_ID=...     # ваш chat id (@userinfobot)
```

Без этих переменных форма не падает — заявка принимается и логируется в консоль
(`delivered: false`), что удобно для разработки.

## Что заменить на реальные данные клиента

- `lib/site.ts` — телефоны, e-mail, Telegram/Instagram, адрес, координаты карты (`mapEmbed` / `mapLink`).
- `lib/i18n.ts` — врачи (`team`), цены (`prices`), отзывы (`reviews`), часы работы.
- Фото врачей: сейчас используются цветные плашки с инициалами (`components/Team.tsx`).
- Логотипы лежат в `public/Logo_horizontal.svg` и `public/Logo_vertical.svg`.

## Структура

```
app/[locale]/      — страница и layout с локалью
app/api/order/     — приём заявок → Telegram
components/         — секции и UI-примитивы
lib/i18n.ts        — переводы (RU/UZ/EN)
lib/site.ts        — контакты и константы
```

## Палитра

`#2D3192` текст/заголовки · `#4B5CC4` акценты/кнопки · `#E8E9F5` фоны/карточки ·
`#FFB3C1` детали/иконки · `#FFFFFF` основной фон.
