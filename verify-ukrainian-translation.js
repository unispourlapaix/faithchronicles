// ============================================================================
// VÉRIFICATION - Traduction ukrainienne complète
// ============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHAPTERS_DIR = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');

console.log('╔════════════════════════════════════════════════════════════════════════════╗');
console.log('║ VÉRIFICATION - Traduction ukrainienne de Jean');
console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

let totalVerses = 0;
let totalUkrainian = 0;
let totalFrench = 0;
const issues = [];

for (let chapter = 1; chapter <= 21; chapter++) {
  const chapterPadded = String(chapter).padStart(2, '0');
  const filename = `john-${chapterPadded}-uk.js`;
  const filepath = path.join(CHAPTERS_DIR, filename);

  if (!fs.existsSync(filepath)) {
    issues.push(`❌ Jean ${chapter}: Fichier manquant`);
    continue;
  }

  const content = fs.readFileSync(filepath, 'utf8');

  // Compter les versets
  const verseMatches = content.match(/"number":\s*\d+/g);
  const verseCount = verseMatches ? verseMatches.length : 0;

  // Vérifier les textes ukrainiens (cyrillique)
  const ukrainianMatches = content.match(/"text":\s*"[^"]*[А-ЯІЇЄҐа-яіїєґ][^"]*"/g);
  const ukrainianCount = ukrainianMatches ? ukrainianMatches.length : 0;

  // Vérifier s'il reste du texte français
  const frenchMatches = content.match(/"text":\s*"[^"]*[A-ZÀ-ÿa-z]{10,}[^"]*"/g);
  let frenchCount = 0;
  if (frenchMatches) {
    // Filtrer pour ne garder que les textes vraiment français (sans cyrillique)
    frenchCount = frenchMatches.filter(match => !(/[А-ЯІЇЄҐа-яіїєґ]/.test(match))).length;
  }

  totalVerses += verseCount;
  totalUkrainian += ukrainianCount;
  totalFrench += frenchCount;

  const status = ukrainianCount === verseCount && frenchCount === 0 ? '✅' : '⚠️';
  console.log(`${status} Jean ${chapter}: ${ukrainianCount}/${verseCount} versets ukrainiens${frenchCount > 0 ? ` (${frenchCount} français restants)` : ''}`);

  if (ukrainianCount < verseCount) {
    issues.push(`⚠️ Jean ${chapter}: ${verseCount - ukrainianCount} versets manquants`);
  }
  if (frenchCount > 0) {
    issues.push(`⚠️ Jean ${chapter}: ${frenchCount} versets encore en français`);
  }
}

console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
console.log('║ RÉSUMÉ');
console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');
console.log(`📊 Total versets: ${totalVerses}`);
console.log(`✅ Versets ukrainiens: ${totalUkrainian}`);
console.log(`❌ Versets français restants: ${totalFrench}\n`);

if (issues.length === 0) {
  console.log('✅ SUCCÈS! Tous les chapitres sont traduits en ukrainien.\n');
} else {
  console.log('⚠️ PROBLÈMES DÉTECTÉS:\n');
  issues.forEach(issue => console.log(`   ${issue}`));
  console.log('');
}
