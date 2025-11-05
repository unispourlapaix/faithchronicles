import React from 'react';
import StrongWord from './StrongWord';
import { detectStrongInVerse } from '../utils/autoStrongDetector';

/**
 * Composant pour afficher un verset avec les mots Strong interactifs
 * @param {object} verse - Verset avec structure: { text, words: [{ text, strong, start, end }] }
 * @param {string} language - Code langue (fr, en, es, etc.)
 */
const VerseWithStrong = ({ verse, language = 'fr' }) => {
  // Utiliser les mots définis OU auto-détection
  let wordsToUse = verse.words;
  
  // Si pas de mots définis, essayer la détection automatique
  if (!wordsToUse || wordsToUse.length === 0) {
    const detected = detectStrongInVerse(verse.text, language); // Passer la langue
    // Ne garder que les détections avec bonne confiance (score >= 5)
    wordsToUse = detected.filter(w => w.confidence >= 5);
  }
  
  // Si toujours pas de mots Strong, afficher le texte simple
  if (!wordsToUse || wordsToUse.length === 0) {
    return <span>{verse.text}</span>;
  }

  // IMPORTANT: Dédupliquer et éviter les chevauchements
  const deduplicateWords = (words) => {
    const sorted = [...words].sort((a, b) => a.start - b.start);
    const result = [];
    
    for (let i = 0; i < sorted.length; i++) {
      const current = sorted[i];
      
      // Vérifier si ce mot chevauche le précédent
      const lastAdded = result[result.length - 1];
      if (lastAdded && current.start < lastAdded.end) {
        // Chevauchement détecté - garder celui avec le meilleur score
        if (current.confidence > (lastAdded.confidence || 0)) {
          result[result.length - 1] = current;
        }
        continue;
      }
      
      result.push(current);
    }
    
    return result;
  };

  const sortedWords = deduplicateWords(wordsToUse);

  // Construire le JSX en insérant les mots Strong
  const parts = [];
  let lastIndex = 0;

  sortedWords.forEach((wordData, index) => {
    const { text, strong, start, end } = wordData;

    // Ajouter le texte avant ce mot
    if (start > lastIndex) {
      parts.push(
        <span key={`text-${index}`}>
          {verse.text.substring(lastIndex, start)}
        </span>
      );
    }

    // Ajouter le mot avec Strong
    parts.push(
      <StrongWord
        key={`strong-${index}-${strong}`}
        word={text}
        strongNumber={strong}
        language={language}
      />
    );

    lastIndex = end;
  });

  // Ajouter le texte final après le dernier mot Strong
  if (lastIndex < verse.text.length) {
    parts.push(
      <span key="text-end">
        {verse.text.substring(lastIndex)}
      </span>
    );
  }

  return <>{parts}</>;
};

export default VerseWithStrong;
