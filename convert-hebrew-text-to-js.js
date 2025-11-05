// ============================================================================
// CONVERTISSEUR - Texte hébreu brut vers fichiers JavaScript
// ============================================================================
// Convertit du texte hébreu copié depuis Bible.com en fichiers .js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHAPTERS_DIR = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');
const BIBLETXT_DIR = path.join(__dirname, 'bibletxt', 'hebrew');

// Créer les dossiers s'ils n'existent pas
if (!fs.existsSync(BIBLETXT_DIR)) {
  fs.mkdirSync(BIBLETXT_DIR, { recursive: true });
}

/**
 * Parse le texte hébreu brut
 * Format attendu: "1 texte hébreu du verset 1\n2 texte hébreu du verset 2\n..."
 * OU: "1\ntexte hébreu\n2\ntexte hébreu\n..."
 */
function parseHebrewText(text) {
  const verses = {};
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  let currentVerse = null;
  let currentText = [];

  for (const line of lines) {
    // Vérifier si la ligne commence par un numéro (seul sur la ligne ou suivi d'espace)
    const verseMatch = line.match(/^(\d+)(?:\s+(.*))?$/);

    if (verseMatch) {
      // Sauvegarder le verset précédent
      if (currentVerse !== null && currentText.length > 0) {
        verses[currentVerse] = currentText.join(' ').trim();
        currentText = [];
      }

      currentVerse = parseInt(verseMatch[1]);

      // Si le texte est sur la même ligne que le numéro
      if (verseMatch[2]) {
        currentText.push(verseMatch[2]);
      }
    } else if (currentVerse !== null) {
      // Continuer le texte du verset actuel
      currentText.push(line);
    }
  }

  // Sauvegarder le dernier verset
  if (currentVerse !== null && currentText.length > 0) {
    verses[currentVerse] = currentText.join(' ').trim();
  }

  return verses;
}

/**
 * Crée un fichier JavaScript pour un chapitre
 */
function createChapterFile(chapter, verses) {
  const chapterPadded = String(chapter).padStart(2, '0');
  const filepath = path.join(CHAPTERS_DIR, `john-${chapterPadded}-he.js`);

  const verseCount = Object.keys(verses).length;
  const versesArray = [];

  // Trier les versets par numéro
  const sortedVerses = Object.entries(verses).sort(([a], [b]) => parseInt(a) - parseInt(b));

  for (const [verseNum, verseText] of sortedVerses) {
    // Échapper les guillemets et backslashes
    const escapedText = verseText
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"');

    versesArray.push(`  {
    "number": ${verseNum},
    "text": "${escapedText}",
    "strong": []
  }`);
  }

  const content = `// ============================================================================
// ÉVANGILE DE JEAN - Delitzsch Hebrew Gospels (הברית החדשה)
// ============================================================================
// Chapitre ${chapter}

export const johnChapter${chapter}HE = {
  chapter: ${chapter},
  title: "Jean ${chapter}",
  version: "Delitzsch Hebrew Gospels",
  language: "he",
  direction: "rtl",
  verses: [
${versesArray.join(',\n')}
  ]
};

export default johnChapter${chapter}HE;
`;

  fs.writeFileSync(filepath, content, 'utf8');

  // Créer aussi le fichier texte
  const txtPath = path.join(BIBLETXT_DIR, `john-${chapterPadded}.txt`);
  const txtContent = sortedVerses
    .map(([num, text]) => `${num} ${text}`)
    .join('\n');

  fs.writeFileSync(txtPath, txtContent, 'utf8');

  return verseCount;
}

/**
 * Fonction principale
 */
function main() {
  const chapterNum = parseInt(process.argv[2]);
  const inputFile = process.argv[3];

  if (!chapterNum || !inputFile) {
    console.log('╔════════════════════════════════════════════════════════════════════════════╗');
    console.log('║ CONVERTISSEUR - Texte hébreu vers JavaScript');
    console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');
    console.log('Usage: node convert-hebrew-text-to-js.js <chapitre> <fichier_texte>\n');
    console.log('Exemple: node convert-hebrew-text-to-js.js 7 john7-hebrew.txt\n');
    console.log('Le fichier texte doit contenir:');
    console.log('  1 וַיְהִי אַחֲרֵי הַדְּבָרִים הָאֵלֶּה...');
    console.log('  2 וְחַג הַסֻּכּוֹת לַיהוּדִים קָרוֹב׃');
    console.log('  3 וַיֹּאמְרוּ אֵלָיו אֶחָיו צֵא מִזֶּה...\n');
    process.exit(1);
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Fichier non trouvé: ${inputFile}`);
    process.exit(1);
  }

  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║ CONVERTISSEUR - Texte hébreu vers JavaScript');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');
  console.log(`📖 Chapitre: ${chapterNum}`);
  console.log(`📄 Fichier source: ${inputFile}\n`);

  const rawText = fs.readFileSync(inputFile, 'utf8');
  const verses = parseHebrewText(rawText);

  const verseCount = Object.keys(verses).length;

  if (verseCount === 0) {
    console.error('❌ Aucun verset trouvé dans le fichier');
    process.exit(1);
  }

  console.log(`✅ ${verseCount} versets extraits`);

  createChapterFile(chapterNum, verses);

  const chapterPadded = String(chapterNum).padStart(2, '0');
  console.log(`💾 Fichier créé: john-${chapterPadded}-he.js`);
  console.log(`💾 Fichier texte: john-${chapterPadded}.txt\n`);

  console.log('✅ Conversion terminée!\n');
}

main();
