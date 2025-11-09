// ============================================================================
// JOHN TREASURES DISPLAY COMPONENT
// ============================================================================
// Composant pour afficher les trésors de l'Évangile de Jean

import React, { useState, useEffect } from 'react';
import { Book, Heart, Search } from 'lucide-react';
import { bibleData } from '../data/bible';
import useTranslation from '../hooks/useTranslation';

const JohnTreasuresDisplay = ({ onClose }) => {
  const { t } = useTranslation();
  const [johnTreasure, setJohnTreasure] = useState(null);
  const [johnMetadata, setJohnMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadJohnTreasure();
    loadJohnMetadata();
  }, []);

  const loadJohnTreasure = async () => {
    try {
      setLoading(true);
      console.log('Loading John treasure...');
      
      // Test d'abord si la méthode existe
      if (typeof bibleData.getRandomJohnTreasure !== 'function') {
        throw new Error('getRandomJohnTreasure method not found in bibleData');
      }
      
      const treasure = await bibleData.getRandomJohnTreasure();
      console.log('John treasure loaded:', treasure);
      
      if (!treasure) {
        throw new Error('No treasure returned from getRandomJohnTreasure');
      }
      
      setJohnTreasure(treasure);
      setError(null);
    } catch (err) {
      console.error('Error loading John treasure:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadJohnMetadata = async () => {
    try {
      const metadata = await bibleData.getJohnMetadata();
      setJohnMetadata(metadata);
    } catch (err) {
      console.error('Error loading John metadata:', err);
    }
  };

  const getNewTreasure = () => {
    loadJohnTreasure();
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <Book className="w-8 h-8 text-blue-500 animate-pulse mx-auto mb-3" />
        <p className="text-gray-600">Chargement des trésors de Jean...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-3">{t('bible.errorLoading')}</div>
        <p className="text-gray-600 text-sm mb-4">{error}</p>
        <button
          onClick={loadJohnTreasure}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {t('bible.retry')}
        </button>
      </div>
    );
  }

  if (!johnTreasure) {
    return (
      <div className="text-center py-8">
        <Book className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">Aucun trésor disponible</p>
        <button
          onClick={loadJohnTreasure}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Recharger
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main treasure */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
        <div className="flex items-start gap-3 mb-3">
          <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <div className="text-sm font-bold text-blue-700 mb-2">
              ✨ {johnTreasure.reference}
            </div>
            <div className="text-gray-800 italic leading-relaxed">
              "{johnTreasure.content}"
            </div>
          </div>
        </div>
        
        {johnTreasure.reflection && (
          <div className="mt-3 pt-3 border-t border-blue-200">
            <div className="text-xs font-semibold text-purple-700 mb-1">
              🤔 Réflexion
            </div>
            <div className="text-sm text-gray-700">
              {johnTreasure.reflection}
            </div>
          </div>
        )}

        {johnTreasure.theme && (
          <div className="mt-2">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              #{johnTreasure.theme}
            </span>
          </div>
        )}
      </div>

      {/* Gospel info */}
      {johnMetadata && (
        <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
          <div className="text-xs font-bold text-green-700 mb-1">
            📚 {johnMetadata.title}
          </div>
          <div className="text-sm text-gray-700">
            {t('treasures.johnGospelDescription')}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {t('treasures.availableInLanguages')} • {johnMetadata.copyright}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2 pt-2">
        <button
          onClick={getNewTreasure}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          {t('treasures.newTreasure')}
        </button>
        
        {/* Bible Reader Button */}
        <button
          onClick={() => {
            // Ouvrir le lecteur Bible Jean dans une nouvelle modal
            if (window.openJohnBibleReader) {
              window.openJohnBibleReader();
            } else {
              alert(t('bible.readerInDevelopment'));
            }
          }}
          className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium"
        >
          <Book className="w-4 h-4" />
          📖 {t('treasures.johnBibleReader')}
        </button>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-200">
        {t('treasures.johnGospelStats')}
      </div>
    </div>
  );
};

export default JohnTreasuresDisplay;