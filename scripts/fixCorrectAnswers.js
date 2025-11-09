// ============================================================================
// FIX CORRECT ANSWERS - Correction automatique de correctAnswers.js
// ============================================================================
// Génère un nouveau fichier correctAnswers.js basé sur les fichiers sources

import {
  chapter1Genesis,
  chapter2Exodus,
  chapter3Jesus,
  chapter4CrucifixionResurrection,
  chapter5EarlyChurch,
  chapter6PaulMissions,
  chapter7FinalLetters,
  chapter8Bonus
} from '../src/data/chapters/index.js';
import fs from 'fs';

const chapters = {
  1: chapter1Genesis,
  2: chapter2Exodus,
  3: chapter3Jesus,
  4: chapter4CrucifixionResurrection,
  5: chapter5EarlyChurch,
  6: chapter6PaulMissions,
  7: chapter7FinalLetters,
  8: chapter8Bonus
};

const chapterNames = {
  1: 'GENÈSE',
  2: 'EXODE',
  3: 'JÉSUS-CHRIST',
  4: 'CRUCIFIXION/RÉSURRECTION',
  5: 'ÉGLISE PRIMITIVE',
  6: 'MISSIONS DE PAUL',
  7: 'LETTRES/APOCALYPSE',
  8: 'BONUS'
};

const levelRanges = {
  1: '1-13',
  2: '14-26',
  3: '27-39',
  4: '40-52',
  5: '53-65',
  6: '66-78',
  7: '79-91',
  8: '92-100'
};

console.log('🔧 GÉNÉRATION DU FICHIER correctAnswers.js CORRIGÉ\n');
console.log('=' .repeat(80));

let output = `// ============================================================================
// CORRECT ANSWERS - Index des réponses correctes pour tous les chapitres
// ============================================================================
// Structure: [chapterId][levelId][difficulty] = correctIndex
// Les indices commencent à 0

export const correctAnswers = {\n`;

// Parcourir tous les chapitres
for (let chapterId = 1; chapterId <= 8; chapterId++) {
  const chapter = chapters[chapterId];
  
  if (!chapter) {
    console.log(`⚠️  Chapitre ${chapterId}: Données manquantes`);
    continue;
  }
  
  console.log(`📖 Chapitre ${chapterId}: ${chapter.name}`);
  
  output += `  // CHAPITRE ${chapterId}: ${chapterNames[chapterId]} (Niveaux ${levelRanges[chapterId]})\n`;
  output += `  ${chapterId}: {\n`;
  
  // Trier les niveaux par ordre numérique
  const levelIds = Object.keys(chapter.levels).map(Number).sort((a, b) => a - b);
  
  levelIds.forEach((levelId, index) => {
    const level = chapter.levels[levelId];
    
    if (!level || !level.questions) {
      console.log(`⚠️  Niveau ${levelId}: Structure incorrecte`);
      return;
    }
    
    const easyCorrect = level.questions.easy?.correct ?? 0;
    const mediumCorrect = level.questions.medium?.correct ?? 0;
    const hardCorrect = level.questions.hard?.correct ?? 0;
    
    output += `    ${levelId}: { easy: ${easyCorrect}, medium: ${mediumCorrect}, hard: ${hardCorrect} }`;
    
    if (index < levelIds.length - 1) {
      output += ',';
    }
    
    output += '\n';
  });
  
  output += `  }`;
  
  if (chapterId < 8) {
    output += ',';
  }
  
  output += '\n\n';
}

output += `};

/**
 * Obtenir la réponse correcte pour une question
 * @param {number} levelId - ID du niveau (1-100)
 * @param {string} difficulty - Difficulté ('easy', 'medium', 'hard')
 * @returns {number} Index de la réponse correcte (0-3)
 */
export const getCorrectAnswer = (levelId, difficulty) => {
  // Déterminer le chapitre
  let chapterId = 1;
  if (levelId >= 1 && levelId <= 13) chapterId = 1;
  else if (levelId >= 14 && levelId <= 26) chapterId = 2;
  else if (levelId >= 27 && levelId <= 39) chapterId = 3;
  else if (levelId >= 40 && levelId <= 52) chapterId = 4;
  else if (levelId >= 53 && levelId <= 65) chapterId = 5;
  else if (levelId >= 66 && levelId <= 78) chapterId = 6;
  else if (levelId >= 79 && levelId <= 91) chapterId = 7;
  else if (levelId >= 92 && levelId <= 100) chapterId = 8;
  
  const answer = correctAnswers[chapterId]?.[levelId]?.[difficulty];
  
  if (answer === undefined) {
    console.warn(\`⚠️ Réponse correcte non trouvée pour niveau \${levelId}, difficulté \${difficulty}\`);
    return 0; // Fallback
  }
  
  return answer;
};

export default correctAnswers;
`;

// Écrire le fichier
const outputPath = './src/data/chapters/correctAnswers.js';
fs.writeFileSync(outputPath, output, 'utf8');

console.log('\n' + '='.repeat(80));
console.log(`\n✅ Fichier généré avec succès: ${outputPath}`);
console.log('\n💡 Vérifiez le fichier et testez l\'application pour confirmer que tout fonctionne.\n');
console.log('='.repeat(80));
