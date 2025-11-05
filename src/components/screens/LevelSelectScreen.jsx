import React, { useState, useEffect } from 'react';
import { Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';
import useChapterData from '../../hooks/useChapterData';

const LevelSelectScreen = ({ 
  levelStars, unlockedLevels, setCurrentScreen, setCurrentLevel, moduleManager, audio 
}) => {
  const { t } = useTranslation();
  const { getChapter, getLevel } = useChapterData();
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapterData, setChapterData] = useState(null);

  // Configuration des chapitres
  const chapters = {
    1: { name: t('chapters.1'), icon: "🌱", levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
    2: { name: t('chapters.2'), icon: "🌊", levels: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26] },
    3: { name: t('chapters.3'), icon: "✝️", levels: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39] },
    4: { name: t('chapters.4'), icon: "🕊️", levels: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52] },
    5: { name: t('chapters.5'), icon: "🔥", levels: [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65] },
    6: { name: t('chapters.6'), icon: "⛵", levels: [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78] },
    7: { name: t('chapters.7'), icon: "📜", levels: [79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91] },
    8: { name: t('chapters.8'), icon: "🏆", levels: [92] }
  };

  useEffect(() => {
    try {
      const data = getChapter(currentChapter);
      setChapterData(data);
    } catch (error) {
      console.error("Erreur chargement chapitre:", error);
    }
  }, [currentChapter, getChapter]);

  const getTotalStars = () => {
    return Object.values(levelStars).reduce((total, stars) => total + stars, 0);
  };

  const getAvailableChapters = () => {
    const availableChapters = [1, 2, 3, 4, 5, 6, 7];
    // Ajouter le chapitre bonus si le niveau 92 est débloqué
    if (unlockedLevels.includes(92)) {
      availableChapters.push(8);
    }
    return availableChapters;
  };

  const getChapterStars = (chapterLevels) => {
    return chapterLevels.reduce((total, level) => total + (levelStars[level] || 0), 0);
  };

  const handleSelectLevel = async (level) => {
    if (unlockedLevels.includes(level)) {
      audio?.sounds?.buttonClick(); // Son de sélection de niveau
      setCurrentLevel(level);
      
      try {
        const levelData = getLevel(level);
        if (levelData) {
          setCurrentScreen('challenge');
        }
      } catch (error) {
        console.error("Erreur chargement niveau:", error);
      }
    } else {
      audio?.sounds?.wrongAnswer(); // Son pour niveau verrouillé
    }
  };

  const currentChapterInfo = chapters[currentChapter];
  const chapterStars = getChapterStars(currentChapterInfo.levels);
  const maxChapterStars = currentChapterInfo.levels.length * 3;

  return (
    <div className="relative z-10 p-6 h-full overflow-y-auto">
      {/* Navigation des chapitres */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            audio?.sounds?.cheube(); // Son de navigation
            setCurrentChapter(Math.max(1, currentChapter - 1));
          }}
          disabled={currentChapter === 1}
          className={`p-2 rounded-full ${currentChapter === 1 ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-100'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="text-center flex-1">
          <h2 className="text-2xl font-bold text-black flex items-center justify-center gap-2">
            <span className="text-2xl">{currentChapterInfo.icon}</span>
            {t('messages.chapter')} {currentChapter}
          </h2>
          <p className="text-lg text-gray-700 font-semibold">{currentChapterInfo.name}</p>
        </div>

        <button
          onClick={() => {
            audio?.sounds?.cheube(); // Son de navigation
            setCurrentChapter(Math.min(getAvailableChapters().length, currentChapter + 1));
          }}
          disabled={currentChapter === getAvailableChapters().length}
          className={`p-2 rounded-full ${currentChapter === getAvailableChapters().length ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-100'}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicateur de chapitre */}
      <div className="flex justify-center mb-4">
        <div className="flex gap-2">
          {getAvailableChapters().map((chapter) => (
            <button
              key={chapter}
              onClick={() => setCurrentChapter(chapter)}
              className={`w-3 h-3 rounded-full transition-all ${
                chapter === currentChapter 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Sagesse spirituelle du chapitre */}
      {chapterData?.spiritualWisdom && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6 border border-purple-200">
          <div className="text-center">
            <p className="text-sm font-semibold text-purple-800 mb-1">
              {chapterData.spiritualWisdom.principle}
            </p>
            <p className="text-xs text-purple-600 italic">
              "{chapterData.spiritualWisdom.application}"
            </p>
          </div>
        </div>
      )}

      {/* Statistiques */}
      <div className="text-center mb-6">
        <div className="text-sm text-gray-600">
          {t('messages.chapterStars')} : {chapterStars}/{maxChapterStars}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all"
            style={{width: `${Math.min((chapterStars / maxChapterStars) * 100, 100)}%`}}
          ></div>
        </div>
        <div className="text-xs text-green-600 italic mt-2">
          {t('messages.totalGlobal')} : {getTotalStars()}/273 {t('labels.stars').toLowerCase()}
        </div>
      </div>
      
      {/* Grille des niveaux */}
      <div className="grid grid-cols-4 gap-2">
        {currentChapterInfo.levels.map((level) => {
          const stars = levelStars[level] || 0;
          const isUnlocked = unlockedLevels.includes(level);
          
          return (
            <button
              key={level}
              onClick={() => handleSelectLevel(level)}
              disabled={!isUnlocked}
              className={`aspect-square rounded-full flex flex-col items-center justify-center
                        transform transition-all hover:scale-105 active:scale-95 shadow-md
                        ${isUnlocked 
                          ? 'bg-white text-black border border-blue-200' 
                          : 'bg-gray-200 text-gray-400'}`}
              style={isUnlocked ? {
                boxShadow: '0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)'
              } : {}}
            >
              {isUnlocked ? (
                <>
                  <div className="text-lg font-bold">{level}</div>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3].map((star) => (
                      <span
                        key={star}
                        className={`text-xs cursor-pointer transition-all hover:scale-110 ${star <= stars ? 'text-yellow-400' : 'text-gray-300'}`}
                        onClick={(e) => {
                          e.stopPropagation(); // Empêche le clic sur le bouton niveau
                          if (star <= stars) {
                            audio?.sounds?.picth(); // Son cristallin pour les étoiles obtenues
                          }
                        }}
                        title={star <= stars ? `Étoile ${star} obtenue` : `Étoile ${star} non obtenue`}
                      >
                        {star <= stars ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <Lock className="w-6 h-6" />
              )}
            </button>
          );
        })}
      </div>
      
      <button 
        onClick={() => {
          audio?.sounds?.wrash();
          setCurrentScreen('menu');
        }}
        className="mt-6 w-full py-3 bg-white text-black rounded-full font-semibold shadow-lg border-2 border-gray-200 hover:scale-105 active:scale-95 transition-all"
      >
        {t('messages.backToMenu')}
      </button>
    </div>
  );
};

export default LevelSelectScreen;