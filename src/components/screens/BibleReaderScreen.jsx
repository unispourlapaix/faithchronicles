import React, { useState, useEffect } from 'react';
import { ChevronLeft, Book, Search, X } from 'lucide-react';
import { bibleData } from '../../data/bible/bibleData.js';
import { strongGreek } from '../../data/bible/strongGreek.js';

const BibleReaderScreen = ({ setCurrentScreen }) => {
  const [currentPassage, setCurrentPassage] = useState(null);
  const [availablePassages, setAvailablePassages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showStrong, setShowStrong] = useState(false);
  const [showStrongPopup, setShowStrongPopup] = useState(false);
  const [selectedStrong, setSelectedStrong] = useState(null);

  useEffect(() => {
    const passages = bibleData.getAllPassages();
    setAvailablePassages(passages);
    if (passages.length > 0) {
      setCurrentPassage(passages[0]);
    }
  }, []);

  const navigatePassage = (direction) => {
    const newIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, availablePassages.length - 1)
      : Math.max(currentIndex - 1, 0);
    
    setCurrentIndex(newIndex);
    setCurrentPassage(availablePassages[newIndex]);
  };

  const getStrongDefinition = (strongNumber) => {
    // D'abord vérifier le dictionnaire Strong grec complet
    const greekDefinition = strongGreek[strongNumber];
    if (greekDefinition) {
      return {
        word: greekDefinition.word,
        transliteration: greekDefinition.transliteration,
        meaning: greekDefinition.meaning,
        definition: greekDefinition.definition,
        pronunciation: greekDefinition.pronunciation,
        usage: greekDefinition.usage
      };
    }
    
    // Sinon utiliser le dictionnaire simplifié
    return bibleData.strongDictionary[strongNumber] || null;
  };

  const handleStrongClick = (strongRef) => {
    const strongData = strongGreek[strongRef];
    if (strongData) {
      setSelectedStrong({ ref: strongRef, data: strongData });
      setShowStrongPopup(true);
    }
  };

  if (!currentPassage) {
    return (
      <div className="relative z-10 p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <Book className="w-12 h-12 mx-auto text-blue-500 mb-4" />
          <p className="text-gray-600">Chargement des Écritures...</p>
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
        
        <div className="text-center">
          <div className="text-sm font-bold text-gray-800">📖 Lecteur Bible</div>
          <div className="text-xs text-gray-600">
            {currentIndex + 1} / {availablePassages.length}
          </div>
        </div>

        <button 
          onClick={() => setShowStrong(!showStrong)}
          className="flex items-center gap-2 py-2 px-3 bg-white/80 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <Search className="w-4 h-4" />
          <span className="text-xs">Strong</span>
        </button>
      </div>

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
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-blue-600 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  {verse.number}
                </span>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {verse.text}
                </p>
              </div>
              
              {/* Références Strong (si activées) */}
              {showStrong && verse.strong && verse.strong.length > 0 && (
                <div className="ml-9 mt-2 p-2 bg-gray-50 rounded-lg border-l-2 border-blue-200">
                  <div className="text-xs font-semibold text-gray-600 mb-1">
                    🔍 Références Strong :
                  </div>
                  <div className="space-y-1">
                    {verse.strong.slice(0, 3).map((strongNumber, index) => {
                      const definition = getStrongDefinition(strongNumber);
                      return definition ? (
                        <div key={index} className="text-xs mb-2 p-2 bg-white rounded-lg border border-blue-100">
                          <div className="flex items-center gap-2 mb-1">
                            <button
                              onClick={() => handleStrongClick(strongNumber)}
                              className="font-mono text-blue-600 font-bold hover:text-blue-800 hover:underline cursor-pointer transition-colors"
                            >
                              {strongNumber}
                            </button>
                            <span className="font-semibold text-gray-800">{definition.word}</span>
                            {definition.pronunciation && (
                              <span className="text-gray-500 text-xs">({definition.pronunciation})</span>
                            )}
                          </div>
                          <div className="text-gray-700">
                            <span className="font-medium">Sens :</span> {definition.meaning}
                          </div>
                          {definition.definition && definition.definition !== definition.meaning && (
                            <div className="text-gray-600 text-xs mt-1">
                              {definition.definition.substring(0, 100)}...
                            </div>
                          )}
                        </div>
                      ) : (
                        <div key={index} className="text-xs text-gray-500">
                          <span className="font-mono">{strongNumber}</span> : Référence disponible
                        </div>
                      );
                    })}
                    {verse.strong.length > 3 && (
                      <div className="text-xs text-gray-400">
                        ... et {verse.strong.length - 3} autres références
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigatePassage('prev')}
          disabled={currentIndex === 0}
          className={`flex items-center justify-center py-2 px-4 rounded-full font-bold text-xl transition-all ${
            currentIndex === 0 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-blue-600 shadow-md hover:shadow-lg active:scale-95'
          }`}
        >
          &lt;
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
          onClick={() => navigatePassage('next')}
          disabled={currentIndex === availablePassages.length - 1}
          className={`flex items-center justify-center py-2 px-4 rounded-full font-bold text-xl transition-all ${
            currentIndex === availablePassages.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-blue-600 shadow-md hover:shadow-lg active:scale-95'
          }`}
        >
          &gt;
        </button>
      </div>

      {/* Copyright */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          📖 Louis Segond 1910 - Domaine public • Numéros Strong inclus
        </p>
      </div>

      {/* Popup Strong */}
      {showStrongPopup && selectedStrong && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md max-h-96 overflow-y-auto animate-bounce-in shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="text-center flex-1">
                <div className="text-2xl mb-2">📜</div>
                <h3 className="text-lg font-bold text-blue-600">Référence Strong</h3>
                <div className="font-mono text-blue-800 font-bold">{selectedStrong.ref}</div>
              </div>
              <button
                onClick={() => setShowStrongPopup(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">🔤</span> Mot original
                </h4>
                <div className="text-lg font-bold text-blue-800">{selectedStrong.data.word}</div>
                {selectedStrong.data.transliteration && (
                  <div className="text-sm text-gray-600 italic mt-1">
                    Translittération : {selectedStrong.data.transliteration}
                  </div>
                )}
                {selectedStrong.data.pronunciation && (
                  <div className="text-sm text-gray-600 mt-1">
                    Pronunciation : {selectedStrong.data.pronunciation}
                  </div>
                )}
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-green-600">💡</span> Signification
                </h4>
                <p className="text-gray-700">{selectedStrong.data.meaning}</p>
              </div>

              {selectedStrong.data.definition && selectedStrong.data.definition !== selectedStrong.data.meaning && (
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-purple-600">📖</span> Définition complète
                  </h4>
                  <p className="text-gray-700 text-sm">{selectedStrong.data.definition}</p>
                </div>
              )}

              {selectedStrong.data.usage && (
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-yellow-600">🎯</span> Usage biblique
                  </h4>
                  <p className="text-gray-700 text-sm">{selectedStrong.data.usage}</p>
                </div>
              )}

              {selectedStrong.data.etymology && (
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-indigo-600">🌿</span> Étymologie
                  </h4>
                  <p className="text-gray-700 text-sm">{selectedStrong.data.etymology}</p>
                </div>
              )}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => setShowStrongPopup(false)}
                className="px-6 py-2 bg-blue-500 text-white rounded-full font-bold 
                         shadow-lg hover:bg-blue-600 active:scale-95 transition-all"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleReaderScreen;