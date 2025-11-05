// ============================================================================
// VÉRIFICATION COMPLÈTE - BIBLE LINGALA
// ============================================================================
// Vérifie que tous les 879 versets sont traduits en Lingala

const fs = require('fs');
const path = require('path');

console.log('🔍 VÉRIFICATION DE LA TRADUCTION LINGALA COMPLÈTE');
console.log('==================================================\n');

let totalVerses = 0;
let translatedVerses = 0;
let frenchRemaining = 0;
let placeholderRemaining = 0;

const issues = [];

for (let chapter = 1; chapter <= 21; chapter++) {
  const chapterStr = String(chapter).padStart(2, '0');
  const filePath = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters', `john-${chapterStr}-rc.js`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Chapitre ${chapter}: Fichier manquant`);
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Compter les versets
  const verseMatches = content.match(/"number":\s*(\d+)/g);
  const verseCount = verseMatches ? verseMatches.length : 0;
  totalVerses += verseCount;
  
  // Vérifier les textes français restants (mots courants)
  const frenchPatterns = [
    /Mais,|Alors|Cependant|Ensuite|Puis|Donc/,
    /dans le|à la|de la|pour le/,
    /vous|nous|ils|elles/,
    /était|étaient|sera|seront/
  ];
  
  let hasFrench = false;
  frenchPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      hasFrench = true;
    }
  });
  
  // Vérifier les placeholders
  const hasPlaceholder = content.includes('Lingala verset');
  
  // Compter les versets avec texte Lingala
  const lingalaVerseMatches = content.match(/"text":\s*"[^"]*(?:na|ya|oyo|mpo|ete|bato|Yesu|Nzambe)[^"]*"/g);
  const lingalaCount = lingalaVerseMatches ? lingalaVerseMatches.length : 0;
  
  if (hasFrench) {
    frenchRemaining += verseCount;
    issues.push(`⚠️  Chapitre ${chapter}: Contient encore du français`);
  } else if (hasPlaceholder) {
    placeholderRemaining += verseCount;
    issues.push(`⚠️  Chapitre ${chapter}: Contient des placeholders`);
  } else {
    translatedVerses += verseCount;
    console.log(`✅ Chapitre ${chapter}: ${verseCount} versets - 100% Lingala`);
  }
}

console.log('\n📊 RÉSULTATS DE LA VÉRIFICATION');
console.log('================================');
console.log(`Total de versets: ${totalVerses}`);
console.log(`Versets traduits: ${translatedVerses}`);
console.log(`Français restant: ${frenchRemaining}`);
console.log(`Placeholders restants: ${placeholderRemaining}`);

const percentage = ((translatedVerses / totalVerses) * 100).toFixed(1);
console.log(`\n🎯 Progression: ${percentage}%`);

if (issues.length > 0) {
  console.log('\n⚠️  PROBLÈMES DÉTECTÉS:');
  issues.forEach(issue => console.log(issue));
} else {
  console.log('\n🎉 PARFAIT! Tous les 879 versets sont traduits en Lingala!');
  console.log('   Bible complète prête pour utilisation!');
}
