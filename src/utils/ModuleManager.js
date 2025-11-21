// ============================================================================
// MODULE MANAGER - Gestionnaire de chargement des chapitres
// ============================================================================

import { 
  chapter1Genesis,
  chapter2Exodus,
  chapter3Jesus,
  chapter4CrucifixionResurrection,
  chapter5EarlyChurch,
  chapter6PaulMissions,
  chapter7FinalLetters,
  chapter8Bonus
} from '../data/chapters/index.js';

class ModuleManager {
  constructor() {
    this.loadedChapters = new Map();
    this.currentLanguage = 'fr';
    this.cache = new Map();
    
    // Pré-charger tous les chapitres pour éviter les imports dynamiques
    this.chapters = {
      1: chapter1Genesis,
      2: chapter2Exodus,
      3: chapter3Jesus,
      4: chapter4CrucifixionResurrection,
      5: chapter5EarlyChurch,
      6: chapter6PaulMissions,
      7: chapter7FinalLetters,
      8: chapter8Bonus
    };
  }

  async loadChapter(chapterId) {
    const cacheKey = `${chapterId}_${this.currentLanguage}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // console.log(`📚 Chargement chapitre ${chapterId}...`);
      
      // Utiliser les chapitres pré-chargés au lieu d'imports dynamiques
      let chapterData = this.chapters[chapterId];
      
      if (!chapterData) {
        // console.warn(`Chapitre ${chapterId} pas encore implémenté`);
        return null;
      }

      try {
        const translation = await this.loadTranslation(chapterId);
        if (translation) {
          chapterData = this.mergeTranslation(chapterData, translation);
        }
      } catch (e) {
        // Pas de traduction disponible - utilisation du français par défaut
        // console.log(`ℹ️ Chapitre ${chapterId}: utilisation de la version française`);
      }

      this.cache.set(cacheKey, chapterData);
      // console.log(`✅ Chapitre ${chapterId} chargé avec succès`);
      return chapterData;
      
    } catch (error) {
      // console.error(`Erreur chargement chapitre ${chapterId}:`, error);
      return null;
    }
  }

  async getLevel(levelId) {
    // Mapping correct des niveaux vers les chapitres
    let chapterId = 1;
    if (levelId >= 1 && levelId <= 13) chapterId = 1;      // Genèse
    else if (levelId >= 14 && levelId <= 26) chapterId = 2; // Exode  
    else if (levelId >= 27 && levelId <= 39) chapterId = 3; // Jésus
    else if (levelId >= 40 && levelId <= 52) chapterId = 4; // Crucifixion/Résurrection
    else if (levelId >= 53 && levelId <= 65) chapterId = 5; // Église primitive
    else if (levelId >= 66 && levelId <= 78) chapterId = 6; // Missions de Paul
    else if (levelId >= 79 && levelId <= 91) chapterId = 7; // Lettres finales
    else if (levelId >= 92 && levelId <= 100) chapterId = 8; // Bonus
    else return null;

    const chapter = await this.loadChapter(chapterId);
    if (!chapter) return null;

    // Les niveaux dans les chapitres utilisent l'ID global, pas local
    const level = chapter.levels[levelId];

    if (!level) {
      // console.error(`Niveau ${levelId} non trouvé dans chapitre ${chapterId}`);
      // console.log('Niveaux disponibles:', Object.keys(chapter.levels));
      return null;
    }

    return {
      ...level,
      chapterInfo: {
        id: chapter.id,
        name: chapter.name,
        icon: chapter.icon,
        description: chapter.description
      }
    };
  }

  async loadTranslation(chapterId, getChapter) {
    // Utiliser la fonction getChapter du hook useTranslation si disponible
    if (getChapter) {
      return getChapter(chapterId);
    }
    
    // Le français est la langue source - pas besoin de traduction
    if (this.currentLanguage === 'fr') {
      return null;
    }
    
    // Fallback vers l'ancien système
    try {
      const response = await import(`../data/translations/${this.currentLanguage}/interface_chapter${chapterId}.js`);
      return response.default;
    } catch (error) {
      // console.log(`⚠️ Traduction pour chapitre ${chapterId} en ${this.currentLanguage} non disponible`);
      return null;
    }
  }

  mergeTranslation(chapterData, translation) {
    if (!translation) return chapterData;
    
    const mergedLevels = {};
    
    // Les levels sont des objets avec des clés numériques, pas des tableaux
    Object.keys(chapterData.levels).forEach(levelKey => {
      const level = chapterData.levels[levelKey];
      const translatedLevel = translation.levels?.[levelKey];
      
      if (!translatedLevel) {
        mergedLevels[levelKey] = level;
        return;
      }
      
      mergedLevels[levelKey] = {
        ...level,
        name: translatedLevel.name || level.name,
        challenge: translatedLevel.challenge || level.challenge,
        questions: {
          easy: this.mergeQuestion(level.questions.easy, translatedLevel.easy),
          medium: this.mergeQuestion(level.questions.medium, translatedLevel.medium),
          hard: this.mergeQuestion(level.questions.hard, translatedLevel.hard)
        }
      };
    });
    
    return {
      ...chapterData,
      name: translation.name || chapterData.name,
      description: translation.description || chapterData.description,
      spiritualWisdom: translation.spiritualWisdom || chapterData.spiritualWisdom,
      levels: mergedLevels
    };
  }
  
  mergeQuestion(originalQuestion, translatedQuestion) {
    if (!translatedQuestion) return originalQuestion;
    
    return {
      ...originalQuestion,
      question: translatedQuestion.question || originalQuestion.question,
      options: translatedQuestion.options || originalQuestion.options,
      hint: translatedQuestion.hint || originalQuestion.hint,
      funFact: translatedQuestion.funFact || originalQuestion.funFact
    };
  }

  setLanguage(language) {
    this.currentLanguage = language;
    this.cache.clear();
  }

  async preloadChapters(chapterIds = [1]) {
    for (const id of chapterIds) {
      await this.loadChapter(id);
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const moduleManager = new ModuleManager();