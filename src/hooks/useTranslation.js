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

import { chapter1Translations as koChapter1 } from '../data/translations/ko/interface_chapter1.js';
import { chapter2Translations as koChapter2 } from '../data/translations/ko/interface_chapter2.js';
import { chapter3Translations as koChapter3 } from '../data/translations/ko/interface_chapter3.js';
import { chapter4Translations as koChapter4 } from '../data/translations/ko/interface_chapter4.js';
import { chapter5Translations as koChapter5 } from '../data/translations/ko/interface_chapter5.js';
import { chapter6Translations as koChapter6 } from '../data/translations/ko/interface_chapter6.js';
import { chapter7Translations as koChapter7 } from '../data/translations/ko/interface_chapter7.js';
import { chapter8Translations as koChapter8 } from '../data/translations/ko/interface_chapter8.js';

import { chapter1Translations as esChapter1 } from '../data/translations/es/interface_chapter1.js';
import { chapter2Translations as esChapter2 } from '../data/translations/es/interface_chapter2.js';
import { chapter3Translations as esChapter3 } from '../data/translations/es/interface_chapter3.js';
import { chapter4Translations as esChapter4 } from '../data/translations/es/interface_chapter4.js';
import { chapter5Translations as esChapter5 } from '../data/translations/es/interface_chapter5.js';
import { chapter6Translations as esChapter6 } from '../data/translations/es/interface_chapter6.js';
import { chapter7Translations as esChapter7 } from '../data/translations/es/interface_chapter7.js';
import { chapter8Translations as esChapter8 } from '../data/translations/es/interface_chapter8.js';

import { chapter1Translations as deChapter1 } from '../data/translations/de/interface_chapter1.js';
import { chapter2Translations as deChapter2 } from '../data/translations/de/interface_chapter2.js';
import { chapter3Translations as deChapter3 } from '../data/translations/de/interface_chapter3.js';
import { chapter4Translations as deChapter4 } from '../data/translations/de/interface_chapter4.js';
import { chapter5Translations as deChapter5 } from '../data/translations/de/interface_chapter5.js';
import { chapter6Translations as deChapter6 } from '../data/translations/de/interface_chapter6.js';
import { chapter7Translations as deChapter7 } from '../data/translations/de/interface_chapter7.js';
import { chapter8Translations as deChapter8 } from '../data/translations/de/interface_chapter8.js';

import { chapter1Translations as itChapter1 } from '../data/translations/it/interface_chapter1.js';
import { chapter2Translations as itChapter2 } from '../data/translations/it/interface_chapter2.js';
import { chapter3Translations as itChapter3 } from '../data/translations/it/interface_chapter3.js';
import { chapter4Translations as itChapter4 } from '../data/translations/it/interface_chapter4.js';
import { chapter5Translations as itChapter5 } from '../data/translations/it/interface_chapter5.js';
import { chapter6Translations as itChapter6 } from '../data/translations/it/interface_chapter6.js';
import { chapter7Translations as itChapter7 } from '../data/translations/it/interface_chapter7.js';
import { chapter8Translations as itChapter8 } from '../data/translations/it/interface_chapter8.js';

import { chapter1Translations as ptChapter1 } from '../data/translations/pt/interface_chapter1.js';
import { chapter2Translations as ptChapter2 } from '../data/translations/pt/interface_chapter2.js';
import { chapter3Translations as ptChapter3 } from '../data/translations/pt/interface_chapter3.js';
import { chapter4Translations as ptChapter4 } from '../data/translations/pt/interface_chapter4.js';
import { chapter5Translations as ptChapter5 } from '../data/translations/pt/interface_chapter5.js';
import { chapter6Translations as ptChapter6 } from '../data/translations/pt/interface_chapter6.js';
import { chapter7Translations as ptChapter7 } from '../data/translations/pt/interface_chapter7.js';
import { chapter8Translations as ptChapter8 } from '../data/translations/pt/interface_chapter8.js';

import { chapter1Translations as ruChapter1 } from '../data/translations/ru/interface_chapter1.js';
import { chapter2Translations as ruChapter2 } from '../data/translations/ru/interface_chapter2.js';
import { chapter3Translations as ruChapter3 } from '../data/translations/ru/interface_chapter3.js';
import { chapter4Translations as ruChapter4 } from '../data/translations/ru/interface_chapter4.js';
import { chapter5Translations as ruChapter5 } from '../data/translations/ru/interface_chapter5.js';
import { chapter6Translations as ruChapter6 } from '../data/translations/ru/interface_chapter6.js';
import { chapter7Translations as ruChapter7 } from '../data/translations/ru/interface_chapter7.js';
import { chapter8Translations as ruChapter8 } from '../data/translations/ru/interface_chapter8.js';

import { chapter1Translations as zhChapter1 } from '../data/translations/zh/interface_chapter1.js';
import { chapter2Translations as zhChapter2 } from '../data/translations/zh/interface_chapter2.js';
import { chapter3Translations as zhChapter3 } from '../data/translations/zh/interface_chapter3.js';
import { chapter4Translations as zhChapter4 } from '../data/translations/zh/interface_chapter4.js';
import { chapter5Translations as zhChapter5 } from '../data/translations/zh/interface_chapter5.js';
import { chapter6Translations as zhChapter6 } from '../data/translations/zh/interface_chapter6.js';
import { chapter7Translations as zhChapter7 } from '../data/translations/zh/interface_chapter7.js';
import { chapter8Translations as zhChapter8 } from '../data/translations/zh/interface_chapter8.js';

import { chapter1Translations as arChapter1 } from '../data/translations/ar/interface_chapter1.js';
import { chapter2Translations as arChapter2 } from '../data/translations/ar/interface_chapter2.js';
import { chapter3Translations as arChapter3 } from '../data/translations/ar/interface_chapter3.js';
import { chapter4Translations as arChapter4 } from '../data/translations/ar/interface_chapter4.js';
import { chapter5Translations as arChapter5 } from '../data/translations/ar/interface_chapter5.js';
import { chapter6Translations as arChapter6 } from '../data/translations/ar/interface_chapter6.js';
import { chapter7Translations as arChapter7 } from '../data/translations/ar/interface_chapter7.js';
import { chapter8Translations as arChapter8 } from '../data/translations/ar/interface_chapter8.js';

import { chapter1Translations as heChapter1 } from '../data/translations/he/interface_chapter1.js';
import { chapter2Translations as heChapter2 } from '../data/translations/he/interface_chapter2.js';
import { chapter3Translations as heChapter3 } from '../data/translations/he/interface_chapter3.js';
import { chapter4Translations as heChapter4 } from '../data/translations/he/interface_chapter4.js';
import { chapter5Translations as heChapter5 } from '../data/translations/he/interface_chapter5.js';
import { chapter6Translations as heChapter6 } from '../data/translations/he/interface_chapter6.js';
import { chapter7Translations as heChapter7 } from '../data/translations/he/interface_chapter7.js';
import { chapter8Translations as heChapter8 } from '../data/translations/he/interface_chapter8.js';

import { chapter1Translations as hiChapter1 } from '../data/translations/hi/interface_chapter1.js';
import { chapter2Translations as hiChapter2 } from '../data/translations/hi/interface_chapter2.js';
import { chapter3Translations as hiChapter3 } from '../data/translations/hi/interface_chapter3.js';
import { chapter4Translations as hiChapter4 } from '../data/translations/hi/interface_chapter4.js';
import { chapter5Translations as hiChapter5 } from '../data/translations/hi/interface_chapter5.js';
import { chapter6Translations as hiChapter6 } from '../data/translations/hi/interface_chapter6.js';
import { chapter7Translations as hiChapter7 } from '../data/translations/hi/interface_chapter7.js';
import { chapter8Translations as hiChapter8 } from '../data/translations/hi/interface_chapter8.js';

import { chapter1Translations as plChapter1 } from '../data/translations/pl/interface_chapter1.js';
import { chapter2Translations as plChapter2 } from '../data/translations/pl/interface_chapter2.js';
import { chapter3Translations as plChapter3 } from '../data/translations/pl/interface_chapter3.js';
import { chapter4Translations as plChapter4 } from '../data/translations/pl/interface_chapter4.js';
import { chapter5Translations as plChapter5 } from '../data/translations/pl/interface_chapter5.js';
import { chapter6Translations as plChapter6 } from '../data/translations/pl/interface_chapter6.js';
import { chapter7Translations as plChapter7 } from '../data/translations/pl/interface_chapter7.js';
import { chapter8Translations as plChapter8 } from '../data/translations/pl/interface_chapter8.js';

import { chapter1Translations as swChapter1 } from '../data/translations/sw/interface_chapter1.js';
import { chapter2Translations as swChapter2 } from '../data/translations/sw/interface_chapter2.js';
import { chapter3Translations as swChapter3 } from '../data/translations/sw/interface_chapter3.js';
import { chapter4Translations as swChapter4 } from '../data/translations/sw/interface_chapter4.js';
import { chapter5Translations as swChapter5 } from '../data/translations/sw/interface_chapter5.js';
import { chapter6Translations as swChapter6 } from '../data/translations/sw/interface_chapter6.js';
import { chapter7Translations as swChapter7 } from '../data/translations/sw/interface_chapter7.js';
import { chapter8Translations as swChapter8 } from '../data/translations/sw/interface_chapter8.js';

import { chapter1Translations as rcChapter1 } from '../data/translations/rc/interface_chapter1.js';
import { chapter2Translations as rcChapter2 } from '../data/translations/rc/interface_chapter2.js';
import { chapter3Translations as rcChapter3 } from '../data/translations/rc/interface_chapter3.js';
import { chapter4Translations as rcChapter4 } from '../data/translations/rc/interface_chapter4.js';
import { chapter5Translations as rcChapter5 } from '../data/translations/rc/interface_chapter5.js';
import { chapter6Translations as rcChapter6 } from '../data/translations/rc/interface_chapter6.js';
import { chapter7Translations as rcChapter7 } from '../data/translations/rc/interface_chapter7.js';
import { chapter8Translations as rcChapter8 } from '../data/translations/rc/interface_chapter8.js';

import { chapter1Translations as ukChapter1 } from '../data/translations/uk/interface_chapter1.js';
import { chapter2Translations as ukChapter2 } from '../data/translations/uk/interface_chapter2.js';
import { chapter3Translations as ukChapter3 } from '../data/translations/uk/interface_chapter3.js';
import { chapter4Translations as ukChapter4 } from '../data/translations/uk/interface_chapter4.js';
import { chapter5Translations as ukChapter5 } from '../data/translations/uk/interface_chapter5.js';
import { chapter6Translations as ukChapter6 } from '../data/translations/uk/interface_chapter6.js';
import { chapter7Translations as ukChapter7 } from '../data/translations/uk/interface_chapter7.js';
import { chapter8Translations as ukChapter8 } from '../data/translations/uk/interface_chapter8.js';

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
    1: esChapter1, 2: esChapter2, 3: esChapter3, 4: esChapter4,
    5: esChapter5, 6: esChapter6, 7: esChapter7, 8: esChapter8
  },
  de: {
    1: deChapter1, 2: deChapter2, 3: deChapter3, 4: deChapter4,
    5: deChapter5, 6: deChapter6, 7: deChapter7, 8: deChapter8
  },
  it: {
    1: itChapter1, 2: itChapter2, 3: itChapter3, 4: itChapter4,
    5: itChapter5, 6: itChapter6, 7: itChapter7, 8: itChapter8
  },
  pt: {
    1: ptChapter1, 2: ptChapter2, 3: ptChapter3, 4: ptChapter4,
    5: ptChapter5, 6: ptChapter6, 7: ptChapter7, 8: ptChapter8
  },
  ru: {
    1: ruChapter1, 2: ruChapter2, 3: ruChapter3, 4: ruChapter4,
    5: ruChapter5, 6: ruChapter6, 7: ruChapter7, 8: ruChapter8
  },
  uk: {
    1: ukChapter1, 2: ukChapter2, 3: ukChapter3, 4: ukChapter4,
    5: ukChapter5, 6: ukChapter6, 7: ukChapter7, 8: ukChapter8
  },
  zh: {
    1: zhChapter1, 2: zhChapter2, 3: zhChapter3, 4: zhChapter4,
    5: zhChapter5, 6: zhChapter6, 7: zhChapter7, 8: zhChapter8
  },
  jp: {
    1: jpChapter1, 2: jpChapter2, 3: jpChapter3, 4: jpChapter4,
    5: jpChapter5, 6: jpChapter6, 7: jpChapter7, 8: jpChapter8
  },
  ko: {
    1: koChapter1, 2: koChapter2, 3: koChapter3, 4: koChapter4,
    5: koChapter5, 6: koChapter6, 7: koChapter7, 8: koChapter8
  },
  ar: {
    1: arChapter1, 2: arChapter2, 3: arChapter3, 4: arChapter4,
    5: arChapter5, 6: arChapter6, 7: arChapter7, 8: arChapter8
  },
  he: {
    1: heChapter1, 2: heChapter2, 3: heChapter3, 4: heChapter4,
    5: heChapter5, 6: heChapter6, 7: heChapter7, 8: heChapter8
  },
  hi: {
    1: hiChapter1, 2: hiChapter2, 3: hiChapter3, 4: hiChapter4,
    5: hiChapter5, 6: hiChapter6, 7: hiChapter7, 8: hiChapter8
  },
  pl: {
    1: plChapter1, 2: plChapter2, 3: plChapter3, 4: plChapter4,
    5: plChapter5, 6: plChapter6, 7: plChapter7, 8: plChapter8
  },
  sw: {
    1: swChapter1, 2: swChapter2, 3: swChapter3, 4: swChapter4,
    5: swChapter5, 6: swChapter6, 7: swChapter7, 8: swChapter8
  },
  rc: {
    1: rcChapter1, 2: rcChapter2, 3: rcChapter3, 4: rcChapter4,
    5: rcChapter5, 6: rcChapter6, 7: rcChapter7, 8: rcChapter8
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
        // console.warn(`Translation key not found: ${key} for language ${currentLanguage}`);
        // Fallback vers français si la traduction n'existe pas
        value = UI_TRANSLATIONS[DEFAULT_LANGUAGE];
        for (const k2 of keys) {
          value = value?.[k2];
          if (!value) return key; // Retourner la clé si même le fallback échoue
        }
        break;
      }
    }
    
    // Remplacer les paramètres dans la chaîne (ex: {lives} -> 3 ou {{lives}} -> 3)
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      // Gérer d'abord les doubles accolades {{param}}, puis les simples {param}
      return value
        .replace(/\{\{(\w+)\}\}/g, (match, paramKey) => params[paramKey] !== undefined ? params[paramKey] : match)
        .replace(/\{(\w+)\}/g, (match, paramKey) => params[paramKey] !== undefined ? params[paramKey] : match);
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
