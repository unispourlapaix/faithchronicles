// ============================================================================
// GOSPEL OF JOHN PARSER - Simplified JavaScript Version
// ============================================================================
// Parser pour l'Évangile de Jean avec modules JavaScript

import johnData from './chapters/index.js';

/**
 * Gospel of John Parser - Simplified JavaScript Version
 */
export class GospelOfJohnParser {
  constructor() {
    this.johnData = johnData;
    this.currentLanguage = 'fr';
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
   * Get available languages (pour l'instant seulement français)
   */
  getAvailableLanguages() {
    return this.metadata.languages.map(lang => ({
      code: lang.code,
      name: lang.name,
      version: lang.version,
      year: lang.year,
      copyright: lang.copyright
    }));
  }

  /**
   * Get language metadata
   */
  getLanguageMetadata(languageCode) {
    return this.metadata.languages.find(lang => lang.code === languageCode);
  }

  /**
   * Load Gospel text for a specific language
   */
  async loadGospelText(languageCode = null) {
    const lang = languageCode || this.getCurrentLanguage();
    
    // Fallback to French if language not available
    const availableLang = this.metadata.languages.find(l => l.code === lang) 
      ? lang 
      : 'fr';

    if (this.loadedTexts.has(availableLang)) {
      return this.loadedTexts.get(availableLang);
    }

    try {
      const langMetadata = this.getLanguageMetadata(availableLang);
      const response = await fetch(`/src/data/bible/gospel/john/${langMetadata.file}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${availableLang}: ${response.statusText}`);
      }

      const text = await response.text();
      const parsedGospel = this.parseGospelText(text, availableLang);
      
      this.loadedTexts.set(availableLang, parsedGospel);
      return parsedGospel;
    } catch (error) {
      // console.error('Error loading Gospel of John:', error);
      
      // Fallback to French if available
      if (availableLang !== 'fr') {
        return this.loadGospelText('fr');
      }
      
      return null;
    }
  }

  /**
   * Parse Gospel text into structured data
   */
  parseGospelText(text, languageCode) {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const langMetadata = this.getLanguageMetadata(languageCode);
    
    const gospel = {
      language: languageCode,
      title: lines[0] || 'Gospel of John',
      version: langMetadata.version,
      copyright: langMetadata.copyright,
      chapters: new Map()
    };

    let currentChapter = null;
    let chapterTitle = '';

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip empty lines and metadata
      if (!trimmedLine || trimmedLine.includes('===') || 
          trimmedLine.includes('Public') || trimmedLine.includes('Domaine')) {
        continue;
      }

      // Chapter headers
      if (trimmedLine.startsWith('CHAPITRE') || trimmedLine.startsWith('CHAPTER')) {
        chapterTitle = trimmedLine;
        continue;
      }

      // Verse pattern: "1:1 Text..."
      const verseMatch = trimmedLine.match(/^(\d+):(\d+)\s+(.+)$/);
      if (verseMatch) {
        const [, chapterNum, verseNum, verseText] = verseMatch;
        const chapterNumber = parseInt(chapterNum);
        const verseNumber = parseInt(verseNum);

        if (!gospel.chapters.has(chapterNumber)) {
          gospel.chapters.set(chapterNumber, {
            number: chapterNumber,
            title: chapterTitle || `Chapter ${chapterNumber}`,
            verses: []
          });
        }

        const chapter = gospel.chapters.get(chapterNumber);
        chapter.verses.push({
          number: verseNumber,
          text: verseText.trim(),
          reference: `John ${chapterNumber}:${verseNumber}`,
          strong: [] // Strong numbers can be added later
        });
      }
    }

    return gospel;
  }

  /**
   * Get a specific chapter
   */
  async getChapter(chapterNumber, languageCode = null) {
    const gospel = await this.loadGospelText(languageCode);
    if (!gospel) return null;

    const chapter = gospel.chapters.get(chapterNumber);
    if (!chapter) return null;

    return {
      id: `John_${chapterNumber}`,
      book: 'Jean', // Will be localized later
      chapter: chapterNumber,
      title: chapter.title,
      verses: chapter.verses,
      language: gospel.language,
      version: gospel.version,
      copyright: gospel.copyright
    };
  }

  /**
   * Get all chapters
   */
  async getAllChapters(languageCode = null) {
    const gospel = await this.loadGospelText(languageCode);
    if (!gospel) return [];

    const chapters = [];
    for (let i = 1; i <= 21; i++) {
      const chapter = await this.getChapter(i, languageCode);
      if (chapter) {
        chapters.push(chapter);
      }
    }

    return chapters;
  }

  /**
   * Search verses containing specific text
   */
  async searchVerses(searchText, languageCode = null) {
    const gospel = await this.loadGospelText(languageCode);
    if (!gospel) return [];

    const results = [];
    const searchLower = searchText.toLowerCase();

    for (const [chapterNum, chapter] of gospel.chapters) {
      for (const verse of chapter.verses) {
        if (verse.text.toLowerCase().includes(searchLower)) {
          results.push({
            ...verse,
            chapter: chapterNum,
            chapterTitle: chapter.title
          });
        }
      }
    }

    return results;
  }

  /**
   * Get random verse
   */
  async getRandomVerse(languageCode = null) {
    const gospel = await this.loadGospelText(languageCode);
    if (!gospel) return null;

    const chapters = Array.from(gospel.chapters.values());
    const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];
    const randomVerse = randomChapter.verses[Math.floor(Math.random() * randomChapter.verses.length)];

    return {
      ...randomVerse,
      chapter: randomChapter.number,
      chapterTitle: randomChapter.title,
      book: 'Jean', // Localized
      version: gospel.version
    };
  }

  /**
   * Get famous verses (predefined list)
   */
  async getFamousVerses(languageCode = null) {
    const famousVerseRefs = [
      { chapter: 3, verse: 16 }, // For God so loved the world
      { chapter: 1, verse: 1 },  // In the beginning was the Word
      { chapter: 14, verse: 6 }, // I am the way, the truth, and the life
      { chapter: 8, verse: 12 }, // I am the light of the world
      { chapter: 10, verse: 11 }, // I am the good shepherd
      { chapter: 11, verse: 25 }, // I am the resurrection and the life
      { chapter: 1, verse: 14 }, // The Word became flesh
      { chapter: 15, verse: 13 } // Greater love has no one than this
    ];

    const verses = [];
    for (const ref of famousVerseRefs) {
      const chapter = await this.getChapter(ref.chapter, languageCode);
      if (chapter) {
        const verse = chapter.verses.find(v => v.number === ref.verse);
        if (verse) {
          verses.push({
            ...verse,
            chapter: ref.chapter,
            chapterTitle: chapter.title,
            book: 'Jean',
            version: chapter.version,
            famous: true
          });
        }
      }
    }

    return verses;
  }
}

// Export singleton instance
export const gospelOfJohn = new GospelOfJohnParser();
export default gospelOfJohn;