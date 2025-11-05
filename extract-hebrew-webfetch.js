// ============================================================================
// EXTRACTION HÉBREU - Jean 7-21 avec WebFetch
// ============================================================================
// Utilise WebFetch pour extraire depuis Bible.com code 2220

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

// Données extraites manuellement (à remplir avec WebFetch ou copier-coller)
const hebrewChapters = {
  7: [
    "אַחַר הַדְּבָרִים הָאֵלֶּה הָלַךְ יֵשׁוּעַ בְּאֶרֶץ הַגָּלִיל הָלוֹךְ וְעָבוֹר כִּי לֹא חָפֵץ לְהִתְהַלֵּךְ בִּיהוּדָה עַל־אֲשֶׁר בִּקְשׁוּ הַיְּהוּדִים לַהֲמִיתוֹ׃",
    "וַיִּקְרַב חַג הַיְּהוּדִים חַג הַסֻּכּוֹת׃",
    // ... autres versets à ajouter
  ]
};

/**
 * Crée un fichier JavaScript pour un chapitre
 */
function createChapterFile(chapter, verses) {
  const chapterPadded = String(chapter).padStart(2, '0');
  const filepath = path.join(CHAPTERS_DIR, `john-${chapterPadded}-he.js`);

  const versesArray = verses.map((text, index) => {
    const verseNum = index + 1;
    const escapedText = text
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"');

    return `  {
    "number": ${verseNum},
    "text": "${escapedText}",
    "strong": []
  }`;
  });

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
  const txtContent = verses
    .map((text, index) => `${index + 1} ${text}`)
    .join('\n');

  fs.writeFileSync(txtPath, txtContent, 'utf8');

  return verses.length;
}

/**
 * Fonction principale
 */
function main() {
  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║ EXTRACTION HÉBREU - Génération des fichiers');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  let totalCreated = 0;

  for (const [chapter, verses] of Object.entries(hebrewChapters)) {
    const chapterNum = parseInt(chapter);
    console.log(`📖 Chapitre ${chapterNum}...`);

    const verseCount = createChapterFile(chapterNum, verses);
    console.log(`   ✅ ${verseCount} versets créés`);
    console.log(`   💾 Fichier: john-${String(chapterNum).padStart(2, '0')}-he.js\n`);

    totalCreated++;
  }

  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║ RÉSUMÉ');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');
  console.log(`✅ ${totalCreated} chapitre(s) créé(s)\n`);

  console.log('PROCHAINES ÉTAPES:');
  console.log('1. Utiliser WebFetch pour extraire chaque chapitre');
  console.log('2. Ajouter les versets dans le tableau hebrewChapters');
  console.log('3. Relancer ce script\n');
}

main();
