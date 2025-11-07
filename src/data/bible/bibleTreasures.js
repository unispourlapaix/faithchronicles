// ============================================================================
// BIBLE TREASURES MODULE - Multilingual Bible treasures and wisdom
// ============================================================================
import { bibleData } from './bibleData.js';
import { strongGreek } from './strongGreek.js';

/**
 * Bible Treasures Manager - Handles multilingual bible content
 * Integrates with the translation system for complete localization
 */
export const bibleTreasures = {
  
  /**
   * Get current language from localStorage (same logic as useTranslation)
   */
  getCurrentLanguage() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('faithchronicles_language');
      return saved || 'fr';
    }
    return 'fr';
  },

  /**
   * Get localized Bible data for current language
   */
  getLocalizedBibleData(dataType) {
    return bibleData.getLocalizedData(dataType);
  },

  /**
   * Get a random Bible verse in current language
   */
  getRandomVerse() {
    const verses = this.getLocalizedBibleData('verses');
    return verses[Math.floor(Math.random() * verses.length)];
  },

  /**
   * Get a random Bible fact in current language  
   */
  getRandomFact() {
    const facts = this.getLocalizedBibleData('facts');
    return facts[Math.floor(Math.random() * facts.length)];
  },

  /**
   * Get a random fun question in current language
   */
  getRandomFunQuestion() {
    const questions = this.getLocalizedBibleData('funQuestions');
    return questions[Math.floor(Math.random() * questions.length)];
  },

  /**
   * Get a random biblical treasure in current language
   */
  getRandomBiblicalTreasure() {
    const treasures = this.getLocalizedBibleData('bibleTreasures');
    return treasures[Math.floor(Math.random() * treasures.length)];
  },

  /**
   * Get a random John treasure
   */
  async getRandomJohnTreasure() {
    try {
      return await bibleData.getRandomJohnTreasure();
    } catch (error) {
      console.error('Error getting John treasure:', error);
      return null;
    }
  },

  /**
   * Get a random Jesus clarification in current language
   */
  getRandomJesusClarification() {
    return bibleData.getRandomJesusIsNotLocalized();
  },

  /**
   * Get Jesus clarification by category in current language
   */
  getJesusClarificationByCategory(category) {
    return bibleData.getJesusIsNotByCategory(category);
  },

  /**
   * Get a complete treasure package with all elements localized
   * @param {Function} t - Translation function from useTranslation hook
   */
  getCompleteTreasure(t = null) {
    const verse = this.getRandomVerse();
    const fact = this.getRandomFact();
    const funQuestion = this.getRandomFunQuestion();
    const jesusClarification = this.getRandomJesusClarification();
    
    // Get Strong's reference from verse if available
    const strongKeys = verse.strongNumbers ? Object.keys(verse.strongNumbers) : [];
    const randomStrongKey = strongKeys.length > 0 ? strongKeys[Math.floor(Math.random() * strongKeys.length)] : null;
    const strongRef = randomStrongKey ? verse.strongNumbers[randomStrongKey] : null;
    const strongData = strongRef ? strongGreek[strongRef] : null;

    // Get Bible resources (with translation support)
    const offlineBibleResource = bibleData.bibleResources?.find(r => r.name === "translatable:inAppReader");
    const translatedOfflineResource = offlineBibleResource && t ? {
      ...offlineBibleResource,
      name: t('bibleResources.inAppReader.name'),
      description: t('bibleResources.inAppReader.description'),
      features: [
        t('bibleResources.inAppReader.features.offline'),
        t('bibleResources.inAppReader.features.strong'),
        t('bibleResources.inAppReader.features.navigation')
      ]
    } : offlineBibleResource;
    
    const otherBibleResource = bibleData.getRandomBibleResource ? bibleData.getRandomBibleResource(t) : null;

    return {
      // Core content
      verse: {
        text: verse.text,
        reference: verse.reference,
        context: verse.context,
        theme: verse.theme,
        version: verse.version
      },
      
      fact: {
        text: fact.text,
        theme: fact.theme || 'general'
      },
      
      funQuestion: {
        question: funQuestion.question,
        answer: funQuestion.answer,
        reference: funQuestion.reference,
        theme: funQuestion.theme,
        emoji: funQuestion.emoji
      },
      
      jesusClarification: {
        category: jesusClarification.category,
        text: jesusClarification.text,
        reference: jesusClarification.reference,
        context: jesusClarification.context
      },

      // Strong's dictionary reference
      strongReference: strongData ? {
        number: strongRef,
        word: strongData.word,
        transliteration: strongData.transliteration,
        meaning: strongData.meaning
      } : null,

      // Bible resources
      resources: {
        offline: translatedOfflineResource,
        online: otherBibleResource
      },

      // Metadata
      language: this.getCurrentLanguage(),
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Get treasure formatted for UI display (backward compatibility)
   * @param {Function} t - Translation function from useTranslation hook
   */
  getRandomTreasure(t = null) {
    const treasure = this.getCompleteTreasure(t);
    
    return {
      verse: `"${treasure.verse.text}" - ${treasure.verse.reference}`,
      fact: treasure.fact.text,
      treasure: `Contexte : ${treasure.verse.context}`,
      question: `${treasure.funQuestion.question} ${treasure.funQuestion.emoji || '🤔'}`,
      jesusIsNot: `❌ ${treasure.jesusClarification.text}`,
      jesusIsNotContext: `📖 ${treasure.jesusClarification.reference} - ${treasure.jesusClarification.context}`,
      strongGreek: treasure.strongReference ? 
        `Strong ${treasure.strongReference.number} : ${treasure.strongReference.word} (${treasure.strongReference.transliteration}) = ${treasure.strongReference.meaning}` :
        `Strong : Référence biblique pour étude approfondie`,
      bibleResource: treasure.resources.offline || treasure.resources.online,
      otherBibleResource: treasure.resources.online,
      theme: treasure.verse.theme,
      version: bibleData.versions?.[treasure.verse.version]?.name || treasure.verse.version
    };
  },

  /**
   * Get treasures by theme
   */
  getTreasuresByTheme(theme) {
    const verses = this.getLocalizedBibleData('verses').filter(v => v.theme === theme);
    const facts = this.getLocalizedBibleData('facts').filter(f => f.theme === theme);
    const questions = this.getLocalizedBibleData('funQuestions').filter(q => q.theme === theme);
    
    return {
      verses,
      facts,
      questions,
      count: verses.length + facts.length + questions.length
    };
  },

  /**
   * Get all available themes for current language
   */
  getAvailableThemes() {
    const verses = this.getLocalizedBibleData('verses');
    const facts = this.getLocalizedBibleData('facts');
    const questions = this.getLocalizedBibleData('funQuestions');
    
    const themes = new Set();
    [...verses, ...facts, ...questions].forEach(item => {
      if (item.theme) themes.add(item.theme);
    });
    
    return Array.from(themes).sort();
  }
};

export default bibleTreasures;