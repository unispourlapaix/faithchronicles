// ============================================================================
// CONFIGURATION DES LANGUES - FAITH CHRONICLES
// ============================================================================
// Support complet: FR, EN, ES, DE, IT, PT, RU, UK, ZH, JP, KO, AR, HE, RC

export const LANGUAGES = {
  fr: {
    code: 'fr',
    name: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
    enabled: true
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: 'ltr',
    enabled: true
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    direction: 'ltr',
    enabled: true
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    direction: 'ltr',
    enabled: true
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    direction: 'ltr',
    enabled: true
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    direction: 'ltr',
    enabled: true
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    direction: 'ltr',
    enabled: true
  },
  uk: {
    code: 'uk',
    name: 'Ukrainian',
    nativeName: 'Українська',
    flag: '🇺🇦',
    direction: 'ltr',
    enabled: true
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    direction: 'ltr',
    enabled: true
  },
  jp: {
    code: 'jp',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    direction: 'ltr',
    enabled: true
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    direction: 'ltr',
    enabled: true
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl', // Right-to-Left
    enabled: true
  },
  he: {
    code: 'he',
    name: 'Hebrew',
    nativeName: 'עברית',
    flag: '🇮🇱',
    direction: 'rtl', // Right-to-Left
    enabled: true
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    direction: 'ltr',
    enabled: true
  },
  pl: {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    flag: '🇵🇱',
    direction: 'ltr',
    enabled: true
  },
  sw: {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    flag: '🇰🇪',
    direction: 'ltr',
    enabled: true
  },
  rc: {
    code: 'rc',
    name: 'Lingala',
    nativeName: 'Lingala',
    flag: '🇨🇩',
    direction: 'ltr',
    enabled: true
  }
};

export const DEFAULT_LANGUAGE = 'fr';

export const getLanguageList = () => {
  return Object.values(LANGUAGES).filter(lang => lang.enabled);
};

export const getLanguage = (code) => {
  return LANGUAGES[code] || LANGUAGES[DEFAULT_LANGUAGE];
};

export const isRTL = (code) => {
  const lang = getLanguage(code);
  return lang.direction === 'rtl';
};
