# Changelog

Human-readable log of notable changes. Newest first.

**Scope:** decisions, gotchas, and user-visible behaviour — not a file-by-file
diff. For "what files changed", use git (`git log --oneline`, `git diff --stat`);
it is always accurate and costs nothing to maintain. Put things here that git
*cannot* tell you: why a change was made, and what will break if it is undone.

Format: one `##` block per change set, newest at the top.

---

## 1.0.0 — 2026-08-25 · первый прод-релиз

Первая версия, которая уезжает на боевой сервер. Слепок этого состояния лежит
в отдельном закрытом репозитории **FXLyyyy/myvet-prod**, тег `v1.0.0`.

Что на странице: услуги · зоогостиница · прайс · основатели · отзывы · FAQ ·
запись. Три локали (ru/uz/en), заявки уходят в Telegram.

Чего сознательно нет:
- **Галереи клиники** — плитки были плейсхолдерами «Фото скоро». Компонент,
  словарь и `site.clinicPhotos` на месте, вернуть одной строкой в
  `app/[locale]/page.tsx`.
- **Цифр-достижений, «Почему MyVet», «4 шагов»** — удалены по решению клиента.
- **Оценок и счётчиков отзывов** — ручные цифры протухают молча.
- **Стоматологии, лаборатории, мониторинга анестезии** — клиника этого не
  делает. Не возвращайте без подтверждения от клиники.

### Порядок выпуска следующей версии
1. Поднять `version` в `package.json`
2. Добавить сюда блок с номером версии
3. Коммит и тег `vX.Y.Z` в рабочем репозитории
4. Слепок без `.env.local` — в `myvet-prod` тем же тегом

---

## 2026-08-25 — Заявки в Telegram: эмодзи и проверка ключей

### Added — читаемые заявки в Telegram
`app/api/order/route.ts` подставляет эмодзи по питомцу и услуге и помечает язык
заявки. Поля приходят свободным текстом на одном из трёх языков сайта, поэтому
таблицы `PET_EMOJI` / `SERVICE_EMOJI` матчат ключевые слова сразу на ru/uz/en.
**Первое совпадение выигрывает** — порядок строк в таблицах значим там, где
ключевые слова пересекаются (например `\bit\b` для «собака» по-узбекски и
`\bot\b` для «лошадь»). Добавляя услугу, дописывайте строку с учётом порядка.

### Added — `npm run check:telegram`
`scripts/check-telegram.mjs` дёргает getMe и шлёт одно тестовое сообщение теми
же ключами из `.env.local`, что и боевой роут. Нужен, чтобы отличить «форма
сломана» от «токен не тот» — без него неверный `TELEGRAM_CHAT_ID` выглядит как
молча не доехавшая заявка.

### Added — обход TLS на этой машине (только для локальной разработки)
Node 26 здесь не верифицирует `api.telegram.org` своим набором корневых
сертификатов. `npm run trust:system` выгружает системные корни macOS в
`certs/system-roots.pem` (папка в `.gitignore`), `npm run dev:trusted`
подставляет их через `NODE_EXTRA_CA_CERTS`.

**Это костыль конкретной машины, не деплой-скрипт.** На сервере поднимайте
обычными `npm run build` + `npm start`; `certs/` там нет и не нужен.

---

## 2026-08-25 — Мобильная стандартизация: радиусы, поля, спойлер услуг, видео

### Fixed — видео в hero весило 19 МБ
`dog.mp4` и `cat.mp4` были 1080×1080, 10 секунд, **16 Мбит/с** — то есть LCP
страницы начинался с 19 МБ загрузки, и переключение питомца тянуло ещё 19 МБ.
ffmpeg на машине нет, но в macOS есть `avconvert`:

    avconvert --source public/dog.mp4 --output dog.mp4 \
              --preset PresetMediumQuality --multiPass --replace

Результат — 480×480, **856 КБ** вместо 19 МБ (в 22 раза меньше). `public/`
теперь весит 3,7 МБ целиком. Оригиналы остались в истории git.
`preload` переведён с `auto` на `metadata`.

Ролик декоративный, обрезается `object-cover` в рамке 4:5 и на десктопе уходит
под маску, поэтому 480px хватает. **Если покажется мягким**, есть вариант
`Preset640x480` → 640×640 при 3,3 МБ; выше этого возвращаться не стоит.

### Fixed — карточки с разными радиусами
Блоки одинаковой ширины имели скругления 16 / 24 / 32 / 35 px и читались как
элементы разных систем. Единая шкала: крупные карточки — `rounded-3xl` (24px),
внутренние элементы (иконки, чипы, строки списка, алерты) — `rounded-2xl`
(16px). Ширины при этом были в порядке: везде 350px при вьюпорте 390.

### Fixed — цели нажатия в форме записи
Поля astryx на `size="md"` давали 32px, на максимальном `lg` — 36px. Для формы,
которую заполняют с телефона, этого мало. Все поля переведены на `lg`, плюс на
`<form>` висит селектор по классу, поднимающий обёртки до 44px; кнопка отправки
— `[&_button]:min-h-11`. Замерено: все поля и кнопка теперь 44px.

Ссылки в подвале были 18px по высоте — добавлен `py-1`, стало 28px.

### Added — спойлер в услугах (только на телефоне)
Девять карточек в одну колонку — около 2700px скролла. Видно четыре, остальные
под кнопкой; секция стала 1685px. На `sm+` сетка 3×3 и кнопка скрыта.

Скрытие через `hidden sm:block`, **не размонтированием**: карточки, добавленные
в `RevealGroup` после того, как его `whileInView` отработал, остались бы на
`opacity: 0` (ровно тот баг, что был в прайсе). Элементы с `display: none`
получают анимацию вместе со всеми и появляются сразу видимыми.

### Changed — подпись в подвале
`nav.team` был «Руководство», а блок называется «Основатели клиники».

---

## 2026-08-25 — Порядок секций, чередование фонов, кнопки отзывов

### Changed — порядок блоков и цепочка фонов
Два соседних блока одного цвета сливались в один. При девяти секциях
чередование белый / `bg-bg-2` в принципе не сходится — один стык одного цвета
неизбежен, а `pt-0` его только приглушает. Поэтому цепочка пересобрана:

    услуги (бел.) · гостиница (тон.) · прайс (бел.) · команда (тон.) ·
    отзывы (бел.) · FAQ (тон.) · контакты (бел.)

Чередование теперь без исключений, `pt-0` не нужен нигде. Воронка читается
как что делаем → как выглядит услуга, которую выбирают глазами → сколько →
кто мы → что о нас говорят → что осталось спросить → запись.

**Перед добавлением новой секции пересчитайте всю цепочку** — она описана
комментарием в `app/[locale]/page.tsx`. Прайс из-за этого стал белым,
гостиница вернулась на тонированный фон.

### Removed (временно) — галерея клиники
Все четыре плитки — плейсхолдеры «Фото скоро», и десятая секция ломала
чередование. Компонент, словарь и `site.clinicPhotos` на месте: когда придут
фото, вернуть строкой `<ClinicGallery dict={dict} />` и пересчитать фоны
соседей.

### Changed — кнопки «Все отзывы»
С кнопок убраны оценка и число отзывов. Это были цифры, вбитые руками в
`site.ts`: отзывы копятся, счётчик на сайте остаётся старым, и «социальное
доказательство» начинает работать против. Кнопка обещает ровно то, что
произойдёт по клику; актуальные цифры посетитель видит на площадке.
`yandexRating` / `yandexReviewsCount` / `googleRating` / `googleReviewsCount`
удалены из `site.ts` — **не возвращайте их**, ручной счётчик протухает молча.

На узких экранах кнопки встают в столбик: две подписи не помещались в строку.

---

## 2026-08-25 — Убраны «Почему MyVet» и «4 шага»; выравнивание карточек и строк

### Removed — блок «Почему MyVet»
Все четыре пункта уже сказаны в другом месте, причём с доказательствами:
«своё зоотакси» — это услуга, строка прайса (150 000) и вопрос в FAQ; «помощь
24/7» — бегущая строка, часы работы в контактах и теги услуг; «опытные врачи» —
блок с основателями. Оставался только «бережный подход», который ничем не
подтверждается. Удалены секция, тип `why` и неиспользуемый `nav.why`.

### Removed — блок «От записи до выздоровления — 4 шага»
По просьбе клиента: шаги описывали то, что и так очевидно, и стояли между
гостиницей и прайсом. Удалены секция, тип `process`, `nav.process` и ссылки на
`#process` в шапке и подвале.

### Changed — фон гостиницы
Секция стала белой с `pt-0`. После удаления «4 шагов» тонированная гостиница
упёрлась в тонированный прайс, и граница между ними исчезла бы. Теперь порядок
чередуется без исключений: услуги (бел.) → команда (тон.) → клиника (бел.) →
гостиница (бел., `pt-0`) → прайс (тон.) → отзывы (бел.) → FAQ (тон.) →
контакты (бел.). Галерея клиники и гостиница сознательно читаются как одна
глава «посмотрите на нас» — **если галерею уберут, `pt-0` у гостиницы надо
снять**, там появится цветовая граница.

### Fixed — сироты в лидах секций
Почти каждый лид ронял одно слово на вторую строку («…и неотложных /
операций.», «…можно посмотреть / заранее.», «…свои миски и / лоток.»).
`text-balance` на заголовке и лиде в `SectionHeading` делит их на две примерно
равные строки. В контактах у `h2` оставлен `text-pretty`: `text-balance` там
разбивал «Запишите / питомца на приём».

### Fixed — содержимое карточек услуг «плясало»
Карточки тянулись на всю высоту ряда, а содержимое липло к верху, поэтому у
девяти услуг с описаниями разной длины теги вставали на разной высоте.
Карточка стала flex-колонкой, теги прижаты `mt-auto`. Замерено: во всех трёх
рядах низ тегов теперь совпадает.

---

## 2026-08-25 — Спойлеры чинятся, гостиница переименована, «Основатели клиники»

### Fixed — спойлер в прайсе открывался пустым
`RevealGroup` держит `whileInView` с `once: true`. К моменту нажатия «Показать
все цены» группа уже отработала и больше не оркеструет детей, поэтому строки,
дописанные в неё через `slice`, оставались на `opacity: 0` — кнопка работала,
но открывала пустоту. Теперь это **две группы**: первые пять и, отдельно,
скрытые. Свежесмонтированная группа запускает свой `whileInView` сама.

**Не сворачивайте их обратно в одну** — баг вернётся молча, без ошибок в
консоли. То же правило для любого списка, который дорастает после монтирования.

### Fixed — «нажатие ничего не делает»
Кнопка стоит под списком, то есть её жмут, когда она у нижнего края экрана.
Новые строки вставлялись над ней и уезжали за пределы вьюпорта вместе с
кнопкой — на экране не менялось ничего.

Первой попыткой был якорь прокрутки в `ShowMore` (`useLayoutEffect` +
`scrollBy` на дельту кнопки). Он чинил видимость, но мгновенным прыжком на
пол-экрана. Заменён на `components/Collapsible.tsx`: скрытая часть
разворачивается по высоте за 0.45s, кнопка съезжает вниз вместе с ней, а
прокрутка не трогается вовсе (замерено: `scrollY` не меняется).
**Не возвращайте сюда скролл** — он подерётся с анимацией высоты.

`ShowMore` остался общей кнопкой для прайса и FAQ, вид не изменился.

### Added — спойлер в FAQ
Семь аккордеонов подряд читались как стена и отодвигали форму записи. Видно
пять, остальное под кнопкой. Первый вопрос больше **не раскрыт по умолчанию**:
раскрытый первый сбивает скан списка. Свернуть список с открытым вопросом из
скрытой части нельзя — `openIndex` сбрасывается, иначе следующий клик выглядел
бы как «ничего не открылось».

Раскрытие ответа теперь плавнее: высота и текст разведены по времени (текст
догоняет с задержкой 0.08s, уходит первым), `overflow: hidden` перенесён на
сам анимируемый элемент — без него текст вылезал за пределы схлопывающейся
высоты и движение выглядело рывком.

### Changed — липкая форма в «Запишите питомца на приём»
Карточка формы тянется на всю высоту строки (то есть до низа карты справа), а
залипает её **содержимое внутри** карточки на `lg:top-28`. Промежуточный
вариант — sticky на самой колонке с `lg:items-start` — обрывал карточку на
середине колонки, поэтому от него отказались.

Sticky висит на обычном `div` внутри `Reveal`, а не на самом `Reveal`: motion
держит на анимированном элементе свой transform.

### Changed — заголовок гостиницы и иконки карточек
Заголовком секции стало прямое «Зоогостиница», а описательная фраза ушла в
кикер («Пока вы в отъезде»). Пункт «Свет и климат» переименован в «Дневной
свет», чтобы совпадать с иконкой-солнцем.

«Гостиница находится в клинике — помощь окажут сразу» переписано: фраза
намекала, что с питомцем что-то случится. Теперь «врач видит питомца каждый
день».

Иконки карточек больше не пересекаются с иконкой самой секции: `IconHouse`
остался у заголовка, карточки получили `IconDoor` (отдельный номер) и `IconBag`
(свои вещи). `IconBowl` удалён — оказался не нужен.

### Changed — «Кто отвечает за клинику» → «Основатели клиники»
По просьбе клиента. Вместе с заголовком изменились роли: оба теперь
«соучредители», а не «главный врач» и «учредитель, директор». Это не косметика
— один из основателей в клинике больше не практикует, и строка «главный врач,
хирург» звала бы людей к врачу, которого там нет. Формулировка «основатели»
остаётся верной независимо от того, кто работает сегодня; по этой же причине из
лида убрано «отвечают за» — отвечает не каждый из них.

Иконка секции: щит → сердце (щит означал «кто отвечает», это больше не тема
блока).

Фото Наргизы заменено на новое (`public/team/nargiza.jpg`, 821×1100).

---

## 2026-08-25 — Убраны цифры-достижения и подписи под фото гостиницы

### Removed — блок статистики
«7 000+ приёмов / 24/7 / 5 врачей» убран целиком по просьбе клиента: полосу
внутри «Почему MyVet» и ключ `stats` из типа `Dict` и всех трёх словарей.
Больше `dict.stats` нигде не используется — если цифры когда-нибудь вернут,
это новый блок, а не восстановление старого.

Карточка «Почему MyVet» осталась на `py-12 sm:py-16`: без нижней полосы она
стала 628px вместо 848px, и это нормальная высота для четырёх пунктов —
уменьшать паддинг не нужно.

### Removed — подписи под фото гостиницы
`<figcaption>` с градиентной подложкой сняты, `<figure>` выродился в `div`.
Строки из `dict.hotel.captions` никуда не делись: они теперь живут только в
`alt` картинок, поэтому удалять их из словарей нельзя — без них у трёх
фотографий не останется текстового описания.

---

## 2026-08-25 — Зоогостиница: отдельный блок с настоящими фото

### Added — секция `#hotel`
Гостиница была одной строкой в списке услуг и строкой «по запросу» в прайсе —
то есть единственная услуга, которую выбирают глазами, себя не показывала.
Теперь это отдельная секция между «Наша клиника» и «4 шага»: три реальных
снимка кошачьих номеров, четыре пункта о том, что входит, и один CTA.

Почему так:
- **Фото во всю ширину, а не сбоку от текста.** Первый вариант ставил мозаику
  рядом с колонкой текста — фото выходили 280px при высоте секции ~1000px,
  то есть половина блока была пустым фоном.
- **На мобильном — карусель, не сетка.** Снимки вертикальные (3:4). Три подряд
  в одну колонку дали бы ~1400px скролла, поэтому до `sm` это `snap-x`-карусель
  с шириной карточки 76% (следующая подглядывает и работает как подсказка),
  с `sm` — обычная сетка 3×1.
- **Нет цены, есть Telegram.** Стоимость зависит от номера и типа питомца, так
  что вести в форму записи бессмысленно — единственная кнопка ведёт в
  `site.telegramContact`.
- **Никаких обещаний, которых мы не подтвердим.** Ни питания, ни выгула, ни
  отчётов. Единственное обещание про сервис — «можно привезти привычный корм,
  лежанку и игрушки»; если клиника так не работает, правьте
  `dict.hotel.points[3]`.

Фото: `public/hotel/room-1..3.jpg`, ужаты до 896×1200 (~200 КБ каждое) из
исходных 1792×2400. Пути — в `site.hotelPhotos`, порядок совпадает с
`dict.hotel.captions`.

Новые иконки в том же штриховом стиле: `IconSun` (свет и климат), `IconBowl`
(свои вещи).

### Changed — отступ у `#process`
`Process` держал `pt-0`, потому что стоял белым-на-белом после галереи клиники.
Между ними встала тонированная (`bg-bg-2`) гостиница, так что граница стала
цветовой — `pt-0` убран, иначе шаг между секциями схлопнулся бы вдвое без
причины. Правило целиком — в комментарии к `.section` в `app/globals.css`.

---

## 2026-07-27 — Icons rebound to meaning; "с 2022" stat dropped

### Fixed — icons
Services had six icons cycled across nine cards with `i % ICONS.length`, so the
list silently desynced every time a service was added or removed. Груминг showed
a **tooth**, Стационар **scissors**, Зоотакси a **scalpel**, Чек-ап a syringe.
There is now one icon per service, indexed directly (`ICONS[i]`), so a missing
entry falls back to a paw instead of showing someone else's icon.

New icons in the existing stroke style: `IconCar`, `IconHouse`, `IconBed`,
`IconClipboard`, `IconTag`. `IconTooth` removed with the dentistry service.

Also rebound:
- Prices heading: lab flask → price tag. The clinic has no laboratory, so a
  flask on the price list was doubly wrong.
- Reviews heading: heart → star (heart already means "care" in why-us).
- Leadership heading: stethoscope → shield ("кто отвечает за клинику").
- Why-us "Своё зоотакси": map pin → car.

### Removed
- The "с 2022 · заботимся о питомцах в Ташкенте" stat. Three figures remain
  (7 000+, 24/7, 5) and the grid is 3 columns instead of 4.

---

## 2026-07-27 — Clinic gallery; Nargiza photo replaced

### Added
- `components/ClinicGallery.tsx` — four tiles (приёмная, смотровая,
  операционная, стационар) between Руководство and Как проходит приём.
  Tiles read paths from `site.clinicPhotos`; an empty string renders a branded
  "Фото скоро" placeholder instead of a photo.

**To publish real photos:** drop files in `public/clinic/` and fill
`site.clinicPhotos` — order matches `dict.clinic.items`. No stock or borrowed
interiors: a photo captioned "операционная" is a promise the visitor checks in
person, so it must be this clinic.

### Changed
- Leadership photo of Наргиза replaced with the new shot (955x1280, taken in
  the clinic reception).

### Fixed
- Section rhythm after inserting the gallery. `team → clinic` is a colour edge
  and needs the full gap; `clinic → process` is white-on-white and needs the
  half gap. Initially both were inverted — see the background rule in
  `globals.css` whenever a section is inserted or its background changes.

---

## 2026-07-27 — Licence in the footer

### Added
- Legal block in the footer from the real licence: ООО "MOY VETVRACH",
  лицензия № 048853 (реестр L-496468), СТИР 309765458, действует с 17.11.2022,
  plus a link to `public/license.png`. Details live in `lib/site.ts`.

A checkable licence number is the strongest trust signal a clinic can put on a
page. Keep it accurate — if the licence is reissued, update `site.ts` and
replace the image.

### Not done — deliberately
Clinic and equipment photos were requested as "just any photos". Placeholder or
stock images presented as this clinic's rooms and equipment would misrepresent a
real business to worried pet owners, so none were added. The section is worth
building once real photos exist — a phone camera is enough.

---

## 2026-07-27 — Pre-launch audit fixes

### Fixed — conversion
- **All nine services are now selectable when booking.** Стационар,
  зоогостиница, зоотакси and чек-ап were advertised but missing from the form's
  dropdown, so they could not be requested at all.
- **Tap-to-call button in the header below `xl`.** The phone number was hidden
  on phones, leaving a 24/7 clinic with no way to call from the header.

### Fixed — SEO
- **`h1` was empty** (it wrapped only the logo image). The value proposition is
  now the `h1` and the artwork is a plain `div`. Deliberately *not* a new
  keyword heading: the artwork already reads "MyVet.Uz · Ветеринарная клиника",
  so a text heading saying the same would duplicate the brand name.
- **`aggregateRating` removed from JSON-LD.** The 5.0/210 and 4.3/114 scores
  belong to Yandex and Google. Google's structured-data policy does not allow
  marking up third-party ratings as your own, and the marked-up value did not
  match what the page showed. Google surfaces its own rating in the knowledge
  panel regardless — it cannot be embedded here.

### Fixed — accessibility
- `--muted` #6a6f9c → #5b6191 and `--faint` #9a9ec1 → #626897. Both now pass
  WCAG AA on white *and* on the tinted sections (4.89:1 / 5.42:1 on tint).
  `--faint` was 2.40:1 there.
- Closed language menu is `inert` — its links were tabbable while invisible.
- Burger, language trigger and menu rows raised to 44px.
- Name field gets `autocomplete="name"`.

### Content
- FAQ +3: cost of inpatient/hotel, visiting a pet, booking the pet taxi.
- Чек-ап priced "по запросу"; зоотакси and чек-ап added to the marquee.
- Surgery copy made concrete.

### Not done — needs ffmpeg
`dog.mp4` / `cat.mp4` are still 19 MB each. No ffmpeg on this machine, so they
could not be re-encoded. This is the largest remaining launch risk.

---

## 2026-07-27 — Price list collapsed; CTA spacing symmetric

### Changed
- Price list shows 5 rows with a "Показать все цены (4)" toggle. Nine rows
  pushed the booking CTA well down the page.
- The Services CTA now uses the same clamp as `.section` padding, so the gap
  above the button matches the gap below it (65px / 65px at 1440px). It was
  40px above and 65px below, because the space underneath is section padding
  while the space above was a fixed `mt-8 sm:mt-10`.

---

## 2026-07-27 — Prices for new services; dead hero copy removed

### Added
- Зоотакси от 150 000. Стационар and Зоогостиница are priced "по запросу" —
  they depend on the room, pet and condition. The note now points people to
  Telegram for those two.
- `onRequest` flag on price items. Without it the row rendered "по запросу сум",
  since the currency suffix was appended unconditionally.

### Removed
- `hero.lead` — translated in three languages but rendered nowhere since the
  hero was rebuilt around the logo artwork.

### Known, not addressed
`public/dog.mp4` and `public/cat.mp4` are 19 MB each, `autoPlay` with
`preload="auto"`. That is ~19 MB before any content paints, on a site whose
visitors are mostly on mobile data, and another 19 MB when the pet is switched.
Compressing to 720p would cut this by roughly 90% with no visible difference at
the rendered size.

---

## 2026-07-27 — Leadership block, nav, prices, services lead

### Changed
- The team section is leadership, not staff: kicker "Руководство", new heading,
  and full names with real roles — Улугбек Баходирович Юлдашев (главный врач,
  хирург) and Наргиза Фарходовна Ахадова (учредитель, директор), in ru/uz/en.
- Removed the "Врачи" link from the header nav. The footer still links to the
  section, so `nav.team` was relabelled "Руководство" / "Rahbariyat" /
  "Leadership" rather than left saying "Врачи" and pointing at leadership.
- Ultrasound diagnostics: 120 000 → 150 000.
- New services lead across all three locales.

The services lead was then shortened to "От профилактического осмотра и
диагностики до сложных и неотложных операций." — it previously repeated the
heading's opening words verbatim.

---

## 2026-07-27 — Teeth service removed; visit count corrected; mobile header

### Removed
- **All teeth/dentistry content.** The service card, marquee entry, meta
  mention, booking-dropdown option and the price line are gone from ru/uz/en.
  Services renumbered 01–09, which also lands them in a clean 3x3 grid.
- The one surviving mention of зубы is inside a real customer review and was
  left verbatim — review text is never edited.

### Changed
- `30 000+` visits → `7 000+`.
- Header bar is 94% opaque when scrolled (was 80%) and gets its own compositing
  layer. On iOS Safari the backdrop blur drops out mid-scroll, and at 80% the
  hero CTA showed straight through the bar as though it sat above it.

**Unverified on device.** The header fix could not be reproduced in the desktop
browser — iOS Safari's address-bar collapse and blur behaviour do not emulate.
It is the standard mitigation, but confirm on a real iPhone.

If you still sell teeth cleaning, the price line is the one thing worth
restoring: `{ name: "Чистка зубов (ультразвук)", price: "от 250 000" }`.

---

## 2026-07-27 — Factual corrections and new services

### Removed — claims the clinic cannot make
- **In-house laboratory.** There isn't one. Stripped from meta description,
  hero lead, marquee, the Diagnostics service and the why-us points across
  ru/uz/en. Diagnostics still lists УЗИ / рентген / анализы — only the claim of
  owning a lab is gone.
- **Anaesthesia monitoring.** Removed from the Surgery service copy and tags.

### Corrected
- The clinic opened **1 October 2022**, not 12 years ago, and has **5** vets,
  not 8. Stats now read "с 2022" rather than a year count, so the figure cannot
  go stale between deploys. `site.yearFounded` corrected 2014 → 2022.

### Changed
- **WhyUs and Stats merged.** Two separate "trust us" sections competed; the
  numbers now sit inside the why-us block, under a divider, and the standalone
  accent band (`components/Stats.tsx`) is deleted.
- The why-us point vacated by the laboratory is now "Своё зоотакси".

### Added
- Four services: Стационар, Зоогостиница, Зоотакси, Чек-ап (ru/uz/en).

### Still unverified
`30 000+ приёмов` was left untouched, but it was written alongside the wrong
"12 years". Over ~3 years 9 months it implies ~22 visits every single day —
plausible for a 24/7 clinic, but worth confirming before it stays on a live site.

---

## 2026-07-27 — Review CTAs reduced to score chips

### Changed
- The two review buttons drop their text labels and keep logo, score, count and
  a small arrow. 161x42 each (was 405x66), and they now fit side by side even at
  375px instead of stacking — the row went from ~224px tall on phones to 42px.

The label still exists as `aria-label` / `title`, so screen readers and hover
tooltips get "Все отзывы на Яндексе" rather than an unlabelled link. Don't drop
those attributes when editing: with no visible text they are the only accessible
name the link has.

---

## 2026-07-27 — Favicon uses the header mark

### Changed
- `public/favicon.svg` is now the header logo (`public/Logo.svg`) scaled onto
  the brand square, replacing the simplified paw drawing.

The brand square is not decoration: the header artwork is white on a
transparent background, so used as-is the favicon disappears on a light browser
tab. If `Logo.svg` is ever redrawn, regenerate the favicon the same way
(fit the 90x102 viewBox into 64x64 with 8px padding) rather than pointing
`icons.icon` straight at it.

---

## 2026-07-27 — Circular marks, shorter Yandex label, equal-width CTAs

### Changed
- Both review CTAs are exactly the same size. Laid out as a `w-fit` grid rather
  than flex, so the columns take the width of the wider button instead of each
  sizing to its own text (they were 409px vs 382px). The label is `nowrap` too —
  at ~900px the longer Yandex label wrapped to two lines while Google's stayed
  on one, so equal boxes still looked unequal.
- Platform marks are circles (`rounded-full`), so the square Yandex PNG matches
  Google's round glyph.
- Yandex CTA drops "Картах": "Все отзывы на Яндексе" / "Yandexdagi barcha
  fikrlar" / "All reviews on Yandex". Saves ~50px, which matters most on phones
  where the two CTAs stack.

---

## 2026-07-27 — Real platform logos and Google score

### Added
- Google rating `4.3 · 114`, so both CTAs now carry a score and read as a
  matched pair.
- Real logo files (`public/yandexlogo.png`, `public/googlelogo.png`) replace the
  CSS-drawn "Я" and "G" marks.

### Changed
- Both CTAs share one `ReviewsCta` component — they were duplicated markup.

### Note for whoever adds art next
`googlelogo.png` arrived 2820px with roughly two-thirds transparent padding, so
at a shared box size the "G" rendered far smaller than the Yandex mark. Scaling
it inside a clipped box just showed an empty white square. It is now cropped to
its glyph (1100px), which is the durable fix — prefer trimming the asset over
compensating in CSS. Both files must live in `public/`; at the repo root Next
does not serve them.

---

## 2026-07-26 — Google reviews button; lead copy de-branded

### Added
- "Все отзывы в Google" button beside the Yandex control, pointing at the
  Google reviews panel. Session parameters (`ved`, `sa`, `biw`, `bih`, `dpr`,
  `sca_esv`) were stripped from the supplied URL — only `q` and `si` matter.
  If it ever stops opening reviews, swap in the Maps short link noted in
  `lib/site.ts`.
- Deliberately no score on the Google button: there is no verified rating for
  it, and the button stands on its own without inventing one.

### Changed
- Reviews lead no longer names Yandex ("Реальные отзывы владельцев наших
  пациентов") — the section read like an advert for the platform rather than
  the clinic. Platform names now live only on the buttons, where they are
  destinations rather than claims.
- CTA row stacks on phones and sits side by side from `sm` up.

---

## 2026-07-26 — Reviews: Yandex only, one merged CTA

### Removed
- All Google review support (config, `Review.source`, marks, second badge and
  CTA, `googleBadge` / `googleCta` / `leadMulti`). Google Maps renders client
  side so the rating and review text cannot be read programmatically, and they
  will not be invented — a half-wired feature was worse than none.
- Per-card links to Yandex. Cards are plain `<article>`s now; the single CTA
  below the carousel is the only route out.

### Changed
- Rating and "all reviews" merged into one control: the score is the reason to
  click through, so separated they left an inert badge and an unsubstantiated
  button. Stacks on phones — side by side, the score and a 27-character label
  both wrapped mid-value.

### Superseded
- The two entries below (Google link wiring, and the lead-copy fix) are undone
  by this change. Kept for history.

---

## 2026-07-26 — Google reviews link wired up

### Added
- `googleReviewsUrl` now points at the real listing (maps.app.goo.gl short link,
  place id `0x38aef59d4c300139`, verified against `site.geo`), so the
  "Все отзывы в Google" button under the carousel is live.
- `googleWriteReviewUrl` stored for a future "leave a review" CTA.

Still outstanding, and only fillable by hand: `googleRating` /
`googleReviewsCount` (the badge stays hidden until both are set) and the Google
review entries themselves in `lib/reviews.ts` (`source: "google"`), copied
verbatim like the Yandex ones.

---

## 2026-07-26 — Reviews copy no longer promises Google prematurely

### Fixed
- The reviews lead said "Яндекс.Карт и Google" unconditionally while the badge,
  CTA and cards were all correctly gated behind real Google data — so the page
  advertised Google reviews that were not shown. The sentence now switches to
  `leadMulti` only once `googleReviewsUrl` is set.

---

## 2026-07-26 — Logo, Telegram, dropdowns, Google reviews

### Fixed
- Header logo did nothing when tapped: it linked to the page you were already
  on. It now scrolls to top (and closes the mobile menu), keeping the href so
  middle-click still opens the home page.
- Dropdowns ran past the fold. Astryx ships a fixed `max-height: 300px` that
  ignores available space, so a trigger low on screen opened a list partly
  off-screen — sometimes above the trigger, leaving the first option
  unreachable. Capped to `min(18rem, 45dvh)` and the service field now centres
  itself before opening.
- Section boundaries: same-background pairs are back to half-gaps. Equal padding
  does not mean equal-looking gaps — see the note in `globals.css`.

### Changed
- Telegram split by context: `telegramContact` (t.me/ContactMyVet) for the
  Contact section, `telegramChannel` (t.me/myvetuz) for footer socials and
  JSON-LD `sameAs`.
- Reviews support multiple sources. `Review.source` is `"yandex" | "google"`
  (defaults to Yandex), cards show the matching mark, and copy now reads
  "Yandex Maps and Google" in all three locales.

**Google reviews need real data before they appear.** `googleReviewsUrl`,
`googleRating` and `googleReviewsCount` in `lib/site.ts` are intentionally
empty, and the Google badge/CTA render only once they are filled from the real
Google Business Profile. Review text must be pasted verbatim like the Yandex
ones — do not invent reviews for a live clinic.

---

## 2026-07-26 — Uniform section rhythm

### Changed
- Every section boundary is now one value (130px desktop / 72px mobile). It was
  130px at two boundaries and 259px at six.
- `.section` padding halved: each section contributes *half* a boundary, and two
  adjacent sections sum to the full gap.
- Removed `pt-0` from `#why` and Stats. Those overrides were the cause of the
  drift, not a fix — zeroing one section's padding-top halves only that boundary.
  With halved padding they are unnecessary and those two gaps are unchanged.

Tinted bands (Team, Prices, FAQ) now carry 65px internal padding on desktop,
36px on mobile. If that reads as cramped, add `py-*` to those three sections
rather than reverting the system.

---

## 2026-07-26 — Section alignment and spacing rhythm

### Fixed
- **FAQ and Team had their content centred under a left-aligned heading.** Every
  `SectionHeading` on the site is left-aligned (nothing passes `align="center"`),
  but both sections wrapped content in `mx-auto max-w-3xl`, offsetting it by
  231px from the heading. Dropping `mx-auto` puts every left edge on the same
  line. If you deliberately want a centred section, pass `align="center"` to
  `SectionHeading` rather than centring only the content.

### Changed
- Normalised the heading→content rhythm to 48px: Reviews marquee `mt-11` → `mt-12`,
  and the Services CTA row `mt-8` → `mt-10` to match the equivalent row in Reviews.
- Left as-is on purpose: `#why` (16px — its heading sits inside its own card, so
  48px looks oversized) and `#prices` (28px — two-column layout where the heading
  is a sidebar, not a section header).

---

## 2026-07-26 — Agent docs, hero copy, spacing

### Added
- `CLAUDE.md` (auto-loaded by Claude Code) importing `AGENTS.md`, plus a
  project skill at `.claude/skills/myvet-ui/`. The skill carries the detailed
  conventions and loads only when doing visual work; `AGENTS.md` keeps the
  always-on essentials. After pulling this, restart Claude Code once — a newly
  created `.claude/skills/` directory is not picked up mid-session.
- `.githooks/pre-commit` requiring a CHANGELOG entry for changes under
  `app/`, `components/`, `lib/`. Enable per clone:
  `git config core.hooksPath .githooks`.

### Changed
- Hero shows the value proposition as real text under the logo artwork. The
  artwork is only the brand mark ("MyVet.Uz · Ветеринарная клиника"), so on
  mobile the hero was a logo and two buttons with nothing explaining the
  business. Kept as text, not baked into the SVG, so it stays translatable and
  indexable.
- Health-card cat is now female — `Мурка` / `кошка · 3 года` (was `Барсик` /
  `кот`). `mushuk` and `cat` are genderless, so only the Russian meta changed.
- Pet switcher raised to `bottom-8` for breathing room above the plate edge.
- `#why` section: `pt-0`, so it sits closer to the block above.

### Fixed
- Hero `<h1>` alt text described the headline instead of what the image
  actually shows, misleading screen readers and search engines. It now
  describes the brand mark.

---

## 2026-07-26 — Astryx design system, form rework, spacing fixes

### Added
- `@astryxdesign/core`, `theme-neutral`, `cli`. Brand theme in
  `lib/myvetTheme.ts` (`extends: neutralTheme`, overrides accent + fonts);
  built artifacts `lib/myvet.{css,js,d.ts}` via `npx astryx theme build`.
- `<Theme>` wraps the whole site in `app/[locale]/layout.tsx`.
- Booking form uses Astryx `TextInput` / `Selector` / `TextArea` / `Button` /
  `InputGroup`; price rows use Astryx `Item`.
- `npm run check:css` (also on `prebuild`) guards the cascade-layer order.
- "Coming soon" stamp over the hero health card (`components/PetCard.tsx`) —
  it is a v2 mockup, not real data.

### Changed
- Phone field: `+998` is a fixed `InputGroupText` prefix and can no longer be
  deleted; input holds the 9-digit national part, auto-formatted `XX XXX XX XX`.
  Pasting `+998 …`, `998…` or `8 …` normalises correctly. API receives `+998 <n>`.
- Питомец is now required; Комментарий stays optional. No required/optional
  markers are rendered — Astryx ships English strings only, so any marker would
  appear untranslated on the ru/uz locales.
- Service dropdown: Diagnostics option now lists рентген / rentgen / X-ray.
- Stats banner: taller (`py-16 sm:py-20`), flush to the block above (`pt-0`).
- `#why` section: `pt-0`.

### Fixed
- **Fonts were never applying.** `@theme inline` does not emit vars to `:root`,
  so `.font-display` / `body` resolved to nothing and the site silently rendered
  in system `ui-sans-serif`. Manrope/Onest now actually load.
- Text wrapping in CTAs and header nav (hero buttons, nav links, and the phone
  number, which split mid-number at 1280px).
- Stats numbers rendered near-black on the purple banner: they relied on
  inherited colour, and Astryx sets `color` directly on `p`, which beats
  inheritance. Now explicit `text-on-accent`.
- Four separate bugs from the same root cause — see the unlayered-CSS rule in
  `AGENTS.md`.
