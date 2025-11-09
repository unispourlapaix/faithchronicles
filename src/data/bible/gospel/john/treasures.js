// ============================================================================
// GOSPEL OF JOHN BIBLE TREASURES INTEGRATION
// ============================================================================
// Intégration de l'Évangile de Jean dans le système Bible Treasures

import johnChaptersData from './chapters/index.js';

/**
 * Gospel of John Treasures - Integration with Bible Reader
 */
export class GospelJohnTreasures {
  constructor() {
    this.johnData = johnChaptersData;
    this.cache = new Map();
  }

  /**
   * Clear cache (useful when language changes)
   */
  clearCache() {
    this.cache.clear();
    console.log('Gospel John cache cleared');
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('faithchronicles_language');
      return saved || 'fr';
    }
    return 'fr';
  }

  /**
   * Get Gospel metadata for current language
   */
  async getGospelMetadata() {
    const lang = this.getCurrentLanguage();
    console.log('Getting Gospel metadata from JavaScript data');
    
    // Utiliser les métadonnées des modules JavaScript
    const metadata = this.johnData.metadata;
    
    return {
      title: lang === 'fr' ? 'Évangile selon Jean' : 'Gospel of John',
      language: lang,
      version: metadata.version || 'Louis Segond 1910',
      copyright: metadata.copyright || 'Domaine public',
      year: 1910,
      totalChapters: metadata.totalChapters || 21,
      totalVerses: metadata.totalVerses || this.johnData.available.length * 20, // Estimation
      available: true,
      availableChapters: this.johnData.available.length,
      source: 'JavaScript Modules'
    };
  }

  /**
   * Get all John chapters for Bible Reader
   */
  async getAllJohnChapters(language = null) {
    const lang = language || this.getCurrentLanguage();
    const cacheKey = `chapters_${lang}`;
    
    console.log('getAllJohnChapters called with language:', lang);
    
    if (this.cache.has(cacheKey)) {
      console.log('Returning cached chapters for', lang);
      return this.cache.get(cacheKey);
    }

    try {
      // Utiliser les données JavaScript directement
      const availableChapters = this.johnData.available || [];
      console.log('Available chapters from JS data:', availableChapters);
      
      // Charger tous les chapitres de façon asynchrone
      const chapterPromises = availableChapters.map(async (chapterNum) => {
        try {
          const chapter = await this.johnData.getChapter(chapterNum, lang);
          if (!chapter || !chapter.verses) {
            console.warn(`Chapter ${chapterNum} not loaded or has no verses`);
            return null;
          }
          
          return {
            id: `John_${chapter.chapter}`,
            book: this.getBookName(lang),
            chapter: chapter.chapter,
            title: chapter.title || this.getChapterTitle(chapter.chapter, lang),
            verses: chapter.verses.map(verse => ({
              number: verse.number,
              text: verse.text,
              strong: verse.strong || []
            })),
            metadata: {
              language: chapter.language || 'fr',
              version: chapter.version || 'LSG 1910',
              copyright: 'Domaine public',
              source: 'Gospel of John JavaScript Modules'
            }
          };
        } catch (error) {
          console.error(`Error loading chapter ${chapterNum}:`, error);
          return null;
        }
      });
      
      const readerChapters = (await Promise.all(chapterPromises)).filter(Boolean);

      console.log('Reader chapters created:', readerChapters.length);
      this.cache.set(cacheKey, readerChapters);
      return readerChapters;
    } catch (error) {
      console.error('Error loading John chapters from JS data:', error);
      return [];
    }
  }

  /**
   * Get localized book name for Gospel of John
   */
  getBookName(language = null) {
    const lang = language || this.getCurrentLanguage();
    
    const bookNames = {
      fr: 'Jean',
      en: 'John',
      es: 'Juan',
      de: 'Johannes',
      it: 'Giovanni',
      pt: 'João',
      ru: 'Иоанна',
      uk: 'Івана',
      zh: '约翰福音',
      ar: 'يوحنا',
      he: 'יוחנן',
      ja: 'ヨハネ',
      ko: '요한',
      hi: 'यूहन्ना',
      sw: 'Yohana',
      pl: 'Jana',
      rc: 'Yoane'
    };

    return bookNames[lang] || 'John';
  }

  /**
   * Get localized chapter title
   */
  getChapterTitle(chapterNumber, language = null) {
    const lang = language || this.getCurrentLanguage();
    
    const titles = {
      fr: {
        1: "La Parole faite chair",
        2: "Les noces de Cana",
        3: "Jésus et Nicodème",
        4: "La Samaritaine",
        5: "Guérison à Béthesda",
        6: "Multiplication des pains",
        7: "Jésus à la fête des Tabernacles",
        8: "La femme adultère",
        9: "L'aveugle-né",
        10: "Le bon berger",
        11: "La résurrection de Lazare",
        12: "L'entrée triomphale",
        13: "Le lavement des pieds",
        14: "Le chemin, la vérité, la vie",
        15: "Le vrai cep",
        16: "L'œuvre du Saint-Esprit",
        17: "La prière sacerdotale",
        18: "L'arrestation de Jésus",
        19: "La crucifixion",
        20: "La résurrection",
        21: "Jésus au bord du lac"
      },
      en: {
        1: "The Word Made Flesh",
        2: "The Wedding at Cana",
        3: "Jesus and Nicodemus",
        4: "The Woman at the Well",
        5: "Healing at Bethesda",
        6: "Feeding the Five Thousand",
        7: "Jesus at the Festival",
        8: "The Adulterous Woman",
        9: "The Man Born Blind",
        10: "The Good Shepherd",
        11: "The Raising of Lazarus",
        12: "The Triumphal Entry",
        13: "Washing the Disciples' Feet",
        14: "The Way, Truth, and Life",
        15: "The True Vine",
        16: "The Work of the Holy Spirit",
        17: "The High Priestly Prayer",
        18: "The Arrest of Jesus",
        19: "The Crucifixion",
        20: "The Resurrection",
        21: "Jesus by the Sea"
      }
    };

    return titles[lang]?.[chapterNumber] || `Chapter ${chapterNumber}`;
  }

  /**
   * Get famous John verses as treasures
   */
  async getFamousJohnTreasures() {
    const lang = this.getCurrentLanguage();
    const cacheKey = `famous_${lang}`;
    
    console.log('getFamousJohnTreasures called with language:', lang);
    
    if (this.cache.has(cacheKey)) {
      console.log('Returning cached famous treasures');
      return this.cache.get(cacheKey);
    }

    try {
      console.log('Getting famous verses from JavaScript data');
      
      // Utiliser les données JavaScript directement
      const famousVerseRefs = [
        { chapter: 3, verse: 16 }, // Car Dieu a tant aimé le monde
        { chapter: 1, verse: 1 },  // Au commencement était la Parole
        { chapter: 14, verse: 6 }, // Je suis le chemin, la vérité, la vie
        { chapter: 1, verse: 14 }, // La Parole a été faite chair
      ];

      const famousVerses = [];
      
      for (const ref of famousVerseRefs) {
        const chapter = this.johnData.getChapter(ref.chapter);
        if (chapter) {
          const verse = chapter.verses.find(v => v.number === ref.verse);
          if (verse) {
            famousVerses.push({
              text: verse.text,
              chapter: ref.chapter,
              number: ref.verse,
              version: chapter.version,
              chapterTitle: chapter.title,
              book: 'Jean',
              famous: true,
              strong: verse.strong || []
            });
          }
        }
      }
      
      console.log('Famous verses from JS data:', famousVerses);
      
      if (!famousVerses || famousVerses.length === 0) {
        console.warn('No famous verses found in JavaScript data');
        return [];
      }
      
      const treasures = famousVerses.map(verse => ({
        type: 'john_treasure',
        content: verse.text,
        reference: `Jean ${verse.chapter}:${verse.number}`,
        theme: this.getVerseTheme(verse.chapter, verse.number),
        chapter: verse.chapter,
        verse: verse.number,
        version: verse.version,
        famous: true,
        category: 'évangile',
        reflection: this.getVerseReflection(verse.chapter, verse.number, lang)
      }));

      console.log('Treasures created:', treasures.length);
      this.cache.set(cacheKey, treasures);
      return treasures;
    } catch (error) {
      console.error('Error loading famous John treasures:', error);
      return [];
    }
  }

  /**
   * Get verse theme based on content
   */
  getVerseTheme(chapter, verse) {
    const themes = {
      '3:16': 'amour_divin',
      '1:1': 'divinité',
      '14:6': 'salut',
      '8:12': 'lumière',
      '10:11': 'berger',
      '11:25': 'résurrection',
      '1:14': 'incarnation',
      '15:13': 'amour_sacrifice'
    };

    return themes[`${chapter}:${verse}`] || 'enseignement';
  }

  /**
   * Get verse reflection
   */
  getVerseReflection(chapter, verse, language = null) {
    const lang = language || this.getCurrentLanguage();
    
    const reflections = {
      fr: {
        '3:16': "Le verset le plus célèbre de la Bible révèle l'amour inconditionnel de Dieu",
        '1:1': "Jésus est présenté comme la Parole éternelle, Dieu lui-même",
        '14:6': "Jésus nous montre le chemin lumineux qui mène vers le Père et nous invite à le suivre",
        '8:12': "Jésus éclaire notre chemin dans les ténèbres du monde",
        '10:11': "Jésus donne sa vie pour ses brebis avec un amour parfait",
        '11:25': "Jésus vainc la mort et offre la vie éternelle"
      },
      en: {
        '3:16': "The most famous Bible verse reveals God's unconditional love",
        '1:1': "Jesus is presented as the eternal Word, God himself",
        '14:6': "Jesus proclaims himself as the only way to the Father",
        '8:12': "Jesus lights our path in the darkness of the world",
        '10:11': "Jesus gives his life for his sheep with perfect love",
        '11:25': "Jesus conquers death and offers eternal life"
      }
    };

    return reflections[lang]?.[`${chapter}:${verse}`] || 
           "Un enseignement profond de Jésus à méditer";
  }

  /**
   * Get random John treasure
   */
  async getRandomJohnTreasure() {
    console.log('getRandomJohnTreasure called');
    
    try {
      const famousVerses = await this.getFamousJohnTreasures();
      console.log('Famous verses result:', famousVerses, 'length:', famousVerses?.length);
      
      if (!famousVerses || famousVerses.length === 0) {
        console.warn('No famous verses found, using fallback treasures');
        const fallback = this.getFallbackTreasure();
        console.log('Fallback treasure:', fallback);
        return fallback;
      }

      const randomTreasure = famousVerses[Math.floor(Math.random() * famousVerses.length)];
      console.log('Random treasure selected:', randomTreasure);
      return randomTreasure;
    } catch (error) {
      console.error('Error in getRandomJohnTreasure:', error);
      const fallback = this.getFallbackTreasure();
      console.log('Error fallback treasure:', fallback);
      return fallback;
    }
  }

  /**
   * Get fallback treasure when main system fails
   */
  getFallbackTreasure() {
    console.log('getFallbackTreasure called');
    const lang = this.getCurrentLanguage();
    console.log('Current language for fallback:', lang);
    
    const fallbackTreasures = {
      fr: [
        {
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
        },
        {
          type: 'john_treasure',
          content: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.",
          reference: "Jean 1:1",
          theme: "divinité",
          chapter: 1,
          verse: 1,
          version: "LSG 1910",
          famous: true,
          category: "évangile",
          reflection: "Jésus est présenté comme la Parole éternelle, Dieu lui-même."
        },
        {
          type: 'john_treasure',
          content: "Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.",
          reference: "Jean 14:6",
          theme: "salut",
          chapter: 14,
          verse: 6,
          version: "LSG 1910",
          famous: true,
          category: "évangile",
          reflection: "Jésus nous montre le chemin lumineux qui mène vers le Père et nous invite à le suivre."
        }
      ],
      en: [
        {
          type: 'john_treasure',
          content: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
          reference: "John 3:16",
          theme: "divine_love",
          chapter: 3,
          verse: 16,
          version: "NIV",
          famous: true,
          category: "gospel",
          reflection: "The most famous Bible verse reveals God's unconditional love for humanity."
        },
        {
          type: 'john_treasure',
          content: "In the beginning was the Word, and the Word was with God, and the Word was God.",
          reference: "John 1:1",
          theme: "divinity",
          chapter: 1,
          verse: 1,
          version: "NIV",
          famous: true,
          category: "gospel",
          reflection: "Jesus is presented as the eternal Word, God himself."
        }
      ]
    };

    const treasures = fallbackTreasures[lang] || fallbackTreasures.fr;
    const selectedTreasure = treasures[Math.floor(Math.random() * treasures.length)];
    console.log('Fallback treasure selected:', selectedTreasure);
    return selectedTreasure;
  }

  /**
   * Search John verses
   */
  async searchJohnVerses(searchText) {
    const lang = this.getCurrentLanguage();
    console.log('Searching John verses in JavaScript data for:', searchText);
    
    try {
      const searchLower = searchText.toLowerCase();
      const results = [];
      
      // Recherche dans tous les chapitres disponibles
      for (const chapterNum of this.johnData.available) {
        const chapter = this.johnData.getChapter(chapterNum);
        if (chapter) {
          for (const verse of chapter.verses) {
            if (verse.text.toLowerCase().includes(searchLower)) {
              results.push({
                type: 'john_search_result',
                content: verse.text,
                reference: `Jean ${chapter.chapter}:${verse.number}`,
                chapter: chapter.chapter,
                verse: verse.number,
                chapterTitle: chapter.title,
                searchTerm: searchText,
                relevance: this.calculateRelevance(verse.text, searchText)
              });
            }
          }
        }
      }
      
      console.log(`Found ${results.length} search results`);
      return results;
    } catch (error) {
      console.error('Error searching John verses:', error);
      return [];
    }
  }

  /**
   * Calculate search relevance
   */
  calculateRelevance(text, searchTerm) {
    const textLower = text.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    
    const exactMatches = (textLower.match(new RegExp(searchLower, 'g')) || []).length;
    const wordMatches = searchLower.split(' ').reduce((count, word) => {
      return count + (textLower.includes(word) ? 1 : 0);
    }, 0);

    return exactMatches * 10 + wordMatches;
  }

  /**
   * Get John chapter for Bible Reader
   */
  async getJohnChapterForReader(chapterNumber) {
    const chapters = await this.getAllJohnChapters();
    return chapters.find(chapter => chapter.chapter === chapterNumber) || null;
  }

  /**
   * Get John reading plan (progressive chapters)
   */
  getJohnReadingPlan() {
    const lang = this.getCurrentLanguage();
    
    return {
      title: lang === 'fr' ? 'Plan de lecture - Évangile de Jean' : 'Reading Plan - Gospel of John',
      description: lang === 'fr' 
        ? 'Découvrez Jésus à travers les 21 chapitres de l\'Évangile de Jean'
        : 'Discover Jesus through the 21 chapters of the Gospel of John',
      totalChapters: 21,
      estimatedDays: 21,
      chapters: Array.from({ length: 21 }, (_, i) => ({
        day: i + 1,
        chapter: i + 1,
        title: this.getChapterTitle(i + 1, lang),
        estimatedTime: '10-15 min'
      }))
    };
  }
}

// Export singleton instance
export const gospelJohnTreasures = new GospelJohnTreasures();
export default gospelJohnTreasures;