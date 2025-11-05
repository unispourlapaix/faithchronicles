// ============================================================================
// STRONG DICTIONARY FIELD LABELS - MULTILINGUAL
// Labels pour les champs du dictionnaire Strong dans 14 langues
// ============================================================================
// Fields: m=Meaning, d=Definition, u=Usage, e=Etymology
// ============================================================================

export const strongLabels = {
  // 🇫🇷 FRANÇAIS
  fr: {
    m: "Sens",
    d: "Définition",
    u: "Utilisation",
    e: "Étymologie"
  },

  // 🇬🇧 ENGLISH
  en: {
    m: "Meaning",
    d: "Definition",
    u: "Usage",
    e: "Etymology"
  },

  // 🇪🇸 ESPAÑOL
  es: {
    m: "Significado",
    d: "Definición",
    u: "Uso",
    e: "Etimología"
  },

  // 🇩🇪 DEUTSCH
  de: {
    m: "Bedeutung",
    d: "Definition",
    u: "Verwendung",
    e: "Etymologie"
  },

  // 🇮🇹 ITALIANO
  it: {
    m: "Significato",
    d: "Definizione",
    u: "Uso",
    e: "Etimologia"
  },

  // 🇵🇹 PORTUGUÊS
  pt: {
    m: "Significado",
    d: "Definição",
    u: "Uso",
    e: "Etimologia"
  },

  // 🇷🇺 РУССКИЙ (Cyrillique)
  ru: {
    m: "Значение",
    d: "Определение",
    u: "Использование",
    e: "Этимология"
  },

  // 🇺🇦 УКРАЇНСЬКА (Cyrillique)
  uk: {
    m: "Значення",
    d: "Визначення",
    u: "Використання",
    e: "Етимологія"
  },

  // 🇨🇳 简体中文 (Hanzi simplifié)
  zh: {
    m: "意义",
    d: "定义",
    u: "用法",
    e: "词源"
  },

  // 🇯🇵 日本語 (Kanji/Kana)
  ja: {
    m: "意味",
    d: "定義",
    u: "使用",
    e: "語源"
  },

  // 🇰🇷 한국어 (Hangul)
  ko: {
    m: "의미",
    d: "정의",
    u: "사용",
    e: "어원"
  },

  // 🇸🇦 العربية (Arabe - RTL)
  ar: {
    m: "المعنى",
    d: "التعريف",
    u: "الاستخدام",
    e: "أصل الكلمة"
  },

  // 🇮🇱 עברית (Hébreu - RTL)
  he: {
    m: "משמעות",
    d: "הגדרה",
    u: "שימוש",
    e: "אטימולוגיה"
  },

  // 🇮🇳 हिन्दी (Hindi - Devanagari)
  hi: {
    m: "अर्थ",
    d: "परिभाषा",
    u: "उपयोग",
    e: "व्युत्पत्ति"
  }
};

// Helper function to get labels for a specific language
export const getStrongLabels = (languageCode) => {
  return strongLabels[languageCode] || strongLabels.en; // Fallback to English
};

// RTL languages (Right-to-Left)
export const RTL_LANGUAGES = ['ar', 'he'];

// Check if a language is RTL
export const isRTL = (languageCode) => {
  return RTL_LANGUAGES.includes(languageCode);
};

// All supported languages
export const SUPPORTED_LANGUAGES = [
  'fr', 'en', 'es', 'de', 'it', 'pt',
  'ru', 'uk', 'zh', 'ja', 'ko', 'ar', 'he', 'hi'
];
