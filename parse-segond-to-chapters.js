// ============================================================================
// SCRIPT DE PARSING - Segond 1910 vers format chapters
// ============================================================================
// Parse le fichier segond1910.txt et crée des fichiers john-XX-uk.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const INPUT_FILE = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'bibletxt', 'fr', 'segond1910.txt');
const OUTPUT_DIR = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');
const TEMP_DIR = path.join(__dirname, 'bibletxt', 'ukrainian');

// Configuration langue
const LANG_CODE = 'uk';
const LANG_NAME = 'UK';
const VERSION_NAME = 'Ukrainian Bible 1962';
const FULL_NAME = 'Українська Біблія 1962';

// Lire le fichier source
console.log('📖 Lecture du fichier source...');
const content = fs.readFileSync(INPUT_FILE, 'utf8');

// Parser par chapitre
const chapters = {};
let currentChapter = null;

const lines = content.split('\n');

for (let rawLine of lines) {
  const line = rawLine.trim();  // Enlever \r et espaces

  // Détecter un chapitre
  const chapterMatch = line.match(/===== CHAPITRE (\d+) =====/);
  if (chapterMatch) {
    currentChapter = parseInt(chapterMatch[1]);
    chapters[currentChapter] = [];
    continue;
  }

  // Détecter un verset (format: X:Y texte)
  if (currentChapter && line.length > 0) {
    const verseMatch = line.match(/^(\d+):(\d+)\s+(.+)$/);
    if (verseMatch) {
      const chapterNum = parseInt(verseMatch[1]);
      const verseNum = parseInt(verseMatch[2]);
      const verseText = verseMatch[3].trim();

      // Vérifier que le chapitre correspond
      if (chapterNum === currentChapter) {
        chapters[currentChapter].push({
          number: verseNum,
          text: verseText  // Texte français qui sera remplacé par ukrainien
        });
      }
    }
  }
}

console.log(`✅ ${Object.keys(chapters).length} chapitres parsés\n`);

// Créer les dossiers
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Générer les fichiers

// 1. Fichiers texte temporaires pour faciliter la traduction
console.log('📝 Création des fichiers texte temporaires...');
for (const [chapterNum, verses] of Object.entries(chapters)) {
  const chapterPadded = String(chapterNum).padStart(2, '0');
  const filename = `john-${chapterPadded}.txt`;
  const filepath = path.join(TEMP_DIR, filename);

  const content = verses.map(v => `${v.number} ${v.text}`).join('\n');
  fs.writeFileSync(filepath, content, 'utf8');

  console.log(`   ✅ ${filename}`);
}

// 2. Fichiers JavaScript finaux (avec texte français comme placeholder)
console.log('\n📦 Création des fichiers JavaScript...');
let totalVerses = 0;

for (const [chapterNum, verses] of Object.entries(chapters)) {
  const chapterPadded = String(chapterNum).padStart(2, '0');
  const filename = `john-${chapterPadded}-${LANG_CODE}.js`;
  const filepath = path.join(OUTPUT_DIR, filename);

  const variableName = `johnChapter${chapterNum}${LANG_NAME}`;

  // Générer le contenu JavaScript
  const jsContent = `// ============================================================================
// ÉVANGILE DE JEAN - ${FULL_NAME}
// ============================================================================
// Chapitre ${chapterNum}

export const ${variableName} = {
  chapter: ${chapterNum},
  title: "Jean ${chapterNum}",
  version: "${VERSION_NAME}",
  language: "${LANG_CODE}",
  direction: "ltr",
  verses: [
${verses.map(verse => `  {
    "number": ${verse.number},
    "text": "${verse.text}",
    "strong": []
  }`).join(',\n')}
  ]
};

export default ${variableName};
`;

  fs.writeFileSync(filepath, jsContent, 'utf8');
  console.log(`   ✅ ${filename} (${verses.length} versets)`);
  totalVerses += verses.length;
}

console.log(`\n╔════════════════════════════════════════════════════════════════════════════╗`);
console.log(`║ RÉSUMÉ`);
console.log(`╚════════════════════════════════════════════════════════════════════════════╝\n`);
console.log(`✅ ${Object.keys(chapters).length} fichiers JavaScript créés`);
console.log(`📊 Total: ${totalVerses} versets`);
console.log(`📁 Fichiers dans: ${OUTPUT_DIR}\n`);

console.log(`╔════════════════════════════════════════════════════════════════════════════╗`);
console.log(`║ PROCHAINES ÉTAPES`);
console.log(`╚════════════════════════════════════════════════════════════════════════════╝\n`);
console.log(`⚠️  IMPORTANT: Les fichiers contiennent actuellement le texte FRANÇAIS!`);
console.log(`\nPour les traduire en ukrainien:\n`);
console.log(`OPTION 1 - Traduction manuelle:`);
console.log(`  1. Ouvrez chaque fichier john-XX-uk.js`);
console.log(`  2. Remplacez le texte français par le texte ukrainien`);
console.log(`  3. Sauvegardez\n`);
console.log(`OPTION 2 - Via fichiers texte:`);
console.log(`  1. Les fichiers texte sont dans: ${TEMP_DIR}`);
console.log(`  2. Remplacez le texte français par l'ukrainien`);
console.log(`  3. Lancez: node convert-text-to-john-js.js uk`);
console.log(`  4. Copiez les fichiers générés vers le dossier chapters\n`);
console.log(`OPTION 3 - Copier depuis Bible.com:`);
console.log(`  1. Allez sur https://www.bible.com/bible/143/JHN.1.UKR`);
console.log(`  2. Copiez les versets ukrainiens`);
console.log(`  3. Collez dans ${TEMP_DIR}/john-01.txt`);
console.log(`  4. Répétez pour les 21 chapitres`);
console.log(`  5. Lancez: node convert-text-to-john-js.js uk`);
console.log(`  6. Copiez vers chapters/\n`);
console.log(`╚════════════════════════════════════════════════════════════════════════════╝\n`);
