// ============================================================================
// VÉRIFICATION - Chapitres hébreux de Jean
// ============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHAPTERS_DIR = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');

console.log('╔════════════════════════════════════════════════════════════════════════════╗');
console.log('║ VÉRIFICATION - Chapitres hébreux de Jean');
console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

let totalVerses = 0;
let totalHebrew = 0;
const issues = [];

for (let chapter = 1; chapter <= 21; chapter++) {
  const chapterPadded = String(chapter).padStart(2, '0');
  const filename = `john-${chapterPadded}-he.js`;
  const filepath = path.join(CHAPTERS_DIR, filename);

  if (!fs.existsSync(filepath)) {
    issues.push(`❌ Jean ${chapter}: Fichier manquant`);
    console.log(`❌ Jean ${chapter}: Fichier manquant`);
    continue;
  }

  const content = fs.readFileSync(filepath, 'utf8');

  // Compter les versets
  const verseMatches = content.match(/"number":\s*\d+/g);
  const verseCount = verseMatches ? verseMatches.length : 0;

  // Vérifier les textes hébreux (Unicode hébreu 0x0590-0x05FF)
  const hebrewMatches = content.match(/"text":\s*"[^"]*[\u0590-\u05FF][^"]*"/g);
  const hebrewCount = hebrewMatches ? hebrewMatches.length : 0;

  totalVerses += verseCount;
  totalHebrew += hebrewCount;

  const status = hebrewCount === verseCount && verseCount > 0 ? '✅' : '⚠️';
  console.log(`${status} Jean ${chapter}: ${hebrewCount}/${verseCount} versets hébreux`);

  if (hebrewCount < verseCount) {
    issues.push(`⚠️ Jean ${chapter}: ${verseCount - hebrewCount} versets sans hébreu`);
  }

  if (verseCount === 0) {
    issues.push(`❌ Jean ${chapter}: Aucun verset trouvé`);
  }
}

console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
console.log('║ RÉSUMÉ');
console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');
console.log(`📊 Total versets: ${totalVerses}`);
console.log(`✅ Versets hébreux: ${totalHebrew}`);
console.log(`❌ Versets manquants: ${totalVerses - totalHebrew}\n`);

if (issues.length === 0) {
  console.log('✅ SUCCÈS! Tous les chapitres sont complets en hébreu.\n');
} else {
  console.log('⚠️ PROBLÈMES DÉTECTÉS:\n');
  issues.forEach(issue => console.log(`   ${issue}`));
  console.log('');
}
