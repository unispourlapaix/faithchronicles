import React, { useState, useEffect } from 'react';
import { ChevronLeft, Book, Heart } from 'lucide-react';
import { bibleData } from '../../data/bible';
import useTranslation from '../../hooks/useTranslation.js';
import VerseWithStrong from '../VerseWithStrong';
import UnityPeaceModule from '../UnityPeaceModule';

const BibleReaderScreen = ({ setCurrentScreen }) => {
  const { t, currentLanguage } = useTranslation();
  const [currentPassage, setCurrentPassage] = useState(null);
  const [availablePassages, setAvailablePassages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('bible'); // 'bible' ou 'unity'

  useEffect(() => {
    const loadPassages = async () => {
      try {
        // Vider le cache des chapitres de Jean pour la nouvelle langue
        bibleData.clearJohnChaptersCache();
        
        // Passer explicitement la langue actuelle
        const passages = await bibleData.getAllPassages(currentLanguage);
        setAvailablePassages(passages);
        if (passages.length > 0) {
          setCurrentPassage(passages[0]);
        }
      } catch (error) {
        console.error('Error loading Bible passages:', error);
        // Fallback to empty state
        setAvailablePassages([]);
      }
    };

    loadPassages();
  }, [currentLanguage]); // Recharger quand la langue change

  const navigatePassage = (direction) => {
    const newIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, availablePassages.length - 1)
      : Math.max(currentIndex - 1, 0);
    
    setCurrentIndex(newIndex);
    setCurrentPassage(availablePassages[newIndex]);
  };

  if (!currentPassage) {
    return (
      <div className="relative z-10 p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <Book className="w-12 h-12 mx-auto text-blue-500 mb-4" />
          <p className="text-gray-600">{t('bible.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 p-4 h-full flex flex-col">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => setCurrentScreen('menu')}
          className="flex items-center gap-2 py-2 px-3 bg-white/80 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Menu</span>
        </button>
        
        <div className="flex gap-1 bg-white/80 rounded-lg p-0.5">
          <button
            onClick={() => setActiveTab('bible')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition-all ${
              activeTab === 'bible'
                ? 'bg-blue-500 text-white shadow'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <Book className="w-3 h-3" />
            Bible
          </button>
          <button
            onClick={() => setActiveTab('unity')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition-all ${
              activeTab === 'unity'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <Heart className="w-3 h-3" />
            Unité
          </button>
        </div>

        <div className="w-12">
          {activeTab === 'bible' && (
            <div className="text-xs text-gray-600 text-right">
              {currentIndex + 1}/{availablePassages.length}
            </div>
          )}
        </div>
      </div>

      {/* Contenu selon l'onglet actif */}
      {activeTab === 'bible' ? (
        <>
          {/* Titre du passage */}
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold text-gray-800 mb-1">
              {currentPassage.book} {currentPassage.chapter}
            </h1>
            <p className="text-sm text-gray-600 italic">{currentPassage.title}</p>
          </div>

          {/* Contenu biblique */}
          <div className="flex-1 overflow-y-auto bg-white/90 rounded-3xl shadow-xl p-4 mb-4">
            <div className="space-y-3">
              {currentPassage.verses.map((verse) => (
                <div key={verse.number} className="group">
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {verse.number}
                    </span>
                    <div className="text-xs text-gray-800 leading-relaxed">
                      <VerseWithStrong 
                        verse={verse} 
                        language={currentPassage.language || 'fr'} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button 
              onClick={() => {
                if (window.faithSounds && window.faithSounds.cheube) {
                  window.faithSounds.cheube();
                }
                navigatePassage('prev');
              }}
              disabled={currentIndex === 0}
              className={`flex items-center justify-center py-2 px-4 rounded-full font-bold text-xl transition-all ${
                currentIndex === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-blue-600 shadow-md hover:shadow-lg active:scale-95'
              }`}
            >
              ‹
            </button>

            <div className="flex gap-1">
              {availablePassages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setCurrentPassage(availablePassages[index]);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={() => {
                if (window.faithSounds && window.faithSounds.cheube) {
                  window.faithSounds.cheube();
                }
                navigatePassage('next');
              }}
              disabled={currentIndex === availablePassages.length - 1}
              className={`flex items-center justify-center py-2 px-4 rounded-full font-bold text-xl transition-all ${
                currentIndex === availablePassages.length - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-blue-600 shadow-md hover:shadow-lg active:scale-95'
              }`}
            >
              ›
            </button>
          </div>

          {/* Copyright */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              📖 Louis Segond 1910 - Domaine public • Numéros Strong inclus
            </p>
          </div>
        </>
      ) : (
        /* Module Unité & Paix */
        <div className="flex-1 overflow-y-auto bg-white/90 rounded-3xl shadow-xl">
          <UnityPeaceModule />
        </div>
      )}
    </div>
  );
};

export default BibleReaderScreen;