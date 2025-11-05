// ============================================================================
// CHAPTER DATA HOOK - useChapterData
// ============================================================================
// Hook pour obtenir les données des chapitres avec traductions

import { useMemo } from 'react';
import useTranslation from './useTranslation.js';

const useChapterData = () => {
  const { getChapter, currentLanguage } = useTranslation();

  // Mapping des niveaux vers les chapitres
  const getLevelChapter = (levelId) => {
    if (levelId >= 1 && levelId <= 13) return 1;
    if (levelId >= 14 && levelId <= 26) return 2;
    if (levelId >= 27 && levelId <= 39) return 3;
    if (levelId >= 40 && levelId <= 52) return 4;
    if (levelId >= 53 && levelId <= 65) return 5;
    if (levelId >= 66 && levelId <= 78) return 6;
    if (levelId >= 79 && levelId <= 91) return 7;
    if (levelId >= 92 && levelId <= 100) return 8;
    return 1;
  };

  // Obtenir les données d'un niveau avec traduction
  const getLevel = useMemo(() => {
    return (levelId) => {
      const chapterId = getLevelChapter(levelId);
      const chapterData = getChapter(chapterId);
      
      if (!chapterData || !chapterData.levels) {
        console.warn(`Chapitre ${chapterId} ou niveau ${levelId} non trouvé`);
        return null;
      }

      const level = chapterData.levels[levelId];
      if (!level) {
        console.warn(`Niveau ${levelId} non trouvé dans chapitre ${chapterId}`);
        return null;
      }

      return {
        ...level,
        chapterInfo: {
          id: chapterId,
          name: chapterData.name,
          description: chapterData.description
        }
      };
    };
  }, [getChapter]);

  return {
    getLevel,
    getChapter,
    getLevelChapter,
    currentLanguage
  };
};

export default useChapterData;