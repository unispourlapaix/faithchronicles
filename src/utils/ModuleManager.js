// ============================================================================
// MODULE MANAGER - Gestionnaire de chargement des chapitres
// ============================================================================

class ModuleManager {
  constructor() {
    this.loadedChapters = new Map();
    this.currentLanguage = 'fr';
    this.cache = new Map();
  }

  async loadChapter(chapterId) {
    const cacheKey = `${chapterId}_${this.currentLanguage}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      let chapterData;
      
      if (chapterId === 1) {
        const { chapter1Genesis } = await import('../data/chapters/chapter1_genesis.js');
        chapterData = chapter1Genesis;
      } else if (chapterId === 2) {
        const { chapter2Exodus } = await import('../data/chapters/chapter2_exodus.js');
        chapterData = chapter2Exodus;
      } else if (chapterId === 3) {
        const { chapter3Jesus } = await import('../data/chapters/chapter3_jesus.js');
        chapterData = chapter3Jesus;
      } else if (chapterId === 4) {
        const { chapter4CrucifixionResurrection } = await import('../data/chapters/chapter4_crucifixion_resurrection.js');
        chapterData = chapter4CrucifixionResurrection;
      } else if (chapterId === 5) {
        const { chapter5EarlyChurch } = await import('../data/chapters/chapter5_early_church.js');
        chapterData = chapter5EarlyChurch;
      } else if (chapterId === 6) {
        const { chapter6PaulMissions } = await import('../data/chapters/chapter6_paul_missions.js');
        chapterData = chapter6PaulMissions;
      } else if (chapterId === 7) {
        const { chapter7FinalLetters } = await import('../data/chapters/chapter7_final_letters.js');
        chapterData = chapter7FinalLetters;
      } else if (chapterId === 8) {
        const { chapter8Bonus } = await import('../data/chapters/chapter8_bonus.js');
        chapterData = chapter8Bonus;
      } else {
        console.warn(`Chapitre ${chapterId} pas encore implémenté`);
        return null;
      }

      try {
        const translation = await this.loadTranslation(chapterId);
        if (translation) {
          chapterData = this.mergeTranslation(chapterData, translation);
        }
      } catch (e) {
        console.warn(`Pas de traduction pour chapitre ${chapterId}`);
      }

      this.cache.set(cacheKey, chapterData);
      return chapterData;
      
    } catch (error) {
      console.error(`Erreur chargement chapitre ${chapterId}:`, error);
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
    else if (levelId >= 79 && levelId <= 91) chapterId = 7; // Lettres/Apocalypse
    else if (levelId === 92) chapterId = 8; // Niveau Bonus
    
    const chapter = await this.loadChapter(chapterId);
    if (!chapter) return null;
    return chapter.levels[levelId] || null;
  }

  async loadTranslation(chapterId) {
    try {
      const { translations } = await import(`../data/translations/${this.currentLanguage}/chapter${chapterId}.js`);
      return translations;
    } catch (error) {
      return null;
    }
  }

  mergeTranslation(chapterData, translation) {
    if (!translation) return chapterData;
    const merged = JSON.parse(JSON.stringify(chapterData));
    Object.keys(translation.levels || {}).forEach(levelId => {
      if (merged.levels[levelId]) {
        Object.assign(merged.levels[levelId], translation.levels[levelId]);
      }
    });
    return merged;
  }

  setLanguage(language) {
    this.currentLanguage = language;
    this.cache.clear();
  }

  async preloadChapters(chapterIds = [1]) {
    const promises = chapterIds.map(id => this.loadChapter(id));
    await Promise.allSettled(promises);
  }

  clearCache() {
    this.cache.clear();
    this.loadedChapters.clear();
  }
}

export const moduleManager = new ModuleManager();
export default ModuleManager;