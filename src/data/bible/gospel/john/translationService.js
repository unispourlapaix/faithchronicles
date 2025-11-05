// ============================================================================
// TRANSLATION SERVICE - Service de traductions Bible (Version 2.0 Dynamique)
// ============================================================================
// Service pour accéder aux traductions Bible avec chargement dynamique

import { loadJohnChapter, availableChapters } from './chapters/index.js';

/**
 * Service pour charger les traductions Bible
 * Version 2.0 - Utilise le chargement dynamique au lieu d'imports statiques
 */
export class TranslationService {
  constructor() {
    // Langues disponibles avec fichiers de chapitres
    this.availableLanguages = ['fr', 'en', 'es', 'pt', 'de', 'it', 'ru', 'zh', 'ar', 'hi', 'sw', 'ko', 'ja', 'pl'];
  }

  /**
   * Vérifier si une langue est disponible
   */
  isLanguageAvailable(languageCode) {
    return this.availableLanguages.includes(languageCode);
  }

  /**
   * Charger une traduction selon la langue (retourne structure complète)
   */
  async loadTranslation(languageCode) {
    try {
      if (!this.isLanguageAvailable(languageCode)) {
        console.warn(`Language ${languageCode} not available, using fallback`);
        return this.getFallbackForLanguage(languageCode);
      }

      // Charger tous les chapitres pour cette langue
      const chapters = {};
      for (const chapterNum of availableChapters) {
        const chapter = await loadJohnChapter(chapterNum, languageCode);
        if (chapter) {
          chapters[chapterNum] = chapter;
        }
      }

      return {
        language: languageCode,
        version: chapters[1]?.version || 'Unknown Version',
        year: chapters[1]?.year || null,
        totalChapters: availableChapters.length,
        chapters: chapters
      };
      
    } catch (error) {
      console.error(`Error loading translation ${languageCode}:`, error);
      
      // Dernier recours : fallback français
      if (languageCode !== 'fr') {
        return this.loadTranslation('fr');
      }
      
      return this.getMinimalFallback();
    }
  }

  /**
   * Charger un chapitre spécifique
   */
  async loadChapter(chapterNumber, languageCode = 'fr') {
    try {
      return await loadJohnChapter(chapterNumber, languageCode);
    } catch (error) {
      console.error(`Error loading chapter ${chapterNumber} in ${languageCode}:`, error);
      
      // Fallback vers français
      if (languageCode !== 'fr') {
        return this.loadChapter(chapterNumber, 'fr');
      }
      
      return null;
    }
  }

  /**
   * Obtenir les langues disponibles
   */
  getAvailableLanguages() {
    return this.availableLanguages.map(code => ({
      code: code,
      name: this.getLanguageName(code),
      available: true
    }));
  }

  /**
   * Obtenir le nom d'une langue
   */
  getLanguageName(code) {
    const names = {
      'fr': 'Français',
      'en': 'English',
      'es': 'Español',
      'pt': 'Português',
      'de': 'Deutsch',
      'it': 'Italiano',
      'ru': 'Русский',
      'zh': '中文',
      'ar': 'العربية',
      'hi': 'हिन्दी',
      'sw': 'Kiswahili',
      'ko': '한국어',
      'ja': '日本語',
      'pl': 'Polski'
    };
    return names[code] || code.toUpperCase();
  }

  /**
   * Précharger des langues courantes
   */
  async preloadCommonLanguages() {
    const commonLangs = ['fr', 'en', 'es'];
    const promises = commonLangs.map(lang => loadJohnChapter(1, lang));
    await Promise.all(promises);
    return true;
  }

  /**
   * Fallback pour les langues non encore converties
   */
  getFallbackForLanguage(languageCode) {
    const fallbacks = {
      ar: this.getArabicFallback(),
      hi: this.getHindiFallback()
    };

    return fallbacks[languageCode] || this.getMinimalFallback();
  }

  /**
   * Fallback minimal
   */
  getMinimalFallback() {
    return {
      language: 'fr',
      version: 'Louis Segond 1910',
      year: 1910,
      totalChapters: 21,
      chapters: {}
    };
  }

  /**
   * Parser un fichier .txt Bible
   */
  parseTxtFile(text, langInfo) {
    const lines = text.split('\n');
    const chapters = {};
    let currentChapter = null;
    let verses = [];

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

      // Détecter les chapitres : ===== CHAPITRE X =====
      const chapterMatch = line.match(/===+\s*CHAPITRE?\s+(\d+)\s*===+/i) || 
                          line.match(/===+\s*CHAPTER\s+(\d+)\s*===+/i);
      if (chapterMatch) {
        // Sauvegarder le chapitre précédent
        if (currentChapter && verses.length > 0) {
          chapters[currentChapter] = {
            chapter: currentChapter,
            verses: [...verses]
          };
        }
        
        currentChapter = parseInt(chapterMatch[1]);
        verses = [];
        continue;
      }

      // Détecter les versets : 1:1 Texte du verset
      const verseMatch = line.match(/^(\d+):(\d+)\s+(.+)$/);
      if (verseMatch && currentChapter) {
        const chapterNum = parseInt(verseMatch[1]);
        const verseNum = parseInt(verseMatch[2]);
        const text = verseMatch[3];

        if (chapterNum === currentChapter) {
          verses.push({
            number: verseNum,
            text: text.trim(),
            strong: [] // Les numéros Strong seront ajoutés séparément
          });
        }
      }
    }

    // Sauvegarder le dernier chapitre
    if (currentChapter && verses.length > 0) {
      chapters[currentChapter] = {
        chapter: currentChapter,
        verses: [...verses]
      };
    }

    return {
      language: langInfo.code,
      version: langInfo.version,
      year: langInfo.year,
      totalChapters: Object.keys(chapters).length,
      chapters: chapters
    };
  }

  /**
   * Fallback français intégré (plus complet)
   */
  getFrenchFallback() {
    return {
      language: 'fr',
      version: 'Louis Segond 1910',
      year: 1910,
      totalChapters: 21,
      chapters: {
        1: {
          chapter: 1,
          verses: [
            { number: 1, text: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.", strong: ["G746", "G2258", "G3056", "G2316"] },
            { number: 2, text: "Elle était au commencement avec Dieu.", strong: ["G3778", "G2258", "G746", "G2316"] },
            { number: 3, text: "Toutes choses ont été faites par elle, et rien de ce qui a été fait n'a été fait sans elle.", strong: ["G3956", "G1096", "G1223", "G846"] },
            { number: 4, text: "En elle était la vie, et la vie était la lumière des hommes.", strong: ["G2222", "G5457", "G444"] },
            { number: 5, text: "La lumière luit dans les ténèbres, et les ténèbres ne l'ont point reçue.", strong: ["G5457", "G5316", "G4655", "G2638"] },
            { number: 14, text: "Et la parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité; et nous avons contemplé sa gloire, une gloire comme la gloire du Fils unique venu du Père.", strong: ["G3056", "G4561", "G1096"] }
          ]
        },
        3: {
          chapter: 3,
          verses: [
            { number: 16, text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", strong: ["G2316", "G25", "G2889", "G1325"] }
          ]
        }
      }
    };
  }

  /**
   * Fallback anglais intégré (plus complet)
   */
  getEnglishFallback() {
    return {
      language: 'en',
      version: 'World English Bible',
      year: 2000,
      totalChapters: 21,
      chapters: {
        1: {
          chapter: 1,
          verses: [
            { number: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God.", strong: ["G746", "G2258", "G3056", "G2316"] },
            { number: 2, text: "The same was in the beginning with God.", strong: ["G3778", "G2258", "G746", "G2316"] },
            { number: 3, text: "All things were made through him. Without him was not anything made that has been made.", strong: ["G3956", "G1096", "G1223", "G846"] },
            { number: 4, text: "In him was life, and the life was the light of men.", strong: ["G2222", "G5457", "G444"] },
            { number: 5, text: "The light shines in the darkness, and the darkness hasn't overcome it.", strong: ["G5457", "G5316", "G4655", "G2638"] },
            { number: 6, text: "There came a man, sent from God, whose name was John.", strong: ["G444", "G649", "G2316", "G2491"] },
            { number: 7, text: "The same came as a witness, that he might testify about the light, that all might believe through him.", strong: ["G3141", "G5457", "G4100"] },
            { number: 8, text: "He was not the light, but was sent that he might testify about the light.", strong: ["G5457", "G3141"] },
            { number: 9, text: "The true light that enlightens everyone was coming into the world.", strong: ["G5457", "G228", "G2889", "G5461", "G444"] },
            { number: 10, text: "He was in the world, and the world was made through him, and the world didn't recognize him.", strong: ["G2889", "G1096", "G1097"] },
            { number: 11, text: "He came to his own, and those who were his own didn't receive him.", strong: ["G2398", "G3880"] },
            { number: 12, text: "But as many as received him, to them he gave the right to become God's children, to those who believe in his name:", strong: ["G3880", "G4100", "G3686", "G1849", "G5043", "G2316"] },
            { number: 13, text: "who were born not of blood, nor of the will of the flesh, nor of the will of man, but of God.", strong: ["G1080", "G129", "G4561", "G435", "G2316"] },
            { number: 14, text: "The Word became flesh, and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth.", strong: ["G3056", "G4561", "G1096", "G4637", "G5485", "G225", "G1391", "G3439", "G3962"] }
          ]
        },
        3: {
          chapter: 3,
          verses: [
            { number: 1, text: "Now there was a man of the Pharisees named Nicodemus, a ruler of the Jews.", strong: ["G444", "G5330", "G3530", "G758", "G2453"] },
            { number: 2, text: "The same came to him by night, and said to him, \"Rabbi, we know that you are a teacher come from God, for no one can do these signs that you do, unless God is with him.\"", strong: ["G3571", "G2424", "G4461", "G1320", "G2316", "G4592", "G4160"] },
            { number: 3, text: "Jesus answered him, \"Most certainly, I tell you, unless one is born anew, he can't see God's Kingdom.\"", strong: ["G2424", "G281", "G1080", "G509", "G3708", "G932", "G2316"] },
            { number: 16, text: "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.", strong: ["G2316", "G25", "G2889", "G1325", "G3439", "G5207", "G4100", "G622", "G2222", "G166"] },
            { number: 17, text: "For God didn't send his Son into the world to judge the world, but that the world should be saved through him.", strong: ["G2316", "G649", "G5207", "G2889", "G2919", "G4982"] }
          ]
        }
      }
    };
  }

  /**
   * Fallback espagnol (plus complet)
   */
  getSpanishFallback() {
    return {
      language: 'es',
      version: 'Reina-Valera 1909',
      year: 1909,
      totalChapters: 21,
      chapters: {
        1: {
          chapter: 1,
          verses: [
            { number: 1, text: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.", strong: ["G746", "G2258", "G3056", "G2316"] },
            { number: 2, text: "Este era en el principio con Dios.", strong: ["G3778", "G2258", "G746", "G2316"] },
            { number: 3, text: "Todas las cosas por él fueron hechas; y sin él nada de lo que es hecho, fue hecho.", strong: ["G3956", "G1096", "G1223", "G846"] },
            { number: 4, text: "En él estaba la vida, y la vida era la luz de los hombres.", strong: ["G2222", "G5457", "G444"] },
            { number: 5, text: "Y la luz en las tinieblas resplandece; mas las tinieblas no la comprendieron.", strong: ["G5457", "G5316", "G4655", "G2638"] },
            { number: 6, text: "Fue un hombre enviado de Dios, el cual se llamaba Juan.", strong: ["G444", "G649", "G2316", "G2491"] },
            { number: 14, text: "Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad.", strong: ["G3056", "G4561", "G1096"] }
          ]
        },
        3: {
          chapter: 3,
          verses: [
            { number: 16, text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.", strong: ["G2316", "G25", "G2889", "G1325"] }
          ]
        }
      }
    };
  }

  /**
   * Fallback portugais
   */
  getPortugueseFallback() {
    return {
      language: 'pt',
      version: 'Almeida 1911',
      year: 1911,
      totalChapters: 21,
      chapters: {
        1: {
          chapter: 1,
          verses: [
            { number: 1, text: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.", strong: ["G746", "G2258", "G3056", "G2316"] },
            { number: 2, text: "Ele estava no princípio com Deus.", strong: ["G3778", "G2258", "G746", "G2316"] },
            { number: 3, text: "Todas as coisas foram feitas por intermédio dele, e sem ele nada do que foi feito se fez.", strong: ["G3956", "G1096", "G1223", "G846"] },
            { number: 14, text: "E o Verbo se fez carne, e habitou entre nós, cheio de graça e de verdade; e vimos a sua glória, como a glória do unigênito do Pai.", strong: ["G3056", "G4561", "G1096"] }
          ]
        }
      }
    };
  }

  /**
   * Fallback allemand (plus complet)
   */
  getGermanFallback() {
    return {
      language: 'de',
      version: 'Luther 1545',
      year: 1545,
      totalChapters: 21,
      chapters: {
        1: {
          chapter: 1,
          verses: [
            { number: 1, text: "Im Anfang war das Wort, und das Wort war bei Gott, und Gott war das Wort.", strong: ["G746", "G2258", "G3056", "G2316"] },
            { number: 2, text: "Dasselbe war im Anfang bei Gott.", strong: ["G3778", "G2258", "G746", "G2316"] },
            { number: 3, text: "Alle Dinge sind durch dasselbe gemacht, und ohne dasselbe ist nichts gemacht, was gemacht ist.", strong: ["G3956", "G1096", "G1223", "G846"] },
            { number: 4, text: "In ihm war das Leben, und das Leben war das Licht der Menschen.", strong: ["G2222", "G5457", "G444"] },
            { number: 5, text: "Und das Licht scheint in der Finsternis, und die Finsternis hat's nicht begriffen.", strong: ["G5457", "G5316", "G4655", "G2638"] },
            { number: 6, text: "Es war ein Mensch, von Gott gesandt, der hieß Johannes.", strong: ["G444", "G649", "G2316", "G2491"] },
            { number: 14, text: "Und das Wort ward Fleisch und wohnte unter uns, und wir sahen seine Herrlichkeit, eine Herrlichkeit als des eingeborenen Sohnes vom Vater, voller Gnade und Wahrheit.", strong: ["G3056", "G4561", "G1096"] }
          ]
        },
        3: {
          chapter: 3,
          verses: [
            { number: 16, text: "Also hat Gott die Welt geliebt, daß er seinen eingeborenen Sohn gab, auf daß alle, die an ihn glauben, nicht verloren werden, sondern das ewige Leben haben.", strong: ["G2316", "G25", "G2889", "G1325"] }
          ]
        }
      }
    };
  }

  /**
   * Fallbacks pour les autres langues (structure basique)
   */
  getItalianFallback() {
    return { language: 'it', version: 'Riveduta Luzzi 1927', year: 1927, totalChapters: 21, chapters: { 1: { chapter: 1, verses: [{ number: 1, text: "Nel principio era la Parola, e la Parola era con Dio, e la Parola era Dio.", strong: ["G746", "G2258", "G3056", "G2316"] }] } } };
  }

  getRussianFallback() {
    return { language: 'ru', version: 'Synodal 1876', year: 1876, totalChapters: 21, chapters: { 1: { chapter: 1, verses: [{ number: 1, text: "В начале было Слово, и Слово было у Бога, и Слово было Бог.", strong: ["G746", "G2258", "G3056", "G2316"] }] } } };
  }

  getChineseFallback() {
    return { language: 'zh', version: 'Chinese Union Version', year: 1919, totalChapters: 21, chapters: { 1: { chapter: 1, verses: [{ number: 1, text: "太初有道，道與神同在，道就是神。", strong: ["G746", "G2258", "G3056", "G2316"] }] } } };
  }

  getArabicFallback() {
    return { language: 'ar', version: 'Smith & Van Dyke 1865', year: 1865, totalChapters: 21, chapters: { 1: { chapter: 1, verses: [{ number: 1, text: "في البدء كان الكلمة والكلمة كان عند الله وكان الكلمة الله", strong: ["G746", "G2258", "G3056", "G2316"] }] } } };
  }

  getHindiFallback() {
    return { language: 'hi', version: 'Indian Revised Version', year: 2017, totalChapters: 21, chapters: { 1: { chapter: 1, verses: [{ number: 1, text: "आदि में वचन था, और वचन परमेश्‍वर के साथ था, और वचन परमेश्‍वर था।", strong: ["G746", "G2258", "G3056", "G2316"] }] } } };
  }

  getSwahiliFallback() {
    return { language: 'sw', version: 'Swahili Union Version', year: 1952, totalChapters: 21, chapters: { 1: { chapter: 1, verses: [{ number: 1, text: "Hapo mwanzoni kulikuwepo Neno, na Neno alikuwa pamoja na Mungu, na Neno alikuwa Mungu.", strong: ["G746", "G2258", "G3056", "G2316"] }] } } };
  }

  getKoreanFallback() {
    return { language: 'ko', version: 'Korean Revised Version', year: 1961, totalChapters: 21, chapters: { 1: { chapter: 1, verses: [{ number: 1, text: "태초에 말씀이 계시니라 이 말씀이 하나님과 함께 계셨으니 이 말씀은 곧 하나님이시니라", strong: ["G746", "G2258", "G3056", "G2316"] }] } } };
  }

  getJapaneseFallback() {
    return { language: 'ja', version: 'Colloquial Japanese 1955', year: 1955, totalChapters: 21, chapters: { 1: { chapter: 1, verses: [{ number: 1, text: "初めに言があった。言は神と共にあった。言は神であった。", strong: ["G746", "G2258", "G3056", "G2316"] }] } } };
  }

  getPolishFallback() {
    return { language: 'pl', version: 'Gdańsk Bible 1632', year: 1632, totalChapters: 21, chapters: { 1: { chapter: 1, verses: [{ number: 1, text: "Na początku było Słowo, a Słowo było u Boga, i Bogiem było Słowo.", strong: ["G746", "G2258", "G3056", "G2316"] }] } } };
  }
}

// Instance singleton
export const translationService = new TranslationService();
export default translationService;