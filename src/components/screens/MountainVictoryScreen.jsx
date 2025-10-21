import React, { useRef, useEffect, useState } from 'react';
import QuizMountain, { useQuizMountain } from '../QuizMountain';

const MountainVictoryScreen = ({ 
  currentLevel, levelStars, score, combo, setCurrentScreen 
}) => {
  const mountainRef = useRef();
  const mountain = useQuizMountain(mountainRef);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Montrer le bouton passer après 2 secondes
    const skipTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 2000);

    // Animation de victoire avec la montagne
    if (mountain.correctAnswer) {
      const stars = levelStars[currentLevel] || 3;
      const victoryPoints = stars * 10;
      
      setTimeout(() => {
        mountain.correctAnswer(victoryPoints);
      }, 500);
    }

    return () => clearTimeout(skipTimer);
  }, [levelStars, currentLevel, mountain]);

  const handleContinue = () => {
    setCurrentScreen('victory');
  };

  const handleSkip = () => {
    setCurrentScreen('victory');
  };

  return (
    <div className="relative z-10 h-full flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header avec informations */}
      <div className="text-center p-6 bg-white/90 backdrop-blur-sm">
        <div className="text-4xl mb-2">🏔️</div>
        <h2 className="text-2xl font-bold text-gray-800">Ascension Spirituelle</h2>
        <p className="text-gray-600">Niveau {currentLevel} • {levelStars[currentLevel] || 3} étoiles obtenues</p>
      </div>

      {/* QuizMountain en grand format */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <QuizMountain 
            ref={mountainRef}
            autoStart={false}
            showStats={true}
            onLevelChange={(level, waypoint) => {
              console.log(`🏔️ Progression: ${waypoint.label}`);
            }}
            onQuizComplete={(stats) => {
              console.log('🏆 Sommet spirituel atteint!', stats);
              setAnimationComplete(true);
            }}
          />
        </div>
      </div>

      {/* Informations sur la progression */}
      <div className="p-4 bg-white/90 backdrop-blur-sm">
        <div className="text-center mb-4">
          <div className="flex justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">📈</span>
              <span>Score: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">⭐</span>
              <span>Étoiles: {levelStars[currentLevel] || 3}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600">⚡</span>
              <span>Combo: x{combo}</span>
            </div>
          </div>
        </div>

        {/* Messages spirituels selon les étoiles */}
        <div className="text-center mb-4">
          {(levelStars[currentLevel] === 3 || !levelStars[currentLevel]) && (
            <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <p className="text-sm text-orange-800 font-medium">
                ✨ "Car mes pensées ne sont pas vos pensées" - L'agneau gravit vers la sagesse parfaite
              </p>
            </div>
          )}
          
          {levelStars[currentLevel] === 2 && (
            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800 font-medium">
                ⭐ "Cherchez et vous trouverez" - La montée continue vers la vérité
              </p>
            </div>
          )}
          
          {levelStars[currentLevel] === 1 && (
            <div className="p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200">
              <p className="text-sm text-green-800 font-medium">
                🌱 "La foi, même petite comme un grain de sénevé" - Premier pas vers la lumière
              </p>
            </div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-3">
          {showSkipButton && (
            <button
              onClick={handleSkip}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold 
                         hover:bg-gray-200 active:scale-95 transition-all duration-200"
            >
              Passer l'animation
            </button>
          )}
          
          <button
            onClick={handleContinue}
            disabled={!showSkipButton}
            className={`flex-1 py-3 rounded-full font-bold transition-all duration-200
                       ${showSkipButton 
                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg active:scale-95' 
                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            {animationComplete ? '🏆 Continuer' : 'Continuer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MountainVictoryScreen;