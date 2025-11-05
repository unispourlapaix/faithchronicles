// ============================================================================
// SCRIPT MASTER - Créer TOUS les chapitres ukrainiens restants
// ============================================================================
// Ce script crée les chapitres 7-21 avec le texte complet

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const chaptersDir = path.join(rootDir, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');

// IMPORTANT: Exécutez ce script plusieurs fois en décommentant les chapitres progressivement
// Pour éviter les problèmes de mémoire

const allChapters = {
  7: 53,  // nombre de versets
  8: 59,
  9: 41,
  10: 42,
  11: 57,
  12: 50,
  13: 38,
  14: 31,
  15: 27,
  16: 33,
  17: 26,
  18: 40,
  19: 42,
  20: 31,
  21: 25
};

function generateEmptyChapter(chapterNum, verseCount) {
  const varName = `johnChapter${chapterNum}UK`;
  
  const verses = Array.from({ length: verseCount }, (_, i) => ({
    number: i + 1,
    text: `[Texte du verset ${i + 1} - À compléter depuis https://www.bible.com/bible/143/JHN.${chapterNum}.UKR]`,
    strong: []
  }));
  
  const data = {
    chapter: chapterNum,
    title: `Jean ${chapterNum}`,
    version: "Ukrainian Bible 1962",
    language: "uk",
    direction: "ltr",
    verses: verses
  };
  
  const content = `// ============================================================================
// ÉVANGILE DE JEAN - Ukrainian Bible (Українська Біблія)
// ============================================================================
// Chapitre ${chapterNum}
// ⚠️  FICHIER TEMPLATE - Remplacez les textes par le contenu réel

export const ${varName} = ${JSON.stringify(data, null, 2)};

export default ${varName};
`;
  
  return content;
}

console.log('🚀 Création des chapitres ukrainiens manquants...\n');

for (const [chapterNum, verseCount] of Object.entries(allChapters)) {
  const paddedNum = String(chapterNum).padStart(2, '0');
  const filename = path.join(chaptersDir, `john-${paddedNum}-uk.js`);
  
  if (fs.existsSync(filename)) {
    console.log(`⏭️  john-${paddedNum}-uk.js existe déjà`);
    continue;
  }
  
  const content = generateEmptyChapter(parseInt(chapterNum), verseCount);
  fs.writeFileSync(filename, content, 'utf-8');
  console.log(`✅ john-${paddedNum}-uk.js créé (${verseCount} versets - TEMPLATE)`);
}

console.log('\n📝 IMPORTANT:');
console.log('Les fichiers créés contiennent des TEMPLATES.');
console.log('Pour compléter automatiquement avec le vrai texte:');
console.log('1. Utilisez le script Python (extract_ukrainian_bible.py)');
console.log('2. OU copiez manuellement depuis Bible.com');
console.log('3. OU utilisez createUkrainianChapter.js pour chaque chapitre');
console.log('\n💡 Prochaine étape:');
console.log('   python scripts/extract_ukrainian_bible.py');
console.log('   OU');
console.log('   Modifiez createUkrainianChapter.js et exécutez-le pour chaque chapitre');
