// ============================================================================
// ÉVANGILE DE JEAN - INDEX DES CHAPITRES
// ============================================================================
// Chargement dynamique des chapitres pour optimiser les performances

// Cache des chapitres chargés
const chapterCache = {};

// Liste des chapitres disponibles
export const availableChapters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

// Mapper les codes de langue UI vers les codes de fichiers Bible
const languageMap = {
  'jp': 'ja',  // UI utilise jp, fichiers utilisent ja
};

const getBibleLanguageCode = (uiLang) => {
  return languageMap[uiLang] || uiLang;
};

// Fonction pour charger un chapitre dynamiquement
export const loadJohnChapter = async (chapterNumber, languageCode = 'fr') => {
  // Mapper le code de langue
  const mappedLanguage = getBibleLanguageCode(languageCode);
  
  // Vérifier si le chapitre est disponible
  if (!availableChapters.includes(chapterNumber)) {
    console.warn(`Chapter ${chapterNumber} not available, falling back`);
    return null;
  }

  // Clé du cache (utiliser le code UI original pour le cache)
  const cacheKey = `${chapterNumber}-${languageCode}`;
  
  // Vérifier le cache
  if (chapterCache[cacheKey]) {
    return chapterCache[cacheKey];
  }

  try {
    // Formater le numéro de chapitre avec zéro devant si < 10
    const chapterStr = String(chapterNumber).padStart(2, '0');
    const fileName = `john-${chapterStr}-${mappedLanguage}.js`;
    const chapterKey = `johnChapter${chapterNumber}${mappedLanguage.toUpperCase()}`;
    
    // Charger dynamiquement - Webpack comprend ce pattern
    const module = await import(
      /* webpackChunkName: "john-[request]" */
      /* webpackMode: "lazy" */
      `./${fileName}`
    );
    
    const chapterData = module[chapterKey];
    
    // Mettre en cache
    if (chapterData) {
      chapterCache[cacheKey] = chapterData;
      return chapterData;
    }
    
    console.error(`Chapter data not found for ${chapterNumber} in ${languageCode}`);
    return null;
  } catch (error) {
    console.error(`Error loading chapter ${chapterNumber} (${languageCode}):`, error);
    return null;
  }
};

// Fonction pour récupérer un chapitre (alias pour compatibilité)
export const getJohnChapter = loadJohnChapter;

// Métadonnées de l'Évangile
export const johnMetadata = {
  title: "Évangile selon Jean",
  version: "Louis Segond 1910",
  language: "fr",
  copyright: "Domaine public",
  totalChapters: 21,
  availableChapters: availableChapters.length,
  famous: true
};

// Export par défaut
const johnChaptersModule = {
  loadChapter: loadJohnChapter,
  getChapter: getJohnChapter,
  metadata: johnMetadata,
  available: availableChapters,
  cache: chapterCache
};

export default johnChaptersModule;