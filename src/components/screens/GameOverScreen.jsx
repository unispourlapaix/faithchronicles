import React, { useRef, useEffect } from 'react';
import QuizMountain from '../QuizMountain';
import { useQuizMountain } from '../QuizMountain/QuizMountain';
import useTranslation from '../../hooks/useTranslation';

const GameOverScreen = ({ 
  setLives, setQuestionsAnswered, setCurrentScreen 
}) => {
  const { t } = useTranslation();
  const mountainRef = useRef();
  const mountain = useQuizMountain(mountainRef);

  useEffect(() => {
    // Animation de défaite avec la montagne
    if (mountain.wrongAnswer) {
      // Simuler une grosse perte de points pour déclencher l'animation de défaite
      mountain.wrongAnswer(50);
    }
  }, [mountain]);

  const resetGame = () => {
    // Jouer le son de reset
    if (window.faithSounds && window.faithSounds.reset) {
      window.faithSounds.reset();
    }
    
    setLives(3);
    setQuestionsAnswered(0);
    setCurrentScreen('menu');
  };

  return (
    <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-black mb-3 flex items-center justify-center gap-2">
          💔 <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">{t('labels.testFailed')}</span> 💔
        </h2>
        
        <div className="bg-white rounded-lg p-2 mb-3 shadow-lg border border-red-100">
          <div className="text-center text-xs">
            <p className="text-gray-600 mb-1">{t('messages.defeatedQuote')}</p>
            <p className="text-gray-500 italic">{t('quotes.defeat')}</p>
          </div>
        </div>

        {/* Animation QuizMountain pour la défaite */}
        <div className="mb-6">
          <QuizMountain 
            ref={mountainRef}
            autoStart={false}
            className="compact"
            showStats={false}
            gameState={{
              currentChapter: 1,
              hasReachedSummit: false,
              currentStatus: "defeat"
            }}
            onLevelChange={(level, waypoint) => {
              console.log(`Défaite montagne: ${waypoint.label}`);
            }}
          />
        </div>

        <div className="flex gap-3">
          <button 
            onClick={resetGame}
            className="flex-1 py-2 bg-white text-black rounded-lg font-semibold shadow-lg border border-gray-200 hover:scale-105 active:scale-95 transition-all"
          >
            Menu
          </button>
          <button 
            onClick={() => {
              setLives(3);
              setQuestionsAnswered(0);
              setCurrentScreen('challenge');
            }}
            className="flex-1 py-2 bg-white text-black rounded-lg font-bold shadow-xl border-2 border-red-200 hover:scale-105 active:scale-95 transition-all"
          >
            ↻ Réessayer
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;