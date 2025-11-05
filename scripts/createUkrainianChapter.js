// ============================================================================
// SCRIPT GÉNÉRATEUR - Créer un chapitre ukrainien
// ============================================================================
// Modifiez les variables CHAPTER_NUMBER et VERSES, puis exécutez :
// node scripts/createUkrainianChapter.js

// ⚙️ MODIFIER ICI ⚙️
const CHAPTER_NUMBER = 2; // <- Changer pour 2, 3, 4... 21

const VERSES = {
  1: "Третього дня весілля було в Кані Галілейській, і була там мати Ісусова.",
  2: "Запрошений був на весілля і Ісус та учні Його.",
  3: "Як забракло вина, мати Ісусова каже до Нього: Не мають вони вина!",
  // ... COLLER LES VERSETS ICI ...
  
  // Exemple pour tester (supprimez ceci et collez les vrais versets)
};

// ⛔ NE PAS MODIFIER EN DESSOUS ⛔
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const chaptersDir = path.join(rootDir, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');

function generateChapter(chapterNum, verses) {
  const varName = `johnChapter${chapterNum}UK`;
  
  const versesArray = Object.entries(verses).map(([num, text]) => ({
    number: parseInt(num),
    text: text,
    strong: []
  }));
  
  const data = {
    chapter: chapterNum,
    title: `Jean ${chapterNum}`,
    version: "Ukrainian Bible 1962",
    language: "uk",
    direction: "ltr",
    verses: versesArray
  };
  
  const content = `// ============================================================================
// ÉVANGILE DE JEAN - Ukrainian Bible (Українська Біблія)
// ============================================================================
// Chapitre ${chapterNum}

export const ${varName} = ${JSON.stringify(data, null, 2)};

export default ${varName};
`;
  
  return content;
}

// Vérification
if (Object.keys(VERSES).length === 0) {
  console.error('❌ Erreur: Le tableau VERSES est vide !');
  console.log('💡 Copiez les versets depuis https://www.bible.com/bible/143/JHN.' + CHAPTER_NUMBER + '.UKR');
  process.exit(1);
}

// Génération
const paddedNum = String(CHAPTER_NUMBER).padStart(2, '0');
const filename = path.join(chaptersDir, `john-${paddedNum}-uk.js`);
const content = generateChapter(CHAPTER_NUMBER, VERSES);
fs.writeFileSync(filename, content, 'utf-8');

console.log(`✅ Fichier créé: john-${paddedNum}-uk.js`);
console.log(`📖 Chapitre ${CHAPTER_NUMBER} - ${Object.keys(VERSES).length} versets`);
console.log(`\n💡 Prochaine étape :`);
console.log(`   1. Modifier CHAPTER_NUMBER = ${CHAPTER_NUMBER + 1}`);
console.log(`   2. Copier les versets depuis: https://www.bible.com/bible/143/JHN.${CHAPTER_NUMBER + 1}.UKR`);
console.log(`   3. Exécuter: node scripts/createUkrainianChapter.js`);
