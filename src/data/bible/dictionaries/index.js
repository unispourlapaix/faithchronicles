/**
 * Module d'accès au dictionnaire grec biblique français
 * Facilite la recherche et l'utilisation des mots grecs du Nouveau Testament
 */

import greekDict from './greek-french-dictionary.json';
import searchIndex from './greek-dictionary-index.json';

/**
 * Rechercher un mot grec par différents critères
 * @param {string} query - Terme à rechercher
 * @param {string} type - Type de recherche: 'greek', 'strong', 'transliteration', 'meaning'
 * @returns {Object|null} Entrée du dictionnaire ou null
 */
export function searchGreek(query, type = 'auto') {
  if (!query) return null;
  
  const q = query.trim();
  
  // Auto-détection du type
  if (type === 'auto') {
    // Strong number (G1234)
    if (/^G\d+$/i.test(q)) {
      type = 'strong';
    }
    // Caractères grecs
    else if (/[\u0370-\u03FF]/.test(q)) {
      type = 'greek';
    }
    // Lettres latines (translittération)
    else {
      type = 'transliteration';
    }
  }
  
  switch (type) {
    case 'greek':
      return greekDict.entries[q] || null;
      
    case 'strong':
      const greekWord = searchIndex.byStrong[q.toUpperCase()];
      return greekWord ? greekDict.entries[greekWord] : null;
      
    case 'transliteration':
      const byTranslit = searchIndex.byTransliteration[q.toLowerCase()];
      return byTranslit ? greekDict.entries[byTranslit] : null;
      
    case 'meaning':
      const matches = searchIndex.byMeaning[q.toLowerCase()] || [];
      return matches.map(greek => ({
        greek,
        ...greekDict.entries[greek]
      }));
      
    default:
      return null;
  }
}

/**
 * Obtenir toutes les informations d'un mot grec
 * @param {string} greekWord - Le mot en caractères grecs
 * @returns {Object|null}
 */
export function getGreekInfo(greekWord) {
  return greekDict.entries[greekWord] || null;
}

/**
 * Rechercher par numéro Strong
 * @param {string} strongNumber - Ex: "G2316"
 * @returns {Object|null}
 */
export function getByStrong(strongNumber) {
  return searchGreek(strongNumber, 'strong');
}

/**
 * Rechercher par translittération
 * @param {string} translit - Ex: "theos"
 * @returns {Object|null}
 */
export function getByTransliteration(translit) {
  return searchGreek(translit, 'transliteration');
}

/**
 * Rechercher tous les mots contenant une signification
 * @param {string} meaning - Ex: "amour", "dieu", "vie"
 * @returns {Array}
 */
export function searchByMeaning(meaning) {
  return searchGreek(meaning, 'meaning') || [];
}

/**
 * Obtenir les statistiques du dictionnaire
 * @returns {Object}
 */
export function getStats() {
  const entries = Object.keys(greekDict.entries);
  const totalFrequency = entries.reduce((sum, greek) => {
    return sum + (greekDict.entries[greek].frequency || 0);
  }, 0);
  
  return {
    totalEntries: entries.length,
    totalOccurrences: totalFrequency,
    metadata: greekDict.metadata
  };
}

/**
 * Obtenir les mots les plus fréquents
 * @param {number} limit - Nombre de résultats
 * @returns {Array}
 */
export function getMostFrequent(limit = 10) {
  return Object.entries(greekDict.entries)
    .sort((a, b) => (b[1].frequency || 0) - (a[1].frequency || 0))
    .slice(0, limit)
    .map(([greek, data]) => ({
      greek,
      ...data
    }));
}

/**
 * Recherche fulltext dans les définitions
 * @param {string} searchTerm
 * @returns {Array}
 */
export function searchDefinitions(searchTerm) {
  const term = searchTerm.toLowerCase();
  const results = [];
  
  for (const [greek, entry] of Object.entries(greekDict.entries)) {
    const searchText = `${entry.meaning} ${entry.definition}`.toLowerCase();
    if (searchText.includes(term)) {
      results.push({
        greek,
        ...entry,
        relevance: (searchText.match(new RegExp(term, 'g')) || []).length
      });
    }
  }
  
  return results.sort((a, b) => b.relevance - a.relevance);
}

/**
 * Formater une entrée pour l'affichage
 * @param {string} greek - Mot grec
 * @returns {string}
 */
export function formatEntry(greek) {
  const entry = greekDict.entries[greek];
  if (!entry) return '';
  
  return `
📖 ${greek} (${entry.transliteration})
🔊 Prononciation: ${entry.pronunciation}
📝 Signification: ${entry.meaning}
📚 Définition: ${entry.definition}
🔢 Strong: ${entry.strong || 'N/A'}
📊 Fréquence: ${entry.frequency || 0} fois dans le NT
📖 Références: ${entry.references?.join(', ') || 'N/A'}
  `.trim();
}

// Export du dictionnaire complet pour usage direct
export { greekDict, searchIndex };

// Export par défaut
export default {
  searchGreek,
  getGreekInfo,
  getByStrong,
  getByTransliteration,
  searchByMeaning,
  searchDefinitions,
  getStats,
  getMostFrequent,
  formatEntry,
  dictionary: greekDict,
  index: searchIndex
};
