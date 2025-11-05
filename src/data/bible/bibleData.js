// ============================================================================
// MODULE BIBLE - Base de données biblique libre de droits  
// ============================================================================
import { spiritualWisdom } from './spiritualWisdom.js';
import { strongGreek } from './strongGreek.js';
import { gospelJohnTreasures } from './gospel/john/index.js';

// Import French translations
import { bibleVerses as bibleVersesFr } from './translations/fr/bibleVerses.js';
import { jesusIsNot as jesusIsNotFr } from './translations/fr/jesusIsNot.js';
import { bibleFacts as bibleFactsFr } from './translations/fr/bibleFacts.js';
import { funQuestions as funQuestionsFr } from './translations/fr/funQuestions.js';
import { bibleTreasures as bibleTreasuresFr } from './translations/fr/bibleTreasures.js';
import { biblePassagesFr } from './translations/fr/biblePassages.js';

// Import English translations
import { bibleVerses as bibleVersesEn } from './translations/en/bibleVerses.js';
import { jesusIsNot as jesusIsNotEn } from './translations/en/jesusIsNot.js';
import { bibleFacts as bibleFactsEn } from './translations/en/bibleFacts.js';
import { funQuestions as funQuestionsEn } from './translations/en/funQuestions.js';
import { bibleTreasures as bibleTreasuresEn } from './translations/en/bibleTreasures.js';
import { biblePassagesEn } from './translations/en/biblePassages.js';

// Import Spanish translations
import { biblePassagesEs } from './translations/es/biblePassages.js';

// Import German translations
import { biblePassagesDe } from './translations/de/biblePassages.js';

// Import Italian translations
import { biblePassagesIt } from './translations/it/biblePassages.js';

// Import Portuguese translations
import { biblePassagesPt } from './translations/pt/biblePassages.js';

// Import Russian translations
import { biblePassagesRu } from './translations/ru/biblePassages.js';

// Import Ukrainian translations
import { biblePassagesUk } from './translations/uk/biblePassages.js';

// Import Chinese translations
import { biblePassagesZh } from './translations/zh/biblePassages.js';

// Import Japanese translations
import { biblePassagesJp } from './translations/jp/biblePassages.js';

// Import Korean translations
import { biblePassagesKo } from './translations/ko/biblePassages.js';

// Import Arabic translations
import { biblePassagesAr } from './translations/ar/biblePassages.js';

// Import Hebrew translations
import { biblePassagesHe } from './translations/he/biblePassages.js';

// Import Lingala translations
import { biblePassagesRc } from './translations/rc/biblePassages.js';

export const bibleData = {
  // Sagesse spirituelle : La connaissance vivifie l'esprit
  spiritualWisdom,
  
  // Language-specific translations
  translations: {
    fr: {
      verses: bibleVersesFr,
      jesusIsNot: jesusIsNotFr,
      facts: bibleFactsFr,
      funQuestions: funQuestionsFr,
      bibleTreasures: bibleTreasuresFr,
      passages: biblePassagesFr
    },
    en: {
      verses: bibleVersesEn,
      jesusIsNot: jesusIsNotEn,
      facts: bibleFactsEn,
      funQuestions: funQuestionsEn,
      bibleTreasures: bibleTreasuresEn,
      passages: biblePassagesEn
    },
    es: {
      passages: biblePassagesEs
    },
    de: {
      passages: biblePassagesDe
    },
    it: {
      passages: biblePassagesIt
    },
    pt: {
      passages: biblePassagesPt
    },
    ru: {
      passages: biblePassagesRu
    },
    uk: {
      passages: biblePassagesUk
    },
    zh: {
      passages: biblePassagesZh
    },
    jp: {
      passages: biblePassagesJp
    },
    ko: {
      passages: biblePassagesKo
    },
    ar: {
      passages: biblePassagesAr
    },
    he: {
      passages: biblePassagesHe
    },
    rc: {
      passages: biblePassagesRc
    }
  },
  
  // Backward compatibility - default French translations
  verses: bibleVersesFr,
  jesusIsNot: jesusIsNotFr,
  facts: bibleFactsFr,
  funQuestions: funQuestionsFr,
  
  // Métadonnées sur les versions
  versions: {
    segond1910: {
      name: "Louis Segond 1910",
      copyright: "Domaine public depuis 1987",
      language: "français",
      year: 1910,
      status: "libre"
    },
    segond21: {
      name: "Segond 21",
      copyright: "Libre de droits pour usage non commercial",
      language: "français", 
      year: 2007,
      status: "libre_usage_educatif"
    }
  },

  // Note: strongGreek est désormais importé directement depuis './strongGreek.js'
  // au lieu d'être référencé dans bibleData pour éviter la duplication

  // Index Strong intégré (remplacé par l'import)
  strongDictionaryOld: {
    // Grec
    "G25": {
      word: "ἀγαπάω",
      transliteration: "agapao",
      meaning: "aimer d'un amour divin et inconditionnel",
      usage: "Utilisé pour l'amour de Dieu envers l'humanité"
    },
    "G1411": {
      word: "δύναμις", 
      transliteration: "dynamis",
      meaning: "pouvoir, force, capacité, miracle",
      usage: "Source du mot français 'dynamite'"
    },
    "G1515": {
      word: "εἰρήνη",
      transliteration: "eirene", 
      meaning: "paix, tranquillité, harmonie",
      usage: "Paix complète incluant le bien-être spirituel"
    },
    "G5457": {
      word: "φῶς",
      transliteration: "phos",
      meaning: "lumière physique et spirituelle",
      usage: "Métaphore de la vérité et de la sainteté"
    },

    // Hébreu
    "H7462": {
      word: "רָעָה",
      transliteration: "ra'ah",
      meaning: "paître, garder, berger, conduire",
      usage: "Image du soin pastoral de Dieu"
    },
    "H5216": {
      word: "נִיר",
      transliteration: "niyr", 
      meaning: "lampe, luminaire qui éclaire",
      usage: "Guidance divine dans l'obscurité"
    },
    "H3820": {
      word: "לֵב",
      transliteration: "leb",
      meaning: "cœur, esprit, volonté, centre émotionnel", 
      usage: "Siège des émotions et décisions"
    },
    "H982": {
      word: "בָּטַח",
      transliteration: "batach",
      meaning: "avoir confiance, se fier, être en sécurité",
      usage: "Confiance totale et abandon à Dieu"
    },
    "H3068": {
      word: "יְהוָה",
      transliteration: "YHWH",
      meaning: "l'Éternel, nom divin de Dieu",
      usage: "Le nom sacré de Dieu révélé à Moïse"
    },
    "H160": {
      word: "אַהֲבָה",
      transliteration: "ahava",
      meaning: "amour, affection",
      usage: "Amour profond et durable de Dieu"
    },
    "H5769": {
      word: "עוֹלָם",
      transliteration: "olam",
      meaning: "éternel, perpétuel, toujours",
      usage: "Éternité, temps sans fin"
    },
    "H2617": {
      word: "חֶסֶד",
      transliteration: "chesed",
      meaning: "bonté, miséricorde, fidélité",
      usage: "Amour fidèle et loyal de Dieu envers son alliance"
    }
  },

  // Passages bibliques complets (Louis Segond 1910 - Domaine public)
  // NOTE: Bible passages are now stored in multilingual files:
  // - translations/fr/biblePassages.js (French)
  // - translations/en/biblePassages.js (English)
  // Use getLocalizedData('passages') to access them in the current language

  // Ressources pour lire la Bible
  bibleResources: [
    {
      name: "Bible Gateway",
      url: "https://www.biblegateway.com/",
      description: "Bible en ligne avec de nombreuses traductions",
      language: "multi-langues",
      features: ["Recherche avancée", "Plans de lecture", "Audio"]
    },
    {
      name: "TopBible",
      url: "https://topbible.topchretien.com/",
      description: "Bible en français avec concordance Strong",
      language: "français",
      features: ["Concordance Strong", "Commentaires", "Cartes"]
    },
    {
      name: "La Bible App",
      url: "https://www.bible.com/",
      description: "Application mobile avec plans de lecture",
      language: "multi-langues",
      features: ["Plans de lecture", "Versets du jour", "Communauté"]
    },
    {
      name: "EMCI TV Bible",
      url: "https://www.emcitv.com/bible/",
      description: "Bible Segond 21 avec outils d'étude",
      language: "français",
      features: ["Segond 21", "Concordance", "Audio"]
    },
    {
      name: "Lire dans l'App",
      url: "internal://bible-reader",
      description: "Lecteur Bible intégré avec Strong",
      language: "français",
      features: ["Hors ligne", "Numéros Strong", "Navigation"]
    }
  ],

  // Obtenir une ressource Bible aléatoire
  getRandomBibleResource() {
    return this.bibleResources[Math.floor(Math.random() * this.bibleResources.length)];
  },

  // Obtenir une clarification "Jésus n'est pas..." aléatoire
  getRandomJesusIsNot() {
    return this.jesusIsNot[Math.floor(Math.random() * this.jesusIsNot.length)];
  },

  // Obtenir une clarification par catégorie
  getJesusIsNotByCategory(category) {
    const jesusIsNotData = this.getLocalizedData('jesusIsNot');
    const categoryItems = jesusIsNotData.filter(item => item.category === category);
    return categoryItems.length > 0 ?
      categoryItems[Math.floor(Math.random() * categoryItems.length)] :
      jesusIsNotData[0];
  },

  // Fonction utilitaire pour obtenir un trésor aléatoire
  getRandomTreasure() {
    const verse = this.verses[Math.floor(Math.random() * this.verses.length)];
    const fact = this.facts[Math.floor(Math.random() * this.facts.length)];
    const funQuestion = this.funQuestions[Math.floor(Math.random() * this.funQuestions.length)];
    const jesusIsNot = this.getRandomJesusIsNotLocalized();
    
    // Toujours utiliser la ressource Bible offline en premier
    const offlineBibleResource = this.bibleResources.find(r => r.url === "internal://bible-reader");
    const otherBibleResource = this.getRandomBibleResource();
    
    // Obtenir une référence Strong du verset
    const strongKeys = Object.keys(verse.strongNumbers);
    const randomStrongKey = strongKeys[Math.floor(Math.random() * strongKeys.length)];
    const strongRef = verse.strongNumbers[randomStrongKey];
    const strongData = this.strongDictionary[strongRef];

    return {
      verse: `"${verse.text}" - ${verse.reference}`,
      fact: fact.text,
      treasure: `Contexte : ${verse.context}`,
      question: `${funQuestion.question} ${funQuestion.emoji}`,
      jesusIsNot: `❌ ${jesusIsNot.text}`,
      jesusIsNotContext: `📖 ${jesusIsNot.reference} - ${jesusIsNot.context}`,
      strongGreek: strongData ? 
        `Strong ${strongRef} : ${strongData.word} (${strongData.transliteration}) = ${strongData.meaning}` :
        `Strong ${strongRef} : Référence biblique pour étude approfondie`,
      bibleResource: offlineBibleResource || otherBibleResource,
      otherBibleResource: otherBibleResource,
      theme: verse.theme,
      version: this.versions[verse.version].name
    };
  },

  // Obtenir un verset par thème
  getVerseByTheme(theme) {
    const themeVerses = this.verses.filter(v => v.theme === theme);
    return themeVerses.length > 0 ? 
      themeVerses[Math.floor(Math.random() * themeVerses.length)] : 
      this.verses[0];
  },

  // Obtenir une question amusante par thème
  getFunQuestionByTheme(theme) {
    const themeQuestions = this.funQuestions.filter(q => q.theme === theme);
    return themeQuestions.length > 0 ?
      themeQuestions[Math.floor(Math.random() * themeQuestions.length)] :
      this.funQuestions[0];
  },

  // Obtenir un passage biblique par ID (multilingue)
  getPassage(passageId) {
    const passages = this.getLocalizedData('passages');
    return passages[passageId] || null;
  },

  // Obtenir tous les passages disponibles (multilingue)
  async getAllPassages(language = null) {
    // Get regular passages
    const passages = this.getLocalizedData('passages', language);
    const regularPassages = Object.keys(passages).map(key => ({
      id: key,
      ...passages[key]
    }));

    try {
      // Get John chapters (first 3 chapters for demo)
      const johnChapters = await this.getAllJohnChapters(language);
      const selectedJohnChapters = johnChapters.slice(0, 3).map(chapter => ({
        ...chapter,
        source: 'john_complete'
      }));

      return [...regularPassages, ...selectedJohnChapters];
    } catch (error) {
      console.error('Error loading John chapters:', error);
      return regularPassages;
    }
  },

  // Obtenir un passage aléatoire (multilingue)
  getRandomPassage() {
    const passages = this.getLocalizedData('passages');
    const passageIds = Object.keys(passages);
    const randomId = passageIds[Math.floor(Math.random() * passageIds.length)];
    return {
      id: randomId,
      ...passages[randomId]
    };
  },

  // Get current language from localStorage (same logic as useTranslation)
  getCurrentLanguage() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('faithchronicles_language');
      return saved || 'fr';
    }
    return 'fr';
  },

  // Get localized data for current language
  getLocalizedData(dataType, language = null) {
    const lang = language || this.getCurrentLanguage();
    return this.translations[lang] && this.translations[lang][dataType] 
      ? this.translations[lang][dataType] 
      : this.translations.fr[dataType]; // Fallback to French
  },

  // Get random Jesus clarification in current language
  getRandomJesusIsNotLocalized() {
    const jesusIsNotData = this.getLocalizedData('jesusIsNot');
    return jesusIsNotData[Math.floor(Math.random() * jesusIsNotData.length)];
  },

  // ============================================================================
  // GOSPEL OF JOHN INTEGRATION
  // ============================================================================

  // Get all John chapters for Bible Reader
  async getAllJohnChapters(language = null) {
    const lang = language || this.getCurrentLanguage();
    return await gospelJohnTreasures.getAllJohnChapters(lang);
  },

  // Clear John chapters cache (when language changes)
  clearJohnChaptersCache() {
    gospelJohnTreasures.clearCache();
  },

  // Get specific John chapter
  async getJohnChapter(chapterNumber) {
    return await gospelJohnTreasures.getJohnChapterForReader(chapterNumber);
  },

  // Get famous John verses as treasures
  async getFamousJohnTreasures() {
    return await gospelJohnTreasures.getFamousJohnTreasures();
  },

  // Get random John treasure
  async getRandomJohnTreasure() {
    try {
      console.log('bibleData.getRandomJohnTreasure called');
      console.log('gospelJohnTreasures:', gospelJohnTreasures);
      
      if (!gospelJohnTreasures) {
        throw new Error('gospelJohnTreasures not imported properly');
      }
      
      if (typeof gospelJohnTreasures.getRandomJohnTreasure !== 'function') {
        throw new Error('getRandomJohnTreasure method not found in gospelJohnTreasures');
      }
      
      const result = await gospelJohnTreasures.getRandomJohnTreasure();
      console.log('Result from gospelJohnTreasures.getRandomJohnTreasure:', result);
      
      // Vérifier que le résultat n'est pas null/undefined
      if (!result) {
        console.warn('gospelJohnTreasures returned null/undefined, using final fallback');
        return this.getFinalFallbackTreasure();
      }
      
      return result;
    } catch (error) {
      console.error('Error in bibleData.getRandomJohnTreasure:', error);
      return this.getFinalFallbackTreasure();
    }
  },

  // Final fallback when everything else fails
  getFinalFallbackTreasure() {
    return {
      type: 'john_treasure',
      content: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
      reference: "Jean 3:16",
      theme: "amour_divin",
      chapter: 3,
      verse: 16,
      version: "LSG 1910",
      famous: true,
      category: "évangile",
      reflection: "Le verset le plus célèbre de la Bible révèle l'amour inconditionnel de Dieu pour l'humanité."
    };
  },

  // Search in Gospel of John
  async searchJohnVerses(searchText) {
    return await gospelJohnTreasures.searchJohnVerses(searchText);
  },

  // Get John reading plan
  getJohnReadingPlan() {
    return gospelJohnTreasures.getJohnReadingPlan();
  },

  // Get Gospel metadata
  async getJohnMetadata() {
    return await gospelJohnTreasures.getGospelMetadata();
  }
};

export default bibleData;