import React, { useState, useRef, useEffect } from 'react';
import { getStrongDictionary } from '../data/bible/strong/index.js';
import useTranslation from '../hooks/useTranslation';

/**
 * Composant pour afficher un mot avec Strong number en overlay
 */
const StrongWord = ({ word, strongNumber, language = 'fr' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  const wordRef = useRef(null);
  const { t } = useTranslation();

  // Récupérer la définition Strong dans la langue actuelle
  const strongDict = getStrongDictionary(language);
  const definition = strongDict[strongNumber];

  // Fermer le tooltip en cliquant ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(event.target) &&
        wordRef.current &&
        !wordRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showTooltip]);

  if (!definition) {
    return <span>{word}</span>;
  }

  return (
    <span className="relative inline-block">
      <span
        ref={wordRef}
        data-strong-word="true"
        onClick={(e) => {
          e.stopPropagation(); // Empêcher le clic de remonter au verset
          setShowTooltip(!showTooltip);
        }}
        className="cursor-pointer relative transition-all hover:text-blue-600"
        style={{
          // Petits points bleus sous le mot (plus discret)
          backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
          backgroundSize: '4px 4px',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'repeat-x',
          paddingBottom: '3px'
        }}
        title={`${strongNumber}: ${definition.meaning}`}
      >
        {word}
      </span>

      {showTooltip && (
        <div
          ref={tooltipRef}
          className="fixed z-50 bg-white rounded-lg shadow-xl border-2 border-blue-200 animate-fadeIn p-4"
          style={{ 
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            maxWidth: '400px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                {strongNumber}
              </span>
              <span className="font-bold text-gray-800 text-lg">
                {definition.word}
              </span>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={t('bible.close')}
            >
              ✕
            </button>
          </div>

          {/* Translitération et prononciation */}
          {(definition.transliteration || definition.pronunciation) && (
            <div className="text-sm text-gray-600 mb-2 italic">
              {definition.transliteration && (
                <span>{definition.transliteration}</span>
              )}
              {definition.pronunciation && (
                <span className="ml-2">({definition.pronunciation})</span>
              )}
            </div>
          )}

          {/* Signification */}
          <div className="mb-3 text-center">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
              {t('bible.meaning')}
            </div>
            <div className="text-gray-800 font-medium">
              {definition.meaning}
            </div>
          </div>

          {/* Définition */}
          {definition.definition && (
            <div className="mb-3 text-center">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                {t('bible.definition')}
              </div>
              <div className="text-sm text-gray-700 leading-relaxed">
                {definition.definition}
              </div>
            </div>
          )}

          {/* Usage */}
          {definition.usage && (
            <div className="mb-3 text-center">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                {t('bible.usage')}
              </div>
              <div className="text-sm text-gray-600">
                {definition.usage}
              </div>
            </div>
          )}

          {/* Étymologie */}
          {definition.etymology && (
            <div className="pt-2 border-t border-gray-100 text-center">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                {t('bible.etymology')}
              </div>
              <div className="text-xs text-gray-600 italic">
                {definition.etymology}
              </div>
            </div>
          )}
        </div>
      )}
    </span>
  );
};

export default StrongWord;
