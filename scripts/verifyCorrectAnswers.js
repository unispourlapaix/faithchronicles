// ============================================================================
// VERIFY CORRECT ANSWERS - Vérification des indices de réponses correctes
// ============================================================================
// Compare correctAnswers.js avec les fichiers sources français

import { correctAnswers } from '../src/data/chapters/correctAnswers.js';
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

console.log('🔍 VÉRIFICATION DES RÉPONSES CORRECTES\n');
console.log('=' .repeat(80));

let totalErrors = 0;
let totalChecks = 0;

// Parcourir tous les chapitres
for (let chapterId = 1; chapterId <= 8; chapterId++) {
  const chapter = chapters[chapterId];
  const chapterAnswers = correctAnswers[chapterId];
  
  if (!chapter || !chapterAnswers) {
    console.log(`⚠️  Chapitre ${chapterId}: Données manquantes`);
    continue;
  }
  
  console.log(`\n📖 CHAPITRE ${chapterId}: ${chapter.name}`);
  console.log('-'.repeat(80));
  
  // Parcourir tous les niveaux du chapitre
  Object.keys(chapter.levels).forEach(levelId => {
    const level = chapter.levels[levelId];
    const answerData = chapterAnswers[levelId];
    
    if (!answerData) {
      console.log(`⚠️  Niveau ${levelId}: Pas de données dans correctAnswers.js`);
      return;
    }
    
    // Vérifier chaque difficulté
    ['easy', 'medium', 'hard'].forEach(difficulty => {
      totalChecks++;
      
      const sourceCorrect = level.questions?.[difficulty]?.correct;
      const fileCorrect = answerData[difficulty];
      
      if (sourceCorrect === undefined) {
        console.log(`⚠️  Niveau ${levelId} ${difficulty}: Pas de valeur 'correct' dans le fichier source`);
        return;
      }
      
      if (sourceCorrect !== fileCorrect) {
        totalErrors++;
        const question = level.questions[difficulty].question;
        const options = level.questions[difficulty].options;
        
        console.log(`\n❌ ERREUR - Niveau ${levelId} (${difficulty}):`);
        console.log(`   Question: ${question}`);
        console.log(`   Options: ${options.map((opt, idx) => `[${idx}] ${opt}`).join(', ')}`);
        console.log(`   ✅ Fichier source: ${sourceCorrect} (${options[sourceCorrect]})`);
        console.log(`   ❌ correctAnswers.js: ${fileCorrect} (${options[fileCorrect]})`);
      }
    });
  });
}

console.log('\n' + '='.repeat(80));
console.log(`\n📊 RÉSUMÉ:`);
console.log(`   Total vérifications: ${totalChecks}`);
console.log(`   Erreurs trouvées: ${totalErrors}`);
console.log(`   Taux de réussite: ${((totalChecks - totalErrors) / totalChecks * 100).toFixed(2)}%`);

if (totalErrors === 0) {
  console.log('\n✅ SUCCÈS: Toutes les réponses correctes sont cohérentes!');
} else {
  console.log(`\n⚠️  ATTENTION: ${totalErrors} incohérence(s) détectée(s)!`);
  console.log('   Veuillez corriger correctAnswers.js pour qu\'il corresponde aux fichiers sources.');
}

console.log('\n' + '='.repeat(80));
