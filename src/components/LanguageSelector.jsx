// ============================================================================
// LANGUAGE SELECTOR COMPONENT
// ============================================================================
// Composant pour sélectionner la langue dans Faith Chronicles
// Support: FR, EN, ES, DE, IT, PT, RU, UK, ZH, JP, KO, AR, HE, RC

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import useTranslation from '../hooks/useTranslation';
import { getLanguageList } from '../data/translations/languages.js';

const LanguageSelector = ({ audio }) => {
  const { currentLanguage, changeLanguage, languages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const languageList = getLanguageList();

  const handleLanguageChange = (langCode) => {
    audio?.sounds?.tick();
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const currentLang = languages[currentLanguage];

  return (
    <div className="relative">
      {/* Bouton principal */}
      <button
        onClick={() => {
          audio?.sounds?.tick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border border-white/40"
        title="Changer la langue / Change language"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="text-sm font-medium text-gray-700">{currentLang?.code.toUpperCase()}</span>
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <>
          {/* Overlay pour fermer le menu */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Liste des langues */}
          <div className="absolute top-full mt-2 right-1/2 transform translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 min-w-[200px] max-h-[300px] overflow-y-auto">
            <div className="p-2">
              {languageList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all text-left ${
                    currentLanguage === lang.code
                      ? 'bg-blue-100 text-blue-800 shadow-sm'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">
                      {lang.nativeName}
                    </div>
                  </div>
                  {currentLanguage === lang.code && (
                    <Check className="w-3 h-3 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
