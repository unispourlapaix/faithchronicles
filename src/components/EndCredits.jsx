import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

const EndCredits = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const { t } = useTranslation();

  const creditLines = t('endCredits.lines');

  useEffect(() => {
    if (currentLine < creditLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
      }, creditLines[currentLine]?.delay || 2000);
      return () => clearTimeout(timer);
    } else if (!showFinalMessage) {
      setTimeout(() => setShowFinalMessage(true), 1000);
    }
  }, [currentLine, creditLines, showFinalMessage]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-orange-600 z-50 overflow-hidden">
      {/* Croix jaune en haut avec cercle blanc */}
      <div className="absolute top-8 flex items-center justify-center">
        <div className="relative">
          {/* Cercle blanc */}
          <div className="w-20 h-20 bg-white rounded-full border-2 border-yellow-400 shadow-lg"></div>
          {/* Grand + jaune au centre qui pulse */}
          <div className="absolute inset-0 flex items-center justify-center text-7xl text-yellow-500 font-bold animate-pulse">
            +
          </div>
        </div>
      </div>
      
      {/* Symboles + arc-en-ciel animés */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => {
          const colors = ['text-red-400', 'text-orange-400', 'text-yellow-400', 'text-green-400', 'text-blue-400', 'text-indigo-400', 'text-purple-400'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className={`absolute ${randomColor} animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: '14px'
              }}
            >
              +
            </div>
          );
        })}
      </div>

      {/* Crédits qui défilent */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-6">
        <div className="text-center space-y-2 max-w-lg">
          {creditLines.slice(Math.max(0, currentLine - 6), currentLine + 1).map((line, index) => {
            const actualIndex = Math.max(0, currentLine - 6) + index;
            const isCurrentLine = actualIndex === currentLine;
            const distance = Math.abs(actualIndex - currentLine);
            
            return (
              <div
                key={actualIndex}
                className={`transition-all duration-1000 transform text-center ${
                  isCurrentLine 
                    ? 'opacity-100 translate-y-0 scale-110 text-orange-600 font-bold' 
                    : distance === 1
                    ? 'opacity-80 translate-y-1 scale-105 text-orange-500'
                    : distance === 2
                    ? 'opacity-60 translate-y-2 scale-100 text-orange-400'
                    : distance === 3
                    ? 'opacity-45 translate-y-3 scale-95 text-orange-300'
                    : distance === 4
                    ? 'opacity-30 translate-y-4 scale-90 text-orange-200'
                    : distance === 5
                    ? 'opacity-20 translate-y-5 scale-85 text-orange-100'
                    : 'opacity-10 translate-y-6 scale-80 text-orange-50'
                }`}
                style={{
                  fontSize: isCurrentLine ? '0.9rem' : distance === 1 ? '0.8rem' : distance <= 3 ? '0.7rem' : '0.65rem',
                  fontWeight: isCurrentLine ? 'bold' : distance === 1 ? 'semibold' : 'normal',
                  textShadow: isCurrentLine ? '0 0 15px rgba(255,165,0,0.6)' : 'none'
                }}
              >
                {line.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Message final épique */}
      {showFinalMessage && (
        <div className="fixed inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 flex flex-col items-center justify-center animate-pulse z-[60]">
          <div className="text-center transform animate-bounce">
            <div className="text-2xl font-black text-white mb-3 drop-shadow-2xl">
              {t('endCredits.finalMessages.congratulations')}
            </div>
            <div className="text-lg font-bold text-white mb-3 drop-shadow-lg">
              {t('endCredits.finalMessages.proud')}
            </div>
            <div className="text-base font-semibold text-white mb-4 drop-shadow-lg">
              {t('endCredits.finalMessages.courage')}
            </div>
            <div className="text-base font-medium text-white mb-4 drop-shadow-md">
              {t('endCredits.finalMessages.peace')}
            </div>
            <div className="text-base font-medium text-white mb-6 drop-shadow-md">
              {t('endCredits.finalMessages.child')}
            </div>
            <div className="text-lg font-bold text-white animate-pulse drop-shadow-xl">
              {t('endCredits.finalMessages.blessing')}
            </div>
          </div>
          
          <button
            onClick={() => {
              console.log('Bouton Continuer cliqué');
              if (onComplete) {
                onComplete();
              } else {
                console.error('onComplete non défini');
              }
            }}
            className="mt-8 px-6 py-3 bg-white text-purple-900 rounded-full font-bold text-base shadow-2xl hover:bg-yellow-100 transition-all transform hover:scale-110 active:scale-95 cursor-pointer relative z-[70]"
          >
            {t('endCredits.finalMessages.continue')}
          </button>
        </div>
      )}
    </div>
  );
};

export default EndCredits;