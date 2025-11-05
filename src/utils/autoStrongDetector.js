/**
 * AUTO STRONG DETECTOR
 * Détecte automatiquement les mots Strong dans un verset en se basant sur le dictionnaire
 * Support multi-langues via strongTranslations
 */

import greekFrenchDictionary from '../data/bible/dictionaries/greek-french-dictionary.json';
import { getStrongDictionary } from '../data/bible/strong/index.js';

/**
 * Crée une table de correspondance mot traduit → Strong pour une langue donnée
 */
const buildLanguageToStrongMap = (language = 'fr') => {
  const map = new Map();
  
  // Récupérer les traductions Strong pour cette langue
  const strongDict = getStrongDictionary(language);
  
  // Construire la map depuis les traductions Strong
  Object.entries(strongDict).forEach(([strongId, data]) => {
    if (!data || !data.meaning) return;
    
    const words = new Set();
    
    // Extraire les mots clés de "meaning" (signification courte)
    const meaningWords = data.meaning
      .toLowerCase()
      .replace(/[(),.;:!?]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3);
    meaningWords.forEach(w => words.add(w));
    
    // Extraire aussi de "definition" si disponible
    if (data.definition) {
      const defWords = data.definition
        .toLowerCase()
        .replace(/[(),.;:!?]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 3)
        .slice(0, 5); // Limiter aux 5 premiers mots de la définition
      defWords.forEach(w => words.add(w));
    }
    
    // Ajouter le mot grec lui-même si disponible
    if (data.word) {
      words.add(data.word.toLowerCase());
    }
    
    // Ajouter à la map
    words.forEach(word => {
      if (!map.has(word)) {
        map.set(word, []);
      }
      map.get(word).push({
        strong: strongId,
        word: data.word || strongId,
        score: calculateRelevanceFromStrong(word, data)
      });
    });
  });
  
  // Trier par score de pertinence
  map.forEach((matches, word) => {
    map.set(word, matches.sort((a, b) => b.score - a.score));
  });
  
  return map;
};

/**
 * Calculer la pertinence depuis les données Strong
 */
const calculateRelevanceFromStrong = (word, data) => {
  let score = 1;
  
  // Bonus si le mot est dans meaning (plus précis)
  if (data.meaning?.toLowerCase().includes(word)) {
    score += 5;
  }
  
  // Bonus pour les mots théologiques importants
  const theologicalWords = {
    fr: ['dieu', 'seigneur', 'christ', 'parole', 'amour', 'esprit', 'foi'],
    en: ['god', 'lord', 'christ', 'word', 'love', 'spirit', 'faith'],
    es: ['dios', 'señor', 'cristo', 'palabra', 'amor', 'espíritu', 'fe'],
    pt: ['deus', 'senhor', 'cristo', 'palavra', 'amor', 'espírito', 'fé'],
    de: ['gott', 'herr', 'christus', 'wort', 'liebe', 'geist', 'glaube'],
    it: ['dio', 'signore', 'cristo', 'parola', 'amore', 'spirito', 'fede']
  };
  
  // Détecter la langue et vérifier si mot important
  Object.values(theologicalWords).forEach(langWords => {
    if (langWords.some(w => word.includes(w))) {
      score += 4;
    }
  });
  
  return score;
};

/**
 * Normaliser un mot pour la comparaison (fonctionne pour toutes les langues)
 */
const normalizeWord = (word) => {
  return word
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Retirer accents
    .replace(/['']/g, '') // Retirer apostrophes
    .replace(/[^a-zα-ωа-я]/gi, ''); // Garder lettres (latin, grec, cyrillique)
};

/**
 * Détecter automatiquement les Strong dans un verset
 * @param {string} verseText - Texte du verset
 * @param {string} language - Code langue (fr, en, es, etc.)
 */
export const detectStrongInVerse = (verseText, language = 'fr') => {
  const languageToStrong = buildLanguageToStrongMap(language);
  const detectedWords = [];
  const usedPositions = new Set(); // Pour éviter les doublons
  
  // Mots à détecter (longueur minimale 4 pour éviter faux positifs)
  const words = verseText
    .split(/\s+/)
    .map((word, index) => {
      const position = verseText.indexOf(word, index > 0 ? usedPositions.size : 0);
      return {
        original: word,
        cleaned: word.replace(/[,.;:!?()«»""]/g, ''),
        position,
        index
      };
    })
    .filter(w => w.cleaned.length >= 4);
  
  words.forEach(wordInfo => {
    const normalized = normalizeWord(wordInfo.cleaned);
    
    // Vérifier que cette position n'a pas déjà été utilisée
    const positionKey = `${wordInfo.position}-${wordInfo.position + wordInfo.cleaned.length}`;
    if (usedPositions.has(positionKey)) {
      return; // Skip les doublons
    }
    
    // Chercher dans la map
    if (languageToStrong.has(normalized)) {
      const matches = languageToStrong.get(normalized);
      const bestMatch = matches[0]; // Premier = meilleur score
      
      usedPositions.add(positionKey);
      
      detectedWords.push({
        text: wordInfo.cleaned,
        strong: bestMatch.strong,
        greek: bestMatch.word,
        start: wordInfo.position,
        end: wordInfo.position + wordInfo.cleaned.length,
        confidence: bestMatch.score
      });
    }
  });
  
  return detectedWords;
};

/**
 * Convertir un verset avec Strong détectés automatiquement
 * @param {object} verse - Verset à convertir
 * @param {string} language - Code langue
 */
export const autoConvertVerseToStrong = (verse, language = 'fr') => {
  if (!verse || !verse.text) return verse;
  
  const detectedWords = detectStrongInVerse(verse.text, language);
  
  return {
    ...verse,
    words: detectedWords,
    autoDetected: true
  };
};

/**
 * Convertir tout un chapitre
 * @param {object} chapter - Chapitre à convertir
 * @param {string} language - Code langue
 */
export const autoConvertChapter = (chapter, language = 'fr') => {
  if (!chapter || !chapter.verses) return chapter;
  
  return {
    ...chapter,
    verses: chapter.verses.map(v => autoConvertVerseToStrong(v, language))
  };
};

export default {
  detectStrongInVerse,
  autoConvertVerseToStrong,
  autoConvertChapter
};
