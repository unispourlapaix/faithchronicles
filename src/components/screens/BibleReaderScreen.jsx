import React, { useState, useEffect } from 'react';
import { ChevronLeft, Book, Heart } from 'lucide-react';
import { bibleData } from '../../data/bible';
import useTranslation from '../../hooks/useTranslation.js';
import VerseWithStrong from '../VerseWithStrong';
import UnityPeaceModule from '../UnityPeaceModule';

const BibleReaderScreen = ({ setCurrentScreen, totalXP, setTotalXP, audio, bibleReaderTab, setBibleReaderTab }) => {
  const { t, currentLanguage } = useTranslation();
  const [currentPassage, setCurrentPassage] = useState(null);
  const [availablePassages, setAvailablePassages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(bibleReaderTab || 'bible'); // 'bible' ou 'unity'
  
  // Charger les passages lus depuis localStorage
  const [readPassages, setReadPassages] = useState(() => {
    try {
      const saved = localStorage.getItem('bibleReadPassages');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  
  const [showXpGain, setShowXpGain] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);

  // Synchroniser l'onglet avec le parent
  useEffect(() => {
    if (bibleReaderTab) {
      setActiveTab(bibleReaderTab);
    }
  }, [bibleReaderTab]);

  // Sauvegarder les passages lus dans localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bibleReadPassages', JSON.stringify([...readPassages]));
    } catch (error) {
      console.error('Erreur sauvegarde Bible passages:', error);
    }
  }, [readPassages]);

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

  // Fonction pour marquer un passage comme lu et gagner des XP
  const markPassageAsRead = (passageId) => {
    if (!passageId || readPassages.has(passageId)) return; // Déjà lu
    
    // Calculer les XP bonus (10 XP par passage)
    const READING_XP = 10;
    
    // Marquer comme lu
    setReadPassages(prev => new Set([...prev, passageId]));
    
    // Ajouter les XP
    if (setTotalXP) {
      setTotalXP(prev => (prev || 0) + READING_XP);
      setXpAmount(READING_XP);
      setShowXpGain(true);
      
      // Jouer un son de récompense
      if (audio?.sounds?.starEarned) {
        audio.sounds.starEarned();
      }
      
      // Masquer l'animation après 2s
      setTimeout(() => setShowXpGain(false), 2000);
      
      console.log(`📖 Passage lu: ${passageId} - +${READING_XP} XP`);
    }
  };

  const navigatePassage = (direction) => {
    const newIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, availablePassages.length - 1)
      : Math.max(currentIndex - 1, 0);
    
    setCurrentIndex(newIndex);
    setCurrentPassage(availablePassages[newIndex]);
    
    // Marquer le passage précédent comme lu quand on navigue
    if (currentPassage && direction === 'next') {
      const passageId = `${currentPassage.book}_${currentPassage.chapter}`;
      markPassageAsRead(passageId);
    }
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
      {/* Animation XP gagnés */}
      {showXpGain && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2">
            <span className="text-3xl">📖</span>
            <span className="font-bold text-xl">+{xpAmount}</span>
          </div>
        </div>
      )}

      {/* En-tête */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => {
            setBibleReaderTab && setBibleReaderTab('bible');
            setCurrentScreen('menu');
          }}
          className="flex items-center gap-2 py-2 px-3 bg-white/80 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">{t('bible.menu')}</span>
        </button>
        
        <div className="flex gap-1 bg-white/80 rounded-lg p-0.5">
          <button
            onClick={() => {
              setActiveTab('bible');
              setBibleReaderTab && setBibleReaderTab('bible');
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition-all ${
              activeTab === 'bible'
                ? 'bg-blue-500 text-white shadow'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <Book className="w-3 h-3" />
            {t('bible.tabBible')}
          </button>
          <button
            onClick={() => {
              setActiveTab('unity');
              setBibleReaderTab && setBibleReaderTab('unity');
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition-all ${
              activeTab === 'unity'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <Heart className="w-3 h-3" />
            {t('bible.tabUnity')}
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
            <h1 className="text-xl font-bold text-gray-800">
              {currentPassage.book} {currentPassage.chapter}
            </h1>
          </div>

          {/* Contenu biblique */}
          <div className="flex-1 overflow-y-auto bg-white/90 rounded-3xl shadow-xl p-6 mb-4">
            <div className="space-y-4 max-w-2xl mx-auto">
              {currentPassage.verses.map((verse) => (
                <div key={verse.number} className="group">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold text-blue-500 bg-blue-50 rounded-md px-2 py-1 flex-shrink-0 mt-0.5">
                      {verse.number}
                    </span>
                    <div className="text-base text-gray-900 leading-relaxed font-serif text-justify">
                      <VerseWithStrong 
                        verse={verse} 
                        language={currentPassage.metadata?.language || currentLanguage} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>

          {/* Navigation avec bouton de lecture intégré */}
          <div className="flex items-center justify-between gap-3 mt-8">
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

            {/* Bouton "Passage lu" intégré dans la navigation */}
            {setTotalXP && (
              <div className="flex-1 flex justify-center">
                {!readPassages.has(`${currentPassage.book}_${currentPassage.chapter}`) ? (
                  <button
                    onClick={() => {
                      const passageId = `${currentPassage.book}_${currentPassage.chapter}`;
                      markPassageAsRead(passageId);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                  >
                    <Book className="w-4 h-4" />
                    <span className="text-sm">{t('bible.markAsRead')}</span>
                    <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">+10 XP</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 px-6 py-2 bg-green-100 text-green-700 font-bold rounded-full shadow-md">
                    <span>✅</span>
                    <span className="text-sm">{t('bible.alreadyRead')}</span>
                  </div>
                )}
              </div>
            )}

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
              {t('bible.copyright')}
            </p>
          </div>
        </>
      ) : (
        /* Module Unité & Paix */
        <div className="flex-1 overflow-y-auto bg-white/90 rounded-3xl shadow-xl">
          <UnityPeaceModule totalXP={totalXP} setTotalXP={setTotalXP} audio={audio} />
        </div>
      )}
    </div>
  );
};

export default BibleReaderScreen;