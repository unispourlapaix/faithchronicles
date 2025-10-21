import React, { useRef, useEffect } from 'react';
import QuizMountain, { useQuizMountain } from '../QuizMountain';

const VictoryScreen = ({ 
  currentLevel, levelStars, score, combo, unlockedLevels, setCurrentLevel, 
  setQuestionsAnswered, setLives, setCurrentScreen 
}) => {
  const mountainRef = useRef();
  const mountain = useQuizMountain(mountainRef);

  useEffect(() => {
    // Logique de progression basée sur les événements du jeu
    const currentChapter = Math.min(8, Math.ceil(currentLevel / 13) || 1);
    
    if (currentLevel >= 91) {
      // Dernier niveau du chapitre 7 = VICTOIRE
      console.log('🏆 Victoire finale ! Animation au sommet');
      mountain.triggerVictory();
      
      // Débloquer chapitre 8 si 273 étoiles atteintes
      const totalStars = Object.values(levelStars).reduce((total, stars) => total + stars, 0);
      if (totalStars >= 273) {
        setTimeout(() => {
          console.log('✨ 273 étoiles atteintes ! Déblocage chapitre 8');
          mountain.unlockChapter8();
        }, 2000); // 2 secondes après la victoire
      }
    } else {
      // Progression normale de chapitre
      console.log(`🏔️ Chapitre ${currentChapter} terminé`);
      mountain.completeChapter(currentChapter);
    }
  }, [currentLevel, mountain, levelStars]);

  return (
    <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-black mb-3 flex items-center justify-center gap-2">
          🏆 <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Connaissance Maîtrisée !</span> 🏆
        </h2>
        <div className="bg-white rounded-lg p-2 mb-3 shadow-lg border border-blue-100">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Niv.{currentLevel}</span>
              <div className="flex gap-0.5">
                {[1, 2, 3].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${star <= (levelStars[currentLevel] || 3) ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    {star <= (levelStars[currentLevel] || 3) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-gray-600">
                {(levelStars[currentLevel] || 3) === 3 ? "✨ Parfait" : 
                 (levelStars[currentLevel] || 3) === 2 ? "⭐ Bien" :
                 "⭐ Début"}
              </span>
              {currentLevel >= 91 && (
                <span className="text-xs bg-gold-100 text-gold-700 px-2 py-1 rounded-full font-bold">
                  🎺 NIVEAU SECRET DÉBLOQUÉ!
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-purple-600">{currentLevel >= 91 ? '999' : score}</span>
              <span className="font-bold text-blue-600">{currentLevel >= 91 ? 'x99' : `x${combo}`}</span>
              <span className="font-bold text-green-600">{currentLevel >= 91 ? '+999' : '+85'}</span>
            </div>
          </div>
        </div>

        {/* Animation QuizMountain pour la victoire */}
        <div className="mb-6">
          <QuizMountain 
            ref={mountainRef}
            autoStart={false}
            className="compact"
            showStats={true}
            gameState={{
              currentChapter: Math.min(8, Math.ceil(currentLevel / 13) || 1), // Convertir niveau en chapitre (1-8)
              hasReachedSummit: currentLevel >= 91, // Niveau 91 = dernier niveau du chapitre 7
              currentStatus: currentLevel >= 91 ? "victory" : "progress",
              currentLevel: currentLevel // Passer le niveau actuel
            }}
            onLevelChange={(level, waypoint) => {
              console.log(`Progression montagne: ${waypoint.label}`);
            }}
            onQuizComplete={(stats) => {
              console.log('🏔️ Sommet atteint!', stats);
            }}
          />
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => setCurrentScreen('levelSelect')}
            className="flex-1 py-2 bg-white text-black rounded-lg font-semibold shadow-lg border border-gray-200 hover:scale-105 active:scale-95 transition-all"
          >
            Retour
          </button>
          <button 
            onClick={() => {
              setQuestionsAnswered(0);
              setLives(3);
              
              if (currentLevel >= 91) {
                // Niveau 91+ : Aller au chapitre 8 (niveau 92)
                setCurrentLevel(92);
                setCurrentScreen('challenge');
              } else {
                // Autres niveaux : Logique normale
                const nextLevel = currentLevel + 1;
                if (unlockedLevels.includes(nextLevel)) {
                  setCurrentLevel(nextLevel);
                  setCurrentScreen('challenge');
                } else {
                  setCurrentScreen('levelSelect');
                }
              }
            }}
            className={`flex-1 py-2 bg-white text-black rounded-lg font-bold shadow-xl border-2 hover:scale-105 active:scale-95 transition-all ${
              currentLevel >= 91 ? 'border-gold-300 bg-gradient-to-r from-gold-50 to-yellow-50' : 'border-blue-200'
            }`}
          >
            {currentLevel >= 91 ? 
              <span className="flex items-center justify-center gap-1">
                🏆 Chapitre Secret
              </span> : 
              (unlockedLevels.includes(currentLevel + 1) ? 'Suivant' : 'Niveaux')
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default VictoryScreen;