// ============================================================================
// INDEX DES CHAPITRES - FAITH CHRONICLES
// ============================================================================

import { chapter1Genesis } from './chapter1_genesis.js';
import { chapter2Exodus } from './chapter2_exodus.js';
import { chapter3Jesus } from './chapter3_jesus.js';
import { chapter4CrucifixionResurrection } from './chapter4_crucifixion_resurrection.js';
import { chapter5EarlyChurch } from './chapter5_early_church.js';
import { chapter6PaulMissions } from './chapter6_paul_missions.js';
import { chapter7FinalLetters } from './chapter7_final_letters.js';
import { chapter8Bonus } from './chapter8_bonus.js';

// Export de tous les chapitres
export const CHAPTERS = [
  chapter1Genesis,
  chapter2Exodus,
  chapter3Jesus,
  chapter4CrucifixionResurrection,
  chapter5EarlyChurch,
  chapter6PaulMissions,
  chapter7FinalLetters,
  chapter8Bonus
];

// Export individuel pour compatibilité
export {
  chapter1Genesis,
  chapter2Exodus,
  chapter3Jesus,
  chapter4CrucifixionResurrection,
  chapter5EarlyChurch,
  chapter6PaulMissions,
  chapter7FinalLetters,
  chapter8Bonus
};

// Helper functions
export const getChapterByLevel = (level) => {
  return CHAPTERS.find(chapter => 
    level >= chapter.levelRange.start && level <= chapter.levelRange.end
  );
};

export const getTotalLevels = () => {
  return CHAPTERS.reduce((total, chapter) => 
    total + (chapter.levelRange.end - chapter.levelRange.start + 1), 0
  );
};

export const getAllLevels = () => {
  const levels = [];
  CHAPTERS.forEach(chapter => {
    for (let i = chapter.levelRange.start; i <= chapter.levelRange.end; i++) {
      levels.push({
        level: i,
        chapter: chapter.id,
        chapterName: chapter.name,
        chapterIcon: chapter.icon
      });
    }
  });
  return levels;
};