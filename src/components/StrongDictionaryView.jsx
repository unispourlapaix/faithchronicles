import React, { useState } from 'react';
import { getStrongDictionary } from '../data/bible/strong/index.js';
import { getStrongLabels } from '../data/bible/strong/strongLabels.js';

/**
 * Composant d'affichage du dictionnaire Strong multilingue
 * Affiche les entrées Strong avec labels traduits selon la langue sélectionnée
 */
const StrongDictionaryView = ({ strongCode = 'G25', language = 'fr' }) => {
  const [selectedLang, setSelectedLang] = useState(language);
  const [currentCode, setCurrentCode] = useState(strongCode);

  // Récupération des données Strong dans la langue sélectionnée
  const strongDict = getStrongDictionary(selectedLang);
  const entry = strongDict[currentCode];
  
  // Récupération des labels traduits
  const labels = getStrongLabels(selectedLang);

  if (!entry) {
    return <div className="text-red-500">Code Strong invalide: {currentCode}</div>;
  }

  return (
    <div className="strong-dictionary-view bg-white rounded-lg shadow-lg p-6 max-w-2xl">
      {/* En-tête avec sélecteur de langue */}
      <div className="header flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">
          Strong {currentCode}
        </h2>
        
        <select 
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-gray-50"
        >
          <option value="fr">🇫🇷 Français</option>
          <option value="en">🇬🇧 English</option>
          <option value="es">🇪🇸 Español</option>
          <option value="de">🇩🇪 Deutsch</option>
          <option value="it">🇮🇹 Italiano</option>
          <option value="pt">🇵🇹 Português</option>
          <option value="ru">🇷🇺 Русский</option>
          <option value="uk">🇺🇦 Українська</option>
          <option value="zh">🇨🇳 中文</option>
          <option value="ja">🇯🇵 日本語</option>
          <option value="ko">🇰🇷 한국어</option>
          <option value="ar">🇸🇦 العربية</option>
          <option value="he">🇮🇱 עברית</option>
        </select>
      </div>

      {/* Mot original grec/hébreu */}
      <div className="original-word mb-6 p-4 bg-gray-100 rounded-lg">
        <div className="text-3xl font-bold text-center mb-2">
          {entry.word}
        </div>
        <div className="text-center text-gray-600">
          {entry.transliteration}
        </div>
        {entry.pronunciation && (
          <div className="text-center text-sm text-gray-500 mt-1">
            [{entry.pronunciation}]
          </div>
        )}
      </div>

      {/* Contenu traduit avec labels multilingues */}
      <div className="content space-y-4">
        
        {/* SENS (m) */}
        <div className="field">
          <h3 className="font-semibold text-lg text-blue-700 mb-2">
            📌 {labels.m}
          </h3>
          <p className="text-gray-800 leading-relaxed">
            {entry.meaning}
          </p>
        </div>

        {/* DÉFINITION (d) */}
        <div className="field">
          <h3 className="font-semibold text-lg text-green-700 mb-2">
            📖 {labels.d}
          </h3>
          <p className="text-gray-800 leading-relaxed">
            {entry.definition}
          </p>
        </div>

        {/* UTILISATION (u) */}
        <div className="field">
          <h3 className="font-semibold text-lg text-purple-700 mb-2">
            ✍️ {labels.u}
          </h3>
          <p className="text-gray-800 leading-relaxed">
            {entry.usage}
          </p>
        </div>

        {/* ÉTYMOLOGIE (e) */}
        <div className="field">
          <h3 className="font-semibold text-lg text-orange-700 mb-2">
            🔍 {labels.e}
          </h3>
          <p className="text-gray-800 leading-relaxed italic">
            {entry.etymology}
          </p>
        </div>
      </div>

      {/* Navigation entre codes Strong */}
      <div className="navigation mt-6 pt-4 border-t">
        <input
          type="text"
          value={currentCode}
          onChange={(e) => setCurrentCode(e.target.value.toUpperCase())}
          placeholder="Ex: G25, H3068"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
    </div>
  );
};

export default StrongDictionaryView;
