// Script pour vérifier les doublons de Strong dans les versets
const { biblePassagesFr } = require('./src/data/bible/translations/fr/biblePassages.js');

console.log('\n=== VÉRIFICATION DES DOUBLONS STRONG DANS LES VERSETS ===\n');

let totalVerses = 0;
let versesWithDuplicates = 0;
const duplicateExamples = [];

Object.entries(biblePassagesFr).forEach(([passageKey, passage]) => {
  passage.verses.forEach(verse => {
    totalVerses++;

    if (verse.strong && verse.strong.length > 0) {
      const uniqueStrong = new Set(verse.strong);

      if (uniqueStrong.size < verse.strong.length) {
        versesWithDuplicates++;

        // Trouver les doublons
        const counts = {};
        verse.strong.forEach(s => counts[s] = (counts[s] || 0) + 1);
        const duplicates = Object.entries(counts).filter(([k,v]) => v > 1);

        if (duplicateExamples.length < 5) {
          duplicateExamples.push({
            passage: `${passage.book} ${passage.chapter}:${verse.number}`,
            text: verse.text.substring(0, 60) + '...',
            strong: verse.strong,
            duplicates: duplicates.map(([k,v]) => `${k} (${v}x)`).join(', ')
          });
        }
      }
    }
  });
});

console.log(`Total versets analysés: ${totalVerses}`);
console.log(`Versets avec doublons Strong: ${versesWithDuplicates}`);

if (versesWithDuplicates > 0) {
  console.log('\n❌ DOUBLONS TROUVÉS!\n');
  console.log('Exemples:');
  duplicateExamples.forEach(ex => {
    console.log(`\n  ${ex.passage}`);
    console.log(`  Texte: ${ex.text}`);
    console.log(`  Strong array: [${ex.strong.join(', ')}]`);
    console.log(`  Doublons: ${ex.duplicates}`);
  });
} else {
  console.log('\n✅ Aucun doublon trouvé dans les versets');
}

console.log('\n=============================================\n');
