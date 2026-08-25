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
    team: string;
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
  clinic: {
    kicker: string;
    title: string;
    lead: string;
    placeholder: string;
    items: string[];
  };
  hotel: {
    kicker: string;
    title: string;
    lead: string;
    points: { title: string; desc: string }[];
    note: string;
    cta: string;
    captions: string[];
  };
  team: {
    kicker: string;
    title: string;
    lead: string;
    members: { name: string; role: string }[];
  };
  prices: {
    kicker: string;
    title: string;
    lead: string;
    note: string;
    currency: string;
    showMore: string;
    showLess: string;
    /** onRequest hides the currency suffix — the price is not a number. */
    items: { name: string; price: string; onRequest?: boolean }[];
  };
  reviews: {
    kicker: string;
    title: string;
    lead: string;
    ymapsCta: string;
    googleCta: string;
  };
  faq: {
    kicker: string;
    title: string;
    lead: string;
    showMore: string;
    showLess: string;
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
    license: string;
    viewLicense: string;
    taxId: string;
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
        "MyVet — современная ветеринарная клиника в Ташкенте: терапия, хирургия, вакцинация, диагностика (УЗИ, рентген, анализы), груминг, стационар и зоогостиница. Опытные врачи, круглосуточная экстренная помощь, зоотакси и вызов ветеринара на дом.",
    },
    nav: {
      services: "Услуги",
      team: "Руководство",
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
      "Зоогостиница",
      "Груминг",
      "Стационар",
      "Зоотакси",
      "Чек-ап",
      "Вызов на дом",
      "Чипирование",
    ],
    services: {
      kicker: "Что мы делаем",
      title: "Полный спектр ветеринарной помощи",
      lead:
        "От профилактического осмотра и диагностики до сложных и неотложных операций.",
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
          desc: "Плановые и неотложные операции в стерильной операционной. Перед операцией — обследование, после — наблюдение в стационаре.",
          tags: ["Стерилизация", "Операции", "Кастрация"],
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
          desc: "УЗИ, рентген и анализы — быстро и без лишних направлений в другие клиники.",
          tags: ["УЗИ", "Рентген", "Анализы"],
        },
        {
          num: "05",
          name: "Груминг и уход",
          desc: "Гигиеническая и модельная стрижка, купание и уход за когтями в спокойной обстановке.",
          tags: ["Стрижка", "Купание", "Когти"],
        },
        {
          num: "06",
          name: "Стационар",
          desc: "Круглосуточное наблюдение под присмотром врача, когда питомцу нужно восстановиться после операции или тяжёлой болезни.",
          tags: ["Наблюдение 24/7", "Капельницы", "Восстановление"],
        },
        {
          num: "07",
          name: "Зоогостиница",
          desc: "Передержка на время вашей поездки: кормление по режиму, прогулки и ежедневный присмотр ветеринара.",
          tags: ["Передержка", "Кормление", "Присмотр врача"],
        },
        {
          num: "08",
          name: "Зоотакси",
          desc: "Своя машина для перевозки питомцев: заберём из дома и привезём обратно после приёма.",
          tags: ["Своя машина", "Из дома в клинику", "Обратно домой"],
        },
        {
          num: "09",
          name: "Чек-ап",
          desc: "Комплексная проверка здоровья: осмотр, базовые анализы и УЗИ — чтобы заметить проблему до появления симптомов.",
          tags: ["Осмотр", "Анализы", "УЗИ"],
        },
      ],
    },
    hotel: {
      kicker: "Пока вы в отъезде",
      title: "Зоогостиница",
      lead: "Отдельные номера при клинике: игровой комплекс, лежанка, свои миски и лоток.",
      points: [
        {
          title: "Отдельный номер",
          desc: "Не клетка, а комната: игровой комплекс, лежанка и укрытие для сна.",
        },
        {
          title: "Дневной свет",
          desc: "Окно в номере, кондиционер и отопление.",
        },
        {
          title: "Врач рядом",
          desc: "Гостиница прямо в клинике, поэтому врач видит питомца каждый день.",
        },
        {
          title: "Свои вещи",
          desc: "Можно привезти привычный корм, лежанку и любимые игрушки.",
        },
      ],
      note: "Стоимость зависит от номера и типа питомца — напишите нам в Telegram, подберём вариант.",
      cta: "Написать в Telegram",
      captions: [
        "Номер с игровым комплексом",
        "Дневной свет и своё окно",
        "Лежанка, миски и закрытый лоток",
      ],
    },
    clinic: {
      kicker: "Наша клиника",
      title: "Где мы принимаем",
      lead: "Приёмная, смотровая, операционная и стационар — можно посмотреть заранее.",
      placeholder: "Фото скоро",
      items: ["Приёмная", "Смотровая", "Операционная", "Стационар"],
    },
    team: {
      kicker: "Кто мы",
      title: "Основатели клиники",
      lead: "С них начинался MyVet — они открыли клинику и задали то, как здесь работают с питомцами.",
      members: [
        { name: "Улугбек Баходирович Юлдашев", role: "Соучредитель" },
        { name: "Наргиза Фарходовна Ахадова", role: "Соучредитель, директор" },
      ],
    },
    prices: {
      kicker: "Прайс-лист",
      title: "Прозрачные цены",
      lead: "Самые востребованные услуги. Полный прайс отправим по запросу.",
      note: "Точная стоимость зависит от состояния питомца и определяется на приёме. Цена стационара и зоогостиницы зависит от номера, питомца и его состояния — напишите нам в Telegram.",
      currency: "сум",
      showMore: "Показать все цены",
      showLess: "Свернуть",
      items: [
        { name: "Первичный приём и консультация", price: "от 120 000" },
        { name: "Вакцинация (комплексная)", price: "от 185 000" },
        { name: "УЗИ-диагностика", price: "от 150 000" },
        { name: "Стерилизация", price: "от 450 000" },
        { name: "Кастрация", price: "от 250 000" },
        { name: "Вызов врача на дом", price: "от 150 000" },
        { name: "Зоотакси", price: "от 150 000" },
        { name: "Стационар", price: "по запросу", onRequest: true },
        { name: "Зоогостиница", price: "по запросу", onRequest: true },
        { name: "Чек-ап", price: "по запросу", onRequest: true },
      ],
    },
    reviews: {
      kicker: "Отзывы",
      title: "Нам доверяют самое дорогое",
      lead: "Реальные отзывы владельцев наших пациентов.",
      ymapsCta: "Все отзывы на Яндексе",
      googleCta: "Все отзывы в Google",
    },
    faq: {
      kicker: "Частые вопросы",
      title: "Коротко о главном",
      lead: "Не нашли ответ? Напишите нам — подскажем по вашему случаю.",
      showMore: "Показать все вопросы",
      showLess: "Свернуть",
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
        {
          q: "Сколько стоит стационар или зоогостиница?",
          a: "Цена зависит от номера, размера питомца и его состояния. Напишите нам в Telegram — рассчитаем стоимость в день обращения.",
        },
        {
          q: "Можно ли навещать питомца в стационаре?",
          a: "Да, по согласованию с лечащим врачом. Мы также на связи и сообщаем о состоянии питомца.",
        },
        {
          q: "Как заказать зоотакси?",
          a: "Позвоните нам или напишите в Telegram. Заберём питомца из дома и привезём обратно после приёма.",
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
        "Груминг",
        "Стационар",
        "Зоогостиница",
        "Зоотакси",
        "Чек-ап",
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
      license: "Лицензия",
      viewLicense: "Посмотреть лицензию",
      taxId: "СТИР",
      rights: "Все права защищены.",
      madeWith: "Сделано с заботой о питомцах",
    },
  },

  // ═══════════════════════════════════════════ UZ ══
  uz: {
    meta: {
      title: "MyVet — Toshkentda veterinariya klinikasi · 24/7 kechayu kunduz",
      description:
        "MyVet — Toshkentdagi zamonaviy veterinariya klinikasi: terapiya, jarrohlik, vaksinatsiya, diagnostika (UTT, rentgen, tahlillar), gruming, statsionar va zoomehmonxona. Tajribali shifokorlar, kechayu kunduz shoshilinch yordam, zootaksi va uyga veterinar chaqirish.",
    },
    nav: {
      services: "Xizmatlar",
      team: "Rahbariyat",
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
      "Zoomehmonxona",
      "Gruming",
      "Statsionar",
      "Zootaksi",
      "Chek-ap",
      "Uyga chaqirish",
      "Chiplashtirish",
    ],
    services: {
      kicker: "Biz nima qilamiz",
      title: "Veterinariya yordamining to‘liq spektri",
      lead:
        "Profilaktik ko‘rik va diagnostikadan murakkab hamda shoshilinch operatsiyalargacha.",
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
          desc: "Rejali va shoshilinch operatsiyalar steril operatsiya xonasida. Operatsiyadan oldin — tekshiruv, keyin — statsionarda kuzatuv.",
          tags: ["Sterilizatsiya", "Operatsiyalar", "Kastratsiya"],
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
          desc: "UTT, rentgen va tahlillar — tez va boshqa klinikaga yo‘naltirishsiz.",
          tags: ["UTT", "Rentgen", "Tahlillar"],
        },
        {
          num: "05",
          name: "Gruming va parvarish",
          desc: "Gigiyenik va modelli qirqish, cho‘miltirish va tirnoqlarni parvarishlash xotirjam muhitda.",
          tags: ["Qirqish", "Cho‘miltirish", "Tirnoqlar"],
        },
        {
          num: "06",
          name: "Statsionar",
          desc: "Operatsiyadan yoki og‘ir kasallikdan keyin tiklanish kerak bo‘lsa, shifokor nazorati ostida kechayu kunduz kuzatuv.",
          tags: ["24/7 kuzatuv", "Tomchilar", "Tiklanish"],
        },
        {
          num: "07",
          name: "Zoomehmonxona",
          desc: "Safaringiz davrida hayvoningizni saqlaymiz: rejim bo‘yicha ovqatlantirish, sayr va har kuni veterinar nazorati.",
          tags: ["Saqlash", "Ovqatlantirish", "Shifokor nazorati"],
        },
        {
          num: "08",
          name: "Zootaksi",
          desc: "Hayvonlarni tashish uchun o‘z mashinamiz: uydan olib ketamiz va qabuldan keyin qaytarib olib kelamiz.",
          tags: ["O‘z mashinamiz", "Uydan klinikaga", "Uyga qaytarish"],
        },
        {
          num: "09",
          name: "Chek-ap",
          desc: "Sog‘liqni kompleks tekshirish: ko‘rik, asosiy tahlillar va UTT — muammoni alomatlar paydo bo‘lguncha aniqlash uchun.",
          tags: ["Ko‘rik", "Tahlillar", "UTT"],
        },
      ],
    },
    hotel: {
      kicker: "Siz safarda bo‘lganingizda",
      title: "Zoomehmonxona",
      lead: "Klinika qoshidagi alohida xonalar: o‘yin majmuasi, yumshoq joy, o‘z idishi va hojatxonasi.",
      points: [
        {
          title: "Alohida xona",
          desc: "Qafas emas, xona: o‘yin majmuasi, yumshoq joy va uxlash uchun panoh.",
        },
        {
          title: "Kunduzgi yorug‘lik",
          desc: "Xonada deraza, konditsioner va isitish.",
        },
        {
          title: "Shifokor yaqin",
          desc: "Mehmonxona klinikaning o‘zida, shuning uchun shifokor har kuni ko‘rib turadi.",
        },
        {
          title: "O‘z buyumlari",
          desc: "Odatdagi yemini, yotog‘ini va sevimli o‘yinchoqlarini olib kelsangiz bo‘ladi.",
        },
      ],
      note: "Narx xona va uy hayvoni turiga bog‘liq — Telegram’ga yozing, mos variantni tanlaymiz.",
      cta: "Telegram’ga yozish",
      captions: [
        "O‘yin majmuasi bo‘lgan xona",
        "Kunduzgi yorug‘lik va deraza",
        "Yotoq joyi, idishlar va yopiq hojatxona",
      ],
    },
    clinic: {
      kicker: "Bizning klinika",
      title: "Qayerda qabul qilamiz",
      lead: "Qabulxona, ko‘rik xonasi, operatsiya xonasi va statsionar — oldindan ko‘rishingiz mumkin.",
      placeholder: "Foto tez orada",
      items: ["Qabulxona", "Ko‘rik xonasi", "Operatsiya xonasi", "Statsionar"],
    },
    team: {
      kicker: "Biz kimmiz",
      title: "Klinika asoschilari",
      lead: "MyVet shu odamlardan boshlangan: klinikani ular ochgan va bu yerdagi ish uslubini ular shakllantirgan.",
      members: [
        { name: "Ulug‘bek Bahodirovich Yuldashev", role: "Hammuassis" },
        { name: "Nargiza Farhodovna Ahadova", role: "Hammuassis, direktor" },
      ],
    },
    prices: {
      kicker: "Narxlar ro‘yxati",
      title: "Shaffof narxlar",
      lead: "Eng ko‘p so‘raladigan xizmatlar. To‘liq narxlarni so‘rov bo‘yicha yuboramiz.",
      note: "Aniq narx hayvon holatiga bog‘liq va qabulda belgilanadi. Statsionar va zoomehmonxona narxi xona, hayvon va uning holatiga bog‘liq — Telegramga yozing.",
      currency: "so‘m",
      showMore: "Barcha narxlarni ko‘rsatish",
      showLess: "Yig‘ish",
      items: [
        { name: "Birlamchi qabul va maslahat", price: "120 000 dan" },
        { name: "Vaksinatsiya (kompleks)", price: "185 000 dan" },
        { name: "UTT diagnostika", price: "150 000 dan" },
        { name: "Sterilizatsiya", price: "450 000 dan" },
        { name: "Kastratsiya", price: "250 000 dan" },
        { name: "Shifokorni uyga chaqirish", price: "150 000 dan" },
        { name: "Zootaksi", price: "150 000 dan" },
        { name: "Statsionar", price: "so‘rov bo‘yicha", onRequest: true },
        { name: "Zoomehmonxona", price: "so‘rov bo‘yicha", onRequest: true },
        { name: "Chek-ap", price: "so‘rov bo‘yicha", onRequest: true },
      ],
    },
    reviews: {
      kicker: "Fikrlar",
      title: "Bizga eng qadrlini ishonishadi",
      lead: "Mijozlarimizning haqiqiy fikrlari.",
      ymapsCta: "Yandexdagi barcha fikrlar",
      googleCta: "Google’dagi barcha fikrlar",
    },
    faq: {
      kicker: "Ko‘p beriladigan savollar",
      title: "Eng muhimi qisqacha",
      lead: "Javob topmadingizmi? Bizga yozing — holatingiz bo‘yicha maslahat beramiz.",
      showMore: "Barcha savollarni ko‘rsatish",
      showLess: "Yig‘ish",
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
        {
          q: "Statsionar yoki zoomehmonxona qancha turadi?",
          a: "Narx xona, hayvon o‘lchami va uning holatiga bog‘liq. Telegramga yozing — murojaat kunining o‘zida hisoblab beramiz.",
        },
        {
          q: "Statsionarda hayvonni yo‘qlash mumkinmi?",
          a: "Ha, davolovchi shifokor bilan kelishilgan holda. Shuningdek, hayvon holati haqida doimo xabar berib turamiz.",
        },
        {
          q: "Zootaksini qanday buyurtma qilaman?",
          a: "Qo‘ng‘iroq qiling yoki Telegramga yozing. Hayvonni uydan olib ketamiz va qabuldan keyin qaytarib olib kelamiz.",
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
        "Gruming",
        "Statsionar",
        "Zoomehmonxona",
        "Zootaksi",
        "Chek-ap",
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
      license: "Litsenziya",
      viewLicense: "Litsenziyani ko‘rish",
      taxId: "STIR",
      rights: "Barcha huquqlar himoyalangan.",
      madeWith: "Hayvonlarga g‘amxo‘rlik bilan yaratilgan",
    },
  },

  // ═══════════════════════════════════════════ EN ══
  en: {
    meta: {
      title: "MyVet — Veterinary Clinic in Tashkent · Open 24/7",
      description:
        "MyVet is a modern veterinary clinic in Tashkent: therapy, surgery, vaccination, diagnostics (ultrasound, X-ray, tests), grooming, inpatient care and a pet hotel. Experienced vets, round-the-clock emergency care, pet taxi and home visits.",
    },
    nav: {
      services: "Services",
      team: "Leadership",
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
      "Pet hotel",
      "Grooming",
      "Inpatient care",
      "Pet taxi",
      "Health check-up",
      "Home visits",
      "Microchipping",
    ],
    services: {
      kicker: "What we do",
      title: "A full range of veterinary care",
      lead:
        "From preventive check-ups and diagnostics to complex and emergency surgery.",
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
          desc: "Planned and emergency operations in a sterile theatre. Examination beforehand, monitored recovery in our inpatient ward after.",
          tags: ["Spaying", "Operations", "Neutering"],
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
          desc: "Ultrasound, X-ray and lab tests — quickly, with no referrals elsewhere.",
          tags: ["Ultrasound", "X-ray", "Lab tests"],
        },
        {
          num: "05",
          name: "Grooming & care",
          desc: "Hygienic and breed grooming, bathing and nail care in a calm, gentle environment.",
          tags: ["Grooming", "Bathing", "Nails"],
        },
        {
          num: "06",
          name: "Inpatient care",
          desc: "Round-the-clock monitoring under veterinary supervision when your pet needs to recover from surgery or serious illness.",
          tags: ["24/7 monitoring", "IV drips", "Recovery"],
        },
        {
          num: "07",
          name: "Pet hotel",
          desc: "Boarding while you travel: feeding on schedule, walks and a daily check by a vet.",
          tags: ["Boarding", "Feeding", "Vet checks"],
        },
        {
          num: "08",
          name: "Pet taxi",
          desc: "Our own vehicle for transporting pets: we collect them from home and bring them back after the visit.",
          tags: ["Our own vehicle", "Home to clinic", "Back home"],
        },
        {
          num: "09",
          name: "Health check-up",
          desc: "A full health screen: examination, basic tests and ultrasound — to catch problems before symptoms appear.",
          tags: ["Examination", "Tests", "Ultrasound"],
        },
      ],
    },
    hotel: {
      kicker: "While you are away",
      title: "Pet hotel",
      lead: "Private rooms at the clinic: a climbing tree, a bed, their own bowls and litter box.",
      points: [
        {
          title: "A room, not a cage",
          desc: "Climbing tree, a soft bed and a hideaway to sleep in.",
        },
        {
          title: "Daylight",
          desc: "A window in the room, air conditioning and heating.",
        },
        {
          title: "A vet nearby",
          desc: "The hotel is inside the clinic, so a vet sees your pet every day.",
        },
        {
          title: "Their own things",
          desc: "Bring their usual food, bed and favourite toys.",
        },
      ],
      note: "The price depends on the room and the pet — message us on Telegram and we will find the right option.",
      cta: "Message us on Telegram",
      captions: [
        "Room with a climbing tree",
        "Daylight and a window",
        "Bed, bowls and a covered litter box",
      ],
    },
    clinic: {
      kicker: "Our clinic",
      title: "Where we treat your pet",
      lead: "Reception, exam room, operating theatre and inpatient ward — see them before you come.",
      placeholder: "Photo coming soon",
      items: ["Reception", "Exam room", "Operating theatre", "Inpatient ward"],
    },
    team: {
      kicker: "Who we are",
      title: "The founders",
      lead: "MyVet started with them: they opened the clinic and set how pets are cared for here.",
      members: [
        { name: "Ulugbek Bakhodirovich Yuldashev", role: "Co-founder" },
        { name: "Nargiza Farkhodovna Akhadova", role: "Co-founder, director" },
      ],
    },
    prices: {
      kicker: "Price list",
      title: "Transparent pricing",
      lead: "Our most requested services. We'll send the full price list on request.",
      note: "The exact price depends on your pet's condition and is confirmed at the visit. Inpatient care and the pet hotel depend on the room, the pet and its condition — message us on Telegram.",
      currency: "UZS",
      showMore: "Show all prices",
      showLess: "Show less",
      items: [
        { name: "Initial visit & consultation", price: "from 120,000" },
        { name: "Vaccination (complex)", price: "from 185,000" },
        { name: "Ultrasound diagnostics", price: "from 150,000" },
        { name: "Spaying", price: "from 450,000" },
        { name: "Neutering", price: "from 250,000" },
        { name: "Vet home visit", price: "from 150,000" },
        { name: "Pet taxi", price: "from 150,000" },
        { name: "Inpatient care", price: "on request", onRequest: true },
        { name: "Pet hotel", price: "on request", onRequest: true },
        { name: "Health check-up", price: "on request", onRequest: true },
      ],
    },
    reviews: {
      kicker: "Reviews",
      title: "People trust us with what matters most",
      lead: "Real reviews from our clients.",
      ymapsCta: "All reviews on Yandex",
      googleCta: "All reviews on Google",
    },
    faq: {
      kicker: "FAQ",
      title: "The essentials, briefly",
      lead: "Didn't find your answer? Message us — we'll advise on your case.",
      showMore: "Show all questions",
      showLess: "Show less",
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
        {
          q: "How much do inpatient care and the pet hotel cost?",
          a: "It depends on the room, your pet's size and its condition. Message us on Telegram and we'll quote you the same day.",
        },
        {
          q: "Can I visit my pet in the inpatient ward?",
          a: "Yes, by arrangement with the treating vet. We also keep you updated on how your pet is doing.",
        },
        {
          q: "How do I book the pet taxi?",
          a: "Call us or message us on Telegram. We'll collect your pet from home and bring them back after the visit.",
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
        "Grooming",
        "Inpatient care",
        "Pet hotel",
        "Pet taxi",
        "Health check-up",
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
      license: "Licence",
      viewLicense: "View licence",
      taxId: "Tax ID",
      rights: "All rights reserved.",
      madeWith: "Made with care for pets",
    },
  },
};

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}
export type { Dict };
