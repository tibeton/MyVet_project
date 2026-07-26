// ─────────────────────────────────────────────
// MyVet — i18n dictionaries (RU / UZ / EN)
// ─────────────────────────────────────────────

export const locales = ["ru", "uz", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

type PetVitals = {
  petName: string;
  petMeta: string;
  weightValue: string;
  vaccinationValue: string;
  antiparasiticValue: string;
  passportValue: string;
  nextVisitValue: string;
};

type Dict = {
  meta: { title: string; description: string };
  nav: {
    services: string;
    why: string;
    team: string;
    process: string;
    prices: string;
    reviews: string;
    faq: string;
    contact: string;
  };
  cta: { book: string; call: string; emergency: string };
  langName: string;
  hero: {
    kicker: string;
    titleA: string;
    titleHighlight: string;
    titleB: string;
    lead: string;
    primary: string;
    secondary: string;
    scroll: string;
    card: {
      label: string;
      weight: string;
      vaccination: string;
      antiparasitic: string;
      passport: string;
      nextVisit: string;
      comingSoon: string;
      addPet: string;
      pets: { dog: PetVitals; cat: PetVitals };
    };
  };
  marquee: string[];
  services: {
    kicker: string;
    title: string;
    lead: string;
    items: { num: string; name: string; desc: string; tags: string[] }[];
  };
  why: {
    kicker: string;
    title: string;
    lead: string;
    points: { title: string; desc: string }[];
  };
  stats: {
    title: string;
    items: { value: string; label: string }[];
  };
  team: {
    kicker: string;
    title: string;
    lead: string;
    members: { name: string; role: string }[];
  };
  process: {
    kicker: string;
    title: string;
    lead: string;
    steps: { num: string; title: string; desc: string }[];
  };
  prices: {
    kicker: string;
    title: string;
    lead: string;
    note: string;
    currency: string;
    items: { name: string; price: string }[];
  };
  reviews: {
    kicker: string;
    title: string;
    lead: string;
    ymapsCta: string;
    ymapsBadge: string;
    googleBadge: string;
    googleCta: string;
  };
  faq: {
    kicker: string;
    title: string;
    lead: string;
    items: { q: string; a: string }[];
  };
  contact: {
    kicker: string;
    title: string;
    lead: string;
    name: string;
    phone: string;
    pet: string;
    petPlaceholder: string;
    service: string;
    serviceOptions: string[];
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    required: string;
    invalidPhone: string;
    or: string;
    address: string;
    addressValue: string;
    hours: string;
    hoursValue: string;
    emergency: string;
    emergencyNote: string;
  };
  footer: {
    tagline: string;
    nav: string;
    contacts: string;
    social: string;
    rights: string;
    madeWith: string;
  };
};

export const dictionaries: Record<Locale, Dict> = {
  // ═══════════════════════════════════════════ RU ══
  ru: {
    meta: {
      title: "MyVet — Ветеринарная клиника в Ташкенте · Круглосуточно 24/7",
      description:
        "MyVet — современная ветеринарная клиника в Ташкенте: терапия, хирургия, вакцинация, диагностика (УЗИ, анализы), стоматология и груминг. Своя лаборатория, опытные врачи, круглосуточная экстренная помощь и вызов ветеринара на дом.",
    },
    nav: {
      services: "Услуги",
      why: "Почему мы",
      team: "Врачи",
      process: "Как проходит приём",
      prices: "Цены",
      reviews: "Отзывы",
      faq: "Вопросы",
      contact: "Контакты",
    },
    cta: { book: "Записаться на приём", call: "Позвонить", emergency: "Экстренная помощь" },
    langName: "Русский",
    hero: {
      kicker: "Ветеринарная клиника · Ташкент",
      titleA: "Здоровье вашего",
      titleHighlight: "питомца",
      titleB: "под надёжной защитой",
      lead:
        "Заботливая команда врачей, собственная лаборатория и современное оборудование — от профилактического осмотра до сложной операции. Бережно, без стресса и точно в срок.",
      primary: "Записаться на приём",
      secondary: "Наши услуги",
      scroll: "Листайте вниз",
      card: {
        label: "Карта здоровья",
        weight: "Вес",
        vaccination: "Вакцинация",
        antiparasitic: "Обработка от паразитов",
        passport: "Ветпаспорт",
        nextVisit: "Следующий визит",
        comingSoon: "Скоро",
        addPet: "Добавить питомца",
        pets: {
          dog: {
            petName: "Снежок",
            petMeta: "собака · 2 года",
            weightValue: "28 кг",
            vaccinationValue: "до 09.2027",
            antiparasiticValue: "15 авг",
            passportValue: "№ 4821",
            nextVisitValue: "20 окт",
          },
          cat: {
            petName: "Мурка",
            petMeta: "кошка · 3 года",
            weightValue: "4.2 кг",
            vaccinationValue: "до 06.2027",
            antiparasiticValue: "3 сен",
            passportValue: "№ 3390",
            nextVisitValue: "12 окт",
          },
        },
      },
    },
    marquee: [
      "Терапия",
      "Хирургия",
      "Вакцинация",
      "УЗИ-диагностика",
      "Стоматология",
      "Лаборатория",
      "Груминг",
      "Стационар",
      "Вызов на дом",
      "Чипирование",
    ],
    services: {
      kicker: "Что мы делаем",
      title: "Полный спектр ветеринарной помощи",
      lead:
        "Всё для здоровья питомца под одной крышей — от планового осмотра до неотложной хирургии. Без лишних направлений в другие клиники.",
      items: [
        {
          num: "01",
          name: "Терапия и приём",
          desc: "Осмотр, постановка диагноза и план лечения. Врач внимательно слушает и объясняет каждый шаг.",
          tags: ["Осмотр", "Консультация", "Лечение"],
        },
        {
          num: "02",
          name: "Хирургия",
          desc: "Плановые и неотложные операции в стерильной операционной с современным наркозным мониторингом.",
          tags: ["Стерилизация", "Операции", "Наркоз-контроль"],
        },
        {
          num: "03",
          name: "Вакцинация и профилактика",
          desc: "Индивидуальный график прививок, обработка от паразитов и оформление ветпаспорта.",
          tags: ["Прививки", "Ветпаспорт", "Профилактика"],
        },
        {
          num: "04",
          name: "Диагностика",
          desc: "УЗИ, рентген и анализы в собственной лаборатории — результаты уже во время приёма.",
          tags: ["УЗИ", "Рентген", "Анализы"],
        },
        {
          num: "05",
          name: "Стоматология",
          desc: "Ультразвуковая чистка, удаление зубного камня и лечение полости рта под контролем врача.",
          tags: ["Чистка", "Зубной камень", "Лечение"],
        },
        {
          num: "06",
          name: "Груминг и уход",
          desc: "Гигиеническая и модельная стрижка, купание и уход за когтями в спокойной обстановке.",
          tags: ["Стрижка", "Купание", "Когти"],
        },
      ],
    },
    why: {
      kicker: "Почему MyVet",
      title: "Здоровье питомца — наш главный приоритет",
      lead: "Мы берём ответственность за здоровье вашего любимца на каждом этапе.",
      points: [
        {
          title: "Опытные врачи",
          desc: "Специалисты с профильным образованием и многолетней практикой. Регулярно повышаем квалификацию.",
        },
        {
          title: "Своя лаборатория",
          desc: "Большинство анализов делаем на месте — результат и решение по лечению в день обращения.",
        },
        {
          title: "Бережный подход",
          desc: "Минимум стресса для питомца: мягкая фиксация, спокойная атмосфера и внимание к деталям.",
        },
        {
          title: "Помощь 24/7",
          desc: "Экстренная линия работает круглосуточно — в критической ситуации мы рядом.",
        },
      ],
    },
    stats: {
      title: "Цифры, которым доверяют",
      items: [
        { value: "12", label: "лет заботы о питомцах" },
        { value: "30 000+", label: "приёмов проведено" },
        { value: "24/7", label: "экстренная помощь" },
        { value: "8", label: "врачей-специалистов" },
      ],
    },
    team: {
      kicker: "Наша команда",
      title: "Команда, которой доверяют питомцев",
      lead: "Каждый специалист — это опыт, забота и любовь к животным.",
      members: [
        { name: "Улугбек Баходирович", role: "Главный врач" },
        { name: "Наргиза Фарходовна", role: "Руководитель" },
      ],
    },
    process: {
      kicker: "Как проходит приём",
      title: "От записи до выздоровления — 4 шага",
      lead: "Понятный процесс, в котором вы и питомец чувствуете себя спокойно.",
      steps: [
        { num: "01", title: "Запись", desc: "Оставьте заявку или позвоните — подберём удобное время без очередей." },
        { num: "02", title: "Осмотр и диагностика", desc: "Врач осматривает питомца, при необходимости — анализы и УЗИ на месте." },
        { num: "03", title: "Лечение", desc: "Составляем план лечения и проводим процедуры бережно и безопасно." },
        { num: "04", title: "Наблюдение", desc: "Контролируем восстановление и остаёмся на связи после визита." },
      ],
    },
    prices: {
      kicker: "Прайс-лист",
      title: "Прозрачные цены",
      lead: "Самые востребованные услуги. Полный прайс отправим по запросу.",
      note: "Точная стоимость зависит от состояния питомца и определяется на приёме.",
      currency: "сум",
      items: [
        { name: "Первичный приём и консультация", price: "от 120 000" },
        { name: "Вакцинация (комплексная)", price: "от 185 000" },
        { name: "УЗИ-диагностика", price: "от 120 000" },
        { name: "Чистка зубов (ультразвук)", price: "от 250 000" },
        { name: "Стерилизация", price: "от 450 000" },
        { name: "Кастрация", price: "от 250 000" },
        { name: "Вызов врача на дом", price: "от 150 000" },
      ],
    },
    reviews: {
      kicker: "Отзывы",
      title: "Нам доверяют самое дорогое",
      lead: "Реальные отзывы владельцев с Яндекс.Карт и Google. Нажмите на любой, чтобы открыть его в источнике.",
      ymapsCta: "Все отзывы на Яндекс.Картах",
      ymapsBadge: "на Яндекс.Картах",
      googleBadge: "в Google",
      googleCta: "Все отзывы в Google",
    },
    faq: {
      kicker: "Частые вопросы",
      title: "Коротко о главном",
      lead: "Не нашли ответ? Напишите нам — подскажем по вашему случаю.",
      items: [
        {
          q: "Нужна ли предварительная запись?",
          a: "Желательно — так вы попадёте к врачу без ожидания. Но в экстренных случаях мы принимаем без записи в любое время.",
        },
        {
          q: "Какие способы оплаты вы принимаете?",
          a: "Принимаем наличные и оплату картой. Полную стоимость услуг вы всегда видите до начала процедуры — без скрытых доплат.",
        },
        {
          q: "Работаете ли вы ночью?",
          a: "Экстренная помощь доступна круглосуточно. Плановые приёмы ведутся по графику клиники.",
        },
        {
          q: "Делаете ли вы вызов врача на дом?",
          a: "Да. Врач приедет с необходимым оборудованием для осмотра, вакцинации или забора анализов на дому.",
        },
      ],
    },
    contact: {
      kicker: "Запись на приём",
      title: "Запишите питомца на приём",
      lead: "Оставьте заявку — перезвоним, уточним детали и подберём удобное время. Заявка приходит напрямую к нам в Telegram.",
      name: "Ваше имя",
      phone: "Телефон",
      pet: "Питомец",
      petPlaceholder: "Например: кот, 3 года",
      service: "Услуга",
      serviceOptions: [
        "Терапия и приём",
        "Вакцинация",
        "Хирургия",
        "Диагностика (УЗИ, рентген, анализы)",
        "Стоматология",
        "Груминг",
        "Вызов на дом",
        "Другое",
      ],
      message: "Комментарий",
      messagePlaceholder: "Что беспокоит питомца, удобное время…",
      submit: "Записаться на приём",
      sending: "Отправляем…",
      success: "Спасибо! Заявка отправлена — мы свяжемся с вами в ближайшее время.",
      error: "Не удалось отправить. Попробуйте ещё раз или позвоните нам.",
      required: "Заполните это поле",
      invalidPhone: "Укажите корректный номер",
      or: "или свяжитесь напрямую",
      address: "Адрес",
      addressValue: "улица Чигил, 32А, Ташкент",
      hours: "Часы работы",
      hoursValue: "Ежедневно 24/7 · без обеда, выходных и праздников",
      emergency: "Экстренная линия",
      emergencyNote: "Круглосуточно для неотложных случаев",
    },
    footer: {
      tagline: "Современная ветеринарная клиника в Узбекистане. Заботимся о тех, кого вы любите.",
      nav: "Навигация",
      contacts: "Контакты",
      social: "Соцсети",
      rights: "Все права защищены.",
      madeWith: "Сделано с заботой о питомцах",
    },
  },

  // ═══════════════════════════════════════════ UZ ══
  uz: {
    meta: {
      title: "MyVet — Toshkentda veterinariya klinikasi · 24/7 kechayu kunduz",
      description:
        "MyVet — Toshkentdagi zamonaviy veterinariya klinikasi: terapiya, jarrohlik, vaksinatsiya, diagnostika (UTT, tahlillar), stomatologiya va gruming. O‘z laboratoriyasi, tajribali shifokorlar, kechayu kunduz shoshilinch yordam va uyga veterinar chaqirish.",
    },
    nav: {
      services: "Xizmatlar",
      why: "Nega biz",
      team: "Shifokorlar",
      process: "Qabul jarayoni",
      prices: "Narxlar",
      reviews: "Fikrlar",
      faq: "Savollar",
      contact: "Aloqa",
    },
    cta: { book: "Qabulga yozilish", call: "Qo‘ng‘iroq", emergency: "Shoshilinch yordam" },
    langName: "O‘zbekcha",
    hero: {
      kicker: "Veterinariya klinikasi · Toshkent",
      titleA: "Sevimli hayvoningiz",
      titleHighlight: "sog‘lig‘i",
      titleB: "ishonchli qo‘llarda",
      lead:
        "G‘amxo‘r shifokorlar jamoasi, o‘z laboratoriyasi va zamonaviy uskunalar — profilaktik ko‘rikdan murakkab operatsiyagacha. Ehtiyotkorlik bilan, stresssiz va aniq muddatda.",
      primary: "Qabulga yozilish",
      secondary: "Xizmatlarimiz",
      scroll: "Pastga aylantiring",
      card: {
        label: "Sog‘liq kartasi",
        weight: "Vazn",
        vaccination: "Vaksinatsiya",
        antiparasitic: "Parazitlarga ishlov",
        passport: "Vetpasport",
        nextVisit: "Keyingi tashrif",
        comingSoon: "Tez orada",
        addPet: "Hayvon qo‘shish",
        pets: {
          dog: {
            petName: "Snejok",
            petMeta: "it · 2 yosh",
            weightValue: "28 kg",
            vaccinationValue: "09.2027 gacha",
            antiparasiticValue: "15 avg",
            passportValue: "№ 4821",
            nextVisitValue: "20 okt",
          },
          cat: {
            petName: "Murka",
            petMeta: "mushuk · 3 yosh",
            weightValue: "4.2 kg",
            vaccinationValue: "06.2027 gacha",
            antiparasiticValue: "3 sen",
            passportValue: "№ 3390",
            nextVisitValue: "12 okt",
          },
        },
      },
    },
    marquee: [
      "Terapiya",
      "Jarrohlik",
      "Vaksinatsiya",
      "UTT diagnostika",
      "Stomatologiya",
      "Laboratoriya",
      "Gruming",
      "Statsionar",
      "Uyga chaqirish",
      "Chiplashtirish",
    ],
    services: {
      kicker: "Biz nima qilamiz",
      title: "Veterinariya yordamining to‘liq spektri",
      lead:
        "Hayvon sog‘lig‘i uchun barchasi bir tom ostida — rejali ko‘rikdan shoshilinch jarrohlikgacha. Boshqa klinikaga yo‘naltirishsiz.",
      items: [
        {
          num: "01",
          name: "Terapiya va qabul",
          desc: "Ko‘rik, tashxis qo‘yish va davolash rejasi. Shifokor diqqat bilan tinglaydi va har qadamni tushuntiradi.",
          tags: ["Ko‘rik", "Maslahat", "Davolash"],
        },
        {
          num: "02",
          name: "Jarrohlik",
          desc: "Rejali va shoshilinch operatsiyalar steril operatsiya xonasida zamonaviy narkoz monitoringi bilan.",
          tags: ["Sterilizatsiya", "Operatsiyalar", "Narkoz nazorati"],
        },
        {
          num: "03",
          name: "Vaksinatsiya va profilaktika",
          desc: "Individual emlash jadvali, parazitlarga qarshi ishlov va veterinariya pasportini rasmiylashtirish.",
          tags: ["Emlash", "Vetpasport", "Profilaktika"],
        },
        {
          num: "04",
          name: "Diagnostika",
          desc: "UTT, rentgen va tahlillar o‘z laboratoriyamizda — natijalar qabul vaqtidayoq tayyor.",
          tags: ["UTT", "Rentgen", "Tahlillar"],
        },
        {
          num: "05",
          name: "Stomatologiya",
          desc: "Ultratovushli tozalash, tish toshini olib tashlash va og‘iz bo‘shlig‘ini davolash shifokor nazoratida.",
          tags: ["Tozalash", "Tish toshi", "Davolash"],
        },
        {
          num: "06",
          name: "Gruming va parvarish",
          desc: "Gigiyenik va modelli qirqish, cho‘miltirish va tirnoqlarni parvarishlash xotirjam muhitda.",
          tags: ["Qirqish", "Cho‘miltirish", "Tirnoqlar"],
        },
      ],
    },
    why: {
      kicker: "Nega MyVet",
      title: "Hayvon sog‘lig‘i — bizning asosiy ustuvorligimiz",
      lead: "Sevimli hayvoningiz sog‘lig‘i uchun har bosqichda javobgarlikni o‘z zimmamizga olamiz.",
      points: [
        {
          title: "Tajribali shifokorlar",
          desc: "Mutaxassis ta’limiga va ko‘p yillik amaliyotga ega shifokorlar. Malakamizni doimiy oshiramiz.",
        },
        {
          title: "O‘z laboratoriyamiz",
          desc: "Aksariyat tahlillarni joyida bajaramiz — natija va davolash qarori murojaat kunining o‘zida.",
        },
        {
          title: "Ehtiyotkor yondashuv",
          desc: "Hayvon uchun minimal stress: yumshoq ushlash, xotirjam muhit va detallarga e’tibor.",
        },
        {
          title: "24/7 yordam",
          desc: "Shoshilinch liniya kechayu kunduz ishlaydi — og‘ir vaziyatda biz yoningizdamiz.",
        },
      ],
    },
    stats: {
      title: "Ishonadigan raqamlar",
      items: [
        { value: "12", label: "yillik g‘amxo‘rlik" },
        { value: "30 000+", label: "qabul o‘tkazilgan" },
        { value: "24/7", label: "shoshilinch yordam" },
        { value: "8", label: "mutaxassis shifokor" },
      ],
    },
    team: {
      kicker: "Bizning jamoa",
      title: "Hayvonlar ishonadigan jamoa",
      lead: "Har bir mutaxassis — tajriba, g‘amxo‘rlik va hayvonlarga mehr.",
      members: [
        { name: "Ulug‘bek Bahodirovich", role: "Bosh shifokor" },
        { name: "Nargiza Farhodovna", role: "Rahbar" },
      ],
    },
    process: {
      kicker: "Qabul jarayoni",
      title: "Yozilishdan sog‘ayishgacha — 4 qadam",
      lead: "Siz va hayvoningiz o‘zini xotirjam his qiladigan tushunarli jarayon.",
      steps: [
        { num: "01", title: "Yozilish", desc: "Ariza qoldiring yoki qo‘ng‘iroq qiling — navbatsiz qulay vaqt tanlaymiz." },
        { num: "02", title: "Ko‘rik va diagnostika", desc: "Shifokor hayvonni ko‘rikdan o‘tkazadi, kerak bo‘lsa — joyida tahlil va UTT." },
        { num: "03", title: "Davolash", desc: "Davolash rejasini tuzamiz va muolajalarni ehtiyotkorlik bilan o‘tkazamiz." },
        { num: "04", title: "Kuzatuv", desc: "Sog‘ayishni nazorat qilamiz va tashrifdan keyin ham aloqada bo‘lamiz." },
      ],
    },
    prices: {
      kicker: "Narxlar ro‘yxati",
      title: "Shaffof narxlar",
      lead: "Eng ko‘p so‘raladigan xizmatlar. To‘liq narxlarni so‘rov bo‘yicha yuboramiz.",
      note: "Aniq narx hayvon holatiga bog‘liq va qabulda belgilanadi.",
      currency: "so‘m",
      items: [
        { name: "Birlamchi qabul va maslahat", price: "120 000 dan" },
        { name: "Vaksinatsiya (kompleks)", price: "185 000 dan" },
        { name: "UTT diagnostika", price: "120 000 dan" },
        { name: "Tish tozalash (ultratovush)", price: "250 000 dan" },
        { name: "Sterilizatsiya", price: "450 000 dan" },
        { name: "Kastratsiya", price: "250 000 dan" },
        { name: "Shifokorni uyga chaqirish", price: "150 000 dan" },
      ],
    },
    reviews: {
      kicker: "Fikrlar",
      title: "Bizga eng qadrlini ishonishadi",
      lead: "Yandex.Xarita va Google’dagi haqiqiy mijoz fikrlari. Manbada ochish uchun istalganiga bosing.",
      ymapsCta: "Yandex.Xaritadagi barcha fikrlar",
      ymapsBadge: "Yandex.Xaritada",
      googleBadge: "Google’da",
      googleCta: "Google’dagi barcha fikrlar",
    },
    faq: {
      kicker: "Ko‘p beriladigan savollar",
      title: "Eng muhimi qisqacha",
      lead: "Javob topmadingizmi? Bizga yozing — holatingiz bo‘yicha maslahat beramiz.",
      items: [
        {
          q: "Oldindan yozilish kerakmi?",
          a: "Tavsiya etiladi — shunda kutmasdan shifokorga tushasiz. Ammo shoshilinch holatlarda istalgan vaqtda yozuvsiz qabul qilamiz.",
        },
        {
          q: "Qanday to‘lov usullarini qabul qilasiz?",
          a: "Naqd pul va karta orqali to‘lovni qabul qilamiz. Xizmatlarning to‘liq narxini muolaja boshlanishidan oldin ko‘rasiz — yashirin to‘lovlarsiz.",
        },
        {
          q: "Kechasi ishlaysizmi?",
          a: "Shoshilinch yordam kechayu kunduz mavjud. Rejali qabullar klinika jadvali bo‘yicha o‘tkaziladi.",
        },
        {
          q: "Shifokorni uyga chaqirsa bo‘ladimi?",
          a: "Ha. Shifokor ko‘rik, emlash yoki tahlil olish uchun kerakli uskunalar bilan uyingizga keladi.",
        },
      ],
    },
    contact: {
      kicker: "Qabulga yozilish",
      title: "Hayvoningizni qabulga yozing",
      lead: "Ariza qoldiring — qayta qo‘ng‘iroq qilib, tafsilotlarni aniqlaymiz va qulay vaqt tanlaymiz. Ariza to‘g‘ridan-to‘g‘ri Telegramga keladi.",
      name: "Ismingiz",
      phone: "Telefon",
      pet: "Hayvon",
      petPlaceholder: "Masalan: mushuk, 3 yosh",
      service: "Xizmat",
      serviceOptions: [
        "Terapiya va qabul",
        "Vaksinatsiya",
        "Jarrohlik",
        "Diagnostika (UTT, rentgen, tahlillar)",
        "Stomatologiya",
        "Gruming",
        "Uyga chaqirish",
        "Boshqa",
      ],
      message: "Izoh",
      messagePlaceholder: "Hayvonni nima bezovta qilyapti, qulay vaqt…",
      submit: "Qabulga yozilish",
      sending: "Yuborilmoqda…",
      success: "Rahmat! Ariza yuborildi — tez orada siz bilan bog‘lanamiz.",
      error: "Yuborib bo‘lmadi. Qayta urinib ko‘ring yoki qo‘ng‘iroq qiling.",
      required: "Bu maydonni to‘ldiring",
      invalidPhone: "To‘g‘ri raqam kiriting",
      or: "yoki to‘g‘ridan-to‘g‘ri bog‘laning",
      address: "Manzil",
      addressValue: "Chig‘il ko‘chasi, 32A, Toshkent",
      hours: "Ish vaqti",
      hoursValue: "Har kuni 24/7 · tanaffus, dam olish va bayramsiz",
      emergency: "Shoshilinch liniya",
      emergencyNote: "Shoshilinch holatlar uchun kechayu kunduz",
    },
    footer: {
      tagline: "O‘zbekistondagi zamonaviy veterinariya klinikasi. Siz sevganlar haqida g‘amxo‘rlik qilamiz.",
      nav: "Navigatsiya",
      contacts: "Aloqa",
      social: "Ijtimoiy tarmoqlar",
      rights: "Barcha huquqlar himoyalangan.",
      madeWith: "Hayvonlarga g‘amxo‘rlik bilan yaratilgan",
    },
  },

  // ═══════════════════════════════════════════ EN ══
  en: {
    meta: {
      title: "MyVet — Veterinary Clinic in Tashkent · Open 24/7",
      description:
        "MyVet is a modern veterinary clinic in Tashkent: therapy, surgery, vaccination, diagnostics (ultrasound, lab tests), dentistry and grooming. In-house lab, experienced vets, round-the-clock emergency care and home vet visits.",
    },
    nav: {
      services: "Services",
      why: "Why us",
      team: "Vets",
      process: "How it works",
      prices: "Pricing",
      reviews: "Reviews",
      faq: "FAQ",
      contact: "Contact",
    },
    cta: { book: "Book a visit", call: "Call us", emergency: "Emergency care" },
    langName: "English",
    hero: {
      kicker: "Veterinary clinic · Tashkent",
      titleA: "Your pet's health",
      titleHighlight: "in caring",
      titleB: "expert hands",
      lead:
        "A caring team of vets, an in-house lab and modern equipment — from a routine check-up to complex surgery. Gentle, stress-free and always on time.",
      primary: "Book a visit",
      secondary: "Our services",
      scroll: "Scroll down",
      card: {
        label: "Health card",
        weight: "Weight",
        vaccination: "Vaccination",
        antiparasitic: "Parasite control",
        passport: "Pet passport",
        nextVisit: "Next visit",
        comingSoon: "Coming soon",
        addPet: "Add a pet",
        pets: {
          dog: {
            petName: "Snezhok",
            petMeta: "dog · 2 yrs",
            weightValue: "28 kg",
            vaccinationValue: "until 09.2027",
            antiparasiticValue: "Aug 15",
            passportValue: "No. 4821",
            nextVisitValue: "Oct 20",
          },
          cat: {
            petName: "Murka",
            petMeta: "cat · 3 yrs",
            weightValue: "4.2 kg",
            vaccinationValue: "until 06.2027",
            antiparasiticValue: "Sep 3",
            passportValue: "No. 3390",
            nextVisitValue: "Oct 12",
          },
        },
      },
    },
    marquee: [
      "Therapy",
      "Surgery",
      "Vaccination",
      "Ultrasound",
      "Dentistry",
      "Lab tests",
      "Grooming",
      "Inpatient care",
      "Home visits",
      "Microchipping",
    ],
    services: {
      kicker: "What we do",
      title: "A full range of veterinary care",
      lead:
        "Everything for your pet's health under one roof — from a routine check-up to emergency surgery. No referrals to other clinics.",
      items: [
        {
          num: "01",
          name: "Therapy & consultation",
          desc: "Examination, diagnosis and a treatment plan. The vet listens carefully and explains every step.",
          tags: ["Check-up", "Consultation", "Treatment"],
        },
        {
          num: "02",
          name: "Surgery",
          desc: "Planned and emergency operations in a sterile theatre with modern anaesthesia monitoring.",
          tags: ["Spaying", "Operations", "Anaesthesia"],
        },
        {
          num: "03",
          name: "Vaccination & prevention",
          desc: "A personal vaccination schedule, parasite treatment and pet passport registration.",
          tags: ["Vaccines", "Pet passport", "Prevention"],
        },
        {
          num: "04",
          name: "Diagnostics",
          desc: "Ultrasound, X-ray and lab tests in our own laboratory — results during your visit.",
          tags: ["Ultrasound", "X-ray", "Lab tests"],
        },
        {
          num: "05",
          name: "Dentistry",
          desc: "Ultrasonic scaling, tartar removal and oral treatment under careful veterinary supervision.",
          tags: ["Cleaning", "Tartar", "Treatment"],
        },
        {
          num: "06",
          name: "Grooming & care",
          desc: "Hygienic and breed grooming, bathing and nail care in a calm, gentle environment.",
          tags: ["Grooming", "Bathing", "Nails"],
        },
      ],
    },
    why: {
      kicker: "Why MyVet",
      title: "Your pet's health is our top priority",
      lead: "We take responsibility for your pet's health at every stage.",
      points: [
        {
          title: "Experienced vets",
          desc: "Specialists with professional training and years of practice. We keep our skills sharp.",
        },
        {
          title: "In-house laboratory",
          desc: "Most tests are run on site — results and a treatment decision on the same day.",
        },
        {
          title: "A gentle approach",
          desc: "Minimal stress for your pet: soft handling, a calm atmosphere and attention to detail.",
        },
        {
          title: "24/7 support",
          desc: "Our emergency line runs around the clock — we're here when it matters most.",
        },
      ],
    },
    stats: {
      title: "Numbers you can trust",
      items: [
        { value: "12", label: "years of care" },
        { value: "30,000+", label: "visits handled" },
        { value: "24/7", label: "emergency care" },
        { value: "8", label: "specialist vets" },
      ],
    },
    team: {
      kicker: "Our team",
      title: "A team you can trust your pet with",
      lead: "Every specialist brings experience, care and a genuine love for animals.",
      members: [
        { name: "Ulugbek Bakhodirovich", role: "Head veterinarian" },
        { name: "Nargiza Farkhodovna", role: "Director" },
      ],
    },
    process: {
      kicker: "How it works",
      title: "From booking to recovery — 4 steps",
      lead: "A clear process that keeps you and your pet at ease.",
      steps: [
        { num: "01", title: "Book", desc: "Leave a request or call us — we'll find a convenient time with no queues." },
        { num: "02", title: "Exam & diagnostics", desc: "The vet examines your pet, with on-site tests and ultrasound if needed." },
        { num: "03", title: "Treatment", desc: "We build a treatment plan and carry out procedures gently and safely." },
        { num: "04", title: "Follow-up", desc: "We monitor recovery and stay in touch after your visit." },
      ],
    },
    prices: {
      kicker: "Price list",
      title: "Transparent pricing",
      lead: "Our most requested services. We'll send the full price list on request.",
      note: "The exact price depends on your pet's condition and is confirmed at the visit.",
      currency: "UZS",
      items: [
        { name: "Initial visit & consultation", price: "from 120,000" },
        { name: "Vaccination (complex)", price: "from 185,000" },
        { name: "Ultrasound diagnostics", price: "from 120,000" },
        { name: "Teeth cleaning (ultrasonic)", price: "from 250,000" },
        { name: "Spaying", price: "from 450,000" },
        { name: "Neutering", price: "from 250,000" },
        { name: "Vet home visit", price: "from 150,000" },
      ],
    },
    reviews: {
      kicker: "Reviews",
      title: "People trust us with what matters most",
      lead: "Real client reviews from Yandex Maps and Google. Tap any one to open it at the source.",
      ymapsCta: "All reviews on Yandex Maps",
      ymapsBadge: "on Yandex Maps",
      googleBadge: "on Google",
      googleCta: "All reviews on Google",
    },
    faq: {
      kicker: "FAQ",
      title: "The essentials, briefly",
      lead: "Didn't find your answer? Message us — we'll advise on your case.",
      items: [
        {
          q: "Do I need to book in advance?",
          a: "It's recommended — that way you see the vet without waiting. But in emergencies we accept walk-ins at any time.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept cash and card payments. You'll always see the full cost of services before any procedure begins — with no hidden fees.",
        },
        {
          q: "Are you open at night?",
          a: "Emergency care is available around the clock. Routine appointments follow the clinic's schedule.",
        },
        {
          q: "Do you make home visits?",
          a: "Yes. The vet comes with the equipment needed for an exam, vaccination or taking samples at your home.",
        },
      ],
    },
    contact: {
      kicker: "Book a visit",
      title: "Book your pet in for a visit",
      lead: "Leave a request — we'll call back, confirm the details and find a convenient time. Requests arrive directly in our Telegram.",
      name: "Your name",
      phone: "Phone",
      pet: "Pet",
      petPlaceholder: "e.g. cat, 3 years",
      service: "Service",
      serviceOptions: [
        "Therapy & consultation",
        "Vaccination",
        "Surgery",
        "Diagnostics (ultrasound, X-ray, tests)",
        "Dentistry",
        "Grooming",
        "Home visit",
        "Other",
      ],
      message: "Comment",
      messagePlaceholder: "What's bothering your pet, a convenient time…",
      submit: "Book a visit",
      sending: "Sending…",
      success: "Thank you! Your request has been sent — we'll be in touch shortly.",
      error: "Couldn't send. Please try again or give us a call.",
      required: "Please fill in this field",
      invalidPhone: "Enter a valid number",
      or: "or reach us directly",
      address: "Address",
      addressValue: "Chigil street, 32A, Tashkent",
      hours: "Opening hours",
      hoursValue: "Open 24/7 · no lunch break, days off or holidays",
      emergency: "Emergency line",
      emergencyNote: "Around the clock for urgent cases",
    },
    footer: {
      tagline: "A modern veterinary clinic in Uzbekistan. Caring for the ones you love.",
      nav: "Navigation",
      contacts: "Contacts",
      social: "Social",
      rights: "All rights reserved.",
      madeWith: "Made with care for pets",
    },
  },
};

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}
export type { Dict };
