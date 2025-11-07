// ============================================================================
// TRANSLATION HOOK - useTranslation
// ============================================================================
// Hook pour gérer les traductions dans Faith Chronicles
// Support: FR, EN, ES, DE, IT, PT, RU, UK, ZH, JP, KO, AR, HE, HI, PL, SW, RC

import { useState, useEffect, createContext, useContext } from 'react';
import { LANGUAGES, DEFAULT_LANGUAGE, isRTL } from '../data/translations/languages.js';

// Import des traductions UI pour chaque langue
import frUI from '../data/translations/fr/ui.js';
import enUI from '../data/translations/en/ui.js';
import esUI from '../data/translations/es/ui.js';
import deUI from '../data/translations/de/ui.js';
import itUI from '../data/translations/it/ui.js';
import ptUI from '../data/translations/pt/ui.js';
import ruUI from '../data/translations/ru/ui.js';
import ukUI from '../data/translations/uk/ui.js';
import zhUI from '../data/translations/zh/ui.js';
import jpUI from '../data/translations/jp/ui.js';
import koUI from '../data/translations/ko/ui.js';
import arUI from '../data/translations/ar/ui.js';
import heUI from '../data/translations/he/ui.js';
import hiUI from '../data/translations/hi/ui.js';
import plUI from '../data/translations/pl/ui.js';
import swUI from '../data/translations/sw/ui.js';
import rcUI from '../data/translations/rc/ui.js';

// Import des traductions des chapitres pour FR et EN
import { chapter1Translations as frChapter1 } from '../data/translations/fr/interface_chapter1.js';
import { chapter2Translations as frChapter2 } from '../data/translations/fr/interface_chapter2.js';
import { chapter3Translations as frChapter3 } from '../data/translations/fr/interface_chapter3.js';
import { chapter4Translations as frChapter4 } from '../data/translations/fr/interface_chapter4.js';
import { chapter5Translations as frChapter5 } from '../data/translations/fr/interface_chapter5.js';
import { chapter6Translations as frChapter6 } from '../data/translations/fr/interface_chapter6.js';
import { chapter7Translations as frChapter7 } from '../data/translations/fr/interface_chapter7.js';
import { chapter8Translations as frChapter8 } from '../data/translations/fr/interface_chapter8.js';

import { chapter1Translations as enChapter1 } from '../data/translations/en/interface_chapter1.js';
import { chapter2Translations as enChapter2 } from '../data/translations/en/interface_chapter2.js';
import { chapter3Translations as enChapter3 } from '../data/translations/en/interface_chapter3.js';
import { chapter4Translations as enChapter4 } from '../data/translations/en/interface_chapter4.js';
import { chapter5Translations as enChapter5 } from '../data/translations/en/interface_chapter5.js';
import { chapter6Translations as enChapter6 } from '../data/translations/en/interface_chapter6.js';
import { chapter7Translations as enChapter7 } from '../data/translations/en/interface_chapter7.js';
import { chapter8Translations as enChapter8 } from '../data/translations/en/interface_chapter8.js';

import { chapter1Translations as jpChapter1 } from '../data/translations/jp/interface_chapter1.js';
import { chapter2Translations as jpChapter2 } from '../data/translations/jp/interface_chapter2.js';
import { chapter3Translations as jpChapter3 } from '../data/translations/jp/interface_chapter3.js';
import { chapter4Translations as jpChapter4 } from '../data/translations/jp/interface_chapter4.js';
import { chapter5Translations as jpChapter5 } from '../data/translations/jp/interface_chapter5.js';
import { chapter6Translations as jpChapter6 } from '../data/translations/jp/interface_chapter6.js';
import { chapter7Translations as jpChapter7 } from '../data/translations/jp/interface_chapter7.js';
import { chapter8Translations as jpChapter8 } from '../data/translations/jp/interface_chapter8.js';

// Mapping des traductions UI
const UI_TRANSLATIONS = {
  fr: frUI,
  en: enUI,
  es: esUI,
  de: deUI,
  it: itUI,
  pt: ptUI,
  ru: ruUI,
  uk: ukUI,
  zh: zhUI,
  jp: jpUI,
  ko: koUI,
  ar: arUI,
  he: heUI,
  hi: hiUI,
  pl: plUI,
  sw: swUI,
  rc: rcUI
};

// Mapping des traductions des chapitres
const CHAPTER_TRANSLATIONS = {
  fr: {
    1: frChapter1,
    2: frChapter2,
    3: frChapter3,
    4: frChapter4,
    5: frChapter5,
    6: frChapter6,
    7: frChapter7,
    8: frChapter8
  },
  en: {
    1: enChapter1,
    2: enChapter2,
    3: enChapter3,
    4: enChapter4,
    5: enChapter5,
    6: enChapter6,
    7: enChapter7,
    8: enChapter8
  },
  // Pour les autres langues, utiliser FR comme fallback
  es: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  },
  de: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  },
  it: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  },
  pt: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  },
  ru: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  },
  uk: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  },
  zh: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  },
  jp: {
    1: jpChapter1, 2: jpChapter2, 3: jpChapter3, 4: jpChapter4,
    5: jpChapter5, 6: jpChapter6, 7: jpChapter7, 8: jpChapter8
  },
  ko: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  },
  ar: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  },
  he: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  },
  hi: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  },
  pl: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  },
  sw: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  },
  rc: {
    1: frChapter1, 2: frChapter2, 3: frChapter3, 4: frChapter4,
    5: frChapter5, 6: frChapter6, 7: frChapter7, 8: frChapter8
  }
};

// Context pour les traductions
const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  // Récupérer la langue depuis localStorage ou utiliser la langue par défaut
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('faithchronicles_language');
    return saved || DEFAULT_LANGUAGE;
  });

  // Effet pour appliquer la direction RTL/LTR et la locale
  useEffect(() => {
    const direction = isRTL(currentLanguage) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', currentLanguage);
    
    // Mise à jour du titre de la page selon la langue
    const titles = {
      fr: "Unity Quest Chronicles of Love - Chroniques de l'Amour",
      en: 'Unity Quest Chronicles of Love',
      es: 'Unity Quest Chronicles of Love - Crónicas del Amor',
      de: 'Unity Quest Chronicles of Love - Chroniken der Liebe',
      it: "Unity Quest Chronicles of Love - Cronache dell'Amore",
      pt: 'Unity Quest Chronicles of Love - Crônicas do Amor',
      ru: 'Unity Quest Chronicles of Love - Хроники Любви',
      uk: 'Unity Quest Chronicles of Love - Хроніки Любові',
      zh: 'Unity Quest Chronicles of Love - 爱的编年史',
      jp: 'Unity Quest Chronicles of Love - 愛のクロニクル',
      ko: 'Unity Quest Chronicles of Love - 사랑의 연대기',
      ar: 'Unity Quest Chronicles of Love - سجلات الحب',
      he: 'Unity Quest Chronicles of Love - דברי הימים של האהבה',
      hi: 'Unity Quest Chronicles of Love - प्रेम का इतिहास',
      pl: 'Unity Quest Chronicles of Love - Kroniki Miłości',
      sw: 'Unity Quest Chronicles of Love - Hadithi ya Upendo',
      rc: 'Unity Quest Chronicles of Love - Makambu ya Bolingo'
    };
    document.title = titles[currentLanguage] || titles.fr;
  }, [currentLanguage]);

  // Fonction pour changer la langue
  const changeLanguage = (newLanguage) => {
    if (LANGUAGES[newLanguage]) {
      setCurrentLanguage(newLanguage);
      localStorage.setItem('faithchronicles_language', newLanguage);
    }
  };

  // Fonction pour obtenir une traduction par clé (ex: "app.title")
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = UI_TRANSLATIONS[currentLanguage];
    
    // Naviguer dans l'objet de traduction
    for (const k of keys) {
      value = value?.[k];
      if (!value) {
        console.warn(`Translation key not found: ${key} for language ${currentLanguage}`);
        // Fallback vers français si la traduction n'existe pas
        value = UI_TRANSLATIONS[DEFAULT_LANGUAGE];
        for (const k2 of keys) {
          value = value?.[k2];
          if (!value) return key; // Retourner la clé si même le fallback échoue
        }
        break;
      }
    }
    
    // Remplacer les paramètres dans la chaîne (ex: {lives} -> 3)
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      return value.replace(/{(\w+)}/g, (match, paramKey) => params[paramKey] !== undefined ? params[paramKey] : match);
    }
    
    return value;
  };

  // Fonction pour obtenir toutes les traductions d'une section
  const getSection = (section) => {
    return UI_TRANSLATIONS[currentLanguage]?.[section] || {};
  };

  // Fonction pour obtenir les traductions d'un chapitre
  const getChapter = (chapterNumber) => {
    return CHAPTER_TRANSLATIONS[currentLanguage]?.[chapterNumber] || CHAPTER_TRANSLATIONS[DEFAULT_LANGUAGE]?.[chapterNumber] || {};
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    getSection,
    getChapter,
    languages: LANGUAGES,
    isRTL: isRTL(currentLanguage)
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook personnalisé pour utiliser les traductions
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  return context;
};

// Export du provider et du hook
export default useTranslation;
