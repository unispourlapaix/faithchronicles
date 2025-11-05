// ============================================================================
// SYSTÈME STRONG MULTILINGUE
// Combine les données de base (neutres) avec les traductions
// ============================================================================

import { strongWordsBase } from './base/strongWords.js';
import { strongTranslationsFR } from './fr/strongTranslations.js';
import { strongTranslationsEN } from './en/strongTranslations.js';
import { strongTranslationsES } from './es/strongTranslations.js';
import { strongTranslationsPT } from './pt/strongTranslations.js';
import { strongTranslationsAR } from './ar/strongTranslations.js';
import { strongTranslationsRU } from './ru/strongTranslations.js';
import { strongTranslationsHI } from './hi/strongTranslations.js';
import { strongTranslationsZH } from './zh/strongTranslations.js';
import { strongTranslationsDE } from './de/strongTranslations.js';
import { strongTranslationsJA } from './ja/strongTranslations.js';
import { strongTranslationsIT } from './it/strongTranslations.js';
import { strongTranslationsKO } from './ko/strongTranslations.js';
import { strongTranslationsUK } from './uk/strongTranslations.js';
import { strongTranslationsHE } from './he/strongTranslations.js';

/**
 * Fusionne les données de base avec les traductions
 * @param {string} lang - Code langue (fr, en, es, pt, ar, ru, hi, zh, de, ja, it, jp, ko, uk, he)
 * @returns {Object} - Dictionnaire Strong complet
 */
export const getStrongDictionary = (lang = 'fr') => {
  const translations = {
    fr: strongTranslationsFR,
    en: strongTranslationsEN,
    es: strongTranslationsES,
    pt: strongTranslationsPT,
    ar: strongTranslationsAR,
    ru: strongTranslationsRU,
    hi: strongTranslationsHI,
    zh: strongTranslationsZH,
    de: strongTranslationsDE,
    ja: strongTranslationsJA,
    it: strongTranslationsIT,
    ko: strongTranslationsKO,
    uk: strongTranslationsUK,
    he: strongTranslationsHE,
    jp: strongTranslationsJA,  // Mapping pour le jeu (jp → ja)
  };

  const currentTranslations = translations[lang] || strongTranslationsFR;
  const combined = {};

  // Combine base + traductions
  Object.keys(strongWordsBase).forEach(strongId => {
    const base = strongWordsBase[strongId];
    const trans = currentTranslations[strongId] || {};
    
    combined[strongId] = {
      word: base.word,
      transliteration: base.transliteration,
      pronunciation: base.pronunciation,
      meaning: trans.m || '',
      definition: trans.d || '',
      usage: trans.u || '',
      etymology: trans.e || ''
    };
  });

  return combined;
};

// Export par défaut: version française complète
export const strongGreek = getStrongDictionary('fr');

export default strongGreek;
